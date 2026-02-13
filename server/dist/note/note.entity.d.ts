import { Hashtag } from "src/hashtag/hashtag.entity";
import { Like } from "src/like/like.entity";
import { User } from "src/user/user.entity";
export declare class Note {
    id: string;
    text: string;
    user: User;
    hashtag: Hashtag[];
    createdAt: Date;
    updatedAt: Date;
    like: Like[];
}
