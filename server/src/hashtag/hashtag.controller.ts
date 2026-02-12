import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { HashtagService } from "./hashtag.service";
import { CreateHashtagDto } from "./dto/create-hashtag.dto";

@Controller("hashtag")
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Post()
  async CreateHashtag(@Body() createDto: CreateHashtagDto) {
    return this.hashtagService.create(createDto);
  }

  @Get()
  async GetHashtags(@Query() query: { search?: string }) {
    return this.hashtagService.getHashtags(query.search);
  }
}
