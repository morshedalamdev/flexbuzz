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
const note_service_1 = require("../note/note.service");
const constants_1 = require("../constants/constants");
const user_service_1 = require("../user/user.service");
let LikeService = class LikeService {
    userService;
    noteService;
    likeRepository;
    constructor(userService, noteService, likeRepository) {
        this.userService = userService;
        this.noteService = noteService;
        this.likeRepository = likeRepository;
    }
    async create(likeDto) {
        try {
            const note = await this.noteService.getById(likeDto.noteId);
            const user = await this.userService.getBy(constants_1.USER_ID);
            if (!note) {
                throw new common_1.NotFoundException();
            }
            const like = this.likeRepository.create({
                userRelation: user,
                noteRelation: note,
            });
            return await this.likeRepository.save(like);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            if (error.code === "23505") {
                throw new common_1.ConflictException();
            }
            console.error("Error @like-create:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async delete(id) {
        try {
            await this.likeRepository.delete(id);
            return { deleted: true };
        }
        catch (error) {
            console.error("Error @like-delete:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
};
exports.LikeService = LikeService;
exports.LikeService = LikeService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(like_entity_1.Like)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        note_service_1.NoteService,
        typeorm_2.Repository])
], LikeService);
//# sourceMappingURL=like.service.js.map