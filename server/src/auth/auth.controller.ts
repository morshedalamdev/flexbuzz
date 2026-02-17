import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { AllowAnonymous } from "./decorator/allow-anonymous.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  public async Register(@Body() createUser: CreateUserDto) {
    return this.authService.register(createUser);
  }

  @AllowAnonymous()
  @Post("/login")
  @HttpCode(HttpStatus.OK)
  public async Login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @AllowAnonymous()
  @Post("/refresh-token")
  @HttpCode(HttpStatus.OK)
  public async RefreshToken() {
    return this.authService.refreshToken();
  }
}
