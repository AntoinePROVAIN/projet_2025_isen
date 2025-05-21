import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { AimeStudentOffer } from '../../entities/aime-student-offer.entity';
import { AimeStartupStudent } from '../../entities/aime-startup-student.entity';
import { Match } from '../../entities/match.entity';
import { Student } from '../../entities/student.entity';
import { Startup } from '../../entities/startup.entity';
import { SalesOffer } from '../../entities/sales-offer.entity';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
     MessageModule,
    TypeOrmModule.forFeature([
      AimeStudentOffer,
      AimeStartupStudent,
      Match,
      Student,
      Startup,
      SalesOffer,
     
    ])
  ],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService]
})
export class LikeModule {}