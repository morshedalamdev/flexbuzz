import { Injectable, RequestTimeoutException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Follow } from "./follow.entity";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
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
      console.error("Error @follow-follow:", error);
      throw new RequestTimeoutException();
    }
  }
}
