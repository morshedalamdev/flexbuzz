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
}
