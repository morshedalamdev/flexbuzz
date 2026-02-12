import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { UpdateProfileDto } from "src/profile/dto/update-profile.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateProfileDto)
  profile?: UpdateProfileDto;
}
