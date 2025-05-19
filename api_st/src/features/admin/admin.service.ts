import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  
  async login(email: string, password: string): Promise<{ token: string; admin: any }> {
    try {
      // Récupérer l'utilisateur avec son email
      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Vérifier si l'utilisateur est un admin
      if (!user.is_admin) {
        throw new UnauthorizedException('Access denied: Admin privileges required');
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Créer le payload JWT
      const payload = { 
        sub: user.id, 
        email: user.email,
        isAdmin: user.is_admin
      };

      // Générer le token JWT
      const token = this.jwtService.sign(payload);

      // Retourner le token et les informations non sensibles de l'admin
      const { password: _, ...userDetails } = user;

      return { 
        token,
        admin: {
          user: userDetails
        }
      };
    } catch (error) {
      if (error.status === 401 || error.status === 400) {
        throw error;
      }
      throw new UnauthorizedException('Authentication failed');
    }
  }
}