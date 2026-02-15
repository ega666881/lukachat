import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendAuthCodeRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code!: string;
}

export class SendAuthCodeResponse {
  @ApiProperty()
  @IsBoolean()
  success!: boolean;
}
