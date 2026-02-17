import { CreateNoteDto } from "./dto/create-note.dto";
import { Repository } from "typeorm";
import { Note } from "./note.entity";
import { UserService } from "src/user/user.service";
import { HashtagService } from "src/hashtag/hashtag.service";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { LikeService } from "src/like/like.service";
import { CommentDto } from "src/comment/dto/comment.dto";
import { CommentService } from "src/comment/comment.service";
import { NoteQueryDto } from "./dto/note-query.dto";
import { PaginationInterface } from "src/common/pagination/pagination.interface";
import { PaginationProvider } from "src/common/pagination/pagination.provider";
export declare class NoteService {
    private readonly userService;
    private readonly hashtagService;
    private readonly likeService;
    private readonly commentService;
    private readonly paginationProvider;
    private readonly noteRepository;
    constructor(userService: UserService, hashtagService: HashtagService, likeService: LikeService, commentService: CommentService, paginationProvider: PaginationProvider, noteRepository: Repository<Note>);
    create(noteDto: CreateNoteDto, userId: string): Promise<Note>;
    getAll(pageQueryDto: NoteQueryDto): Promise<PaginationInterface<Note>>;
    getById(id: string, userId?: string): Promise<Note>;
    update(noteDto: UpdateNoteDto, userId: string): Promise<Note>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
    getLikes(id: string): Promise<import("../user/user.entity").User[]>;
    like(id: string, userId: string): Promise<import("../like/like.entity").Like>;
    dislike(id: string, userId: string): Promise<{
        deleted: boolean;
    }>;
    getComments(id: string, pageQueryDto: NoteQueryDto): Promise<PaginationInterface<import("../comment/comment.entity").Comment>>;
    addComment(commentDto: CommentDto, userId: string): Promise<import("../comment/comment.entity").Comment>;
    updateComment(commentDto: CommentDto): Promise<{
        success: boolean;
    }>;
    deleteComment(id: string): Promise<{
        deleted: boolean;
    }>;
}
