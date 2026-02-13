import { Comment } from "src/comment/comment.entity";
import { Hashtag } from "src/hashtag/hashtag.entity";
import { Like } from "src/like/like.entity";
import { User } from "src/user/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column({ type: "text", nullable: false })
  content: string;

  @Column({ name: "user_id", type: "uuid" })
  userId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.noteRelation, { eager: true })
  @JoinColumn({ name: "user_id" })
  userRelation: User;

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.noteRelation, { eager: true })
  @JoinTable({ name: "note_hashtag" })
  hashtagRelation: Hashtag[];

  @OneToMany(() => Like, (like) => like.noteRelation)
  likeRelation: Like[];

  @OneToMany(() => Comment, (comment) => comment.noteRelation)
  commentRelation: Comment[];
}
