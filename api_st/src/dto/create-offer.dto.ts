import { IsNotEmpty, IsString, IsNumber, IsBoolean, Min, Max, Length } from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 2000)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1)
  commission: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  target_customer: string;

  @IsBoolean()
  is_active: boolean = true;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  product_image: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  region: string;

  @IsNotEmpty()
  @IsBoolean()
  remote_or_physical: boolean;

  @IsNotEmpty()
  @IsNumber()
  id_startup: number;

}