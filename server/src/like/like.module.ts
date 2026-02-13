import { Module } from "@nestjs/common";
import { LikeController } from "./like.controller";
import { LikeService } from "./like.service";
import { Like } from "./like.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NoteModule } from "src/note/note.module";
import { UserModule } from "src/user/user.module";

@Module({
  controllers: [LikeController],
  providers: [LikeService],
  imports: [UserModule, NoteModule, TypeOrmModule.forFeature([Like])],
})
export class LikeModule {}
