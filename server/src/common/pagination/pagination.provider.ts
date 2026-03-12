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

    const options: FindManyOptions<T> = {
      ...(where && { where }),
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
      order: { createdAt: "DESC"} as any,
    }

    if(relations && relations.length > 0) {
      options.relations = relations.reduce((acc, rel) => {
        (acc as any)[rel] = true;
        return acc;
      }, {} as any)
    }

    const [result, totalItems] = await repository.findAndCount(options);
    const totalPages = totalItems === 0 ? 1 : Math.ceil(totalItems / itemsPerPage);

    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;

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
