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
import { USER_ID } from "src/constants/constants";

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
        profileRelation: {},
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
      return this.userRepository.find({ relations: ["profileRelation"] });
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
          relations: ["profileRelation"],
        });
      } else {
        user = await this.userRepository.findOne({
          where: [{ username: identifier }, { email: identifier }],
          relations: ["profileRelation"],
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

  public async update(userDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: USER_ID },
        relations: ["profileRelation"],
      });
      if (!user || !user.profileRelation) {
        throw new NotFoundException("User not found");
      }
      user.username = userDto.username ?? user.username;
      user.email = userDto.email ?? user.email;
      user.profileRelation.firstName =
        userDto.profile?.firstName ?? user.profileRelation.firstName;
      user.profileRelation.lastName =
        userDto.profile?.lastName ?? user.profileRelation.lastName;
      user.profileRelation.gender =
        userDto.profile?.gender ?? user.profileRelation.gender;
      user.profileRelation.dob = userDto.profile?.dob
        ? new Date(userDto.profile.dob)
        : user.profileRelation.dob;
      user.profileRelation.bio =
        userDto.profile?.bio ?? user.profileRelation.bio;
      return await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error("Error @user-update:", error);
      throw new RequestTimeoutException();
    }
  }

  public async delete() {
    try {
      await this.userRepository.softDelete(USER_ID);
      return { deleted: true };
    } catch (error) {
      console.error("Error @user-delete:", error);
      throw new RequestTimeoutException();
    }
  }
}
