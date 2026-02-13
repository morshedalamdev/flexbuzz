import { CommentService } from "./comment.service";
import { CommentDto } from "./dto/comment.dto";
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    AddComment(createDto: CommentDto): Promise<import("./comment.entity").Comment>;
    EditComment(updateDto: CommentDto): Promise<{
        success: boolean;
    }>;
    DeleteComment(id: string): Promise<{
        deleted: boolean;
    }>;
}
