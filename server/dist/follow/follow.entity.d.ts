import { User } from "src/user/user.entity";
export declare class Follow {
    followerId: string;
    followingId: string;
    createdAt: Date;
    follower: User;
    following: User;
}
