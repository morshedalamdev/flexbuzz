import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Note {
  @PrimaryGeneratedColumn("uuid", { name: "_id" })
  id: string;


  @Column({
    type: "text",
    nullable: false,
  })
  text: string;

  @ManyToOne(()=> User, (user)=> user.notes, { eager: true })
  user: User;

//   @ManyToMany(()=> Hashtag, (hashtag)=> hashtag.notes, { eager: true })
//   @JoinTable()
//   hashtags: Hashtag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;  
}
