import { Note } from "src/note/note.entity";
import { User } from "src/user/user.entity";
export declare class Comment {
    id: string;
    content: string;
    userId: string;
    noteId: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    note: Note;
}
