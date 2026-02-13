import { Note } from "src/note/note.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("hashtags")
export class Hashtag {
  @PrimaryGeneratedColumn("uuid", { name: "_id" })
  id: string;

  @Column({ type: "varchar", length: 100, unique: true })
  name: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  // Relations
  @ManyToMany(() => Note, (note) => note.hashtagRelation)
  noteRelation: Note[];
}
