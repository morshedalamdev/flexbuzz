import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    GetUsers(): Promise<import("./user.entity").User[]>;
    GetUserById(id: string): Promise<import("./user.entity").User>;
    CreateUser(createUserDto: CreateUserDto): Promise<import("./user.entity").User>;
    UpdateUser(updateUserDto: UpdateUserDto): Promise<import("./user.entity").User>;
    DeleteUser(id: string): Promise<{
        deleted: boolean;
    }>;
}
