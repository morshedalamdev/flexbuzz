"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationProvider = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let PaginationProvider = class PaginationProvider {
    request;
    constructor(request) {
        this.request = request;
    }
    async paginateQuery(paginationQueryDto, repository, where, relations) {
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
        const baseUrl = this.request.protocol +
            "://" +
            this.request.get("host") +
            this.request.path;
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
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object])
], PaginationProvider);
//# sourceMappingURL=pagination.provider.js.map