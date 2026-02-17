import { Injectable, RequestTimeoutException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import { FollowQueryDto } from "src/user/dto/follow-query.dto";
import { PaginationProvider } from "src/common/pagination/pagination.provider";
import { Follow } from "./follow.entity";

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

  public async getFollows(followDto: FollowQueryDto) {
    try {
      return await this.paginationProvider.paginateQuery(
        followDto,
        this.followRepository,
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

  public async followerCount(userId: string) {
    try {
      return await this.followRepository.count({
        where: { followingId: userId },
      });
    } catch (error) {
      console.error("Error @follow-followerCount:", error);
      throw new RequestTimeoutException();
    }
  }

  public async followingCount(userId: string) {
    try {
      return await this.followRepository.count({
        where: { followerId: userId },
      });
    } catch (error) {
      console.error("Error @follow-followingCount:", error);
      throw new RequestTimeoutException();
    }
  }

  public async isFollowedByCurrentUser(userId: string, currentUserId: string) {
    try {
      const follow = await this.followRepository.findOne({
        where: {
          followerId: currentUserId,
          followingId: userId,
        },
      });
      return !!follow;
    } catch (error) {
      console.error("Error @follow-isFollowedByCurrentUser:", error);
      throw new RequestTimeoutException();
    }
  }
}
