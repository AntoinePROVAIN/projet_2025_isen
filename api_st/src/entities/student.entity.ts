import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Match } from './match.entity';
import { AimeStudentOffer } from './aime-student-offer.entity';
import { AimeStartupStudent } from './aime-startup-student.entity';
import { Parle } from './parle.entity';
import { Veut } from './veut.entity';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  first_name: string;

  @Column({ length: 255 })
  last_name: string;

  @Column({ length: 255 })
  university: string;

  @Column({ length: 255 })
  linkedin_url: string;

  @Column()
  starting_date: Date;

  @Column()
  ending_date: Date;

  @Column({ length: 255 })
  profil_picture: string;

  @Column()
  birth_date: Date;

  @ManyToOne(() => User, (user) => user.students)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToMany(() => Match, (match) => match.student)
  matches: Match[];

  @OneToMany(() => AimeStudentOffer, (aime) => aime.student)
  likedOffers: AimeStudentOffer[];

  @OneToMany(() => AimeStartupStudent, (aime) => aime.student)
  likedByStartups: AimeStartupStudent[];

  @OneToMany(() => Parle, (parle) => parle.student)
  languages: Parle[];

  @OneToMany(() => Veut, (veut) => veut.student)
  sectorPreferences: Veut[];
}