import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentDto } from "./dto/comment.dto";

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async AddComment(@Body() createDto: CommentDto) {
    return this.commentService.create(createDto);
  }

  @Patch()
  async EditComment(@Body() updateDto: CommentDto) {
    return this.commentService.update(updateDto);
  }

  @Delete(":id")
  async DeleteComment(@Param("id") id: string) {
    return this.commentService.delete(id);
  }
}
