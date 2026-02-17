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
exports.LikeService = void 0;
const common_1 = require("@nestjs/common");
const like_entity_1 = require("./like.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let LikeService = class LikeService {
    likeRepository;
    constructor(likeRepository) {
        this.likeRepository = likeRepository;
    }
    async create(note, user) {
        try {
            const like = this.likeRepository.create({
                user,
                note,
            });
            return await this.likeRepository.save(like);
        }
        catch (error) {
            if (error.code === "23505") {
                throw new common_1.ConflictException();
            }
            console.error("Error @like-create:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async delete(noteId, userId) {
        try {
            await this.likeRepository.delete({ noteId, userId });
            return { deleted: true };
        }
        catch (error) {
            console.error("Error @like-delete:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async getUsersLiked(noteId) {
        try {
            const likes = await this.likeRepository.find({
                where: { noteId },
                relations: ["user"],
                order: { createdAt: "DESC" },
            });
            return likes.map((like) => like.user);
        }
        catch (error) {
            console.error("Error @like-getUsersWhoLiked:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async likeCount(noteId) {
        try {
            return await this.likeRepository.count({
                where: { noteId },
            });
        }
        catch (error) {
            console.error("Error @like-getLikeCount:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async isLikedByCurrentUser(noteId, userId) {
        try {
            const like = await this.likeRepository.findOne({
                where: { noteId, userId },
            });
            return !!like;
        }
        catch (error) {
            console.error("Error @like-isLikedByCurrentUser:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
};
exports.LikeService = LikeService;
exports.LikeService = LikeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(like_entity_1.Like)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LikeService);
//# sourceMappingURL=like.service.js.map