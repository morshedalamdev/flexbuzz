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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const comment_entity_1 = require("../comment/comment.entity");
const hashtag_entity_1 = require("../hashtag/hashtag.entity");
const like_entity_1 = require("../like/like.entity");
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
let Note = class Note {
    id;
    content;
    userId;
    createdAt;
    updatedAt;
    userRelation;
    hashtagRelation;
    likeRelation;
    commentRelation;
};
exports.Note = Note;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "_id" }),
    __metadata("design:type", String)
], Note.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Note.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id", type: "uuid" }),
    __metadata("design:type", String)
], Note.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Note.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Note.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.noteRelation, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], Note.prototype, "userRelation", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => hashtag_entity_1.Hashtag, (hashtag) => hashtag.noteRelation, { eager: true }),
    (0, typeorm_1.JoinTable)({ name: "note_hashtag" }),
    __metadata("design:type", Array)
], Note.prototype, "hashtagRelation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_entity_1.Like, (like) => like.noteRelation),
    __metadata("design:type", Array)
], Note.prototype, "likeRelation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.noteRelation),
    __metadata("design:type", Array)
], Note.prototype, "commentRelation", void 0);
exports.Note = Note = __decorate([
    (0, typeorm_1.Entity)("notes")
], Note);
//# sourceMappingURL=note.entity.js.map