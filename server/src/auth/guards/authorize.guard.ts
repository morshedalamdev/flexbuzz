import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import authConfig from "../config/auth.config";
import type { ConfigType } from "@nestjs/config";
import { Request } from "express";

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,

    @Inject(authConfig.KEY)
    private readonly AuthConfiguration: ConfigType<typeof authConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride("isPublic", [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) throw new UnauthorizedException("Access Token not provided");
    try {
     const payload = await this.jwtService.verifyAsync(
          token,
          this.AuthConfiguration,
     );
     request["user"] = payload;
    } catch (error) {
      throw new UnauthorizedException("Invalid Access Token");
    }

    return true;
  }
}
