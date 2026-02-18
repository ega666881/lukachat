import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ChatDto } from './chat.dto';

export class GetChatByIdRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  chatId!: string;
}

export class GetChatByIdResponse {
  @ApiProperty({ type: ChatDto })
  @IsNotEmpty()
  chat!: ChatDto;
}
