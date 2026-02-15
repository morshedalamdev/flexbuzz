import { Module } from "@nestjs/common";
import { FollowService } from "./follow.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Follow } from "./follow.entity";

@Module({
  controllers: [],
  providers: [FollowService],
  exports: [FollowService],
  imports: [TypeOrmModule.forFeature([Follow])],
})
export class FollowModule {}
