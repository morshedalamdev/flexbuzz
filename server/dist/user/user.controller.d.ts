import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PaginationQueryDto } from "src/common/pagination/dto/pagination-query.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    CreateUser(createDto: CreateUserDto): Promise<import("./user.entity").User>;
    GetUsers(pageQueryDto: PaginationQueryDto): Promise<import("../common/pagination/pagination.interface").PaginationInterface<import("./user.entity").User>>;
    GetCurrUser(): Promise<import("./user.entity").User>;
    UpdateCurrUser(updateDto: UpdateUserDto): Promise<import("./user.entity").User>;
    DeleteCurrUser(): Promise<{
        deleted: boolean;
    }>;
    GetUserById(id: string): Promise<import("./user.entity").User>;
    FollowUser(id: string): Promise<import("../follow/follow.entity").Follow>;
    UnfollowUser(id: string): Promise<{
        deleted: boolean;
    }>;
}
