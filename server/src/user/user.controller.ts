import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public CreateUser(@Body() createDto: CreateUserDto) {
    return this.userService.create(createDto);
  }

  @Get()
  public GetUsers() {
    return this.userService.findAll();
  }

  // CURRENT USER
  @Get("/me")
  public GetCurrUser() {
    return this.userService.current();
  }

  @Patch("/me")
  public UpdateCurrUser(@Body() updateDto: UpdateUserDto) {
    return this.userService.update(updateDto);
  }

  @Delete("/me")
  public DeleteCurrUser() {
    return this.userService.delete();
  }

  @Get(":id")
  public GetUserById(@Param("id") id: string) {
    return this.userService.findBy(id);
  }

  // FOLLOW
  @Post(":id/follow")
  public FollowUser(@Param("id") id: string) {
    return this.userService.follow(id);
  }

  @Delete(":id/unfollow")
  public UnfollowUser(@Param("id") id: string) {
    return this.userService.unfollow(id);
  }
}
