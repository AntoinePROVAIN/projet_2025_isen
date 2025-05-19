import { Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Parle } from './parle.entity';

@Entity('language_spoken')
export class LanguageSpoken {
  @PrimaryColumn({ length: 255 })
  language: string;

  @OneToMany(() => Parle, (parle) => parle.languageSpoken)
  studentLanguages: Parle[];
}