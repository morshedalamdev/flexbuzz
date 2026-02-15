import { Note } from "src/note/note.entity";
import { User } from "src/user/user.entity";
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity("likes")
@Unique(["userId", "noteId"])
export class Like {
  @PrimaryGeneratedColumn("uuid")
  userId: string;

  @PrimaryGeneratedColumn("uuid", { name: "note_id" })
  noteId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  // ============ RELATIONSHIPS ============
  @ManyToOne(() => User, (user) => user.likes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Note, (note) => note.likes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "note_id" })
  note: Note;
}
