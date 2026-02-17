"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const auth_config_1 = __importDefault(require("../config/auth.config"));
let AuthorizeGuard = class AuthorizeGuard {
    jwtService;
    reflector;
    AuthConfiguration;
    constructor(jwtService, reflector, AuthConfiguration) {
        this.jwtService = jwtService;
        this.reflector = reflector;
        this.AuthConfiguration = AuthConfiguration;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride("isPublic", [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic)
            return true;
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(" ")[1];
        if (!token)
            throw new common_1.UnauthorizedException("Access Token not provided");
        try {
            const payload = await this.jwtService.verifyAsync(token, this.AuthConfiguration);
            request["user"] = payload;
        }
        catch (error) {
            throw new common_1.UnauthorizedException("Invalid Access Token");
        }
        return true;
    }
};
exports.AuthorizeGuard = AuthorizeGuard;
exports.AuthorizeGuard = AuthorizeGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(auth_config_1.default.KEY)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        core_1.Reflector, void 0])
], AuthorizeGuard);
//# sourceMappingURL=authorize.guard.js.map