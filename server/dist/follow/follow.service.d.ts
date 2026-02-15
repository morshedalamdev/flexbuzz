import { Follow } from "./follow.entity";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
export declare class FollowService {
    private readonly followRepository;
    constructor(followRepository: Repository<Follow>);
    follow(userToFollow: User, currentUser: User): Promise<Follow>;
    unfollow(userToFollow: string, currentUser: string): Promise<{
        deleted: boolean;
    }>;
}
