import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Student } from '../../entities/student.entity';
import { CreateStudentDto } from '../../dto/create-student.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LanguageSpoken } from '../../entities/language-spoken.entity';
import { SectorPreference } from '../../entities/sector-preference.entity';
import { Parle } from '../../entities/parle.entity';
import { Veut } from '../../entities/veut.entity';

@Injectable()
export class StudentRegistrationService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(LanguageSpoken)
    private languageRepository: Repository<LanguageSpoken>,
    @InjectRepository(SectorPreference)
    private sectorRepository: Repository<SectorPreference>,
    @InjectRepository(Parle)
    private parleRepository: Repository<Parle>,
    @InjectRepository(Veut)
    private veutRepository: Repository<Veut>,
    private jwtService: JwtService,
  ) {}

async registerStudent(createDto: CreateStudentDto): Promise<Student> {
    // 1. Check if user with this email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createDto.email }
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // 2. Create new user record
    const user = new User();
    user.email = createDto.email;
    // Hash the password before storing
    user.password = await bcrypt.hash(createDto.password, 10);
    user.is_admin = false; // Students are not admins by default

    // 3. Save the user to get the generated ID
    const savedUser = await this.userRepository.save(user);

    // 4. Create student profile linked to the user
    const student = new Student();
    student.first_name = createDto.first_name;
    student.last_name = createDto.last_name;
    student.university = createDto.university;
    student.linkedin_url = createDto.linkedin_url;
    student.starting_date = createDto.starting_date;
    student.ending_date = createDto.ending_date;
    student.profil_picture = createDto.profil_picture || '';
    student.birth_date = createDto.birth_date;
    student.user = savedUser;

    // 5. Save the student to get the generated ID
    const savedStudent = await this.studentRepository.save(student);

    // 6. Process languages
    for (const langName of createDto.languages) {
      // Find or create the language
      let language = await this.languageRepository.findOne({
        where: { language: langName }
      });

      if (!language) {
        language = new LanguageSpoken();
        language.language = langName;
        await this.languageRepository.save(language);
      }

      // Create the association between student and language
      const parle = new Parle();
      parle.student = savedStudent;
      parle.languageSpoken = language;
      await this.parleRepository.save(parle);
    }

    // 7. Process sector preferences
    for (const sectorName of createDto.sector_preferences) {
      // Find or create the sector preference
      let sector = await this.sectorRepository.findOne({
        where: { sector_preference: sectorName }
      });

      if (!sector) {
        sector = new SectorPreference();
        sector.sector_preference = sectorName;
        await this.sectorRepository.save(sector);
      }

      // Create the association between student and sector preference
      const veut = new Veut();
      veut.student = savedStudent;
      veut.sectorPreference = sector;
      await this.veutRepository.save(veut);
    }

    // 8. Reload the student with all relations
    const student_verif = await this.studentRepository.findOne({
      where: { id: savedStudent.id },
      relations: ['languages.languageSpoken', 'sectorPreferences.sectorPreference']
    });

    if (!student_verif) {
      throw new BadRequestException('Student not found');
    }

    return student;
  }
  
  async login(email: string, password: string): Promise<{ token: string, student: any }> {
    try {
      // Récupérer l'utilisateur avec son email
      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Récupérer les informations de l'étudiant
      const student = await this.studentRepository.findOne({
        where: { user: { id: user.id } },
        relations: ['user']
      });

      if (!student) {
        throw new BadRequestException('Student profile not found');
      }

      // Créer le payload JWT
      const payload = { 
        sub: user.id, 
        email: user.email,
        studentId: student.id,
        isAdmin: user.is_admin
      };

      // Générer le token JWT
      const token = this.jwtService.sign(payload);

      // Retourner le token et les informations non sensibles de l'étudiant
      const { user: userInfo, ...studentInfo } = student;
      const { password: _, ...userDetails } = userInfo;

      return { 
        token,
        student: {
          ...studentInfo,
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