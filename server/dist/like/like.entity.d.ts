import { Note } from "src/note/note.entity";
import { User } from "src/user/user.entity";
export declare class Like {
    userId: string;
    noteId: string;
    createdAt: Date;
    user: User;
    note: Note;
}
