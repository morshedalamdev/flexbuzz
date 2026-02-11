import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public GetUsers() {
    return this.userService.getAll();
  }

  @Get(":id")
  public GetUserById(@Param("id") id: string) {
    return this.userService.getBy(id);
  }

  @Post()
  public CreateUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch()
  public UpdateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Delete(":id")
  public DeleteUser(@Param("id") id: string) {
    return this.userService.delete(id);
  }
}
