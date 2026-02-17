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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const hashing_provider_1 = require("./provider/hashing.provider");
const user_service_1 = require("../user/user.service");
const auth_config_1 = __importDefault(require("./config/auth.config"));
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    hashingProvider;
    userService;
    authConfiguration;
    jwtService;
    constructor(hashingProvider, userService, authConfiguration, jwtService) {
        this.hashingProvider = hashingProvider;
        this.userService = userService;
        this.authConfiguration = authConfiguration;
        this.jwtService = jwtService;
    }
    async register(userDto) {
        userDto.password = await this.hashingProvider.hashPassword(userDto.password);
        return await this.userService.create(userDto);
    }
    async login(loginDto) {
        const user = await this.userService.findBy(loginDto.username);
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const isPasswordValid = await this.hashingProvider.comparePassword(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Incorrect password");
        }
        return await this.generateToken(user);
    }
    async refreshToken() { }
    async signInToken(sub, secret, expiresIn, payload) {
        return await this.jwtService.signAsync({
            sub,
            ...payload,
        }, {
            secret,
            expiresIn,
            audience: this.authConfiguration.audience,
            issuer: this.authConfiguration.issuer,
        });
    }
    async generateToken(user, refreshToken) {
        if (!refreshToken) {
            refreshToken = await this.signInToken(user.id, this.authConfiguration.refreshTokenSecret, this.authConfiguration.refreshTokenExpiresIn);
        }
        const accessToken = await this.signInToken(user.id, this.authConfiguration.accessTokenSecret, this.authConfiguration.accessTokenExpiresIn, {
            email: user.email,
            username: user.username,
        });
        return { accessToken, refreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(auth_config_1.default.KEY)),
    __metadata("design:paramtypes", [hashing_provider_1.HashingProvider,
        user_service_1.UserService, void 0, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map