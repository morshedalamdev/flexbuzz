import { Note } from "src/note/note.entity";
export declare class Hashtag {
    id: string;
    tag: string;
    count: number;
    createdAt: Date;
    notes: Note[];
}
