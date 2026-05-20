import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PaginationProvider } from "src/common/pagination/pagination.provider";
import { PaginationQueryDto } from "src/common/pagination/dto/pagination-query.dto";
import { PaginationInterface } from "src/common/pagination/pagination.interface";
import { FollowQueryDto } from "./dto/follow-query.dto";
import { FollowService } from "src/follow/follow.service";
type FindUserOptions = {
    includePassword?: boolean;
    includeStats?: boolean;
    sanitize?: boolean;
};
export declare class UserService {
    private readonly followService;
    private readonly paginationProvider;
    private userRepository;
    constructor(followService: FollowService, paginationProvider: PaginationProvider, userRepository: Repository<User>);
    findAll(paginationQueryDto: PaginationQueryDto & {
        search?: string;
    }, userId: string): Promise<PaginationInterface<User>>;
    findBy(identifier: string, userId?: string, options?: FindUserOptions): Promise<User>;
    findForAuth(identifier: string): Promise<User>;
    create(userDto: CreateUserDto): Promise<User>;
    current(userId: string): Promise<User>;
    update(userDto: UpdateUserDto, userId: string): Promise<User>;
    delete(userId: string): Promise<{
        deleted: boolean;
    }>;
    updatePassword(userId: string, hashedPassword: string): Promise<{
        updated: boolean;
    }>;
    follow(id: string, userId: string): Promise<{
        success: boolean;
    }>;
    unfollow(id: string, userId: string): Promise<{
        deleted: boolean;
    }>;
    getFollowers(followDto: FollowQueryDto, userId: string): Promise<{
        data: {
            isFollowed: boolean;
            id: string;
            username: string;
            email: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date;
            followerCount?: number;
            followingCount?: number;
            profile: import("../profile/profile.entity").Profile;
            followers: import("../follow/follow.entity").Follow[];
            followings: import("../follow/follow.entity").Follow[];
            notes: import("../note/note.entity").Note[];
            likes: import("../like/like.entity").Like[];
            comments: import("../comment/comment.entity").Comment[];
        }[];
        meta: {
            itemsPerPage: number;
            totalItems: number;
            totalPages: number;
            currentPage: number;
        };
        links: {
            firstPage: string;
            prevPage: string;
            nextPage: string;
            lastPage: string;
        };
    }>;
    getFollowing(followDto: FollowQueryDto, userId: string): Promise<{
        data: {
            isFollowed: boolean;
            id: string;
            username: string;
            email: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date;
            followerCount?: number;
            followingCount?: number;
            profile: import("../profile/profile.entity").Profile;
            followers: import("../follow/follow.entity").Follow[];
            followings: import("../follow/follow.entity").Follow[];
            notes: import("../note/note.entity").Note[];
            likes: import("../like/like.entity").Like[];
            comments: import("../comment/comment.entity").Comment[];
        }[];
        meta: {
            itemsPerPage: number;
            totalItems: number;
            totalPages: number;
            currentPage: number;
        };
        links: {
            firstPage: string;
            prevPage: string;
            nextPage: string;
            lastPage: string;
        };
    }>;
}
export {};
