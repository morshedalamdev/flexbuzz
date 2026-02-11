"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const posts_module_1 = require("./posts/posts.module");
const hashtags_module_1 = require("./hashtags/hashtags.module");
const comments_module_1 = require("./comments/comments.module");
const likes_module_1 = require("./likes/likes.module");
const app_config_1 = __importDefault(require("./config/app.config"));
const database_config_1 = __importDefault(require("./config/database.config"));
const env_validation_1 = __importDefault(require("./config/env.validation"));
const typeorm_1 = require("@nestjs/typeorm");
const ENV = process.env.NODE_ENV;
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            posts_module_1.PostsModule,
            hashtags_module_1.HashtagsModule,
            comments_module_1.CommentsModule,
            likes_module_1.LikesModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: !ENV ? ".env" : `.env.${ENV}`,
                load: [app_config_1.default, database_config_1.default],
                validationSchema: env_validation_1.default,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: "postgres",
                    autoLoadEntities: configService.get("database.autoLoad"),
                    synchronize: configService.get("database.synchronize"),
                    host: configService.get("database.host"),
                    port: configService.get("database.port"),
                    username: configService.get("database.user"),
                    database: configService.get("database.name"),
                }),
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map