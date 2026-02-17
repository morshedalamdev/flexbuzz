import { NoteService } from "./note.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { CommentDto } from "src/comment/dto/comment.dto";
import { NoteQueryDto } from "./dto/note-query.dto";
export declare class NoteController {
    private readonly noteService;
    constructor(noteService: NoteService);
    GetLikes(id: string): Promise<import("../user/user.entity").User[]>;
    GiveLike(id: string, userId: string): Promise<import("../like/like.entity").Like>;
    RemoveLike(id: string, userId: string): Promise<{
        deleted: boolean;
    }>;
    GetComments(id: string, pageQueryDto: NoteQueryDto): Promise<import("../common/pagination/pagination.interface").PaginationInterface<import("../comment/comment.entity").Comment>>;
    AddComment(createDto: CommentDto, userId: string): Promise<import("../comment/comment.entity").Comment>;
    EditComment(updateDto: CommentDto): Promise<{
        success: boolean;
    }>;
    DeleteComment(id: string): Promise<{
        deleted: boolean;
    }>;
    CreateNote(createDto: CreateNoteDto, userId: string): Promise<import("./note.entity").Note>;
    GetNotes(paginationQueryDto: NoteQueryDto): Promise<import("../common/pagination/pagination.interface").PaginationInterface<import("./note.entity").Note>>;
    GetById(id: string, userId: string): Promise<import("./note.entity").Note>;
    UpdateNote(updateDto: UpdateNoteDto, userId: string): Promise<import("./note.entity").Note>;
    DeleteNote(id: string): Promise<{
        deleted: boolean;
    }>;
}
