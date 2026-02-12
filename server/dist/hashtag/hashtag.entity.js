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
exports.Hashtags = void 0;
const note_entity_1 = require("../note/note.entity");
const typeorm_1 = require("typeorm");
let Hashtags = class Hashtags {
    id;
    name;
    createdAt;
    notes;
};
exports.Hashtags = Hashtags;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: "_id" }),
    __metadata("design:type", String)
], Hashtags.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 100,
        unique: true,
    }),
    __metadata("design:type", String)
], Hashtags.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Hashtags.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => note_entity_1.Notes, (note) => note.hashtags),
    __metadata("design:type", Array)
], Hashtags.prototype, "notes", void 0);
exports.Hashtags = Hashtags = __decorate([
    (0, typeorm_1.Entity)()
], Hashtags);
//# sourceMappingURL=hashtag.entity.js.map