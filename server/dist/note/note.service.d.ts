import { CreateNoteDto } from "./dto/create-note.dto";
import { Repository } from "typeorm";
import { Note } from "./note.entity";
import { UserService } from "src/user/user.service";
import { HashtagService } from "src/hashtag/hashtag.service";
import { UpdateNoteDto } from "./dto/update-note.dto";
export declare class NoteService {
    private readonly userService;
    private readonly hashtagService;
    private readonly noteRepository;
    constructor(userService: UserService, hashtagService: HashtagService, noteRepository: Repository<Note>);
    create(noteDto: CreateNoteDto): Promise<Note>;
    getAll(user?: string): Promise<Note[]>;
    getById(id: string): Promise<Note | null>;
    update(noteDto: UpdateNoteDto): Promise<Note>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
}
