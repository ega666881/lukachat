import { ChatType } from '@luka/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Validate } from 'class-validator';
import { EntityExistsRule } from '../../../shared/validators/entityExists.validator';
import { usersTable } from '../../../users/schemas/users.schema';
import { ChatDto } from './chat.dto';

export class CreateChatRequest {
  @ApiProperty()
  @IsEnum(ChatType)
  type!: ChatType;

  @ApiProperty()
  @IsString()
  @Validate(EntityExistsRule, [usersTable, 'id'])
  companionId!: string;
}

export class CreateChatResponse {
  @ApiProperty()
  createdChat!: ChatDto;
}
