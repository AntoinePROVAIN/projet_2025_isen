import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { StudentRegistrationService } from './student_portal.service';
import { CreateStudentDto } from '../../dto/create-student.dto';
import { Student } from '../../entities/student.entity';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('student-portal')
export class StudentPortalController {
  constructor(private readonly studentPortalService: StudentRegistrationService) {}
  
  @Get()
    findAll() {
      return this.studentPortalService.findAll();
    }
  
    @Get(':studentId')
    getStudent(@Param('studentId') studentId: string) {
      return this.studentPortalService.getStudent(+studentId);
    }

  @Post('register')
  create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentPortalService.registerStudent(createStudentDto);
  }

  @Post('login')
  login(@Body() loginDto: { email: string; password: string }): Promise<{ token: string }> {
    return this.studentPortalService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    return { message: 'Profil accessible uniquement avec un token JWT valide' };
  }
}