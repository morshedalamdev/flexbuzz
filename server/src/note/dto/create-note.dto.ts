import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  hashtags?: string[];
}
