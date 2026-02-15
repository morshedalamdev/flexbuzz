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
    getById(id: string): Promise<{
        userRelation: import("../user/user.entity").User;
        id: string;
        content: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        user: import("../user/user.entity").User;
        hashtags: import("../hashtag/hashtag.entity").Hashtag[];
        likes: import("../like/like.entity").Like[];
        comments: import("../comment/comment.entity").Comment[];
    }>;
    update(noteDto: UpdateNoteDto): Promise<Note>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
}
