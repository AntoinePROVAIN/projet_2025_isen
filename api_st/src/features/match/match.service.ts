import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from '../../entities/match.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>
  ) {}

  async findAll(): Promise<Match[]> {
    return this.matchRepository.find({
      relations: ['student', 'startup', 'messages']
    });
  }

  async findByStudent(studentId: number): Promise<Match[]> {
    return this.matchRepository.find({
      where: { student: { id: studentId } },
      relations: ['student', 'startup', 'messages']
    });
  }

  async findByStartup(startupId: number): Promise<Match[]> {
    return this.matchRepository.find({
      where: { startup: { id: startupId } },
      relations: ['student', 'startup', 'messages']
    });
  }

  async findOne(id: number): Promise<Match> {
    const match = await this.matchRepository.findOne({
      where: { id },
      relations: ['student', 'startup', 'messages']
    });

    if (!match) {
      throw new NotFoundException(`Match with ID ${id} not found`);
    }

    return match;
  }

  async findByStudentAndStartup(studentId: number, startupId: number): Promise<Match | null> {
    return this.matchRepository.findOne({
      where: { 
        student: { id: studentId },
        startup: { id: startupId }
      },
      relations: ['student', 'startup', 'messages']
    });
  }

  async remove(id: number): Promise<void> {
    const match = await this.findOne(id);
    await this.matchRepository.remove(match);
  }
}