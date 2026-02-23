import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsUUID()
  id!: string;

  @ApiProperty({ type: String })
  @IsString()
  avatarUrl!: string | null;
}

export class ChatUserDto extends UserDto {
  @ApiProperty()
  @IsBoolean()
  isSelf!: boolean;
}
