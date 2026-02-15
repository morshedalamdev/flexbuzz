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
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", nullable: false })
  content: string;

  @Column({ name: "user_id", type: "uuid" })
  userId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  // ============ RELATIONSHIPS ============
  @ManyToOne(() => User, (user) => user.notes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.notes, { eager: true })
  @JoinTable({ name: "note_hashtag" })
  hashtags: Hashtag[];

  @OneToMany(() => Like, (like) => like.note)
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.note)
  comments: Comment[];
}
