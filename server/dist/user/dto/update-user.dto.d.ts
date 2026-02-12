import { CreateUserDto } from "./create-user.dto";
import { UpdateProfileDto } from "src/profile/dto/update-profile.dto";
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    profile?: UpdateProfileDto;
}
export {};
