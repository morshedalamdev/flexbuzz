import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    CreateUser(createDto: CreateUserDto): Promise<import("./user.entity").User>;
    GetUsers(): Promise<import("./user.entity").User[]>;
    GetCurrUser(): Promise<import("./user.entity").User>;
    UpdateCurrUser(updateDto: UpdateUserDto): Promise<import("./user.entity").User>;
    DeleteCurrUser(): Promise<{
        deleted: boolean;
    }>;
    GetUserById(id: string): Promise<import("./user.entity").User>;
}
