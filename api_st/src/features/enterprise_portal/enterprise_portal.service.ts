import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Startup } from '../../entities/startup.entity';
import { CreateStartupDto } from '../../dto/create-startup.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EnterprisePortalService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Startup)
    private startupRepository: Repository<Startup>,
    private jwtService: JwtService,
  ) {}

  async registerStartup(createDto: CreateStartupDto): Promise<Startup> {
    try {
      // 1. Vérifier si un utilisateur avec cet email existe déjà
      const existingUser = await this.userRepository.findOne({
        where: { email: createDto.email }
      });

      if (existingUser) {
        throw new BadRequestException('Un utilisateur avec cet email existe déjà');
      }

      // 2. Créer un nouvel utilisateur
      const user = new User();
      user.email = createDto.email;
      // Hasher le mot de passe avant stockage
      user.password = await bcrypt.hash(createDto.password, 10);
      user.is_admin = false; // Les startups ne sont pas admin par défaut
      
      // 3. Sauvegarder l'utilisateur pour obtenir l'ID
      const savedUser = await this.userRepository.save(user);

      // 4. Créer le profil startup lié à l'utilisateur
      const startup = new Startup();
      startup.company_name = createDto.company_name;
      startup.siret = createDto.siret;
      startup.description = createDto.description;
      startup.secteur = createDto.secteur;
      startup.is_validated = false; // Par défaut à false, nécessite validation par admin
      startup.user = savedUser;

      // 5. Sauvegarder et retourner la startup
      return this.startupRepository.save(startup);
    } catch (error) {
      // Gestion améliorée des erreurs
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(error.message || 'Échec de l\'enregistrement de la startup');
    }
  }
  
  async login(email: string, password: string): Promise<{ token: string, startup: any }> {
    try {
      // Récupérer l'utilisateur avec son email
      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        throw new UnauthorizedException('Identifiants invalides');
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Identifiants invalides');
      }

      // Récupérer les informations de la startup
      const startup = await this.startupRepository.findOne({
        where: { user: { id: user.id } },
        relations: ['user']
      });

      if (!startup) {
        throw new BadRequestException('Profil startup non trouvé');
      }

      // Vérifier si la startup est validée
      if (!startup.is_validated) {
        throw new UnauthorizedException('Votre compte startup est en attente de validation par un administrateur');
      }

      // Créer le payload JWT
      const payload = { 
        sub: user.id, 
        email: user.email,
        startupId: startup.id,
        isAdmin: user.is_admin
      };

      // Générer le token JWT
      const token = this.jwtService.sign(payload);

      // Retourner le token et les informations non sensibles de la startup
      const { user: userInfo, ...startupInfo } = startup;
      const { password: _, ...userDetails } = userInfo;

      return { 
        token,
        startup: {
          ...startupInfo,
          user: userDetails
        }
      };
    } catch (error) {
      if (error instanceof UnauthorizedException || error instanceof BadRequestException) {
        throw error;
      }
      throw new UnauthorizedException('Authentification échouée');
    }
  }

  async getAllEnterprises(): Promise<{ startups: any[], total: number }> {
    try {
      const startups = await this.startupRepository.find({
        relations: ['user']
      });

      // Filtrer les informations sensibles
      const filteredStartups = startups.map(startup => {
        const { user, ...startupInfo } = startup;
        const { password, ...userInfo } = user;
        
        return {
          ...startupInfo,
          user: userInfo
        };
      });

      return {
        startups: filteredStartups,
        total: startups.length
      };
    } catch (error) {
      throw new BadRequestException('Erreur lors de la récupération des entreprises');
    }
  }

  // Nouvelle méthode pour mettre à jour le statut de validation
  async updateValidationStatus(startupId: number, isValidated: boolean): Promise<{ message: string, startup: any }> {
    try {
      // Vérifier si la startup existe
      const startup = await this.startupRepository.findOne({
        where: { id: startupId },
        relations: ['user']
      });

      if (!startup) {
        throw new NotFoundException('Startup non trouvée');
      }

      // Mettre à jour le statut de validation
      startup.is_validated = isValidated;
      await this.startupRepository.save(startup);

      // Récupérer la startup mise à jour sans informations sensibles
      const { user, ...startupInfo } = startup;
      const { password, ...userInfo } = user;

      return {
        message: `Statut de validation ${isValidated ? 'activé' : 'désactivé'} avec succès`,
        startup: {
          ...startupInfo,
          user: userInfo
        }
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erreur lors de la mise à jour du statut de validation');
    }
  }

  async getEnterprise(enterpriseId: number): Promise<Startup> {
      const enterprise = await this.startupRepository.findOne({
        where: { id: enterpriseId },
        relations: ['user']
      });
      if (!enterprise) {
        throw new BadRequestException('Startup not found');
      }
      return enterprise;
    }
}