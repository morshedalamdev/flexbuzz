import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Profile } from "src/profile/profile.entity";
import { AuthModule } from "src/auth/auth.module";
import { FollowModule } from "src/follow/follow.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [
    FollowModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, Profile]),
  ],
})
export class UserModule {}
