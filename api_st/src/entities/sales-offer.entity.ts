import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Startup } from './startup.entity';
import { SalesDocuments } from './sales-document.entity';
import { AimeStudentOffer } from './aime-student-offer.entity';

@Entity('sales_offer')
export class SalesOffer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 2000 })
  description: string;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  price: number;

  @Column({ type: 'float' })
  commission: number;

  @Column({ length: 255 })
  target_customer: string;

  @Column()
  is_active: boolean;

  @Column({ length: 255 })
  product_image: string;

  @ManyToOne(() => Startup, (startup) => startup.offers)
  @JoinColumn({ name: 'id_startup' })
  startup: Startup;

  @OneToMany(() => SalesDocuments, (document) => document.salesOffer)
  documents: SalesDocuments[];

  @OneToMany(() => AimeStudentOffer, (aime) => aime.salesOffer)
  likes: AimeStudentOffer[];
}