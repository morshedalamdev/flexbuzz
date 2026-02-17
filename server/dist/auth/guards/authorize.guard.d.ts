import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import authConfig from "../config/auth.config";
import type { ConfigType } from "@nestjs/config";
export declare class AuthorizeGuard implements CanActivate {
    private readonly jwtService;
    private readonly reflector;
    private readonly AuthConfiguration;
    constructor(jwtService: JwtService, reflector: Reflector, AuthConfiguration: ConfigType<typeof authConfig>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
