import { CreateUserDto } from "src/user/dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { HashingProvider } from "./provider/hashing.provider";
import { UserService } from "src/user/user.service";
import authConfig from "./config/auth.config";
import type { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
export declare class AuthService {
    private readonly hashingProvider;
    private readonly userService;
    private readonly authConfiguration;
    private readonly jwtService;
    constructor(hashingProvider: HashingProvider, userService: UserService, authConfiguration: ConfigType<typeof authConfig>, jwtService: JwtService);
    register(userDto: CreateUserDto): Promise<{
        accessToken: string;
        refreshToken: unknown;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: unknown;
    }>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: unknown;
    }>;
    private signInToken;
    private generateToken;
}
