import { CreateHashtagDto } from "./dto/create-hashtag.dto";
import { Repository } from "typeorm";
import { Hashtag } from "./hashtag.entity";
export declare class HashtagService {
    private readonly hashtagRepository;
    constructor(hashtagRepository: Repository<Hashtag>);
    create(hashtagDto: CreateHashtagDto): Promise<{
        created: Hashtag[];
        existing: Hashtag[];
        total: Hashtag[];
    }>;
    incrementCounts(hashtagIds: string[]): Promise<void>;
    getHashtags(search?: string): Promise<Hashtag | Hashtag[]>;
    getByIds(hashtags: string[]): Promise<Hashtag[]>;
}
