import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsEmail, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { UpdateProfileDto } from "src/profile/dto/update-profile.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateProfileDto)
  profile?: UpdateProfileDto;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
