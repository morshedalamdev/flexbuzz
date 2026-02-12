"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)("database", () => ({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    synchronize: process.env.DB_SYNC === "true" || false,
    autoLoad: process.env.DB_AUTO_LOAD_ENTITIES === "true" || true,
}));
//# sourceMappingURL=database.config.js.map