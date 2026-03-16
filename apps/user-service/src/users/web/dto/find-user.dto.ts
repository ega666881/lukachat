import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class FindUserRequest {
  @ApiProperty()
  @IsString()
  email!: string;
}

export class FindUserResponse {
  @ApiProperty({ type: UserDto, isArray: true })
  @IsArray()
  foundedUsers!: UserDto[];
}
