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
const note_service_1 = require("../note/note.service");
const constants_1 = require("../constants/constants");
const user_service_1 = require("../user/user.service");
const comment_entity_1 = require("./comment.entity");
let CommentService = class CommentService {
    userService;
    noteService;
    commentRepository;
    constructor(userService, noteService, commentRepository) {
        this.userService = userService;
        this.noteService = noteService;
        this.commentRepository = commentRepository;
    }
    async create(commentDto) {
        try {
            const note = await this.noteService.getById(commentDto.id);
            const user = await this.userService.getBy(constants_1.USER_ID);
            if (!note || !user) {
                throw new common_1.NotFoundException();
            }
            const comment = this.commentRepository.create({
                content: commentDto.content,
                userRelation: user,
                noteRelation: note,
            });
            return await this.commentRepository.save(comment);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
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
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        note_service_1.NoteService,
        typeorm_2.Repository])
], CommentService);
//# sourceMappingURL=comment.service.js.map