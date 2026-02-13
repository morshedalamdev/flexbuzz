import { Note } from "src/note/note.entity";
import { User } from "src/user/user.entity";
export declare class Comment {
    id: string;
    content: string;
    userId: User;
    noteId: Note;
    createdAt: Date;
    updatedAt: Date;
    userRelation: User;
    noteRelation: Note;
}
