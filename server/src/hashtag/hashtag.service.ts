import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from "@nestjs/common";
import { CreateHashtagDto } from "./dto/create-hashtag.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Hashtag } from "./hashtag.entity";

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
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
        return await this.hashtagRepository.findOne({
          where: { name: search },
        });
      }
      return await this.hashtagRepository.find();
    } catch (error) {
      console.error("Error @getHashtags:", error);
      throw new RequestTimeoutException();
    }
  }
}
