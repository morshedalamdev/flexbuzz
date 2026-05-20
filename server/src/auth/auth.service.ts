import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { HashingProvider } from "./provider/hashing.provider";
import { UserService } from "src/user/user.service";
import { User } from "src/user/user.entity";
import authConfig from "./config/auth.config";
import type { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { ActiveUserType } from "./interfaces/active-user-type.interface";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { ForgotPasswordVerifyDto } from "./dto/forgot-password-verify.dto";
import { ForgotPasswordResetDto } from "./dto/forgot-password-reset.dto";

type ForgotPasswordTokenPayload = {
  purpose: "forgot-password";
};

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingProvider: HashingProvider,
    private readonly userService: UserService,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
    private readonly jwtService: JwtService,
  ) {}

  public async register(userDto: CreateUserDto) {
    userDto.password = await this.hashingProvider.hashPassword(
      userDto.password,
    );
    const newUser = await this.userService.create(userDto);
    return await this.generateToken(newUser);
  }

  public async login(loginDto: LoginDto) {
    const user = await this.userService.findForAuth(loginDto.username);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    if (!user.password) {
      throw new UnauthorizedException("Authentication failed");
    }
    const isPasswordValid = await this.hashingProvider.comparePassword(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Incorrect password");
    }
    return await this.generateToken(user);
  }

  public async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        {
          secret: this.authConfiguration.refreshTokenSecret,
          audience: this.authConfiguration.audience,
          issuer: this.authConfiguration.issuer,
        },
      );
      const user = await this.userService.findBy(sub, undefined, {
        includeStats: false,
        sanitize: false,
      });
      if (!user) {
        throw new NotFoundException("User not found");
      }
      return await this.generateToken(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error("Error @refresh-token:", error);
      throw new UnauthorizedException(error);
    }
  }

  public async forgotPasswordVerify(
    forgotPasswordVerifyDto: ForgotPasswordVerifyDto,
  ) {
    let user: User;
    try {
      user = await this.userService.findForAuth(forgotPasswordVerifyDto.username);
    } catch {
      throw new UnauthorizedException("Provided email and username do not match.");
    }
    if (user.email !== forgotPasswordVerifyDto.email) {
      throw new UnauthorizedException("Provided email and username do not match.");
    }

    const resetToken = await this.signInToken<ForgotPasswordTokenPayload>(
      user.id,
      this.authConfiguration.accessTokenSecret!,
      10 * 60,
      {
        purpose: "forgot-password",
      },
    );

    return {
      resetToken,
      message: "Identity verified. You can now reset your password.",
    };
  }

  public async forgotPasswordReset(
    forgotPasswordResetDto: ForgotPasswordResetDto,
  ) {
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        purpose?: string;
      }>(forgotPasswordResetDto.resetToken, {
        secret: this.authConfiguration.accessTokenSecret,
        audience: this.authConfiguration.audience,
        issuer: this.authConfiguration.issuer,
      });

      if (payload.purpose !== "forgot-password") {
        throw new UnauthorizedException("Invalid password reset token.");
      }

      const user = await this.userService.findForAuth(payload.sub);
      if (!user) {
        throw new NotFoundException("User not found");
      }

      const hashedPassword = await this.hashingProvider.hashPassword(
        forgotPasswordResetDto.newPassword,
      );
      await this.userService.updatePassword(user.id, hashedPassword);
      return { success: true, message: "Password updated successfully." };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException("Invalid or expired password reset token.");
    }
  }

  private async signInToken<T>(
    sub: string,
    secret: string,
    expiresIn: number,
    payload?: T,
  ) {
    return await this.jwtService.signAsync(
      {
        sub,
        ...payload,
      },
      {
        secret,
        expiresIn,
        audience: this.authConfiguration.audience,
        issuer: this.authConfiguration.issuer,
      },
    );
  }

  private async generateToken(user: User, refreshToken?: unknown) {
    if (!refreshToken) {
      refreshToken = await this.signInToken(
        user.id,
        this.authConfiguration.refreshTokenSecret!,
        this.authConfiguration.refreshTokenExpiresIn,
      );
    }
    const accessToken = await this.signInToken<Partial<ActiveUserType>>(
      user.id,
      this.authConfiguration.accessTokenSecret!,
      this.authConfiguration.accessTokenExpiresIn,
      {
        email: user.email,
        username: user.username,
      },
    );

    return { accessToken, refreshToken };
  }
}
