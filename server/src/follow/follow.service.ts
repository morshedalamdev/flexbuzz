import { Injectable, RequestTimeoutException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import { FollowQueryDto } from "src/user/dto/follow-query.dto";
import { PaginationProvider } from "src/common/pagination/pagination.provider";
import { Follow } from "./follow.entity";
import type { Request } from "express";

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  async follow(userToFollow: User, currentUser: User) {
    try {
      const follow = this.followRepository.create({
        follower: currentUser,
        following: userToFollow,
      });
      return await this.followRepository.save(follow);
    } catch (error) {
      console.error("Error @follow-follow:", error);
      throw new RequestTimeoutException();
    }
  }

  async unfollow(userToFollow: string, currentUser: string) {
    try {
      await this.followRepository.delete({
        followerId: currentUser,
        followingId: userToFollow,
      });
      return { deleted: true };
    } catch (error) {
      console.error("Error @follow-unfollow:", error);
      throw new RequestTimeoutException();
    }
  }

  public async getFollows(followDto: FollowQueryDto, request?: Request) {
    try {
      return await this.paginationProvider.paginateQuery(
        followDto,
        this.followRepository,
        request ? request : undefined,
        followDto.followerId
          ? { followerId: followDto.followerId }
          : { followingId: followDto.followingId },
      );
    } catch (error) {
      if (error.code === "ECONNREFUSED") {
        throw new RequestTimeoutException(
          "Failed to fetch users. Please try again later.",
          {
            description: "Database connection error",
          },
        );
      }
      console.error("Error @follow-getFollows:", error);
      throw new RequestTimeoutException();
    }
  }
}
