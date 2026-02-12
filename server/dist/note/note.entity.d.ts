import { Hashtags } from "src/hashtag/hashtag.entity";
import { User } from "src/user/user.entity";
export declare class Notes {
    id: string;
    text: string;
    user: User;
    hashtags: Hashtags[];
    createdAt: Date;
    updatedAt: Date;
}
