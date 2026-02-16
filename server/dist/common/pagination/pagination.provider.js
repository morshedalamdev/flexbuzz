"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationProvider = void 0;
const common_1 = require("@nestjs/common");
let PaginationProvider = class PaginationProvider {
    async paginateQuery(paginationQueryDto, repository, request, where, relations) {
        const currentPage = paginationQueryDto.page || 1;
        const itemsPerPage = paginationQueryDto.limit || 10;
        const findOptions = {
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
        const baseUrl = request
            ? `${request.protocol}://${request.get("host")}${request.path}`
            : "";
        const response = {
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
};
exports.PaginationProvider = PaginationProvider;
exports.PaginationProvider = PaginationProvider = __decorate([
    (0, common_1.Injectable)()
], PaginationProvider);
//# sourceMappingURL=pagination.provider.js.map