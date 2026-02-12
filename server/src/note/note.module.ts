import { Module } from "@nestjs/common";
import { NoteController } from "./note.controller";
import { NoteService } from "./note.service";
import { HashtagModule } from "src/hashtag/hashtag.module";
import { UserModule } from "src/user/user.module";
import { Note } from "./note.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [NoteController],
  providers: [NoteService],
  imports: [UserModule, HashtagModule, TypeOrmModule.forFeature([Note])],
  exports: [NoteService],
})
export class NoteModule {}
