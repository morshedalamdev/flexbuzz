import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { HashtagModule } from "./hashtag/hashtag.module";
import { CommentModule } from "./comment/comment.module";
import { LikeModule } from "./like/like.module";
import { NoteModule } from './note/note.module';
import { ProfileModule } from './profile/profile.module';
import appConfig from "./config/app.config";
import databaseConfig from "./config/database.config";
import envValidation from "./config/env.validation";
import authConfig from "./auth/config/auth.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FollowModule } from './follow/follow.module';
import { PaginationModule } from './common/pagination/pagination.module';
import { APP_GUARD } from "@nestjs/core";
import { AuthorizeGuard } from "./auth/guards/authorize.guard";
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    AuthModule,
    UserModule,
    HashtagModule,
    CommentModule,
    LikeModule,
    NoteModule,
    ProfileModule,
    FollowModule,
    PaginationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? ".env" : `.env.${ENV}`,
      load: [appConfig, databaseConfig, authConfig],
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
    ConfigModule.forFeature(authConfig),
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: AuthorizeGuard,
  }],
})
export class AppModule {}
