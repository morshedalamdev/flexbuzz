import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Profile } from "src/profile/profile.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, Profile]),
  ],
})
export class UserModule {}
