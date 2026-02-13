import { Note } from "src/note/note.entity";
import { User } from "src/user/user.entity";
export declare class Comment {
    id: string;
    content: string;
    user: string;
    note: string;
    createdAt: Date;
    updatedAt: Date;
    userRelation: User;
    noteRelation: Note;
}
