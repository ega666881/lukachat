import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { ChatDto } from './chat.dto';

export class GetChatsRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId!: string;
}

export class GetChatsResponse {
  @ApiProperty({ type: ChatDto, isArray: true })
  @IsArray()
  @IsNotEmpty()
  chats!: ChatDto[];
}
