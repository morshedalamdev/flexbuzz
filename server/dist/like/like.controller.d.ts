import { LikeService } from './like.service';
export declare class LikeController {
    private readonly likeService;
    constructor(likeService: LikeService);
    GiveLike(id: string): Promise<import("./like.entity").Like>;
    RemoveLike(id: string): Promise<{
        deleted: boolean;
    }>;
}
