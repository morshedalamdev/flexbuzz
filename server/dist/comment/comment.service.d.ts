import { Repository } from "typeorm";
import { Comment } from "./comment.entity";
import { CommentDto } from "./dto/comment.dto";
import { User } from "src/user/user.entity";
import { Note } from "src/note/note.entity";
type CreateType = {
    content: string;
    user: User;
    note: Note;
};
export declare class CommentService {
    private readonly commentRepository;
    constructor(commentRepository: Repository<Comment>);
    create(props: CreateType): Promise<Comment>;
    update(updateDto: CommentDto): Promise<{
        success: boolean;
    }>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
}
export {};
