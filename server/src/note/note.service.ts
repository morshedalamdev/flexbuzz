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

@Injectable()
export class NoteService {
  constructor(
    private readonly userService: UserService,
    private readonly hashtagService: HashtagService,
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  public async create(noteDto: CreateNoteDto) {
    try {
      const user = await this.userService.getBy(USER_ID);
      const hashtags = await this.hashtagService.getByIds(
        noteDto.hashtags || [],
      );

      const newNote = this.noteRepository.create({
        ...noteDto,
        userRelation: user,
        hashtagRelation: hashtags,
      });
      return await this.noteRepository.save(newNote);
    } catch (error) {
      console.error("Error @note-create:", error);
      throw new RequestTimeoutException();
    }
  }

  public async getAll(user?: string) {
    let notes: Note[] | null = null;
    try {
      if (user) {
        const userEntity = await this.userService.getBy(user);
        const noteEntity = await this.noteRepository.find({
          where: { userId: userEntity.id },
          relations: ["hashtagRelation"],
        });
        notes = await Promise.all(
          noteEntity.map(async (note) => ({
            ...note,
            userRelation: userEntity,
          })),
        );
      } else {
        const noteEntity = await this.noteRepository.find({
          relations: ["hashtagRelation"],
        });
        notes = await Promise.all(
          noteEntity.map(async (note) => ({
            ...note,
            userRelation: await this.userService.getBy(note.userId),
          })),
        );
      }
    } catch (error) {
      console.error("Error @note-getAll:", error);
      throw new RequestTimeoutException();
    }

    if (!notes || notes.length === 0) {
      throw new NotFoundException();
    }
    return notes;
  }

  public async getById(id: string) {
    try {
      const note = await this.noteRepository.findOne({
        where: { id },
        relations: ["hashtagRelation"],
      });
      if (!note) {
        throw new NotFoundException("Note not found");
      }
      const user = await this.userService.getBy(note.userId);

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
      note.hashtagRelation =
        hashtags.length > 0 ? hashtags : note.hashtagRelation;

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
}
