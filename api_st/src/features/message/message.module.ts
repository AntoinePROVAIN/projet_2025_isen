import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Message } from '../../entities/message.entity';
import { Match } from '../../entities/match.entity';
import { User } from '../../entities/user.entity';
import { AimeStudentOffer } from '../../entities/aime-student-offer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Match, User, AimeStudentOffer]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}