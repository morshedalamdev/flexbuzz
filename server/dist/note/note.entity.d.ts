import { Comment } from "src/comment/comment.entity";
import { Hashtag } from "src/hashtag/hashtag.entity";
import { Like } from "src/like/like.entity";
import { User } from "src/user/user.entity";
export declare class Note {
    id: string;
    content: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    hashtags: Hashtag[];
    likes: Like[];
    comments: Comment[];
}
