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
exports.NoteController = void 0;
const common_1 = require("@nestjs/common");
const note_service_1 = require("./note.service");
const create_note_dto_1 = require("./dto/create-note.dto");
const update_note_dto_1 = require("./dto/update-note.dto");
const comment_dto_1 = require("../comment/dto/comment.dto");
const note_query_dto_1 = require("./dto/note-query.dto");
const active_user_decorator_1 = require("../auth/decorator/active-user.decorator");
let NoteController = class NoteController {
    noteService;
    constructor(noteService) {
        this.noteService = noteService;
    }
    async GetLikes(id) {
        return this.noteService.getLikes(id);
    }
    async GiveLike(id, userId) {
        return this.noteService.like(id, userId);
    }
    async RemoveLike(id, userId) {
        return this.noteService.dislike(id, userId);
    }
    async GetComments(id, pageQueryDto) {
        return this.noteService.getComments(id, pageQueryDto);
    }
    async AddComment(createDto, userId) {
        return this.noteService.addComment(createDto, userId);
    }
    async EditComment(updateDto) {
        return this.noteService.updateComment(updateDto);
    }
    async DeleteComment(id) {
        return this.noteService.deleteComment(id);
    }
    CreateNote(createDto, userId) {
        return this.noteService.create(createDto, userId);
    }
    GetNotes(paginationQueryDto, userId) {
        return this.noteService.getAll(paginationQueryDto, userId);
    }
    GetById(id, userId) {
        return this.noteService.getById(id, userId);
    }
    UpdateNote(updateDto, userId) {
        return this.noteService.update(updateDto, userId);
    }
    DeleteNote(id) {
        return this.noteService.delete(id);
    }
};
exports.NoteController = NoteController;
__decorate([
    (0, common_1.Get)(":id/likes"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "GetLikes", null);
__decorate([
    (0, common_1.Post)(":id/like"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, active_user_decorator_1.ActiveUser)("sub")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "GiveLike", null);
__decorate([
    (0, common_1.Delete)(":id/dislike"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, active_user_decorator_1.ActiveUser)("sub")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "RemoveLike", null);
__decorate([
    (0, common_1.Get)(":id/comments"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, note_query_dto_1.NoteQueryDto]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "GetComments", null);
__decorate([
    (0, common_1.Post)("comment"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)("sub")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.CommentDto, String]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "AddComment", null);
__decorate([
    (0, common_1.Patch)("comment"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.CommentDto]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "EditComment", null);
__decorate([
    (0, common_1.Delete)("comment"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "DeleteComment", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)("sub")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_note_dto_1.CreateNoteDto, String]),
    __metadata("design:returntype", void 0)
], NoteController.prototype, "CreateNote", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)("sub")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [note_query_dto_1.NoteQueryDto, String]),
    __metadata("design:returntype", void 0)
], NoteController.prototype, "GetNotes", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, active_user_decorator_1.ActiveUser)("sub")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], NoteController.prototype, "GetById", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)("sub")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_note_dto_1.UpdateNoteDto, String]),
    __metadata("design:returntype", void 0)
], NoteController.prototype, "UpdateNote", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NoteController.prototype, "DeleteNote", null);
exports.NoteController = NoteController = __decorate([
    (0, common_1.Controller)("note"),
    __metadata("design:paramtypes", [note_service_1.NoteService])
], NoteController);
//# sourceMappingURL=note.controller.js.map