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
import { USER_ID } from "src/constants/constants";
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

  public async create(noteDto: CreateNoteDto) {
    try {
      const user = await this.userService.findBy(USER_ID);
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
  ): Promise<PaginationInterface<Note>> {
    try {
      return await this.paginationProvider.paginateQuery(
        pageQueryDto,
        this.noteRepository,
        pageQueryDto.userId ? { userId: pageQueryDto.userId } : undefined,
        ["hashtags", "user"],
      );
    } catch (error) {
      if (error.code === "ECONNREFUSED") {
        throw new RequestTimeoutException(
          "Failed to fetch users. Please try again later.",
          {
            description: "Database connection error",
          },
        );
      }
      console.error("Error creating user:", error);
      throw new RequestTimeoutException();
    }
    // let notes: Note[] | null = null;
    // try {
    //   if (user) {
    //     const userEntity = await this.userService.findBy(user);
    //     const noteEntity = await this.noteRepository.find({
    //       where: { userId: userEntity.id },
    //       relations: ["hashtags"],
    //     });
    //     notes = await Promise.all(
    //       noteEntity.map(async (note) => ({
    //         ...note,
    //         userRelation: userEntity,
    //       })),
    //     );
    //   } else {
    //     const noteEntity = await this.noteRepository.find({
    //       relations: ["hashtags"],
    //     });
    //     notes = await Promise.all(
    //       noteEntity.map(async (note) => ({
    //         ...note,
    //         userRelation: await this.userService.findBy(note.userId),
    //       })),
    //     );
    //   }
    // } catch (error) {
    //   console.error("Error @note-getAll:", error);
    //   throw new RequestTimeoutException();
    // }

    // if (!notes || notes.length === 0) {
    //   throw new NotFoundException();
    // }
    // return notes;
  }

  public async getById(id: string) {
    try {
      const note = await this.noteRepository.findOne({
        where: { id },
        relations: ["hashtags"],
      });
      if (!note) {
        throw new NotFoundException("Note not found");
      }
      const user = await this.userService.findBy(note.userId);

      return { ...note, userRelation: user };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error("Error @note-getById:", error);
      throw new RequestTimeoutException();
    }
  }

  public async update(noteDto: UpdateNoteDto) {
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
  public async like(id: string) {
    try {
      const note = await this.getById(id);
      const user = await this.userService.findBy(USER_ID);
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

  public async dislike(id: string) {
    try {
      return await this.likeService.delete(id, USER_ID);
    } catch (error) {
      console.error("Error @note-dislike:", error);
      throw new RequestTimeoutException();
    }
  }

  // COMMENT
  public async addComment(commentDto: CommentDto) {
    try {
      const note = await this.getById(commentDto.id);
      const user = await this.userService.findBy(USER_ID);
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
