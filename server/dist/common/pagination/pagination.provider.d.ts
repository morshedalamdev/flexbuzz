import type { Request } from "express";
import { FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";
import { PaginationQueryDto } from "./dto/pagination-query.dto";
import { PaginationInterface } from "./pagination.interface";
export declare class PaginationProvider {
    private readonly request;
    constructor(request: Request);
    paginateQuery<T extends ObjectLiteral>(paginationQueryDto: PaginationQueryDto, repository: Repository<T>, where?: FindOptionsWhere<T>, relations?: string[]): Promise<PaginationInterface<T>>;
}
