import { CreateNoteDto } from "./dto/create-note.dto";
import { Repository } from "typeorm";
import { Notes } from "./note.entity";
import { UserService } from "src/user/user.service";
import { HashtagService } from "src/hashtag/hashtag.service";
import { UpdateNoteDto } from "./dto/update-note.dto";
export declare class NoteService {
    private readonly userService;
    private readonly hashtagService;
    private readonly noteRepository;
    constructor(userService: UserService, hashtagService: HashtagService, noteRepository: Repository<Notes>);
    create(noteDto: CreateNoteDto): Promise<Notes>;
    getAll(user?: string): Promise<Notes[]>;
    getById(id: string): Promise<Notes | null>;
    update(noteDto: UpdateNoteDto): Promise<Notes>;
    delete(id: string): Promise<void>;
}
