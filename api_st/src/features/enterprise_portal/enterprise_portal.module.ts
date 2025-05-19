import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { EnterprisePortalService } from './enterprise_portal.service';
import { EnterprisePortalController } from './enterprise_portal.controller';
import { User } from '../../entities/user.entity';
import { Startup } from '../../entities/startup.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Startup]),
    JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '24h' },
          }),
        }),
  ],
  controllers: [EnterprisePortalController],
  providers: [EnterprisePortalService],
})
export class EnterprisePortalModule {}