import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStartupLikeDto {
  @IsNotEmpty()
  @IsNumber()
  id: number; // student id

  @IsNotEmpty()
  @IsNumber()
  id_startup: number;
}