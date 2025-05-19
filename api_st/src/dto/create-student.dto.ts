import { IsArray , IsEmail, IsNotEmpty, IsDateString, IsUrl, IsOptional, MinLength } from 'class-validator';

export class CreateStudentDto {
  // User info
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  
  // Student profile info
  @IsNotEmpty()
  first_name: string;
  
  @IsNotEmpty()
  last_name: string;
  
  @IsNotEmpty()
  university: string;
  
  @IsUrl()
  linkedin_url: string;
  
  @IsDateString()
  starting_date: Date;
  
  @IsDateString()
  ending_date: Date;
  
  @IsOptional()
  profil_picture?: string;
  
  @IsDateString()
  birth_date: Date;

  @IsArray()
  @IsNotEmpty()
  languages: string[];
  
  @IsArray()
  @IsNotEmpty()
  sector_preferences: string[];
}