import { Notes } from "src/note/note.entity";
import { Profile } from "src/profile/profile.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid", { name: "_id" })
  id: string;

  @Column({
    type: "varchar",
    nullable: false,
    length: 24,
    unique: true,
  })
  username: string;

  @Column({
    type: "varchar",
    nullable: false,
    length: 100,
    unique: true,
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

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile?: Profile;

  @OneToMany(() => Notes, (note) => note.user)
  notes: Notes[];
}
