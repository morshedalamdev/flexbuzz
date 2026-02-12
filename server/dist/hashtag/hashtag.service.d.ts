import { CreateHashtagDto } from "./dto/create-hashtag.dto";
import { Repository } from "typeorm";
import { Hashtags } from "./hashtag.entity";
export declare class HashtagService {
    private readonly hashtagRepository;
    constructor(hashtagRepository: Repository<Hashtags>);
    create(hashtagDto: CreateHashtagDto): Promise<Hashtags>;
    getHashtags(search?: string): Promise<Hashtags | Hashtags[]>;
}
