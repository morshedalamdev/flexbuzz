import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { UserExistsException } from "src/common/customException/user-exists.exception";
import { isUUID } from "class-validator";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PaginationProvider } from "src/common/pagination/pagination.provider";
import { PaginationQueryDto } from "src/common/pagination/dto/pagination-query.dto";
import { PaginationInterface } from "src/common/pagination/pagination.interface";
import { FollowQueryDto } from "./dto/follow-query.dto";
import { FollowService } from "src/follow/follow.service";

@Injectable()
export class UserService {
  constructor(
    private readonly followService: FollowService,
    private readonly paginationProvider: PaginationProvider,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async create(userDto: CreateUserDto) {
    const isUsernameExist = await this.userRepository.findOne({
      where: { username: userDto.username },
      withDeleted: true,
    });
    if (isUsernameExist) {
      throw new UserExistsException("username", userDto.username);
    }
    const isEmailExist = await this.userRepository.findOne({
      where: { email: userDto.email },
      withDeleted: true,
    });
    if (isEmailExist) {
      throw new UserExistsException("email", userDto.email);
    }
    try {
      const newUser = this.userRepository.create({
        ...userDto,
        profile: {},
      });
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error("Error @user-create:", error);
      throw new RequestTimeoutException();
    }
  }

  public async findAll(
    paginationQueryDto: PaginationQueryDto,
  ): Promise<PaginationInterface<User>> {
    try {
      return await this.paginationProvider.paginateQuery(
        paginationQueryDto,
        this.userRepository,
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
      console.error("Error @user-getAll:", error);
      throw new RequestTimeoutException();
    }
  }

  public async findBy(identifier: string) {
    let user: User | null = null;
    try {
      if (isUUID(identifier)) {
        user = await this.userRepository.findOne({
          where: { id: identifier },
        });
      } else {
        user = await this.userRepository.findOne({
          where: [{ username: identifier }, { email: identifier }],
        });
      }
    } catch (error) {
      console.error("Error @user-getBy:", error);
      throw new RequestTimeoutException();
    }

    if (!user) {
      throw new NotFoundException(`User with '${identifier}' not found.`);
    }
    return user;
  }

  // CURRENT USER
  public async current(userId: string) {
    return await this.findBy(userId);
  }

  public async update(userDto: UpdateUserDto, userId: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ["profile"],
      });
      if (!user || !user.profile) {
        throw new NotFoundException("User not found");
      }
      user.username = userDto.username ?? user.username;
      user.email = userDto.email ?? user.email;
      user.profile.firstName =
        userDto.profile?.firstName ?? user.profile.firstName;
      user.profile.lastName =
        userDto.profile?.lastName ?? user.profile.lastName;
      user.profile.gender = userDto.profile?.gender ?? user.profile.gender;
      user.profile.dob = userDto.profile?.dob
        ? new Date(userDto.profile.dob)
        : user.profile.dob;
      user.profile.bio = userDto.profile?.bio ?? user.profile.bio;
      return await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error("Error @user-update:", error);
      throw new RequestTimeoutException();
    }
  }

  public async delete(userId: string) {
    try {
      await this.userRepository.softDelete(userId);
      return { deleted: true };
    } catch (error) {
      console.error("Error @user-delete:", error);
      throw new RequestTimeoutException();
    }
  }

  // FOLLOW
  public async follow(id: string, userId: string) {
    try {
      const userToFollow = await this.findBy(id);
      const currentUser = await this.findBy(userId);
      if (!userToFollow || !currentUser) {
        throw new NotFoundException("User not found");
      }
      return await this.followService.follow(userToFollow, currentUser);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error("Error @user-follow:", error);
      throw new RequestTimeoutException();
    }
  }

  public async unfollow(id: string, userId: string  ) {
    try {
      return await this.followService.unfollow(id, userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error("Error @user-unfollow:", error);
      throw new RequestTimeoutException();
    }
  }

  public async getFollowers(followDto: FollowQueryDto, userId: string) {
    if(!followDto.followingId){
      followDto.followingId = userId;
    }
    try {
      return await this.followService.getFollows(followDto);
    } catch (error) {
      console.error("Error @user-getFollowers:", error);
      throw new RequestTimeoutException();
    }
  }

  public async getFollowing(followDto: FollowQueryDto, userId: string) {
    if(!followDto.followerId){
      followDto.followerId = userId;
    }
    try {
      return await this.followService.getFollows(followDto);
    } catch (error) {
      console.error("Error @user-getFollowing:", error);
      throw new RequestTimeoutException();
    }
  }
}
