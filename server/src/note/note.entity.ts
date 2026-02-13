import { Hashtag } from "src/hashtag/hashtag.entity";
import { Like } from "src/like/like.entity";
import { User } from "src/user/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("notes")
export class Note {
  @PrimaryGeneratedColumn("uuid", { name: "_id" })
  id: string;

  @Column({
    type: "text",
    nullable: false,
  })
  text: string;

  @ManyToOne(() => User, (user) => user.note, { eager: true })
  user: User;

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.note, { eager: true })
  @JoinTable({ name: "notes_hashtag" })
  hashtag: Hashtag[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => Like, (like) => like.note)
  like: Like[];
}
