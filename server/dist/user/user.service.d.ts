import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { HashingProvider } from "src/auth/provider/hashing.provider";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FollowService } from "src/follow/follow.service";
export declare class UserService {
    private readonly followService;
    private readonly hashingProvider;
    private userRepository;
    constructor(followService: FollowService, hashingProvider: HashingProvider, userRepository: Repository<User>);
    create(userDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findBy(identifier: string): Promise<User>;
    current(): Promise<User>;
    update(userDto: UpdateUserDto): Promise<User>;
    delete(): Promise<{
        deleted: boolean;
    }>;
    follow(id: string): Promise<import("../follow/follow.entity").Follow>;
    unfollow(id: string): Promise<{
        deleted: boolean;
    }>;
}
