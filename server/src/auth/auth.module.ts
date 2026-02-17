import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { HashingProvider } from "./provider/hashing.provider";
import { BcryptProvider } from "./provider/bcrypt.provider";
import authConfig from "./config/auth.config";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ],
  exports: [AuthService, JwtModule, HashingProvider],
  imports: [
    UserModule,
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(authConfig)],
      useFactory: (config: ConfigType<typeof authConfig>) => ({
        secret: config.accessTokenSecret,
        signOptions: {
          expiresIn: config.accessTokenExpiresIn,
          issuer: config.issuer,
          audience: config.audience,
        },
      }),
      inject: [authConfig.KEY],
    }),
  ],
})
export class AuthModule {}
