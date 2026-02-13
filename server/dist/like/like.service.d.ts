import { Like } from "./like.entity";
import { Repository } from "typeorm";
import { NoteService } from "src/note/note.service";
import { LikeDto } from "./dto/like.dto";
import { UserService } from "src/user/user.service";
export declare class LikeService {
    private readonly userService;
    private readonly noteService;
    private readonly likeRepository;
    constructor(userService: UserService, noteService: NoteService, likeRepository: Repository<Like>);
    create(likeDto: LikeDto): Promise<Like>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
}
