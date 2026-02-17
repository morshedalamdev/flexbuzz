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
import { NoteQueryDto } from "./dto/note-query.dto";
import { ActiveUser } from "src/auth/decorator/active-user.decorator";

@Controller("note")
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  // LIKES
  @Post(":id/like")
  async GiveLike(@Param("id") id: string, @ActiveUser("sub") userId: string) {
    return this.noteService.like(id, userId);
  }

  @Delete(":id/dislike")
  async RemoveLike(@Param("id") id: string, @ActiveUser("sub") userId: string) {
    return this.noteService.dislike(id, userId);
  }

  // COMMENTS
  @Post("comment")
  async AddComment(
    @Body() createDto: CommentDto,
    @ActiveUser("sub") userId: string,
  ) {
    return this.noteService.addComment(createDto, userId);
  }

  @Patch("comment")
  async EditComment(@Body() updateDto: CommentDto) {
    return this.noteService.updateComment(updateDto);
  }

  @Delete("comment")
  async DeleteComment(@Param("id") id: string) {
    return this.noteService.deleteComment(id);
  }

  @Post()
  public CreateNote(
    @Body() createDto: CreateNoteDto,
    @ActiveUser("sub") userId: string,
  ) {
    return this.noteService.create(createDto, userId);
  }

  @Get()
  public GetNotes(@Query() paginationQueryDto: NoteQueryDto) {
    return this.noteService.getAll(paginationQueryDto);
  }

  @Get(":id")
  public GetById(@Param("id") id: string) {
    return this.noteService.getById(id);
  }

  @Patch()
  public UpdateNote(
    @Body() updateDto: UpdateNoteDto,
    @ActiveUser("sub") userId: string,
  ) {
    return this.noteService.update(updateDto, userId);
  }

  @Delete(":id")
  public DeleteNote(@Param("id") id: string) {
    return this.noteService.delete(id);
  }
}
