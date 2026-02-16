import { NoteService } from "./note.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { CommentDto } from "src/comment/dto/comment.dto";
import { NoteQueryDto } from "./dto/note-query.dto";
export declare class NoteController {
    private readonly noteService;
    constructor(noteService: NoteService);
    CreateNote(createDto: CreateNoteDto): Promise<import("./note.entity").Note>;
    GetNotes(paginationQueryDto: NoteQueryDto): Promise<import("../common/pagination/pagination.interface").PaginationInterface<import("./note.entity").Note>>;
    GetById(id: string): Promise<{
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
    UpdateNote(updateDto: UpdateNoteDto): Promise<import("./note.entity").Note>;
    DeleteNote(id: string): Promise<{
        deleted: boolean;
    }>;
    GiveLike(id: string): Promise<import("../like/like.entity").Like>;
    RemoveLike(id: string): Promise<{
        deleted: boolean;
    }>;
    AddComment(createDto: CommentDto): Promise<import("../comment/comment.entity").Comment>;
    EditComment(updateDto: CommentDto): Promise<{
        success: boolean;
    }>;
    DeleteComment(id: string): Promise<{
        deleted: boolean;
    }>;
}
