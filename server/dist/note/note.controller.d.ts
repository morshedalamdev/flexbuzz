import { NoteService } from "./note.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
export declare class NoteController {
    private readonly noteService;
    constructor(noteService: NoteService);
    CreateNote(createDto: CreateNoteDto): Promise<import("./note.entity").Note[]>;
    GetNotes(query: {
        user?: string;
    }): Promise<import("./note.entity").Note[]>;
    GetById(id: string): Promise<import("./note.entity").Note | null>;
    UpdateNote(updateDto: UpdateNoteDto): Promise<import("./note.entity").Note>;
    DeleteNote(id: string): Promise<{
        deleted: boolean;
    }>;
}
