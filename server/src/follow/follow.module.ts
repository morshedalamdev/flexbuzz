import { PaginationModule } from './../common/pagination/pagination.module';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Follow } from "./follow.entity";
import { FollowService } from './follow.service';

@Module({
  controllers: [],
  providers: [FollowService],
  exports: [FollowService],
  imports: [PaginationModule,TypeOrmModule.forFeature([Follow])],
})
export class FollowModule {}
