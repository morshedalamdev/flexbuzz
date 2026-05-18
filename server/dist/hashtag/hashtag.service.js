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
exports.HashtagService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const hashtag_entity_1 = require("./hashtag.entity");
const normalizeHashtagTag = (tag) => {
    const trimmedTag = tag.trim();
    if (trimmedTag.length === 0) {
        return trimmedTag;
    }
    return `${trimmedTag.slice(0, 1).toLowerCase()}${trimmedTag.slice(1)}`;
};
let HashtagService = class HashtagService {
    hashtagRepository;
    constructor(hashtagRepository) {
        this.hashtagRepository = hashtagRepository;
    }
    async create(hashtagDto) {
        const createdHashtags = [];
        const existingHashtags = [];
        try {
            for (const tag of hashtagDto.tags) {
                const normalizedTag = normalizeHashtagTag(tag);
                const isExist = await this.hashtagRepository
                    .createQueryBuilder("hashtag")
                    .where("CONCAT(LOWER(LEFT(hashtag.tag, 1)), SUBSTRING(hashtag.tag, 2)) = :tag", { tag: normalizedTag })
                    .getOne();
                if (isExist) {
                    existingHashtags.push(isExist);
                }
                else {
                    const hashtag = this.hashtagRepository.create({ tag: normalizedTag });
                    const savedHashtag = await this.hashtagRepository.save(hashtag);
                    createdHashtags.push(savedHashtag);
                }
            }
            return {
                created: createdHashtags,
                existing: existingHashtags,
                total: [...createdHashtags, ...existingHashtags],
            };
        }
        catch (error) {
            console.error("Error @hashtag-create:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async incrementCounts(hashtagIds) {
        try {
            const uniqueIds = [...new Set(hashtagIds)].filter(Boolean);
            if (uniqueIds.length === 0) {
                return;
            }
            await this.hashtagRepository
                .createQueryBuilder()
                .update(hashtag_entity_1.Hashtag)
                .set({ count: () => "count + 1" })
                .where("id IN (:...ids)", { ids: uniqueIds })
                .execute();
        }
        catch (error) {
            console.error("Error @incrementCounts:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async getHashtags(search) {
        try {
            if (search) {
                const normalizedSearch = normalizeHashtagTag(search);
                const response = await this.hashtagRepository
                    .createQueryBuilder("hashtag")
                    .where("CONCAT(LOWER(LEFT(hashtag.tag, 1)), SUBSTRING(hashtag.tag, 2)) = :tag", { tag: normalizedSearch })
                    .getOne();
                if (!response) {
                    throw new common_1.NotFoundException("Hashtag not found");
                }
                return response;
            }
            const response = await this.hashtagRepository.find();
            if (response.length === 0) {
                throw new common_1.NotFoundException("Hashtag not found");
            }
            return response;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            console.error("Error @getHashtags:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
    async getByIds(hashtags) {
        try {
            return await this.hashtagRepository.find({
                where: { id: (0, typeorm_1.In)(hashtags) },
            });
        }
        catch (error) {
            console.error("Error @getByIds:", error);
            throw new common_1.RequestTimeoutException();
        }
    }
};
exports.HashtagService = HashtagService;
exports.HashtagService = HashtagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(hashtag_entity_1.Hashtag)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], HashtagService);
//# sourceMappingURL=hashtag.service.js.map