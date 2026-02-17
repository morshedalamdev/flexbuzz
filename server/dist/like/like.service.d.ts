import { Like } from "./like.entity";
import { Repository } from "typeorm";
import { Note } from "src/note/note.entity";
import { User } from "src/user/user.entity";
export declare class LikeService {
    private readonly likeRepository;
    constructor(likeRepository: Repository<Like>);
    create(note: Note, user: User): Promise<Like>;
    delete(noteId: string, userId: string): Promise<{
        deleted: boolean;
    }>;
    getUsersLiked(noteId: string): Promise<User[]>;
    likeCount(noteId: string): Promise<number>;
    isLikedByCurrentUser(noteId: string, userId: string): Promise<boolean>;
}
