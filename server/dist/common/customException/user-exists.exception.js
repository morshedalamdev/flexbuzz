"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserExistsException = void 0;
const common_1 = require("@nestjs/common");
class UserExistsException extends common_1.HttpException {
    constructor(fieldName, fieldValue) {
        super(`User with ${fieldName} '${fieldValue}' already exists.`, common_1.HttpStatus.CONFLICT);
    }
}
exports.UserExistsException = UserExistsException;
//# sourceMappingURL=user-exists.exception.js.map