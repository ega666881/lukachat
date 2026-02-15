import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class RequestEmailCodeRequest {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email!: string;
}

export class RequestEmailCodeResponse {
  @ApiProperty()
  @IsBoolean()
  success!: boolean;
}
