import { Module } from "@nestjs/common";
import { NoteController } from "./note.controller";
import { NoteService } from "./note.service";
import { HashtagModule } from "src/hashtag/hashtag.module";
import { UserModule } from "src/user/user.module";
import { Note } from "./note.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LikeModule } from "src/like/like.module";

@Module({
  controllers: [NoteController],
  providers: [NoteService],
  exports: [NoteService],
  imports: [UserModule, HashtagModule, LikeModule, TypeOrmModule.forFeature([Note])],
})
export class NoteModule {}
