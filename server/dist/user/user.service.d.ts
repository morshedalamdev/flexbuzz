import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { HashingProvider } from "src/auth/provider/hashing.provider";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FollowService } from "src/follow/follow.service";
import { PaginationProvider } from "src/common/pagination/pagination.provider";
import { PaginationQueryDto } from "src/common/pagination/dto/pagination-query.dto";
import { PaginationInterface } from "src/common/pagination/pagination.interface";
export declare class UserService {
    private readonly followService;
    private readonly paginationProvider;
    private readonly hashingProvider;
    private userRepository;
    constructor(followService: FollowService, paginationProvider: PaginationProvider, hashingProvider: HashingProvider, userRepository: Repository<User>);
    create(userDto: CreateUserDto): Promise<User>;
    findAll(paginationQueryDto: PaginationQueryDto): Promise<PaginationInterface<User>>;
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
