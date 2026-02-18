import { ChatType } from '@luka/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ChatDto } from './chat.dto';

export class CreateChatRequest {
  @ApiProperty()
  @IsEnum(ChatType)
  @IsNotEmpty()
  type!: ChatType;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  addingUserIds!: string[];
}

export class CreateChatResponse {
  @ApiProperty()
  chat!: ChatDto;
}
