import { Inject, Injectable } from "@nestjs/common";
import type { Request } from "express";
import {
  FindManyOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from "typeorm";
import { REQUEST } from "@nestjs/core";
import { PaginationQueryDto } from "./dto/pagination-query.dto";
import { PaginationInterface } from "./pagination.interface";

@Injectable()
export class PaginationProvider {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQueryDto: PaginationQueryDto,
    repository: Repository<T>,
    where?: FindOptionsWhere<T>,
    relations?: string[],
  ): Promise<PaginationInterface<T>> {
    const currentPage = paginationQueryDto.page || 1;
    const itemsPerPage = paginationQueryDto.limit || 10;

    const findOptions: FindManyOptions<T> = {
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
    };
    if (where) {
      findOptions.where = where;
    }
    if (relations) {
      findOptions.relations = relations;
    }

    const result = await repository.find(findOptions);
    const totalItems = await repository.count(findOptions);

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
    const prevPage = currentPage === 1 ? currentPage : currentPage - 1;

    const baseUrl =
      this.request.protocol +
      "://" +
      this.request.get("host") +
      this.request.path;

    const response: PaginationInterface<T> = {
      data: result,
      meta: {
        totalItems,
        itemsPerPage,
        currentPage,
        totalPages,
      },
      links: {
        firstPage: `${baseUrl}?page=1&limit=${itemsPerPage}`,
        prevPage: `${baseUrl}?page=${prevPage}&limit=${itemsPerPage}`,
        nextPage: `${baseUrl}?page=${nextPage}&limit=${itemsPerPage}`,
        lastPage: `${baseUrl}?page=${totalPages}&limit=${itemsPerPage}`,
      },
    };
    return response;
  }
}
