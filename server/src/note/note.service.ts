import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from "@nestjs/common";
import { CreateNoteDto } from "./dto/create-note.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Note } from "./note.entity";
import { UserService } from "src/user/user.service";
import { HashtagService } from "src/hashtag/hashtag.service";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { LikeService } from "src/like/like.service";
import { CommentDto } from "src/comment/dto/comment.dto";
import { CommentService } from "src/comment/comment.service";
import { NoteQueryDto } from "./dto/note-query.dto";
import { PaginationInterface } from "src/common/pagination/pagination.interface";
import { PaginationProvider } from "src/common/pagination/pagination.provider";

@Injectable()
export class NoteService {
  constructor(
    private readonly userService: UserService,
    private readonly hashtagService: HashtagService,
    private readonly likeService: LikeService,
    private readonly commentService: CommentService,
    private readonly paginationProvider: PaginationProvider,
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  public async create(noteDto: CreateNoteDto, userId: string) {
    try {
      const user = await this.userService.findBy(userId);
      const hashtags = await this.hashtagService.getByIds(
        noteDto.hashtags || [],
      );

      const newNote = this.noteRepository.create({
        ...noteDto,
        user,
        hashtags,
      });
      return await this.noteRepository.save(newNote);
    } catch (error) {
      console.error("Error @note-create:", error);
      throw new RequestTimeoutException();
    }
  }

  public async getAll(
    pageQueryDto: NoteQueryDto,
    userId: string,
  ): Promise<PaginationInterface<Note>> {
    try {
      const notes = await this.paginationProvider.paginateQuery(
        pageQueryDto,
        this.noteRepository,
        pageQueryDto.userId ? { userId: pageQueryDto.userId } : undefined,
        ["hashtags", "user"],
      );
      const notesWithCounts = await Promise.all(
        notes.data.map(async (note) => {
          const likeCount = await this.likeService.likeCount(note.id);
          const commentCount = await this.commentService.commentCount(note.id);
          const isLikedByCurrentUser = await this.likeService.isLikedByCurrentUser(note.id, userId);
          return { ...note, likeCount, commentCount, isLikedByCurrentUser };
        }),
      );
      return { ...notes, data: notesWithCounts };
    } catch (error) {
      if (error.code === "ECONNREFUSED") {
        throw new RequestTimeoutException(
          "Failed to fetch notes. Please try again later.",
          {
            description: "Database connection error",
          },
        );
      }
      console.error("Error @note-getAll:", error);
      throw new RequestTimeoutException();
    }
  }

  public async getById(id: string, userId?: string) {
    try {
      const note = await this.noteRepository.findOne({
        where: { id },
        relations: ["hashtags", "user"],
      });
      if (!note) {
        throw new NotFoundException("Note not found");
      }
      if (!userId) {
        return note;
      }

      const likeCount = await this.likeService.likeCount(id);
      const commentCount = await this.commentService.commentCount(id);
      const isLikedByCurrentUser = await this.likeService.isLikedByCurrentUser(id,userId,);
      return { ...note, likeCount, commentCount, isLikedByCurrentUser };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error("Error @note-getById:", error);
      throw new RequestTimeoutException();
    }
  }

  public async update(noteDto: UpdateNoteDto, userId: string) {
    try {
      const note = await this.noteRepository.findOne({
        where: { id: String(noteDto.id) },
      });
      if (!note) {
        throw new NotFoundException("Note not found");
      }

      const hashtags = await this.hashtagService.getByIds(
        noteDto.hashtags || [],
      );
      note.content = noteDto.content || note.content;
      note.hashtags = hashtags.length > 0 ? hashtags : note.hashtags;

      return await this.noteRepository.save(note);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error("Error @note-update:", error);
      throw new RequestTimeoutException();
    }
  }

  public async delete(id: string) {
    try {
      await this.noteRepository.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("Error @note-delete:", error);
      throw new RequestTimeoutException();
    }
  }

  // LIKE
  public async getLikes(id: string) {
    return await this.likeService.getUsersLiked(id);
  }

  public async like(id: string, userId: string) {
    try {
      const note = await this.getById(id);
      const user = await this.userService.findBy(userId);
      if (!note || !user) {
        throw new NotFoundException();
      }
      return await this.likeService.create(note, user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error("Error @note-like:", error);
      throw new RequestTimeoutException();
    }
  }

  public async dislike(id: string, userId: string) {
    try {
      return await this.likeService.delete(id, userId);
    } catch (error) {
      console.error("Error @note-dislike:", error);
      throw new RequestTimeoutException();
    }
  }

  // COMMENT
  public async getComments(id: string, pageQueryDto: NoteQueryDto) {
    return await this.commentService.getCommentsByNote(id, pageQueryDto);
  }

  public async addComment(commentDto: CommentDto, userId: string) {
    try {
      const note = await this.getById(commentDto.id);
      const user = await this.userService.findBy(userId);
      if (!note || !user) {
        throw new NotFoundException();
      }
      return await this.commentService.create({
        content: commentDto.content,
        note,
        user,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error("Error @note-addComment:", error);
      throw new RequestTimeoutException();
    }
  }

  public async updateComment(commentDto: CommentDto) {
    try {
      return await this.commentService.update(commentDto);
    } catch (error) {
      console.error("Error @note-updateComment:", error);
      throw new RequestTimeoutException();
    }
  }

  public async deleteComment(id: string) {
    try {
      return await this.commentService.delete(id);
    } catch (error) {
      console.error("Error @note-deleteComment:", error);
      throw new RequestTimeoutException();
    }
  }
}
