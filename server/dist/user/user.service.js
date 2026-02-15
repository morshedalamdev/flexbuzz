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
const hashing_provider_1 = require("../auth/provider/hashing.provider");
const class_validator_1 = require("class-validator");
const constants_1 = require("../constants/constants");
const follow_service_1 = require("../follow/follow.service");
let UserService = class UserService {
    followService;
    hashingProvider;
    userRepository;
    constructor(followService, hashingProvider, userRepository) {
        this.followService = followService;
        this.hashingProvider = hashingProvider;
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
                password: await this.hashingProvider.hashPassword(userDto.password),
                profile: {},
            });
            return await this.userRepository.save(newUser);
        }
        catch (error) {
            console.error("Error @user-create:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async findAll() {
        try {
            return this.userRepository.find();
        }
        catch (error) {
            console.error("Error @user-getAll:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async findBy(identifier) {
        let user = null;
        try {
            if ((0, class_validator_1.isUUID)(identifier)) {
                user = await this.userRepository.findOne({
                    where: { id: identifier },
                    relations: ["profile"],
                });
            }
            else {
                user = await this.userRepository.findOne({
                    where: [{ username: identifier }, { email: identifier }],
                    relations: ["profile"],
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
        return user;
    }
    async current() {
        return await this.findBy(constants_1.USER_ID);
    }
    async update(userDto) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: constants_1.USER_ID },
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
    async delete() {
        try {
            await this.userRepository.softDelete(constants_1.USER_ID);
            return { deleted: true };
        }
        catch (error) {
            console.error("Error @user-delete:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async follow(id) {
        try {
            const userToFollow = await this.findBy(id);
            const currentUser = await this.findBy(constants_1.USER_ID);
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
    async unfollow(id) {
        try {
            return await this.followService.unfollow(id, constants_1.USER_ID);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error("Error @user-unfollow:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => hashing_provider_1.HashingProvider))),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [follow_service_1.FollowService,
        hashing_provider_1.HashingProvider,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map