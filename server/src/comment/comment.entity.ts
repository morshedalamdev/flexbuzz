import { Note } from "src/note/note.entity";
import { User } from "src/user/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  content: string;

  @Column({ name: "user_id", type: "uuid" })
  userId: string;

  @Column({ name: "note_id", type: "uuid" })
  noteId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  // ============ RELATIONSHIPS ============
  @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Note, (note) => note.comments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "note_id" })
  note: Note;
}
