import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailAuthRequest {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty()
  @IsString()
  code!: string;
}

export class AuthCreditailsResponse {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accessToken!: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken!: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId!: string;
}
