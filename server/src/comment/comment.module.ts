import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { Comment } from "./comment.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaginationModule } from "src/common/pagination/pagination.module";

@Module({
  controllers: [],
  providers: [CommentService],
  exports: [CommentService],
  imports: [PaginationModule, TypeOrmModule.forFeature([Comment])],
})
export class CommentModule {}
