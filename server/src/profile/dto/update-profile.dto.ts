import { IsEnum, IsOptional, IsString, MaxLength, IsDate } from "class-validator";
import { Gender } from "src/profile/profile.entity";

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  lastName?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsDate()
  dob?: Date;

  @IsOptional()
  @IsString()
  bio?: string;
}
