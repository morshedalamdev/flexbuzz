import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import type { Request } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PaginationQueryDto } from "src/common/pagination/dto/pagination-query.dto";
import { FollowQueryDto } from "./dto/follow-query.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public CreateUser(@Body() createDto: CreateUserDto) {
    return this.userService.create(createDto);
  }

  @Get()
  public GetUsers(@Query() pageQueryDto: PaginationQueryDto, @Req() req: Request) {
    return this.userService.findAll(pageQueryDto, req);
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
  @Get("/followers")
  public GetFollowers(@Query() pageQueryDto: FollowQueryDto) {
    return this.userService.getFollowers(pageQueryDto);
  }
  
  @Get("/following")
  public GetFollowing(@Query() pageQueryDto: FollowQueryDto) {
    return this.userService.getFollowing(pageQueryDto);
  }

  @Post(":id/follow")
  public FollowUser(@Param("id") id: string) {
    return this.userService.follow(id);
  }

  @Delete(":id/unfollow")
  public UnfollowUser(@Param("id") id: string) {
    return this.userService.unfollow(id);
  }
}
