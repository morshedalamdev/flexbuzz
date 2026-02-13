import { Module } from "@nestjs/common";
import { LikeController } from "./like.controller";
import { LikeService } from "./like.service";
import { Like } from "./like.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [LikeController],
  providers: [LikeService],
  imports: [TypeOrmModule.forFeature([Like])],
})
export class LikeModule {}
