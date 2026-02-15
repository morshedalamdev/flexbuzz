import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { HashingProvider } from "src/auth/provider/hashing.provider";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UserService {
    private readonly hashingProvider;
    private userRepository;
    constructor(hashingProvider: HashingProvider, userRepository: Repository<User>);
    create(userDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findBy(identifier: string): Promise<User>;
    current(): Promise<User>;
    update(userDto: UpdateUserDto): Promise<User>;
    delete(): Promise<{
        deleted: boolean;
    }>;
}
