import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class ForgotPasswordResetDto {
  @IsString()
  @IsNotEmpty()
  resetToken: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(24)
  @MinLength(8)
  newPassword: string;
}
