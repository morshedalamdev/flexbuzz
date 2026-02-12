import {
  ConflictException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from "@nestjs/common";
import { CreateHashtagDto } from "./dto/create-hashtag.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Hashtags } from "./hashtag.entity";

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtags)
    private readonly hashtagRepository: Repository<Hashtags>,
  ) {}

  public async create(hashtagDto: CreateHashtagDto) {
    const isExist = await this.hashtagRepository.findOne({
      where: { name: hashtagDto.name },
    });
    if (isExist) {
      throw new ConflictException("Hashtag already exists");
    }
    try {
      const hashtag = this.hashtagRepository.create(hashtagDto);
      return await this.hashtagRepository.save(hashtag);
    } catch (error) {
      console.error("Error @hashtag-create:", error);
      throw new RequestTimeoutException();
    }
  }

  public async getHashtags(search?: string) {
    try {
      if (search) {
        const response = await this.hashtagRepository.findOne({
          where: { name: search },
        });
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
}
