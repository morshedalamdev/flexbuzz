import {
  forwardRef,
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
    userDto.password = await this.hashingProvider.hashPassword(userDto.password);
    return await this.userService.create(userDto);
  }

  public async login(loginDto: LoginDto) {
    const user = await this.userService.findBy(loginDto.username);
    if (!user) {
      throw new NotFoundException("User not found");
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

  public async refreshToken() {}

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
