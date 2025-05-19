import { IsEmail, IsNotEmpty, MinLength, IsString, MaxLength, IsBoolean } from 'class-validator';

export class CreateStartupDto {
  // User info
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  
  // Startup profile info
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  company_name: string;
  
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  siret: string;
  
  @IsNotEmpty()
  @IsString()
  @MaxLength(2000)
  description: string;
  
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  secteur: string;
  
  @IsBoolean()
  is_validated: boolean = true;
}