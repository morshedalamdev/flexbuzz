import { Module } from "@nestjs/common";
import { LikeService } from "./like.service";
import { Like } from "./like.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [],
  providers: [LikeService],
  exports: [LikeService],
  imports: [TypeOrmModule.forFeature([Like])],
})
export class LikeModule {}
