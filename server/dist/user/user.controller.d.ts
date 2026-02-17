import type { Request } from "express";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PaginationQueryDto } from "src/common/pagination/dto/pagination-query.dto";
import { FollowQueryDto } from "./dto/follow-query.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    GetFollowers(pageQueryDto: FollowQueryDto, req: Request): Promise<import("../common/pagination/pagination.interface").PaginationInterface<import("../follow/follow.entity").Follow>>;
    GetFollowing(pageQueryDto: FollowQueryDto, req: Request): Promise<import("../common/pagination/pagination.interface").PaginationInterface<import("../follow/follow.entity").Follow>>;
    FollowUser(id: string): Promise<import("../follow/follow.entity").Follow>;
    UnfollowUser(id: string): Promise<{
        deleted: boolean;
    }>;
    GetCurrUser(): Promise<import("./user.entity").User>;
    UpdateCurrUser(updateDto: UpdateUserDto): Promise<import("./user.entity").User>;
    DeleteCurrUser(): Promise<{
        deleted: boolean;
    }>;
    GetUsers(pageQueryDto: PaginationQueryDto, req: Request): Promise<import("../common/pagination/pagination.interface").PaginationInterface<import("./user.entity").User>>;
    GetUserById(id: string): Promise<import("./user.entity").User>;
}
