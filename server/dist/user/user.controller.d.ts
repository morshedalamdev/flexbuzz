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
    GetCurrUser(userId: string): Promise<import("./user.entity").User>;
    UpdateCurrUser(updateDto: UpdateUserDto, userId: string): Promise<import("./user.entity").User>;
    DeleteCurrUser(userId: string): Promise<{
        deleted: boolean;
    }>;
    GetUsers(pageQueryDto: PaginationQueryDto): Promise<import("../common/pagination/pagination.interface").PaginationInterface<import("./user.entity").User>>;
    GetUserById(id: string): Promise<import("./user.entity").User>;
}
