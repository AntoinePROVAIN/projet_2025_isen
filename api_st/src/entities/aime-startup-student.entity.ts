import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Student } from './student.entity';
import { Startup } from './startup.entity';

@Entity('aime_startup_student')
export class AimeStartupStudent {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  id_startup: number;

  @ManyToOne(() => Student, (student) => student.likedByStartups)
  @JoinColumn({ name: 'id' })
  student: Student;

  @ManyToOne(() => Startup, (startup) => startup.likes)
  @JoinColumn({ name: 'id_startup' })
  startup: Startup;

  @Column()
  like_date: Date;
}