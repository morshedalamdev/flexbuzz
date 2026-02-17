import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PaginationQueryDto } from "src/common/pagination/dto/pagination-query.dto";
import { FollowQueryDto } from "./dto/follow-query.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    GetFollowers(pageQueryDto: FollowQueryDto, userId: string): Promise<import("../common/pagination/pagination.interface").PaginationInterface<import("../follow/follow.entity").Follow>>;
    GetFollowing(pageQueryDto: FollowQueryDto, userId: string): Promise<import("../common/pagination/pagination.interface").PaginationInterface<import("../follow/follow.entity").Follow>>;
    FollowUser(id: string, userId: string): Promise<import("../follow/follow.entity").Follow>;
    UnfollowUser(id: string, userId: string): Promise<{
        deleted: boolean;
    }>;
    GetCurrUser(userId: string): Promise<{
        followerCount: number;
        followingCount: number;
        id: string;
        username: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        isFollowedByCurrentUser?: boolean;
        profile: import("../profile/profile.entity").Profile;
        followers: import("../follow/follow.entity").Follow[];
        followings: import("../follow/follow.entity").Follow[];
        notes: import("../note/note.entity").Note[];
        likes: import("../like/like.entity").Like[];
        comments: import("../comment/comment.entity").Comment[];
    }>;
    UpdateCurrUser(updateDto: UpdateUserDto, userId: string): Promise<import("./user.entity").User>;
    DeleteCurrUser(userId: string): Promise<{
        deleted: boolean;
    }>;
    GetUsers(pageQueryDto: PaginationQueryDto, userId: string): Promise<import("../common/pagination/pagination.interface").PaginationInterface<import("./user.entity").User>>;
    GetUserById(id: string, userId: string): Promise<{
        followerCount: number;
        followingCount: number;
        id: string;
        username: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        isFollowedByCurrentUser?: boolean;
        profile: import("../profile/profile.entity").Profile;
        followers: import("../follow/follow.entity").Follow[];
        followings: import("../follow/follow.entity").Follow[];
        notes: import("../note/note.entity").Note[];
        likes: import("../like/like.entity").Like[];
        comments: import("../comment/comment.entity").Comment[];
    }>;
}
