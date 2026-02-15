import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { NoteService } from "./note.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { CommentDto } from "src/comment/dto/comment.dto";
@Controller("note")
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  public CreateNote(@Body() createDto: CreateNoteDto) {
    return this.noteService.create(createDto);
  }

  @Get()
  public GetNotes(@Query() query: { user?: string }) {
    return this.noteService.getAll(query.user);
  }

  @Get(":id")
  public GetById(@Param("id") id: string) {
    return this.noteService.getById(id);
  }

  @Patch()
  public UpdateNote(@Body() updateDto: UpdateNoteDto) {
    return this.noteService.update(updateDto);
  }

  @Delete(":id")
  public DeleteNote(@Param("id") id: string) {
    return this.noteService.delete(id);
  }

  // LIKES
  @Post(":id/like")
  async GiveLike(@Param("id") id: string) {
    return this.noteService.like(id);
  }

  @Delete(":id/dislike")
  async RemoveLike(@Param("id") id: string) {
    return this.noteService.dislike(id);
  }

  // COMMENTS
  @Post("/comment")
  async AddComment(@Body() createDto: CommentDto) {
    return this.noteService.addComment({ ...createDto });
  }

  @Patch("/comment")
  async EditComment(@Body() updateDto: CommentDto) {
    return this.noteService.updateComment({ ...updateDto });
  }

  @Delete("/comment")
  async DeleteComment(@Param("id") id: string) {
    return this.noteService.deleteComment(id);
  }
}
