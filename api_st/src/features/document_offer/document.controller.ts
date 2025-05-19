import { Controller, Get, Post, Body, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from '../../dto/create-document.dto';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentService.create(createDocumentDto);
  }

  @Get()
  findAll() {
    return this.documentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentService.findOne(+id);
  }

  @Get('offer/:offerId')
  findBySalesOffer(@Param('offerId') offerId: string) {
    return this.documentService.findBySalesOffer(+offerId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentService.remove(+id);
  }
}