import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NoteService } from "src/note/note.service";
import { USER_ID } from "src/constants/constants";
import { UserService } from "src/user/user.service";
import { Comment } from "./comment.entity";
import { CommentDto } from "./dto/comment.dto";

@Injectable()
export class CommentService {
  constructor(
    private readonly userService: UserService,
    private readonly noteService: NoteService,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(commentDto: CommentDto) {
    try {
      const note = await this.noteService.getById(commentDto.id);
      const user = await this.userService.getBy(USER_ID);
      if (!note || !user) {
        throw new NotFoundException();
      }
      const comment = this.commentRepository.create({
        content: commentDto.content,
        userRelation: user,
        noteRelation: note,
      });
      return await this.commentRepository.save(comment);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error("Error @comment-create:", error);
      throw new RequestTimeoutException();
    }
  }

  public async update(updateDto: CommentDto) {
    try {
      await this.commentRepository.update(updateDto.id, {
        content: updateDto.content,
      });
      return {success: true};
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error("Error @comment-update:", error);
      throw new RequestTimeoutException();
    }
  }

  public async delete(id: string) {
    try {
      await this.commentRepository.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("Error @comment-delete:", error);
      throw new RequestTimeoutException();
    }
  }
}
