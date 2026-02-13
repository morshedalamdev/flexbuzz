import {
     ConflictException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from "@nestjs/common";
import { Like } from "./like.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NoteService } from "src/note/note.service";
import { USER_ID } from "src/constants/constants";
import { UserService } from "src/user/user.service";

@Injectable()
export class LikeService {
  constructor(
    private readonly userService: UserService,
    private readonly noteService: NoteService,
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async create(id: string) {
    try {
      const note = await this.noteService.getById(id);
      const user = await this.userService.getBy(USER_ID);
      if (!note || !user) {
        throw new NotFoundException();
      }
      const like = this.likeRepository.create({
        userRelation: user,
        noteRelation: note,
      });
      return await this.likeRepository.save(like);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if(error.code === "23505") {
          throw new ConflictException();
      }
      console.error("Error @like-create:", error);
      throw new RequestTimeoutException();
    }
  }

  public async delete(id: string) {
    try {
      await this.likeRepository.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("Error @like-delete:", error);
      throw new RequestTimeoutException();
    }
  }
}
