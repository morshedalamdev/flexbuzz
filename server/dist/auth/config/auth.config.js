"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)("auth", () => ({
    issuer: process.env.JWT_TOKEN_ISSUER,
    audience: process.env.JWT_TOKEN_AUDIENCE,
    accessTokenSecret: process.env.JWT_ACCESS_SECRET,
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
    accessTokenExpiresIn: parseInt(process.env.JWT_ACCESS_EXPIRATION_TIME ?? "3600", 10),
    refreshTokenExpiresIn: parseInt(process.env.JWT_REFRESH_EXPIRATION_TIME ?? "86400", 10),
}));
//# sourceMappingURL=auth.config.js.map