import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Student } from './student.entity';
import { Startup } from './startup.entity';
import { Message } from './message.entity';

@Entity('match')
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date_match: Date;

  @ManyToOne(() => Student, (student) => student.matches)
  @JoinColumn({ name: 'id_student' })
  student: Student;

  @ManyToOne(() => Startup, (startup) => startup.matches)
  @JoinColumn({ name: 'id_startup' })
  startup: Startup;

  @OneToMany(() => Message, (message) => message.match)
  messages: Message[];
}