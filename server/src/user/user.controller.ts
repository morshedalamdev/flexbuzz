import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public CreateUser(@Body() createDto: CreateUserDto) {
    return this.userService.create(createDto);
  }

  @Get()
  public GetUsers() {
    return this.userService.getAll();
  }

  @Get(":id")
  public GetUserById(@Param("id") id: string) {
    return this.userService.getBy(id);
  }
}
