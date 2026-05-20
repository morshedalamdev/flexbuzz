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
import { ILike } from "typeorm";
import { toPublicUser } from "./utils/public-user.util";

type FindUserOptions = {
  includePassword?: boolean;
  includeStats?: boolean;
  sanitize?: boolean;
};

const AUTH_USER_SELECT = {
  id: true,
  username: true,
  email: true,
  password: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
} as const;

@Injectable()
export class UserService {
  constructor(
    private readonly followService: FollowService,
    private readonly paginationProvider: PaginationProvider,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  public async findAll(
    paginationQueryDto: PaginationQueryDto & { search?: string },
    userId: string,
  ): Promise<PaginationInterface<User>> {
    try {
      const search = paginationQueryDto.search?.trim().replace(/^@/, "");

      const users = await this.paginationProvider.paginateQuery(
        paginationQueryDto,
        this.userRepository,
        search ? { username: ILike(`%${search}%`) } : undefined,
      );
      const usersWithCounts = await Promise.all(
        users.data.map(async (user) => {
          const followerCount = await this.followService.followerCount(user.id);
          const followingCount = await this.followService.followingCount(
            user.id,
          );
          const isFollowed =
            await this.followService.isFollowed(user.id, userId);
          return {
            ...toPublicUser(user),
            followerCount,
            followingCount,
            isFollowed,
          };
        }),
      );
      return { ...users, data: usersWithCounts };
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

  public async findBy(
    identifier: string,
    userId?: string,
    options: FindUserOptions = {},
  ) {
    const {
      includePassword = false,
      includeStats = true,
      sanitize = true,
    } = options;
    let user: User | null = null;
    try {
      if (isUUID(identifier)) {
        user = await this.userRepository.findOne({
          where: { id: identifier },
          ...(includePassword && {
            select: AUTH_USER_SELECT,
          }),
        });
      } else {
        user = await this.userRepository.findOne({
          where: [{ username: identifier }, { email: identifier }],
          ...(includePassword && {
            select: AUTH_USER_SELECT,
          }),
        });
      }
    } catch (error) {
      console.error("Error @user-getBy:", error);
      throw new RequestTimeoutException();
    }

    if (!user) {
      throw new NotFoundException(`User with '${identifier}' not found.`);
    }

    if (!includeStats) {
      return sanitize ? toPublicUser(user) : user;
    }

    const followerCount = await this.followService.followerCount(user.id);
    const followingCount = await this.followService.followingCount(user.id);
    const userWithStats = userId
      ? {
          ...user,
          followerCount,
          followingCount,
          isFollowed: await this.followService.isFollowed(user.id, userId),
        }
      : { ...user, followerCount, followingCount };

    return sanitize ? toPublicUser(userWithStats) : userWithStats;
  }

  public async findForAuth(identifier: string): Promise<User> {
    return (await this.findBy(identifier, undefined, {
      includePassword: true,
      includeStats: false,
      sanitize: false,
    })) as User;
  }

  // CURRENT USER
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

      if (userDto.username && userDto.username !== user.username) {
        const isUsernameExist = await this.userRepository.findOne({
          where: { username: userDto.username },
          withDeleted: true,
        });
        if (isUsernameExist) {
          throw new UserExistsException("username", userDto.username);
        }
      }

      if (userDto.email && userDto.email !== user.email) {
        const isEmailExist = await this.userRepository.findOne({
          where: { email: userDto.email },
          withDeleted: true,
        });
        if (isEmailExist) {
          throw new UserExistsException("email", userDto.email);
        }
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
      const updatedUser = await this.userRepository.save(user);
      return toPublicUser(updatedUser);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof UserExistsException) {
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
      const userToFollow = await this.findBy(id, undefined, {
        includeStats: false,
        sanitize: false,
      });
      const currentUser = await this.findBy(userId, undefined, {
        includeStats: false,
        sanitize: false,
      });
      if (!userToFollow || !currentUser) {
        throw new NotFoundException("User not found");
      }
      await this.followService.follow(userToFollow, currentUser);
      return { success: true };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error("Error @user-follow:", error);
      throw new RequestTimeoutException();
    }
  }

  public async unfollow(id: string, userId: string) {
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
    if (!followDto.followingId) {
      followDto.followingId = userId;
    }
    try {
      const res = await this.followService.getFollows(followDto);

      // Unwrap follow relations to return plain users with isFollowed flag
      const users = await Promise.all(
        res.data.map(async (f) => {
          const u = f.follower;
          if (!u) return null;
          const isFollowed = await this.followService.isFollowed(u.id, userId);
          return { ...toPublicUser(u), isFollowed };
        }),
      );
      return { ...res, data: users.filter((u) => u !== null) };
    } catch (error) {
      console.error("Error @user-getFollowers:", error);
      throw new RequestTimeoutException();
    }
  }

  public async getFollowing(followDto: FollowQueryDto, userId: string) {
    if (!followDto.followerId) {
      followDto.followerId = userId;
    }
    try {
      const res = await this.followService.getFollowing(followDto);

      const users = await Promise.all(
        res.data.map(async (f) => {
          const u = f.following;
          if (!u) return null;
          const isFollowed = await this.followService.isFollowed(u.id, userId);
          return { ...toPublicUser(u), isFollowed };
        }),
      );

      return { ...res, data: users.filter((u) => u !== null) };
    } catch (error) {
      console.error("Error @user-getFollowing:", error);
      throw new RequestTimeoutException();
    }
  }
}
