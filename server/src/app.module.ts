import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { HashtagsModule } from "./hashtags/hashtags.module";
import { CommentsModule } from "./comments/comments.module";
import { LikesModule } from "./likes/likes.module";
import appConfig from "./config/app.config";
import databaseConfig from "./config/database.config";
import envValidation from "./config/env.validation";
import { TypeOrmModule } from "@nestjs/typeorm";

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostsModule,
    HashtagsModule,
    CommentsModule,
    LikesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? ".env" : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: envValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        autoLoadEntities: configService.get<boolean>("database.autoLoad"),
        synchronize: configService.get<boolean>("database.synchronize"), // Only for dev env **DO NOT USE IN PRODUCTION**
        host: configService.get<string>("database.host"),
        port: configService.get<number>("database.port"),
        username: configService.get<string>("database.user"),
        database: configService.get<string>("database.name"),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
