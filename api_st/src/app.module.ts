import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentPortalModule } from './features/student_portal/student_portal.module';
import { EnterprisePortalModule } from './features/enterprise_portal/enterprise_portal.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Student } from './entities/student.entity';
import { User } from './entities/user.entity';
import { Startup } from './entities/startup.entity';
import { Match } from './entities/match.entity';
import { AimeStudentOffer } from './entities/aime-student-offer.entity';
import { AimeStartupStudent } from './entities/aime-startup-student.entity';
import { Parle } from './entities/parle.entity';
import { Veut } from './entities/veut.entity';
import { Message } from './entities/message.entity';
import { SalesOffer } from './entities/sales-offer.entity';
import { SalesDocuments } from './entities/sales-document.entity';
import { SectorPreference } from './entities/sector-preference.entity';
import { Commission } from './entities/commission.entity';
import { LanguageSpoken } from './entities/language-spoken.entity';

import { ConfigModule } from '@nestjs/config';
import { OfferModule } from './features/offer/offer.module';
import { DocumentModule } from './features/document_offer/document.module';
import { MatchModule } from './features/match/match.module';
import { LikeModule } from './features/like/like.module';
import { AdminModule } from './features/admin/admin.module';
import { MessageModule } from './features/message/message.module';

@Module({
  imports: [StudentPortalModule, EnterprisePortalModule,TypeOrmModule.forRoot({
    type: 'postgres',            // type de bdd utilisé ( postgres / mysql)
    host: 'ip_serveur',           // ou l'IP de ton serveur
    port: 5432,
    username: 'nom_utilisateur',        // ton nom d'utilisateur
    password: 'mot_de_passe',      // ton mot de passe
    database: 'database', 
    entities: [
      Student,
      User,
      Startup,
      Match,
      AimeStudentOffer,
      AimeStartupStudent,
      Parle,
      Veut,
      Message,
      SalesOffer,
      SalesDocuments,
      SectorPreference,
      Commission,
      LanguageSpoken,
      MessageModule
    ],
    autoLoadEntities: true,
    synchronize: true,           // à mettre sur false en prod
  }),
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  OfferModule,
  DocumentModule,
  MatchModule,
  LikeModule,
  AdminModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
