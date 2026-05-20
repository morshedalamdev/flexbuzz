import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class ForgotPasswordVerifyDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(24)
  username: string;
}
