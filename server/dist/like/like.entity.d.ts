import { Note } from "src/note/note.entity";
import { User } from "src/user/user.entity";
export declare class Like {
    id: string;
    userId: User;
    noteId: Note;
    createdAt: Date;
    userRelation: User;
    noteRelation: Note;
}
