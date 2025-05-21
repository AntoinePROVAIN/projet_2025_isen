// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Message } from '../../entities/message.entity';
// import { Match } from '../../entities/match.entity';
// import { AimeStudentOffer } from '../../entities/aime-student-offer.entity';
// import { CreateMessageDto } from '../../dto/create-message.dto';
// import { User } from '../../entities/user.entity';

// @Injectable()
// export class MessageService {
//   constructor(
//     @InjectRepository(Message)
//     private readonly messageRepository: Repository<Message>,
//     @InjectRepository(Match)
//     private readonly matchRepository: Repository<Match>,
//     @InjectRepository(AimeStudentOffer)
//     private readonly aimeStudentOfferRepository: Repository<AimeStudentOffer>,
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//   ) {}

//   async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
//     const message = new Message();
//     message.message_text = createMessageDto.message_text;
//     message.is_read = false;
//     message.date_envoie = new Date();
    
//     // Set sender, receiver and match
//     const match = await this.matchRepository.findOne({
//       where: { id: createMessageDto.match_id },
//       relations: ['student', 'startup', 'student.user', 'startup.user'],
//     });
    
//     if (!match) {
//       throw new Error('Match not found');
//     }
    
//     message.match = match;
    
//     const sender = await this.userRepository.findOne({ 
//       where: { id: createMessageDto.sender_id } 
//     });
    
//     if (!sender) {
//       throw new Error('Sender not found');
//     }
    
//     message.sender = sender;
    
//     // Determine receiver based on sender
//     if (sender.id === match.student.user.id) {
//       message.receiver = match.startup.user;
//     } else if (sender.id === match.startup.user.id) {
//       message.receiver = match.student.user;
//     } else {
//       throw new Error('Sender is not part of this match');
//     }
    
//     return this.messageRepository.save(message);
//   }

//   async findAllByMatch(matchId: number): Promise<Message[]> {
//     return this.messageRepository.find({
//       where: { match: { id: matchId } },
//       relations: ['sender', 'receiver'],
//       order: { date_envoie: 'ASC' },
//     });
//   }

//   async findOne(id: number): Promise<Message> {
//     const message = await this.messageRepository.findOne({
//       where: { id },
//       relations: ['sender', 'receiver', 'match'],
//     });
//     if (!message) {
//       throw new Error('Message not found');
//     }
//     return message;
//   }

//   async markAsRead(id: number): Promise<Message> {
//     const message = await this.messageRepository.findOne({ where: { id } });
//     if (!message) {
//       throw new Error('Message not found');
//     }
    
//     message.is_read = true;
//     return this.messageRepository.save(message);
//   }

//   async getUnreadMessageCount(userId: number): Promise<number> {
//     return this.messageRepository.count({
//       where: {
//         receiver: { id: userId },
//         is_read: false,
//       },
//     });
//   }

//   async createInitialMessageFromOffer(matchId: number): Promise<Message> {
//     const match = await this.matchRepository.findOne({
//       where: { id: matchId },
//       relations: ['student', 'startup', 'student.user', 'startup.user'],
//     });
    
//     if (!match) {
//       throw new Error('Match not found');
//     }
    
//     // Find the offer that corresponds to this match
//     const studentOffer = await this.aimeStudentOfferRepository.findOne({
//       where: {
//         id_student: match.student.id,
//         // Assuming the offer is related to the startup somehow
//         // This may need adjustment based on your actual data model
//       },
//       relations: ['salesOffer', 'student'],
//     });
    
//     if (!studentOffer) {
//       throw new Error('Student offer not found');
//     }
    
//     // Create the initial message using the motivation text
//     const message = new Message();
//     message.message_text = studentOffer.motivation_text;
//     message.is_read = false;
//     message.date_envoie = new Date();
//     message.match = match;
//     message.sender = match.student.user;
//     message.receiver = match.startup.user;
    
//     return this.messageRepository.save(message);
//   }
// }



import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Message } from '../../entities/message.entity';
import { Match } from '../../entities/match.entity';
import { AimeStudentOffer } from '../../entities/aime-student-offer.entity';
import { CreateMessageDto } from '../../dto/create-message.dto';
import { User } from '../../entities/user.entity';

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
    
    // Set sender, receiver and match
    const match = await this.matchRepository.findOne({
      where: { id: createMessageDto.match_id },
      relations: ['student', 'startup', 'student.user', 'startup.user'],
    });
    
    if (!match) {
      throw new NotFoundException(`Match with ID ${createMessageDto.match_id} not found`);
    }
    
    message.match = match;
    
    const sender = await this.userRepository.findOne({ 
      where: { id: createMessageDto.sender_id } 
    });
    
    if (!sender) {
      throw new NotFoundException(`Sender with ID ${createMessageDto.sender_id} not found`);
    }
    
    message.sender = sender;
    
    // Determine receiver based on sender
    if (sender.id === match.student.user.id) {
      message.receiver = match.startup.user;
    } else if (sender.id === match.startup.user.id) {
      message.receiver = match.student.user;
    } else {
      throw new Error('Sender is not part of this match');
    }
    
    return this.messageRepository.save(message);
  }

  async findAllByMatch(matchId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: { match: { id: matchId } },
      relations: ['sender', 'receiver'],
      order: { date_envoie: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['sender', 'receiver', 'match'],
    });
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    return message;
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