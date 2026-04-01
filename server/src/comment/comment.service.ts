import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./comment.entity";
import { CommentDto } from "./dto/comment.dto";
import { User } from "src/user/user.entity";
import { Note } from "src/note/note.entity";
import { PaginationProvider } from "src/common/pagination/pagination.provider";
import { NoteQueryDto } from "src/note/dto/note-query.dto";
import { PaginationInterface } from "src/common/pagination/pagination.interface";

type CreateType = {
  content: string;
  user: User;
  note: Note;
};

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  async create(props: CreateType) {
    try {
      const comment = this.commentRepository.create({
        content: props.content,
        user: props.user,
        note: props.note,
      });
      return await this.commentRepository.save(comment);
    } catch (error) {
      console.error("Error @comment-create:", error);
      throw new RequestTimeoutException();
    }
  }

  public async update(updateDto: CommentDto) {
    try {
      await this.commentRepository.update(updateDto.id, {
        content: updateDto.content,
      });
      return { success: true };
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

  public async getCommentsByNote(
    noteId: string,
    pageQueryDto: NoteQueryDto,
  ): Promise<PaginationInterface<Comment>> {
    try {
      return await this.paginationProvider.paginateQuery(
        pageQueryDto,
        this.commentRepository,
        { noteId },
        ["user"],
      );
    } catch (error) {
      console.error("Error @comment-getByNote:", error);
      throw new RequestTimeoutException();
    }
  }

  public async commentCount(noteId: string) {
    try {
      return await this.commentRepository.count({
        where: { noteId },
      });
    } catch (error) {
      console.error("Error @comment-commentCount:", error);
      throw new RequestTimeoutException();
    }
  }
}
