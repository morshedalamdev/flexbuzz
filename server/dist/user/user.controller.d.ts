import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    CreateUser(createDto: CreateUserDto): Promise<import("./user.entity").User>;
    GetUsers(): Promise<import("./user.entity").User[]>;
    GetUserById(id: string): Promise<import("./user.entity").User>;
    GetCurrentUser(): Promise<void>;
    UpdateUser(updateDto: UpdateUserDto): Promise<void>;
    DeleteUser(): Promise<{
        deleted: boolean;
    }>;
}
