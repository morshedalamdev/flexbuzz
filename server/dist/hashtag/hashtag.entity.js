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
exports.Hashtag = void 0;
const note_entity_1 = require("../note/note.entity");
const typeorm_1 = require("typeorm");
let Hashtag = class Hashtag {
    id;
    tag;
    count;
    createdAt;
    notes;
};
exports.Hashtag = Hashtag;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Hashtag.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Hashtag.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 1 }),
    __metadata("design:type", Number)
], Hashtag.prototype, "count", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Hashtag.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => note_entity_1.Note, (note) => note.hashtags),
    __metadata("design:type", Array)
], Hashtag.prototype, "notes", void 0);
exports.Hashtag = Hashtag = __decorate([
    (0, typeorm_1.Entity)("hashtags"),
    (0, typeorm_1.Unique)(["tag"])
], Hashtag);
//# sourceMappingURL=hashtag.entity.js.map