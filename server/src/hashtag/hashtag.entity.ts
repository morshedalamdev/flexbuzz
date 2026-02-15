import { Note } from "src/note/note.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity("hashtags")
@Unique(["tag"])
export class Hashtag {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100})
  tag: string;

  @Column({type: "int", default: 1 })
  count: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  // ============ RELATIONSHIPS ============
  @ManyToMany(() => Note, (note) => note.hashtags)
  notes: Note[];
}
