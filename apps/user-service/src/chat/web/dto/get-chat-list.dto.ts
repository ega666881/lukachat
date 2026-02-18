import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { ChatDto } from './chat.dto';

export class GetChatListResponse {
  @ApiProperty({ type: ChatDto, isArray: true })
  @IsArray()
  chats!: ChatDto[];
}
