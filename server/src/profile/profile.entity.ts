import { User } from "src/user/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

@Entity("profiles")
@Unique(["userId"])
export class Profile {
  @PrimaryGeneratedColumn("uuid", { name: "_id" })
  id: string;

  @Column({ name: "first_name", type: "varchar", nullable: true, length: 100 })
  firstName?: string;

  @Column({ name: "last_name", type: "varchar", nullable: true, length: 100 })
  lastName?: string;

  @Column({ name: "gender", type: "enum", enum: Gender, nullable: true })
  gender?: Gender;

  @Column({ name: "dob", type: "date", nullable: true })
  dob?: Date;

  @Column({ name: "bio", type: "text", nullable: true })
  bio?: string;

  @Column({ name: "user_id", type: "uuid" })
  userId: string;

  // Relations
  @OneToOne(() => User, (user) => user.profileRelation, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  userRelation: User;
}
