import { Gender } from "src/profile/profile.entity";
export declare class UpdateProfileDto {
    firstName?: string;
    lastName?: string;
    gender?: Gender;
    dob?: Date;
    bio?: string;
}
