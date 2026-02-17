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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./comment.entity");
const pagination_provider_1 = require("../common/pagination/pagination.provider");
let CommentService = class CommentService {
    commentRepository;
    paginationProvider;
    constructor(commentRepository, paginationProvider) {
        this.commentRepository = commentRepository;
        this.paginationProvider = paginationProvider;
    }
    async create(props) {
        try {
            const comment = this.commentRepository.create({
                content: props.content,
                user: props.user,
                note: props.note,
            });
            return await this.commentRepository.save(comment);
        }
        catch (error) {
            console.error("Error @comment-create:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async update(updateDto) {
        try {
            await this.commentRepository.update(updateDto.id, {
                content: updateDto.content,
            });
            return { success: true };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error("Error @comment-update:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async delete(id) {
        try {
            await this.commentRepository.delete(id);
            return { deleted: true };
        }
        catch (error) {
            console.error("Error @comment-delete:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async getCommentsByNote(noteId, pageQueryDto) {
        try {
            return await this.paginationProvider.paginateQuery(pageQueryDto, this.commentRepository, { noteId }, ["user"]);
        }
        catch (error) {
            console.error("Error @comment-getByNote:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async commentCount(noteId) {
        try {
            return await this.commentRepository.count({
                where: { noteId },
            });
        }
        catch (error) {
            console.error("Error @comment-commentCount:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        pagination_provider_1.PaginationProvider])
], CommentService);
//# sourceMappingURL=comment.service.js.map