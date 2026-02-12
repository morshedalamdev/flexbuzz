import { HttpException } from "@nestjs/common";
export declare class UserExistsException extends HttpException {
    constructor(fieldName: string, fieldValue: string);
}
