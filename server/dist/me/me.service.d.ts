import { UpdateUserDto } from "src/user/dto/update-user.dto";
import { UserService } from "src/user/user.service";
export declare class MeService {
    private readonly userService;
    constructor(userService: UserService);
    find(): Promise<import("../user/user.entity").User>;
    update(updateDto: UpdateUserDto): Promise<import("../user/user.entity").User>;
    delete(): Promise<{
        deleted: boolean;
    }>;
}
