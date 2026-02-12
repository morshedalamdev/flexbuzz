import { CreateHashtagDto } from "./dto/create-hashtag.dto";
import { Repository } from "typeorm";
import { Hashtag } from "./hashtag.entity";
export declare class HashtagService {
    private readonly hashtagRepository;
    constructor(hashtagRepository: Repository<Hashtag>);
    create(hashtagDto: CreateHashtagDto): Promise<Hashtag>;
    getHashtags(search?: string): Promise<Hashtag | Hashtag[] | null>;
}
