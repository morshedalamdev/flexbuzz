import { Notes } from "src/note/note.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hashtags {
  @PrimaryGeneratedColumn("uuid", { name: "_id" })
  id: string;

  @Column({
    type: "varchar",
    length: 100,
    unique: true,
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Notes, (note) => note.hashtags)
  notes: Notes[];
}