import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Validate } from 'class-validator';
import { EntityExistsRule } from '../../../shared/validators/entityExists.validator';
import { chatsTable } from '../../schemas/chats.schema';
import { MessageDto } from './message.dto';

export class SendMessageRequest {
  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  @Validate(EntityExistsRule, [chatsTable, 'id'])
  chatId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text!: string;
}

export class SendMessageResponse {
  @ApiProperty()
  @IsNotEmpty()
  message!: MessageDto;
}
