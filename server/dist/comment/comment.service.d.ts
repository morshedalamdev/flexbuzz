import { Repository } from "typeorm";
import { Comment } from "./comment.entity";
import { CommentDto } from "./dto/comment.dto";
import { User } from "src/user/user.entity";
import { Note } from "src/note/note.entity";
import { PaginationProvider } from "src/common/pagination/pagination.provider";
import { NoteQueryDto } from "src/note/dto/note-query.dto";
import { PaginationInterface } from "src/common/pagination/pagination.interface";
type CreateType = {
    content: string;
    user: User;
    note: Note;
};
export declare class CommentService {
    private readonly commentRepository;
    private readonly paginationProvider;
    constructor(commentRepository: Repository<Comment>, paginationProvider: PaginationProvider);
    create(props: CreateType): Promise<Comment>;
    update(updateDto: CommentDto): Promise<{
        success: boolean;
    }>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
    getCommentsByNote(noteId: string, pageQueryDto: NoteQueryDto): Promise<PaginationInterface<Comment>>;
    commentCount(noteId: string): Promise<number>;
}
export {};
