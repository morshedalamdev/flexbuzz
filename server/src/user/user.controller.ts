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
  public CreateUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  public GetUsers() {
    return this.userService.getAll();
  }

  @Get(":id")
  public GetUserById(@Param("id") id: string) {
    return this.userService.getBy(id);
  }

  @Get("/me")
  public GetCurrentUser() {
    return this.userService.getCurrent();
  }

  @Patch("/me")
  public UpdateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Delete("/me")
  public DeleteUser() {
    return this.userService.delete();
  }
}
