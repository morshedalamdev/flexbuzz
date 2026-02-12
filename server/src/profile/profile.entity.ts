import { User } from "src/user/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

@Entity("profiles")
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

  @OneToOne(() => User, (user) => user.profile, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}
