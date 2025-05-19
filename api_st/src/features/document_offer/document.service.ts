import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesDocuments } from '../../entities/sales-document.entity';
import { SalesOffer } from '../../entities/sales-offer.entity';
import { CreateDocumentDto } from '../../dto/create-document.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(SalesDocuments)
    private salesDocumentRepository: Repository<SalesDocuments>,
    @InjectRepository(SalesOffer)
    private salesOfferRepository: Repository<SalesOffer>
  ) {}

  async create(createDocumentDto: CreateDocumentDto): Promise<SalesDocuments> {
    // Check if sales offer exists
    const salesOffer = await this.salesOfferRepository.findOne({ 
      where: { id: createDocumentDto.id_sales_offer } 
    });
    
    if (!salesOffer) {
      throw new NotFoundException(`Sales offer with ID ${createDocumentDto.id_sales_offer} not found`);
    }

    const newDocument = this.salesDocumentRepository.create({
      name: createDocumentDto.name,
      type: createDocumentDto.type,
      file_path: createDocumentDto.file_path,
      salesOffer: salesOffer
    });

    return this.salesDocumentRepository.save(newDocument);
  }

  async findAll(): Promise<SalesDocuments[]> {
    return this.salesDocumentRepository.find({
      relations: ['salesOffer']
    });
  }

  async findOne(id: number): Promise<SalesDocuments> {
    const document = await this.salesDocumentRepository.findOne({
      where: { id },
      relations: ['salesOffer']
    });

    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    return document;
  }

  async findBySalesOffer(offerId: number): Promise<SalesDocuments[]> {
    // Check if sales offer exists
    const salesOffer = await this.salesOfferRepository.findOne({ 
      where: { id: offerId } 
    });
    
    if (!salesOffer) {
      throw new NotFoundException(`Sales offer with ID ${offerId} not found`);
    }

    return this.salesDocumentRepository.find({
      where: { salesOffer: { id: offerId } },
      relations: ['salesOffer']
    });
  }

  async remove(id: number): Promise<void> {
    const document = await this.findOne(id);
    await this.salesDocumentRepository.remove(document);
  }
}