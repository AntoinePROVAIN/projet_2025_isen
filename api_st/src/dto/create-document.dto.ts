import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateDocumentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  file_path: string;

  @IsNotEmpty()
  @IsNumber()
  id_sales_offer: number;
}