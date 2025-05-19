import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from '../../dto/create-offer.dto';
import { UpdateOfferDto } from '../../dto/update-offer.dto';

@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(createOfferDto);
  }

  @Get()
  findAll() {
    return this.offerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offerService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offerService.update(+id, updateOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offerService.remove(+id);
  }
}