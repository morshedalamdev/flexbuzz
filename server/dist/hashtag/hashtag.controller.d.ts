import { HashtagService } from "./hashtag.service";
import { CreateHashtagDto } from "./dto/create-hashtag.dto";
export declare class HashtagController {
    private readonly hashtagService;
    constructor(hashtagService: HashtagService);
    Create(createDto: CreateHashtagDto): Promise<import("./hashtag.entity").Hashtags>;
    GetHashtags(query: {
        search?: string;
    }): Promise<import("./hashtag.entity").Hashtags | import("./hashtag.entity").Hashtags[]>;
}
