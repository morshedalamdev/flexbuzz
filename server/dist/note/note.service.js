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
exports.NoteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const note_entity_1 = require("./note.entity");
const user_service_1 = require("../user/user.service");
const hashtag_service_1 = require("../hashtag/hashtag.service");
const constants_1 = require("../constants/constants");
let NoteService = class NoteService {
    userService;
    hashtagService;
    noteRepository;
    constructor(userService, hashtagService, noteRepository) {
        this.userService = userService;
        this.hashtagService = hashtagService;
        this.noteRepository = noteRepository;
    }
    async create(noteDto) {
        try {
            const user = await this.userService.getBy(constants_1.USER_ID);
            const hashtags = await this.hashtagService.getByIds(noteDto.hashtags || []);
            const newNote = this.noteRepository.create({
                ...noteDto,
                userRelation: user,
                hashtagRelation: hashtags,
            });
            return await this.noteRepository.save(newNote);
        }
        catch (error) {
            console.error("Error @note-create:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async getAll(user) {
        let notes = null;
        try {
            if (user) {
                const userEntity = await this.userService.getBy(user);
                const noteEntity = await this.noteRepository.find({
                    where: { userId: userEntity.id },
                    relations: ["hashtagRelation"],
                });
                notes = await Promise.all(noteEntity.map(async (note) => ({
                    ...note,
                    userRelation: userEntity,
                })));
            }
            else {
                const noteEntity = await this.noteRepository.find({
                    relations: ["hashtagRelation"],
                });
                notes = await Promise.all(noteEntity.map(async (note) => ({
                    ...note,
                    userRelation: await this.userService.getBy(note.userId),
                })));
            }
        }
        catch (error) {
            console.error("Error @note-getAll:", error);
            throw new common_1.RequestTimeoutException();
        }
        if (!notes || notes.length === 0) {
            throw new common_1.NotFoundException();
        }
        return notes;
    }
    async getById(id) {
        try {
            const note = await this.noteRepository.findOne({
                where: { id },
                relations: ["hashtagRelation"],
            });
            if (!note) {
                throw new common_1.NotFoundException("Note not found");
            }
            const user = await this.userService.getBy(note.userId);
            return { ...note, userRelation: user };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error("Error @note-getById:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async update(noteDto) {
        try {
            const note = await this.noteRepository.findOne({
                where: { id: String(noteDto.id) },
            });
            if (!note) {
                throw new common_1.NotFoundException("Note not found");
            }
            const hashtags = await this.hashtagService.getByIds(noteDto.hashtags || []);
            note.content = noteDto.content || note.content;
            note.hashtagRelation =
                hashtags.length > 0 ? hashtags : note.hashtagRelation;
            return await this.noteRepository.save(note);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error("Error @note-update:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async delete(id) {
        try {
            await this.noteRepository.delete(id);
            return { deleted: true };
        }
        catch (error) {
            console.error("Error @note-delete:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
};
exports.NoteService = NoteService;
exports.NoteService = NoteService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectRepository)(note_entity_1.Note)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        hashtag_service_1.HashtagService,
        typeorm_1.Repository])
], NoteService);
//# sourceMappingURL=note.service.js.map