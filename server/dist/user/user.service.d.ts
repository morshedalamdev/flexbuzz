import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { Profile } from "src/profile/profile.entity";
import { HashingProvider } from "src/auth/provider/hashing.provider";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UserService {
    private readonly hashingProvider;
    private userRepository;
    private profileRepository;
    constructor(hashingProvider: HashingProvider, userRepository: Repository<User>, profileRepository: Repository<Profile>);
    getAll(): Promise<User[]>;
    getBy(identifier: string): Promise<User>;
    create(userDto: CreateUserDto): Promise<User>;
    update(updateUser: UpdateUserDto): Promise<User>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
}
