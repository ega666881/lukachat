import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsUUID } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsEmail()
  email!: string;
  @ApiProperty()
  @IsUUID()
  id!: string;
}
