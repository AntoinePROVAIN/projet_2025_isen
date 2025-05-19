import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Student } from './student.entity';
import { SectorPreference } from './sector-preference.entity';

@Entity('veut')
export class Veut {
  @PrimaryColumn()
  sector_preference: string;

  @PrimaryColumn()
  id: number;

  @ManyToOne(() => SectorPreference, (sector) => sector.studentPreferences)
  @JoinColumn({ name: 'sector_preference' })
  sectorPreference: SectorPreference;

  @ManyToOne(() => Student, (student) => student.sectorPreferences)
  @JoinColumn({ name: 'id' })
  student: Student;
}