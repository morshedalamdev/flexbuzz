import { IntersectionType } from "@nestjs/mapped-types";
import { IsOptional, IsString, IsUUID } from "class-validator";
import { PaginationQueryDto } from "src/common/pagination/dto/pagination-query.dto";

class NoteBaseDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsString()
  hashtag?: string;
}

export class NoteQueryDto extends IntersectionType(
  NoteBaseDto,
  PaginationQueryDto,
) { }