import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from "@nestjs/common";
import { CreateHashtagDto } from "./dto/create-hashtag.dto";
import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Hashtag } from "./hashtag.entity";

const normalizeHashtagTag = (tag: string) => {
  const trimmedTag = tag.trim();

  if (trimmedTag.length === 0) {
    return trimmedTag;
  }

  return `${trimmedTag.slice(0, 1).toLowerCase()}${trimmedTag.slice(1)}`;
};

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) { }

  public async create(hashtagDto: CreateHashtagDto) {
    const createdHashtags: Hashtag[] = [];
    const existingHashtags: Hashtag[] = [];

    try {
      for (const tag of hashtagDto.tags) {
        const normalizedTag = normalizeHashtagTag(tag);

        const isExist = await this.hashtagRepository
          .createQueryBuilder("hashtag")
          .where(
            "CONCAT(LOWER(LEFT(hashtag.tag, 1)), SUBSTRING(hashtag.tag, 2)) = :tag",
            { tag: normalizedTag },
          )
          .getOne();

        if (isExist) {
          existingHashtags.push(isExist);
        } else {
          const hashtag = this.hashtagRepository.create({ tag: normalizedTag });
          const savedHashtag = await this.hashtagRepository.save(hashtag);
          createdHashtags.push(savedHashtag);
        }
      }

      return {
        created: createdHashtags,
        existing: existingHashtags,
        total: [...createdHashtags, ...existingHashtags],
      };
    } catch (error) {
      console.error("Error @hashtag-create:", error);
      throw new RequestTimeoutException();
    }
  }

  public async incrementCounts(hashtagIds: string[]) {
    try {
      const uniqueIds = [...new Set(hashtagIds)].filter(Boolean);

      if (uniqueIds.length === 0) {
        return;
      }

      await this.hashtagRepository
        .createQueryBuilder()
        .update(Hashtag)
        .set({ count: () => "count + 1" })
        .where("id IN (:...ids)", { ids: uniqueIds })
        .execute();
    } catch (error) {
      console.error("Error @incrementCounts:", error);
      throw new RequestTimeoutException();
    }
  }

  public async getHashtags(search?: string) {
    try {
      if (search) {
        const normalizedSearch = normalizeHashtagTag(search);
        const response = await this.hashtagRepository
          .createQueryBuilder("hashtag")
          .where(
            "CONCAT(LOWER(LEFT(hashtag.tag, 1)), SUBSTRING(hashtag.tag, 2)) = :tag",
            { tag: normalizedSearch },
          )
          .getOne();
        if (!response) {
          throw new NotFoundException("Hashtag not found");
        }

        return response;
      }
      const response = await this.hashtagRepository.find();
      if (response.length === 0) {
        throw new NotFoundException("Hashtag not found");
      }

      return response;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error("Error @getHashtags:", error);
      throw new RequestTimeoutException();
    }
  }

  public async getByIds(hashtags: string[]) {
    try {
      return await this.hashtagRepository.find({
        where: { id: In(hashtags) },
      });
    } catch (error) {
      console.error("Error @getByIds:", error);
      throw new RequestTimeoutException();
    }
  }
}
