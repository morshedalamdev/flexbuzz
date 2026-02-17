import { Comment } from "src/comment/comment.entity";
import { Follow } from "src/follow/follow.entity";
import { Like } from "src/like/like.entity";
import { Note } from "src/note/note.entity";
import { Profile } from "src/profile/profile.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
@Unique(["username", "email"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", nullable: false, length: 24 })
  username: string;

  @Column({ type: "varchar", nullable: false, length: 100 })
  email: string;

  @Column({ type: "text", nullable: false })
  password: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  // ============ VIRTUAL FIELDS ============
  followerCount?: number;
  followingCount?: number;
  isFollowedByCurrentUser?: boolean;

  // ============ RELATIONSHIPS ============
  @OneToOne(() => Profile, (profile) => profile.user, {
    eager: true,
    cascade: true,
  })
  profile: Profile;

  @OneToMany(() => Follow, (follow) => follow.follower, { onDelete: "CASCADE" })
  followers: Follow[];

  @OneToMany(() => Follow, (follow) => follow.following, {
    onDelete: "CASCADE",
  })
  followings: Follow[];

  @OneToMany(() => Note, (note) => note.user, { onDelete: "CASCADE" })
  notes: Note[];

  @OneToMany(() => Like, (like) => like.user, { onDelete: "CASCADE" })
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.user, { onDelete: "CASCADE" })
  comments: Comment[];
}
