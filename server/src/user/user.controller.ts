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
  public UpdateUser(@Body() updateDto: UpdateUserDto) {
    return this.userService.update(updateDto);
  }

  @Delete("/me")
  public DeleteUser() {
    return this.userService.delete();
  }
}
