import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { MessageDto } from './message.dto';

export class SendMessageRequest {
  @ApiProperty()
  @IsString()
  text!: string;

  @ApiProperty()
  @IsString()
  chatId!: string;
}

export class SendMessageResponse {
  @ApiProperty()
  @IsNotEmpty()
  message!: MessageDto;
}
