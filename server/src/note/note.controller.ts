import { Body, Controller, Post } from "@nestjs/common";
import { NoteService } from "./note.service";
import { CreateNoteDto } from "./dto/create-note.dto";

@Controller("note")
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  public Create(@Body() createDto: CreateNoteDto) {
    return this.noteService.create(createDto);
  }
}
