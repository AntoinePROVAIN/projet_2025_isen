import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesOffer } from '../../entities/sales-offer.entity';
import { CreateOfferDto } from '../../dto/create-offer.dto';
import { UpdateOfferDto } from '../../dto/update-offer.dto';
import { Startup } from '../../entities/startup.entity';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(SalesOffer)
    private salesOfferRepository: Repository<SalesOffer>,
    @InjectRepository(Startup)
    private startupRepository: Repository<Startup>
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<SalesOffer> {
    // Check if startup exists
    const startup = await this.startupRepository.findOne({ where: { id: createOfferDto.id_startup } });
    if (!startup) {
      throw new NotFoundException(`Startup with ID ${createOfferDto.id_startup} not found`);
    }

    const newOffer = this.salesOfferRepository.create({
      title: createOfferDto.title,
      description: createOfferDto.description,
      price: createOfferDto.price,
      commission: createOfferDto.commission,
      target_customer: createOfferDto.target_customer,
      is_active: createOfferDto.is_active,
      product_image: createOfferDto.product_image,
      region: createOfferDto.region,
      remote_or_physical: createOfferDto.remote_or_physical,
      startup: startup
    });

    return this.salesOfferRepository.save(newOffer);
  }

  async findAll(): Promise<SalesOffer[]> {
    return this.salesOfferRepository.find({
      relations: ['startup', 'documents']
    });
  }

  async findOne(id: number): Promise<SalesOffer> {
    const offer = await this.salesOfferRepository.findOne({
      where: { id },
      relations: ['startup', 'documents']
    });

    if (!offer) {
      throw new NotFoundException(`Sales offer with ID ${id} not found`);
    }

    return offer;
  }

  async update(id: number, updateOfferDto: UpdateOfferDto): Promise<SalesOffer> {
    const offer = await this.findOne(id);

    // Check if startup exists if it's being updated
    if (updateOfferDto.id_startup) {
      const startup = await this.startupRepository.findOne({ where: { id: updateOfferDto.id_startup } });
      if (!startup) {
        throw new NotFoundException(`Startup with ID ${updateOfferDto.id_startup} not found`);
      }
      offer.startup = startup;
      delete updateOfferDto.id_startup; // Remove this property as we're setting it directly
    }

    // Update the offer properties
    Object.assign(offer, updateOfferDto);

    return this.salesOfferRepository.save(offer);
  }

  async remove(id: number): Promise<void> {
    const offer = await this.findOne(id); // This will throw if not found
    await this.salesOfferRepository.remove(offer);
  }
}