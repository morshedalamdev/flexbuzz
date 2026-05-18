import { HashtagService } from "./hashtag.service";
import { CreateHashtagDto } from "./dto/create-hashtag.dto";
export declare class HashtagController {
    private readonly hashtagService;
    constructor(hashtagService: HashtagService);
    CreateHashtag(createDto: CreateHashtagDto): Promise<{
        created: import("./hashtag.entity").Hashtag[];
        existing: import("./hashtag.entity").Hashtag[];
        total: import("./hashtag.entity").Hashtag[];
    }>;
    GetHashtags(query: {
        search?: string;
    }): Promise<import("./hashtag.entity").Hashtag | import("./hashtag.entity").Hashtag[]>;
}
