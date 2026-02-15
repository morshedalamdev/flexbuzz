import { Controller, Delete, Param, Post } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
     constructor(private readonly likeService: LikeService) {}

     @Post(":id")
     async GiveLike (@Param("id") id: string) {
          return this.likeService.create(id);
     }

     @Delete(":id")
     async RemoveLike (@Param("id") id: string) {
          return this.likeService.delete(id);
     }
}
