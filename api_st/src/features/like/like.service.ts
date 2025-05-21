import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { AimeStudentOffer } from '../../entities/aime-student-offer.entity';
import { AimeStartupStudent } from '../../entities/aime-startup-student.entity';
import { Match } from '../../entities/match.entity';
import { Student } from '../../entities/student.entity';
import { Startup } from '../../entities/startup.entity';
import { SalesOffer } from '../../entities/sales-offer.entity';
import { CreateStudentLikeDto } from '../../dto/create-student-like.dto';
import { CreateStartupLikeDto } from '../../dto/create-startup-like.dto';
import { MessageService } from '../message/message.service';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(AimeStudentOffer)
    private studentLikeRepository: Repository<AimeStudentOffer>,
    @InjectRepository(AimeStartupStudent)
    private startupLikeRepository: Repository<AimeStartupStudent>,
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Startup)
    private startupRepository: Repository<Startup>,
    @InjectRepository(SalesOffer)
    private salesOfferRepository: Repository<SalesOffer>,
    private dataSource: DataSource,
    private readonly messageService: MessageService,
  ) {}

  async studentLikesOffer(createStudentLikeDto: CreateStudentLikeDto): Promise<{ like: AimeStudentOffer; match?: Match }> {
    return await this.dataSource.transaction(async manager => {
      // Check if student exists
      const student = await manager.findOne(Student, { where: { id: createStudentLikeDto.id_student } });
      if (!student) {
        throw new NotFoundException(`Student with ID ${createStudentLikeDto.id_student} not found`);
      }

      // Check if sales offer exists
      const salesOffer = await manager.findOne(SalesOffer, { 
        where: { id: createStudentLikeDto.id },
        relations: ['startup']
      });
      if (!salesOffer) {
        throw new NotFoundException(`Sales offer with ID ${createStudentLikeDto.id} not found`);
      }

      // Check if student already liked this offer
      const existingLike = await manager.findOne(AimeStudentOffer, {
        where: { 
          id: createStudentLikeDto.id,
          id_student: createStudentLikeDto.id_student 
        }
      });
      if (existingLike) {
        throw new ConflictException('Student has already liked this offer');
      }

      // Create the student like
      const studentLike = manager.create(AimeStudentOffer, {
        id: createStudentLikeDto.id,
        id_student: createStudentLikeDto.id_student,
        motivation_text: createStudentLikeDto.motivation_text,
        application_date: new Date(),
        salesOffer: salesOffer,
        student: student
      });

      const savedLike = await manager.save(AimeStudentOffer, studentLike);

      // Check if startup has already liked this student
      const startupLike = await manager.findOne(AimeStartupStudent, {
        where: { 
          id: createStudentLikeDto.id_student, // student id
          id_startup: salesOffer.startup.id    // startup id from the offer
        }
      });

      let match: Match | undefined;

      // If startup already liked the student, create a match
      if (startupLike) {
        // Check if match already exists
        const existingMatch = await manager.findOne(Match, {
          where: {
            student: { id: createStudentLikeDto.id_student },
            startup: { id: salesOffer.startup.id }
          }
        });

         if (!existingMatch) {
          match = manager.create(Match, {
            date_match: new Date(),
            student: student,
            startup: salesOffer.startup
          });
          match = await manager.save(Match, match);
          
          // Load the full match with relations for creating the message
          const fullMatch = await manager.findOne(Match, {
            where: { id: match.id },
            relations: ['student', 'startup', 'student.user', 'startup.user']
          });
          
          if (fullMatch) {
            await this.messageService.createInitialMessageFromMatchInstance(
              fullMatch, 
              savedLike, 
              manager
            );
          }
        }
      }

      return { like: savedLike, match };
    });
  }

  async startupLikesStudent(createStartupLikeDto: CreateStartupLikeDto): Promise<{ like: AimeStartupStudent; matches?: Match[] }> {
    return await this.dataSource.transaction(async manager => {
      // Check if startup exists
      const startup = await manager.findOne(Startup, { where: { id: createStartupLikeDto.id_startup } });
      if (!startup) {
        throw new NotFoundException(`Startup with ID ${createStartupLikeDto.id_startup} not found`);
      }

      // Check if student exists
      const student = await manager.findOne(Student, { where: { id: createStartupLikeDto.id } });
      if (!student) {
        throw new NotFoundException(`Student with ID ${createStartupLikeDto.id} not found`);
      }

      // Check if startup already liked this student
      const existingLike = await manager.findOne(AimeStartupStudent, {
        where: { 
          id: createStartupLikeDto.id,
          id_startup: createStartupLikeDto.id_startup 
        }
      });
      if (existingLike) {
        throw new ConflictException('Startup has already liked this student');
      }

      // Create the startup like
      const startupLike = manager.create(AimeStartupStudent, {
        id: createStartupLikeDto.id,
        id_startup: createStartupLikeDto.id_startup,
        like_date: new Date(),
        student: student,
        startup: startup
      });

      const savedLike = await manager.save(AimeStartupStudent, startupLike);

      // Check if student has liked any offers from this startup
      const studentLikes = await manager.find(AimeStudentOffer, {
        where: { 
          id_student: createStartupLikeDto.id,
          salesOffer: { startup: { id: createStartupLikeDto.id_startup } }
        },
        relations: ['salesOffer', 'salesOffer.startup']
      });

      const matches: Match[] = [];

      // Create matches for each offer the student liked from this startup
      for (const studentLike of studentLikes) {
        // Check if match already exists
        const existingMatch = await manager.findOne(Match, {
          where: {
            student: { id: createStartupLikeDto.id },
            startup: { id: createStartupLikeDto.id_startup }
          }
        });

         if (!existingMatch) {
          const match = manager.create(Match, {
            date_match: new Date(),
            student: student,
            startup: startup
          });
          const savedMatch = await manager.save(Match, match);
          
          // Load the full match with relations for creating the message
          const fullMatch = await manager.findOne(Match, {
            where: { id: savedMatch.id },
            relations: ['student', 'startup', 'student.user', 'startup.user']
          });
          
          if (fullMatch) {
            await this.messageService.createInitialMessageFromMatchInstance(
              fullMatch, 
              studentLike, 
              manager
            );
            matches.push(savedMatch);
          }
        }
      }

      return { like: savedLike, matches: matches.length > 0 ? matches : undefined };
    });
  }

  async getStudentLikes(studentId: number): Promise<AimeStudentOffer[]> {
    return this.studentLikeRepository.find({
      where: { id_student: studentId },
      relations: ['salesOffer', 'salesOffer.startup']
    });
  }

  async getStartupLikes(startupId: number): Promise<AimeStartupStudent[]> {
    return this.startupLikeRepository.find({
      where: { id_startup: startupId },
      relations: ['student']
    });
  }

  async getOfferLikes(offerId: number): Promise<AimeStudentOffer[]> {
    return this.studentLikeRepository.find({
      where: { id: offerId },
      relations: ['student']
    });
  }

  async removeStudentLike(offerId: number, studentId: number): Promise<void> {
    const like = await this.studentLikeRepository.findOne({
      where: { id: offerId, id_student: studentId }
    });
    
    if (!like) {
      throw new NotFoundException('Like not found');
    }

    await this.studentLikeRepository.remove(like);
  }

  async removeStartupLike(studentId: number, startupId: number): Promise<void> {
    const like = await this.startupLikeRepository.findOne({
      where: { id: studentId, id_startup: startupId }
    });
    
    if (!like) {
      throw new NotFoundException('Like not found');
    }

    await this.startupLikeRepository.remove(like);
  }
}