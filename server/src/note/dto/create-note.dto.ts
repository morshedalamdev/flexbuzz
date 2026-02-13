import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  hashtags?: string[];
}
