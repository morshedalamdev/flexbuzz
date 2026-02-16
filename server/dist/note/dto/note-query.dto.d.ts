import { PaginationQueryDto } from "src/common/pagination/dto/pagination-query.dto";
declare class NoteBaseDto {
    startDate?: Date;
    endDate?: Date;
    userId?: string;
}
declare const NoteQueryDto_base: import("@nestjs/mapped-types").MappedType<PaginationQueryDto & NoteBaseDto>;
export declare class NoteQueryDto extends NoteQueryDto_base {
}
export {};
