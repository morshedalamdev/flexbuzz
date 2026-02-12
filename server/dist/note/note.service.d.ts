import { CreateNoteDto } from './dto/create-note.dto';
export declare class NoteService {
    create(noteDto: CreateNoteDto): Promise<string>;
}
