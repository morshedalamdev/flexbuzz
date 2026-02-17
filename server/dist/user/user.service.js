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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const user_exists_exception_1 = require("../common/customException/user-exists.exception");
const class_validator_1 = require("class-validator");
const pagination_provider_1 = require("../common/pagination/pagination.provider");
const follow_service_1 = require("../follow/follow.service");
let UserService = class UserService {
    followService;
    paginationProvider;
    userRepository;
    constructor(followService, paginationProvider, userRepository) {
        this.followService = followService;
        this.paginationProvider = paginationProvider;
        this.userRepository = userRepository;
    }
    async create(userDto) {
        const isUsernameExist = await this.userRepository.findOne({
            where: { username: userDto.username },
            withDeleted: true,
        });
        if (isUsernameExist) {
            throw new user_exists_exception_1.UserExistsException("username", userDto.username);
        }
        const isEmailExist = await this.userRepository.findOne({
            where: { email: userDto.email },
            withDeleted: true,
        });
        if (isEmailExist) {
            throw new user_exists_exception_1.UserExistsException("email", userDto.email);
        }
        try {
            const newUser = this.userRepository.create({
                ...userDto,
                profile: {},
            });
            return await this.userRepository.save(newUser);
        }
        catch (error) {
            console.error("Error @user-create:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async findAll(paginationQueryDto, userId) {
        try {
            const users = await this.paginationProvider.paginateQuery(paginationQueryDto, this.userRepository);
            const usersWithCounts = await Promise.all(users.data.map(async (user) => {
                const followerCount = await this.followService.followerCount(user.id);
                const followingCount = await this.followService.followingCount(user.id);
                const isFollowedByCurrentUser = await this.followService.isFollowedByCurrentUser(user.id, userId);
                return {
                    ...user,
                    followerCount,
                    followingCount,
                    isFollowedByCurrentUser,
                };
            }));
            return { ...users, data: usersWithCounts };
        }
        catch (error) {
            if (error.code === "ECONNREFUSED") {
                throw new common_1.RequestTimeoutException("Failed to fetch users. Please try again later.", {
                    description: "Database connection error",
                });
            }
            console.error("Error @user-getAll:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async findBy(identifier, userId) {
        let user = null;
        try {
            if ((0, class_validator_1.isUUID)(identifier)) {
                user = await this.userRepository.findOne({
                    where: { id: identifier },
                });
            }
            else {
                user = await this.userRepository.findOne({
                    where: [{ username: identifier }, { email: identifier }],
                });
            }
        }
        catch (error) {
            console.error("Error @user-getBy:", error);
            throw new common_1.RequestTimeoutException();
        }
        if (!user) {
            throw new common_1.NotFoundException(`User with '${identifier}' not found.`);
        }
        const followerCount = await this.followService.followerCount(user.id);
        const followingCount = await this.followService.followingCount(user.id);
        if (userId) {
            const isFollowedByCurrentUser = await this.followService.isFollowedByCurrentUser(user.id, userId);
            return {
                ...user,
                followerCount,
                followingCount,
                isFollowedByCurrentUser,
            };
        }
        return { ...user, followerCount, followingCount };
    }
    async current(userId) {
        return await this.findBy(userId);
    }
    async update(userDto, userId) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: userId },
                relations: ["profile"],
            });
            if (!user || !user.profile) {
                throw new common_1.NotFoundException("User not found");
            }
            user.username = userDto.username ?? user.username;
            user.email = userDto.email ?? user.email;
            user.profile.firstName =
                userDto.profile?.firstName ?? user.profile.firstName;
            user.profile.lastName =
                userDto.profile?.lastName ?? user.profile.lastName;
            user.profile.gender = userDto.profile?.gender ?? user.profile.gender;
            user.profile.dob = userDto.profile?.dob
                ? new Date(userDto.profile.dob)
                : user.profile.dob;
            user.profile.bio = userDto.profile?.bio ?? user.profile.bio;
            return await this.userRepository.save(user);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error("Error @user-update:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async delete(userId) {
        try {
            await this.userRepository.softDelete(userId);
            return { deleted: true };
        }
        catch (error) {
            console.error("Error @user-delete:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async follow(id, userId) {
        try {
            const userToFollow = await this.findBy(id);
            const currentUser = await this.findBy(userId);
            if (!userToFollow || !currentUser) {
                throw new common_1.NotFoundException("User not found");
            }
            return await this.followService.follow(userToFollow, currentUser);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error("Error @user-follow:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async unfollow(id, userId) {
        try {
            return await this.followService.unfollow(id, userId);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error("Error @user-unfollow:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async getFollowers(followDto, userId) {
        if (!followDto.followingId) {
            followDto.followingId = userId;
        }
        try {
            return await this.followService.getFollows(followDto);
        }
        catch (error) {
            console.error("Error @user-getFollowers:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async getFollowing(followDto, userId) {
        if (!followDto.followerId) {
            followDto.followerId = userId;
        }
        try {
            return await this.followService.getFollows(followDto);
        }
        catch (error) {
            console.error("Error @user-getFollowing:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [follow_service_1.FollowService,
        pagination_provider_1.PaginationProvider,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map