import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Profile } from "src/profile/profile.entity";
import { FollowModule } from "src/follow/follow.module";
import { PaginationModule } from "src/common/pagination/pagination.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [
    FollowModule,
    PaginationModule,
    TypeOrmModule.forFeature([User, Profile]),
  ],
})
export class UserModule {}
