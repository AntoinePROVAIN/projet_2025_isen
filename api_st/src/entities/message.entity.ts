import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Match } from './match.entity';

@Entity('message')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 2000 })
  message_text: string;

  @Column()
  is_read: boolean;

  @Column()
  date_envoie: Date;

  @ManyToOne(() => User, (user) => user.sentMessages)
  @JoinColumn({ name: 'id_user' })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedMessages)
  @JoinColumn({ name: 'id_user_recoit' })
  receiver: User;

  @ManyToOne(() => Match, (match) => match.messages)
  @JoinColumn({ name: 'id_match' })
  match: Match;
}