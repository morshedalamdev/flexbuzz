import { PaginationQueryDto } from "src/common/pagination/dto/pagination-query.dto";
declare class FollowBaseDto {
    followerId?: string;
    followingId?: string;
}
declare const FollowQueryDto_base: import("@nestjs/mapped-types").MappedType<PaginationQueryDto & FollowBaseDto>;
export declare class FollowQueryDto extends FollowQueryDto_base {
}
export {};
