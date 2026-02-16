import { IntersectionType } from "@nestjs/mapped-types";
import { IsOptional, IsUUID } from "class-validator";
import { PaginationQueryDto } from "src/common/pagination/dto/pagination-query.dto";

class FollowBaseDto {
  @IsOptional()
  @IsUUID()
  followerId?: string;
  
  @IsOptional()
  @IsUUID()
  followingId?: string;
}

export class FollowQueryDto extends IntersectionType(
  FollowBaseDto,
  PaginationQueryDto,
) {}
