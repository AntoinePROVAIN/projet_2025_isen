import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('commission')
export class Commission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  commision_amount: number;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  platform_fee_amout: number;

  @Column()
  sale_date: Date;

  @Column()
  payment_status: boolean;
}