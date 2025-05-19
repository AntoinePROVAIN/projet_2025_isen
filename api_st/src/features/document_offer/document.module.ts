import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { SalesDocuments } from '../../entities/sales-document.entity';
import { SalesOffer } from '../../entities/sales-offer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SalesDocuments, SalesOffer])
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService]
})
export class DocumentModule {}