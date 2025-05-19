import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  login(@Body() loginDto: { email: string; password: string }): Promise<{ token: string; admin: any }> {
    return this.adminService.login(loginDto.email, loginDto.password);
  }
}