import { LikeService } from './like.service';
import { LikeDto } from './dto/like.dto';
export declare class LikeController {
    private readonly likeService;
    constructor(likeService: LikeService);
    GiveLike(likeDto: LikeDto): Promise<import("./like.entity").Like>;
    RemoveLike(id: string): Promise<{
        deleted: boolean;
    }>;
}
