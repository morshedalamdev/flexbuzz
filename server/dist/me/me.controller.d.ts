import { MeService } from './me.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
export declare class MeController {
    private readonly meService;
    constructor(meService: MeService);
    GetCurrent(): Promise<import("../user/user.entity").User>;
    UpdateCurrent(updateDto: UpdateUserDto): Promise<import("../user/user.entity").User>;
    DeleteCurrent(): Promise<{
        deleted: boolean;
    }>;
}
