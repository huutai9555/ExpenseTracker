import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column()
  created_at: Date; 

  @Column({
    nullable: true
  })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.expenses)
  user: User
}
