import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { SalesOffer } from '../../entities/sales-offer.entity';
import { Startup } from '../../entities/startup.entity';
import { SalesDocuments } from '../../entities/sales-document.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SalesOffer, Startup, SalesDocuments])
  ],
  controllers: [OfferController],
  providers: [OfferService],
  exports: [OfferService]
})
export class OfferModule {}