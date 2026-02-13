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
exports.User = void 0;
const comment_entity_1 = require("../comment/comment.entity");
const like_entity_1 = require("../like/like.entity");
const note_entity_1 = require("../note/note.entity");
const profile_entity_1 = require("../profile/profile.entity");
const typeorm_1 = require("typeorm");
let User = class User {
    id;
    username;
    email;
    password;
    createdAt;
    updatedAt;
    deletedAt;
    profileRelation;
    noteRelation;
    likeRelation;
    commentRelation;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "_id" }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: false,
        length: 24,
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: false,
        length: 100,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: "deleted_at" }),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => profile_entity_1.Profile, (profile) => profile.userRelation, { cascade: true }),
    __metadata("design:type", profile_entity_1.Profile)
], User.prototype, "profileRelation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => note_entity_1.Note, (note) => note.userRelation),
    __metadata("design:type", Array)
], User.prototype, "noteRelation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_entity_1.Like, (like) => like.userRelation),
    __metadata("design:type", Array)
], User.prototype, "likeRelation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.userRelation),
    __metadata("design:type", Array)
], User.prototype, "commentRelation", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)("users"),
    (0, typeorm_1.Unique)(["username", "email"])
], User);
//# sourceMappingURL=user.entity.js.map