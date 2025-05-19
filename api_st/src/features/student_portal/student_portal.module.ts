import { Module } from '@nestjs/common';
import { StudentRegistrationService } from './student_portal.service';
import { StudentPortalController } from './student_portal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../../entities/student.entity';
import { User } from '../../entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LanguageSpoken } from '../../entities/language-spoken.entity';
import { SectorPreference } from '../../entities/sector-preference.entity';
import { Parle } from '../../entities/parle.entity';
import { Veut } from '../../entities/veut.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Student, User, LanguageSpoken, SectorPreference,Parle,Veut]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  controllers: [StudentPortalController],
  providers: [StudentRegistrationService],
})
export class StudentPortalModule {}
