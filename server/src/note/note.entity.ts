import { Hashtags } from "src/hashtag/hashtag.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Notes {
  @PrimaryGeneratedColumn("uuid", { name: "_id" })
  id: string;


  @Column({
    type: "text",
    nullable: false,
  })
  text: string;

  @ManyToOne(()=> User, (user)=> user.notes, { eager: true })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;  

  @ManyToMany(()=> Hashtags, (hashtag)=> hashtag.notes, { eager: true })
  @JoinTable({name: "notes_hashtags"})
  hashtags: Hashtags[];
}
