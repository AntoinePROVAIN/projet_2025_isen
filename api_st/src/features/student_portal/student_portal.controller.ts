import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StudentRegistrationService } from './student_portal.service';
import { CreateStudentDto } from '../../dto/create-student.dto';
import { Student } from '../../entities/student.entity';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('student-portal')
export class StudentPortalController {
  constructor(private readonly studentPortalService: StudentRegistrationService) {}
  @Get()
  getHello():string{
    return 'running';
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