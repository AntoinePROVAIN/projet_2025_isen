import { Controller, Get, Param, Delete } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get()
  findAll() {
    return this.matchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchService.findOne(+id);
  }

  @Get('student/:studentId')
  findByStudent(@Param('studentId') studentId: string) {
    return this.matchService.findByStudent(+studentId);
  }

  @Get('startup/:startupId')
  findByStartup(@Param('startupId') startupId: string) {
    return this.matchService.findByStartup(+startupId);
  }

  // @Get('check/:studentId/:startupId')
  // checkMatch(@Param('studentId') studentId: string, @Param('startupId') startupId: string) {
  //   return this.matchService.findByStudentAndStartup(+studentId, +startupId);
  // }
  @Get('check/:studentId/:startupId')
async checkMatch(@Param('studentId') studentId: string, @Param('startupId') startupId: string) {
  const match = await this.matchService.findByStudentAndStartup(+studentId, +startupId);
  return match;
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matchService.remove(+id);
  }
}