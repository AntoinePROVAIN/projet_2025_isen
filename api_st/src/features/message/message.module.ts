import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Message } from '../../entities/message.entity';
import { Match } from '../../entities/match.entity';
import { User } from '../../entities/user.entity';
import { Student } from '../../entities/student.entity';
import { Startup } from 'src/entities/startup.entity';
import { AimeStudentOffer } from '../../entities/aime-student-offer.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '24h' },
        }),
      }),
    TypeOrmModule.forFeature([Message, Match, User, AimeStudentOffer, Student, Startup]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}