import { Notes } from "src/note/note.entity";
import { Profile } from "src/profile/profile.entity";
export declare class User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    profile?: Profile;
    notes: Notes[];
}
