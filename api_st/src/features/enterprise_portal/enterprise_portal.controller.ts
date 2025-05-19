import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { EnterprisePortalService } from './enterprise_portal.service';
import { CreateStartupDto } from '../../dto/create-startup.dto';
import { LoginDto } from '../../dto/login.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('enterprise-portal')
export class EnterprisePortalController {
  constructor(private readonly enterprisePortalService: EnterprisePortalService) {}

  @Post('register')
  async register(@Body() createStartupDto: CreateStartupDto) {
    const startup = await this.enterprisePortalService.registerStartup(createStartupDto);
    
    // Retourner la startup sans informations sensibles
    const { user, ...startupInfo } = startup;
    return {
      message: 'Startup enregistrée avec succès. Votre compte est en attente de validation par un administrateur.',
      startup: {
        ...startupInfo,
        email: user.email
      }
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.enterprisePortalService.login(loginDto.email, loginDto.password);
  }

  // Route protégée d'exemple
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    return {
      message: 'Profil startup accessible',
    };
  }
}