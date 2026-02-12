import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { HashingProvider } from "src/auth/provider/hashing.provider";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UserService {
    private readonly hashingProvider;
    private userRepository;
    constructor(hashingProvider: HashingProvider, userRepository: Repository<User>);
    getAll(): Promise<User[]>;
    getBy(identifier: string): Promise<User>;
    getCurrent(): Promise<void>;
    create(userDto: CreateUserDto): Promise<User>;
    update(updateUser: UpdateUserDto): Promise<void>;
    delete(): Promise<{
        deleted: boolean;
    }>;
}
