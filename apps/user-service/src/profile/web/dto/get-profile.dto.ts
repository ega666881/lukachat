import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserDto } from '../../../users/web/dto/user.dto';

export class GetProfileResponse {
  @ApiProperty({ type: UserDto })
  @IsNotEmpty()
  user!: UserDto;
}
