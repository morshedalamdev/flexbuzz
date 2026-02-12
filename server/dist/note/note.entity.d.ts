import { User } from "src/user/user.entity";
export declare class Note {
    id: string;
    text: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
