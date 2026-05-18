import { IsNotEmpty, IsArray, IsString, MaxLength, ArrayNotEmpty } from "class-validator";

export class CreateHashtagDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @MaxLength(100, { each: true })
  tags: string[] = [];
}
