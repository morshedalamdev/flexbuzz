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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const pagination_query_dto_1 = require("../common/pagination/dto/pagination-query.dto");
const follow_query_dto_1 = require("./dto/follow-query.dto");
const active_user_decorator_1 = require("../auth/decorator/active-user.decorator");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    GetFollowers(pageQueryDto, userId) {
        return this.userService.getFollowers(pageQueryDto, userId);
    }
    GetFollowing(pageQueryDto, userId) {
        return this.userService.getFollowing(pageQueryDto, userId);
    }
    FollowUser(id, userId) {
        return this.userService.follow(id, userId);
    }
    UnfollowUser(id, userId) {
        return this.userService.unfollow(id, userId);
    }
    GetCurrUser(userId) {
        return this.userService.current(userId);
    }
    UpdateCurrUser(updateDto, userId) {
        return this.userService.update(updateDto, userId);
    }
    DeleteCurrUser(userId) {
        return this.userService.delete(userId);
    }
    GetUsers(pageQueryDto) {
        return this.userService.findAll(pageQueryDto);
    }
    GetUserById(id) {
        return this.userService.findBy(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)("/followers"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [follow_query_dto_1.FollowQueryDto, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "GetFollowers", null);
__decorate([
    (0, common_1.Get)("/following"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [follow_query_dto_1.FollowQueryDto, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "GetFollowing", null);
__decorate([
    (0, common_1.Post)(":id/follow"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, active_user_decorator_1.ActiveUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "FollowUser", null);
__decorate([
    (0, common_1.Delete)(":id/unfollow"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, active_user_decorator_1.ActiveUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "UnfollowUser", null);
__decorate([
    (0, common_1.Get)("/me"),
    __param(0, (0, active_user_decorator_1.ActiveUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "GetCurrUser", null);
__decorate([
    (0, common_1.Patch)("/me"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_user_decorator_1.ActiveUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "UpdateCurrUser", null);
__decorate([
    (0, common_1.Delete)("/me"),
    __param(0, (0, active_user_decorator_1.ActiveUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "DeleteCurrUser", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "GetUsers", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "GetUserById", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map