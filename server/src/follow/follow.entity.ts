import { User } from "src/user/user.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("follows")
@Unique(["followerId", "followingId"])
export class Follow {
  @PrimaryGeneratedColumn("uuid", { name: "follower_id" })
  followerId: string;

  @PrimaryGeneratedColumn("uuid", { name: "following_id" })
  followingId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  // ============ RELATIONSHIPS ============
  @ManyToOne(() => User, (user) => user.followers, { onDelete: "CASCADE" })
  @JoinColumn({ name: "follower_id" })
  follower: User;

  @ManyToOne(() => User, (user) => user.followings, { onDelete: "CASCADE" })
  @JoinColumn({ name: "following_id" })
  following: User;
}
