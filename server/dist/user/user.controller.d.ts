import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    CreateUser(createDto: CreateUserDto): Promise<import("./user.entity").User>;
    GetUsers(): Promise<import("./user.entity").User[]>;
    GetUserById(id: string): Promise<import("./user.entity").User>;
}
