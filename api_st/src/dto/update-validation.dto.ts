import { IsBoolean } from 'class-validator';

export class UpdateValidationDto {
  @IsBoolean()
  is_validated: boolean;
}