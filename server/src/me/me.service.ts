import { Injectable } from "@nestjs/common";
import { USER_ID } from "src/constants/constants";
import { UpdateUserDto } from "src/user/dto/update-user.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class MeService {
  constructor(private readonly userService: UserService) {}

  public async find() {
    return await this.userService.getBy(USER_ID);
  }

  public async update(updateDto: UpdateUserDto) {
    return await this.userService.update(updateDto);
  }

  public async delete() {
    return await this.userService.delete();
  }
}
