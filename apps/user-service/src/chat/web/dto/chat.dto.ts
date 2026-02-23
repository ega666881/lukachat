import { Expose, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { ChatType } from '@luka/enums';
import { ApiProperty } from '@nestjs/swagger';
import { ChatUserDto } from '../../../users/web/dto/user.dto';
import { MessageDto } from './message.dto';

export class ChatDto {
  @ApiProperty()
  @IsUUID()
  @Expose()
  readonly id: string;

  @ApiProperty()
  @IsEnum(ChatType)
  @Expose()
  readonly type: ChatType;

  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @Expose()
  readonly createdAt: string;

  @ApiProperty({ type: ChatUserDto, isArray: true })
  @IsArray()
  readonly chatUsers: ChatUserDto[];

  @ApiProperty({ type: MessageDto, isArray: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  @Expose()
  readonly messages?: MessageDto[];
}
