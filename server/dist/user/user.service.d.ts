import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PaginationProvider } from "src/common/pagination/pagination.provider";
import { PaginationQueryDto } from "src/common/pagination/dto/pagination-query.dto";
import { PaginationInterface } from "src/common/pagination/pagination.interface";
import { FollowQueryDto } from "./dto/follow-query.dto";
import { FollowService } from "src/follow/follow.service";
export declare class UserService {
    private readonly followService;
    private readonly paginationProvider;
    private userRepository;
    constructor(followService: FollowService, paginationProvider: PaginationProvider, userRepository: Repository<User>);
    create(userDto: CreateUserDto): Promise<User>;
    findAll(paginationQueryDto: PaginationQueryDto, userId: string): Promise<PaginationInterface<User>>;
    findBy(identifier: string, userId?: string): Promise<{
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
    current(userId: string): Promise<{
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
    update(userDto: UpdateUserDto, userId: string): Promise<User>;
    delete(userId: string): Promise<{
        deleted: boolean;
    }>;
    follow(id: string, userId: string): Promise<import("../follow/follow.entity").Follow>;
    unfollow(id: string, userId: string): Promise<{
        deleted: boolean;
    }>;
    getFollowers(followDto: FollowQueryDto, userId: string): Promise<PaginationInterface<import("../follow/follow.entity").Follow>>;
    getFollowing(followDto: FollowQueryDto, userId: string): Promise<PaginationInterface<import("../follow/follow.entity").Follow>>;
}
