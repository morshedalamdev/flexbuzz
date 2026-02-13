import { Note } from "src/note/note.entity";
import { User } from "src/user/user.entity";
export declare class Like {
    id: string;
    user: User;
    note: Note;
    createdAt: Date;
}
