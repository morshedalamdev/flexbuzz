import { Note } from "src/note/note.entity";
import { User } from "src/user/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity("likes")
@Unique(["user", "note"])
export class Like {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id", type: "uuid" })
  user: string;

  @Column({ name: "note_id", type: "uuid" })
  note: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.likeRelation, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  userRelation: User;

  @ManyToOne(() => Note, (note) => note.likeRelation, { onDelete: "CASCADE" })
  @JoinColumn({ name: "note_id" })
  noteRelation: Note;
}
