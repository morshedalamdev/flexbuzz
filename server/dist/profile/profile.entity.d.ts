import { User } from "src/user/user.entity";
export declare enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}
export declare class Profile {
    id: string;
    firstName?: string;
    lastName?: string;
    gender?: Gender;
    dob?: Date;
    bio?: string;
    userId: string;
    user: User;
}
