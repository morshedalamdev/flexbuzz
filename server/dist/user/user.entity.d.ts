import { Comment } from "src/comment/comment.entity";
import { Follow } from "src/follow/follow.entity";
import { Like } from "src/like/like.entity";
import { Note } from "src/note/note.entity";
import { Profile } from "src/profile/profile.entity";
export declare class User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    followerCount?: number;
    followingCount?: number;
    isFollowedByCurrentUser?: boolean;
    profile: Profile;
    followers: Follow[];
    followings: Follow[];
    notes: Note[];
    likes: Like[];
    comments: Comment[];
}
