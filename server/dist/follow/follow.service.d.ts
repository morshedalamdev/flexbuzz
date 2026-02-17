import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import { FollowQueryDto } from "src/user/dto/follow-query.dto";
import { PaginationProvider } from "src/common/pagination/pagination.provider";
import { Follow } from "./follow.entity";
export declare class FollowService {
    private readonly followRepository;
    private readonly paginationProvider;
    constructor(followRepository: Repository<Follow>, paginationProvider: PaginationProvider);
    follow(userToFollow: User, currentUser: User): Promise<Follow>;
    unfollow(userToFollow: string, currentUser: string): Promise<{
        deleted: boolean;
    }>;
    getFollows(followDto: FollowQueryDto): Promise<import("../common/pagination/pagination.interface").PaginationInterface<Follow>>;
    followerCount(userId: string): Promise<number>;
    followingCount(userId: string): Promise<number>;
    isFollowedByCurrentUser(userId: string, currentUserId: string): Promise<boolean>;
}
