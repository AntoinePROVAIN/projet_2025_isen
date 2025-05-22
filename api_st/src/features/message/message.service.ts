import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Message } from '../../entities/message.entity';
import { Match } from '../../entities/match.entity';
import { AimeStudentOffer } from '../../entities/aime-student-offer.entity';
import { CreateMessageDto } from '../../dto/create-message.dto';
import { User } from '../../entities/user.entity';
import { start } from 'repl';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(AimeStudentOffer)
    private readonly aimeStudentOfferRepository: Repository<AimeStudentOffer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = new Message();
    message.message_text = createMessageDto.message_text;
    message.is_read = false;
    message.date_envoie = new Date();
    
    // First, get the match with all necessary relations
    const match = await this.matchRepository.findOne({
      where: { id: createMessageDto.match_id },
      relations: ['student', 'startup', 'student.user', 'startup.user'],
    });
    
    if (!match) {
      throw new NotFoundException(`Match with ID ${createMessageDto.match_id} not found`);
    }
    
    // Get the sender
    const sender = await this.userRepository.findOne({ 
      where: { id: createMessageDto.sender_id }
    });
    
    if (!sender) {
      throw new NotFoundException(`Sender with ID ${createMessageDto.sender_id} not found`);
    }
    
    message.match = match;
    message.sender = sender;
    
    // Determine receiver based on sender ID and match participants
    const studentUserId = match.student?.id;
    const startupUserId = match.startup?.id;
    if (sender.id === studentUserId) {
      // Sender is the student, receiver is the startup
      message.receiver = match.startup.user;
    } else if (sender.id === startupUserId) {
      // Sender is the startup, receiver is the student
      message.receiver = match.student.user;
    } else {
      // Sender is neither the student nor the startup user
      throw new BadRequestException(
        `User with ID ${sender.id} is not part of match ${match.id}. ` +
        `Match participants are student user ID ${studentUserId} and startup user ID ${startupUserId}`
      );
    }
    
    return this.messageRepository.save(message);
  }

  async findAllByMatch(matchId: number): Promise<Message[]> {
    const messages = await this.messageRepository.find({
      where: { match: { id: matchId } },
      relations: ['sender', 'receiver', 'match', 'match.student', 'match.startup', 'match.student.user', 'match.startup.user'],
      order: { date_envoie: 'ASC' },
    });

    // Add sender_type to each message for frontend convenience
    return messages.map(message => {
      const match = message.match;
      const isStudentSender = message.sender.id === match.student?.id;
      
      return {
        ...message,
        sender_id: message.sender.id,
        sender_type: isStudentSender ? 'student' : 'startup'
      } as any;
    });
  }

  async findOne(id: number): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['sender', 'receiver', 'match', 'match.student', 'match.startup', 'match.student.user', 'match.startup.user'],
    });
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    
    // Add sender_type for frontend convenience
    const match = message.match;
    const isStudentSender = message.sender.id === match.student?.id;
    
    return {
      ...message,
      sender_id: message.sender.id,
      sender_type: isStudentSender ? 'student' : 'startup'
    } as any;
  }

  async markAsRead(id: number): Promise<Message> {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    
    message.is_read = true;
    return this.messageRepository.save(message);
  }

  async getUnreadMessageCount(userId: number): Promise<number> {
    return this.messageRepository.count({
      where: {
        receiver: { id: userId },
        is_read: false,
      },
    });
  }

  // Method to be used within transaction
  async createInitialMessageFromMatchInstance(
    match: Match, 
    studentOffer: AimeStudentOffer, 
    entityManager?: EntityManager
  ): Promise<Message> {
    const repo = entityManager ? entityManager.getRepository(Message) : this.messageRepository;
    
    // Create the initial message using the motivation text
    const message = new Message();
    message.message_text = studentOffer.motivation_text;
    message.is_read = false;
    message.date_envoie = new Date();
    message.match = match;
    message.sender = match.student.user;
    message.receiver = match.startup.user;
    
    return repo.save(message);
  }

  async createInitialMessageFromOffer(matchId: number): Promise<Message> {
    const match = await this.matchRepository.findOne({
      where: { id: matchId },
      relations: ['student', 'startup', 'student.user', 'startup.user'],
    });
    
    if (!match) {
      throw new NotFoundException(`Match with ID ${matchId} not found`);
    }
    
    // Find the offer that corresponds to this match
    const studentOffers = await this.aimeStudentOfferRepository.find({
      where: {
        id_student: match.student.id,
        salesOffer: { startup: { id: match.startup.id } }
      },
      relations: ['salesOffer', 'salesOffer.startup', 'student'],
    });
    
    if (!studentOffers || studentOffers.length === 0) {
      throw new NotFoundException(`No student offers found for this match relationship`);
    }
    
    // Use the first found student offer (or you could implement logic to choose the most relevant one)
    const studentOffer = studentOffers[0];
    
    return this.createInitialMessageFromMatchInstance(match, studentOffer);
  }
}