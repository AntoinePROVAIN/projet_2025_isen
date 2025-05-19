import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateStudentLikeDto {
  @IsNotEmpty()
  @IsNumber()
  id: number; // sales_offer id

  @IsNotEmpty()
  @IsNumber()
  id_student: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 2000)
  motivation_text: string;
}