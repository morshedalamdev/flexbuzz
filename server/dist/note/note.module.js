"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteModule = void 0;
const common_1 = require("@nestjs/common");
const note_controller_1 = require("./note.controller");
const note_service_1 = require("./note.service");
const hashtag_module_1 = require("../hashtag/hashtag.module");
const user_module_1 = require("../user/user.module");
const note_entity_1 = require("./note.entity");
const typeorm_1 = require("@nestjs/typeorm");
const like_module_1 = require("../like/like.module");
let NoteModule = class NoteModule {
};
exports.NoteModule = NoteModule;
exports.NoteModule = NoteModule = __decorate([
    (0, common_1.Module)({
        controllers: [note_controller_1.NoteController],
        providers: [note_service_1.NoteService],
        exports: [note_service_1.NoteService],
        imports: [user_module_1.UserModule, hashtag_module_1.HashtagModule, like_module_1.LikeModule, typeorm_1.TypeOrmModule.forFeature([note_entity_1.Note])],
    })
], NoteModule);
//# sourceMappingURL=note.module.js.map