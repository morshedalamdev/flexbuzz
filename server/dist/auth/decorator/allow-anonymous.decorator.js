"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowAnonymous = void 0;
const common_1 = require("@nestjs/common");
const AllowAnonymous = () => (0, common_1.SetMetadata)("isPublic", true);
exports.AllowAnonymous = AllowAnonymous;
//# sourceMappingURL=allow-anonymous.decorator.js.map