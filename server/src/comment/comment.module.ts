import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { Comment } from "./comment.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [],
  providers: [CommentService],
  exports: [CommentService],
  imports: [TypeOrmModule.forFeature([Comment])],
})
export class CommentModule {}
