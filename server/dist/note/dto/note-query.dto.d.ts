import { PaginationQueryDto } from "src/common/pagination/dto/pagination-query.dto";
declare class NoteBaseDto {
    userId?: string;
}
declare const NoteQueryDto_base: import("@nestjs/mapped-types").MappedType<NoteBaseDto & PaginationQueryDto>;
export declare class NoteQueryDto extends NoteQueryDto_base {
}
export {};
