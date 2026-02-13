import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsUUID("4", { each: true })
  @IsArray()
  hashtags?: string[];
}
