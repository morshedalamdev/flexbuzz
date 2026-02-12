import { NoteService } from "./note.service";
import { CreateNoteDto } from "./dto/create-note.dto";
export declare class NoteController {
    private readonly noteService;
    constructor(noteService: NoteService);
    Create(createDto: CreateNoteDto): Promise<string>;
}
