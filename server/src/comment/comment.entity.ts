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
  userId: User;

  @Column({ name: "note_id", type: "uuid" })
  noteId: Note;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.commentRelation, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  userRelation: User;

  @ManyToOne(() => Note, (note) => note.commentRelation, { onDelete: "CASCADE" })
  @JoinColumn({ name: "note_id" })
  noteRelation: Note;
}
