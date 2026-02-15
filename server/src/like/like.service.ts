import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from "@nestjs/common";
import { Like } from "./like.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Note } from "src/note/note.entity";
import { User } from "src/user/user.entity";

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async create(note: Note, user: User) {
    try {
      const like = this.likeRepository.create({
        user,
        note,
      });
      return await this.likeRepository.save(like);
    } catch (error) {
      if(error.code === "23505") {
          throw new ConflictException();
      }
      console.error("Error @like-create:", error);
      throw new RequestTimeoutException();
    }
  }

  public async delete(noteId: string, userId: string) {
    try {
      await this.likeRepository.delete({ noteId, userId });
      return { deleted: true };
    } catch (error) {
      console.error("Error @like-delete:", error);
      throw new RequestTimeoutException();
    }
  }
}
