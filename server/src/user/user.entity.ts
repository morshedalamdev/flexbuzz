import { Comment } from "src/comment/comment.entity";
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
  @PrimaryGeneratedColumn("uuid", { name: "_id" })
  id: string;

  @Column({
    type: "varchar",
    nullable: false,
    length: 24,
  })
  username: string;

  @Column({
    type: "varchar",
    nullable: false,
    length: 100,
  })
  email: string;

  @Column({
    type: "text",
    nullable: false,
  })
  password: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  // Relations
  @OneToOne(() => Profile, (profile) => profile.userRelation, { cascade: true })
  profileRelation: Profile;

  @OneToMany(() => Note, (note) => note.userRelation)
  noteRelation: Note[];

  @OneToMany(() => Like, (like) => like.userRelation)
  likeRelation: Like[];

  @OneToMany(() => Comment, (comment) => comment.userRelation)
  commentRelation: Comment[];
}
