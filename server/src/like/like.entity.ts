import { Note } from "src/note/note.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('likes')
@Unique(['user', 'note'])
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ManyToOne(() => User, (user) => user.like, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
  
  @ManyToOne(() => Note, (note) => note.like, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'note_id' })
  note: Note;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}