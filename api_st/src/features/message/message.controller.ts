import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from '../../dto/create-message.dto';
import { Message } from '../../entities/message.entity';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.createMessage(createMessageDto);
  }

  @Get('match/:matchId')
  findAllByMatch(@Param('matchId') matchId: string): Promise<Message[]> {
    return this.messageService.findAllByMatch(+matchId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Message> {
    return this.messageService.findOne(+id);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string): Promise<Message> {
    return this.messageService.markAsRead(+id);
  }

  @Get('unread/count/:userId')
  getUnreadCount(@Param('userId') userId: string): Promise<number> {
    return this.messageService.getUnreadMessageCount(+userId);
  }

  @Post('match/:matchId/initial')
  createInitialMessage(@Param('matchId') matchId: string): Promise<Message> {
    return this.messageService.createInitialMessageFromOffer(+matchId);
  }
}