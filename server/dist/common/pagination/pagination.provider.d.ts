import type { Request } from "express";
import { FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";
import { PaginationQueryDto } from "./dto/pagination-query.dto";
import { PaginationInterface } from "./pagination.interface";
export declare class PaginationProvider {
    paginateQuery<T extends ObjectLiteral>(paginationQueryDto: PaginationQueryDto, repository: Repository<T>, request?: Request, where?: FindOptionsWhere<T>, relations?: string[]): Promise<PaginationInterface<T>>;
}
