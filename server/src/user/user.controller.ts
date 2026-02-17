import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PaginationQueryDto } from "src/common/pagination/dto/pagination-query.dto";
import { FollowQueryDto } from "./dto/follow-query.dto";
import { ActiveUser } from "src/auth/decorator/active-user.decorator";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // FOLLOW
  @Get("/followers")
  public GetFollowers(
    @Query() pageQueryDto: FollowQueryDto,
    @ActiveUser('sub') userId: string
  ) {
    return this.userService.getFollowers(pageQueryDto, userId);
  }

  @Get("/following")
  public GetFollowing(
    @Query() pageQueryDto: FollowQueryDto,
    @ActiveUser('sub') userId: string
  ) {
    return this.userService.getFollowing(pageQueryDto, userId);
  }

  @Post(":id/follow")
  public FollowUser(@Param("id") id: string, @ActiveUser('sub') userId: string) {
    return this.userService.follow(id, userId);
  }

  @Delete(":id/unfollow")
  public UnfollowUser(@Param("id") id: string, @ActiveUser('sub') userId: string) {
    return this.userService.unfollow(id, userId);
  }

  // CURRENT USER
  @Get("/me")
  public GetCurrUser(@ActiveUser('sub') userId: string) {
    return this.userService.current(userId);
  }

  @Patch("/me")
  public UpdateCurrUser(@Body() updateDto: UpdateUserDto, @ActiveUser('sub') userId: string) {
    return this.userService.update(updateDto, userId);
  }

  @Delete("/me")
  public DeleteCurrUser(@ActiveUser('sub') userId: string) {
    return this.userService.delete(userId);
  }

  // ROOT
  @Get()
  public GetUsers(
    @Query() pageQueryDto: PaginationQueryDto,
  ) {
    return this.userService.findAll(pageQueryDto);
  }

  @Get(":id")
  public GetUserById(@Param("id") id: string) {
    return this.userService.findBy(id);
  }
}
