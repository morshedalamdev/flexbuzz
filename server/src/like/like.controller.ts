import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeDto } from './dto/like.dto';

@Controller('like')
export class LikeController {
     constructor(private readonly likeService: LikeService) {}

     @Post()
     async GiveLike (@Body() likeDto: LikeDto) {
          return this.likeService.create(likeDto);
     }

     @Delete(":id")
     async RemoveLike (@Param("id") id: string) {
          return this.likeService.delete(id);
     }
}
