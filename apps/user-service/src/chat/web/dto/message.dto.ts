import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class MessageDto {
  @ApiProperty()
  @IsUUID()
  @Expose()
  readonly id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  readonly text: string;

  @ApiProperty()
  @IsUUID()
  @Expose()
  readonly userId: string;

  @ApiProperty()
  @IsUUID()
  @Expose()
  readonly chatId: string;

  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @Expose()
  readonly createdAt: string;
}
