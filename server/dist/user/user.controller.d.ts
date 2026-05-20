import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FollowQueryDto } from "./dto/follow-query.dto";
import { SearchUserQueryDto } from "./dto/search-user-query.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    GetFollowers(pageQueryDto: FollowQueryDto, userId: string): Promise<{
        data: {
            id: string;
            username: string;
            email: string;
            profile: {
                firstName: string | undefined;
                lastName: string | undefined;
                gender: import("../profile/profile.entity").Gender | undefined;
                dob: Date | undefined;
                bio: string | undefined;
            } | {
                firstName?: undefined;
                lastName?: undefined;
                gender?: undefined;
                dob?: undefined;
                bio?: undefined;
            };
            createdAt: Date;
            followerCount: number | undefined;
            followingCount: number | undefined;
            isFollowed: boolean | undefined;
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
    GetFollowing(pageQueryDto: FollowQueryDto, userId: string): Promise<{
        data: {
            id: string;
            username: string;
            email: string;
            profile: {
                firstName: string | undefined;
                lastName: string | undefined;
                gender: import("../profile/profile.entity").Gender | undefined;
                dob: Date | undefined;
                bio: string | undefined;
            } | {
                firstName?: undefined;
                lastName?: undefined;
                gender?: undefined;
                dob?: undefined;
                bio?: undefined;
            };
            createdAt: Date;
            followerCount: number | undefined;
            followingCount: number | undefined;
            isFollowed: boolean | undefined;
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
    FollowUser(id: string, userId: string): Promise<import("../follow/follow.entity").Follow>;
    UnfollowUser(id: string, userId: string): Promise<{
        deleted: boolean;
    }>;
    GetCurrUser(userId: string): Promise<{
        id: string;
        username: string;
        email: string;
        profile: {
            firstName: string | undefined;
            lastName: string | undefined;
            gender: import("../profile/profile.entity").Gender | undefined;
            dob: Date | undefined;
            bio: string | undefined;
        } | {
            firstName?: undefined;
            lastName?: undefined;
            gender?: undefined;
            dob?: undefined;
            bio?: undefined;
        };
        createdAt: Date;
        followerCount: number | undefined;
        followingCount: number | undefined;
        isFollowed: boolean | undefined;
    }>;
    UpdateCurrUser(updateDto: UpdateUserDto, userId: string): Promise<{
        id: string;
        username: string;
        email: string;
        profile: {
            firstName: string | undefined;
            lastName: string | undefined;
            gender: import("../profile/profile.entity").Gender | undefined;
            dob: Date | undefined;
            bio: string | undefined;
        } | {
            firstName?: undefined;
            lastName?: undefined;
            gender?: undefined;
            dob?: undefined;
            bio?: undefined;
        };
        createdAt: Date;
        followerCount: number | undefined;
        followingCount: number | undefined;
        isFollowed: boolean | undefined;
    }>;
    DeleteCurrUser(userId: string): Promise<{
        deleted: boolean;
    }>;
    GetUsers(pageQueryDto: SearchUserQueryDto, userId: string): Promise<{
        data: {
            id: string;
            username: string;
            email: string;
            profile: {
                firstName: string | undefined;
                lastName: string | undefined;
                gender: import("../profile/profile.entity").Gender | undefined;
                dob: Date | undefined;
                bio: string | undefined;
            } | {
                firstName?: undefined;
                lastName?: undefined;
                gender?: undefined;
                dob?: undefined;
                bio?: undefined;
            };
            createdAt: Date;
            followerCount: number | undefined;
            followingCount: number | undefined;
            isFollowed: boolean | undefined;
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
    GetUserById(id: string, userId: string): Promise<{
        id: string;
        username: string;
        email: string;
        profile: {
            firstName: string | undefined;
            lastName: string | undefined;
            gender: import("../profile/profile.entity").Gender | undefined;
            dob: Date | undefined;
            bio: string | undefined;
        } | {
            firstName?: undefined;
            lastName?: undefined;
            gender?: undefined;
            dob?: undefined;
            bio?: undefined;
        };
        createdAt: Date;
        followerCount: number | undefined;
        followingCount: number | undefined;
        isFollowed: boolean | undefined;
    }>;
}
