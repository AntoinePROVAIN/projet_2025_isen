import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SalesOffer } from './sales-offer.entity';

@Entity('sales_documents')
export class SalesDocuments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  type: string;

  @Column({ length: 255 })
  file_path: string;

  @ManyToOne(() => SalesOffer, (salesOffer) => salesOffer.documents)
  @JoinColumn({ name: 'id_sales_offer' })
  salesOffer: SalesOffer;
}