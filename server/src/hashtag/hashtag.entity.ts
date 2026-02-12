import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hashtag {
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
}