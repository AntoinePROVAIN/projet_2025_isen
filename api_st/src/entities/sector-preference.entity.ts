import { Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Veut } from './veut.entity';

@Entity('sector_preference')
export class SectorPreference {
  @PrimaryColumn({ length: 255 })
  sector_preference: string;

  @OneToMany(() => Veut, (veut) => veut.sectorPreference)
  studentPreferences: Veut[];
}