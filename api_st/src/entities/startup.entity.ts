import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { SalesOffer } from './sales-offer.entity';
import { Match } from './match.entity';
import { AimeStartupStudent } from './aime-startup-student.entity';

@Entity('startup')
export class Startup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  company_name: string;

  @Column({ length: 255 })
  siret: string;

  @Column({ length: 2000 })
  description: string;

  @Column({ length: 255 })
  secteur: string;

  @Column()
  is_validated: boolean;

  @ManyToOne(() => User, (user) => user.startups)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToMany(() => SalesOffer, (offer) => offer.startup)
  offers: SalesOffer[];

  @OneToMany(() => Match, (match) => match.startup)
  matches: Match[];

  @OneToMany(() => AimeStartupStudent, (aime) => aime.startup)
  likes: AimeStartupStudent[];
}