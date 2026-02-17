import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    Register(createUser: CreateUserDto): Promise<{
        accessToken: string;
        refreshToken: unknown;
    }>;
    Login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: unknown;
    }>;
    RefreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: unknown;
    }>;
}
