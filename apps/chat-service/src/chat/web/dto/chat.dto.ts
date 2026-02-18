import { Expose, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { ChatType } from '@luka/enums';
import { ApiProperty } from '@nestjs/swagger';
import { MessageDto } from './message.dto';

export class ChatDto {
  @ApiProperty()
  @IsUUID()
  @Expose()
  readonly id: string;

  @ApiProperty({ enum: ChatType, enumName: 'ChatType' })
  @IsEnum(ChatType)
  @Expose()
  readonly type: ChatType;

  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @Expose()
  readonly createdAt: Date;

  @ApiProperty({ type: MessageDto, isArray: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  @Expose()
  readonly messages?: MessageDto[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  readonly chatUsers: string[];
}
