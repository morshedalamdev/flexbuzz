import { Repository } from "typeorm";
import { NoteService } from "src/note/note.service";
import { UserService } from "src/user/user.service";
import { Comment } from "./comment.entity";
import { CommentDto } from "./dto/comment.dto";
export declare class CommentService {
    private readonly userService;
    private readonly noteService;
    private readonly commentRepository;
    constructor(userService: UserService, noteService: NoteService, commentRepository: Repository<Comment>);
    create(commentDto: CommentDto): Promise<Comment>;
    update(updateDto: CommentDto): Promise<{
        success: boolean;
    }>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
}
