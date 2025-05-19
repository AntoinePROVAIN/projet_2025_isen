import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Student } from './student.entity';
import { SalesOffer } from './sales-offer.entity';

@Entity('aime_student_offer')
export class AimeStudentOffer {
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  id_student: number;

  @ManyToOne(() => SalesOffer, (salesOffer) => salesOffer.likes)
  @JoinColumn({ name: 'id' })
  salesOffer: SalesOffer;

  @ManyToOne(() => Student, (student) => student.likedOffers)
  @JoinColumn({ name: 'id_student' })
  student: Student;

  @Column({ length: 2000 })
  motivation_text: string;

  @Column()
  application_date: Date;
}