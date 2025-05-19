import { IsOptional, IsString, IsNumber, IsBoolean, Min, Max, Length } from 'class-validator';

export class UpdateOfferDto {
  @IsOptional()
  @IsString()
  @Length(1, 255)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(1, 2000)
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  commission?: number;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  target_customer?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  product_image?: string;

  @IsOptional()
  @IsNumber()
  id_startup?: number;
}