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
exports.FollowService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pagination_provider_1 = require("../common/pagination/pagination.provider");
const follow_entity_1 = require("./follow.entity");
let FollowService = class FollowService {
    followRepository;
    paginationProvider;
    constructor(followRepository, paginationProvider) {
        this.followRepository = followRepository;
        this.paginationProvider = paginationProvider;
    }
    async follow(userToFollow, currentUser) {
        try {
            const follow = this.followRepository.create({
                follower: currentUser,
                following: userToFollow,
            });
            return await this.followRepository.save(follow);
        }
        catch (error) {
            console.error("Error @follow-follow:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async unfollow(userToFollow, currentUser) {
        try {
            await this.followRepository.delete({
                followerId: currentUser,
                followingId: userToFollow,
            });
            return { deleted: true };
        }
        catch (error) {
            console.error("Error @follow-unfollow:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async getFollows(followDto, request) {
        try {
            return await this.paginationProvider.paginateQuery(followDto, this.followRepository, request ? request : undefined, followDto.followerId
                ? { followerId: followDto.followerId }
                : { followingId: followDto.followingId });
        }
        catch (error) {
            if (error.code === "ECONNREFUSED") {
                throw new common_1.RequestTimeoutException("Failed to fetch users. Please try again later.", {
                    description: "Database connection error",
                });
            }
            console.error("Error @follow-getFollows:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
};
exports.FollowService = FollowService;
exports.FollowService = FollowService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(follow_entity_1.Follow)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        pagination_provider_1.PaginationProvider])
], FollowService);
//# sourceMappingURL=follow.service.js.map