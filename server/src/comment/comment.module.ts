import { Module } from "@nestjs/common";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { Comment } from "./comment.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/user/user.module";
import { NoteModule } from "src/note/note.module";

@Module({
  controllers: [CommentController],
  providers: [CommentService],
    imports: [UserModule, NoteModule, TypeOrmModule.forFeature([Comment])],
})
export class CommentModule {}
