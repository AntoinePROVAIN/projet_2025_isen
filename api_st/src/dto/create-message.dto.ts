import { IsNotEmpty, IsInt, IsString, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(2000)
  message_text: string;

  @IsNotEmpty()
  @IsInt()
  match_id: number;

  @IsNotEmpty()
  @IsInt()
  sender_id: number;
}