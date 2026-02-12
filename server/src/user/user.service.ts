import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { UserExistsException } from "src/common/customException/user-exists.exception";
import { HashingProvider } from "src/auth/provider/hashing.provider";
import { isUUID } from "class-validator";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    // HashingProvider for password hashing
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
    // TypeORM repositories for User and Profile entities
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async create(userDto: CreateUserDto) {
    // username & email validation
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
      // create user
      const newUser = this.userRepository.create({
        ...userDto,
        password: await this.hashingProvider.hashPassword(userDto.password),
        profile: {},
      });
      // save user to database
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error("Error @user-create:", error);
      throw new RequestTimeoutException();
    }
  }

  public async getAll() {
    try {
      return this.userRepository.find({ relations: ["profile"] });
    } catch (error) {
      console.error("Error @user-getAll:", error);
      throw new RequestTimeoutException();
    }
  }

  public async getBy(identifier: string) {
    let user: User | null = null;
    try {
      if (isUUID(identifier)) {
        user = await this.userRepository.findOne({
          where: { id: identifier },
          relations: ["profile"],
        });
      } else {
        user = await this.userRepository.findOne({
          where: [{ username: identifier }, { email: identifier }],
          relations: ["profile"],
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

  public async getCurrent() {}

  public async update(updateUser: UpdateUserDto) {
    try {
      // const user = await this.userRepository.findOne({
      //   where: { id: userId },
      //   relations: ["profile"],
      // });
      // user.username = updateUser.username ?? user.username;
      // user.email = updateUser.email ?? user.email;
      // user.profile.firstName =
      //   updateUser.profile?.firstName ?? user.profile.firstName;
      // user.profile.lastName =
      //   updateUser.profile?.lastName ?? user.profile.lastName;
      // user.profile.gender = updateUser.profile?.gender ?? user.profile.gender;
      // user.profile.dob = updateUser.profile?.dob
      //   ? new Date(updateUser.profile.dob)
      //   : user.profile.dob;
      // user.profile.bio = updateUser.profile?.bio ?? user.profile.bio;
      // return await this.userRepository.save(user);
    } catch (error) {
      console.error("Error @user-update:", error);
      throw new RequestTimeoutException();
    }
  }

  public async delete() {
    try {
      await this.userRepository.softDelete("id");
      return { deleted: true };
    } catch (error) {
      console.error("Error @user-delete:", error);
      throw new RequestTimeoutException();
    }
  }
}
