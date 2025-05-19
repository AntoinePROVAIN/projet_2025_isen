import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Student } from './student.entity';
import { LanguageSpoken } from './language-spoken.entity';

@Entity('parle')
export class Parle {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  language: string;

  @ManyToOne(() => Student, (student) => student.languages)
  @JoinColumn({ name: 'id' })
  student: Student;

  @ManyToOne(() => LanguageSpoken, (language) => language.studentLanguages)
  @JoinColumn({ name: 'language' })
  languageSpoken: LanguageSpoken;
}