import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Startup } from './startup.entity';
import { Student } from './student.entity';
import { Message } from './message.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 70 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column()
  is_admin: boolean;

  @OneToMany(() => Startup, (startup) => startup.user)
  startups: Startup[];

  @OneToMany(() => Student, (student) => student.user)
  students: Student[];

  @OneToMany(() => Message, (msg) => msg.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, (msg) => msg.receiver)
  receivedMessages: Message[];
}