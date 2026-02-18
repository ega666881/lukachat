import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ChatDto } from './chat.dto';

export class GetChatsRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId!: string;
}

export class GetChatsResponse {
  @ApiProperty({ type: ChatDto })
  @IsNotEmpty()
  chats!: ChatDto[];
}
