import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from '../auth.service';
import { EmailAuthRequest, EmailAuthResponse } from './dto/email-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('email-auth')
  @ApiOkResponse({ type: EmailAuthResponse })
  async emailAuth(@Body() dto: EmailAuthRequest) {
    const { email, code } = dto;
    const emailAuthResult = await this.service.emailAuth(email, code);

    if (!emailAuthResult.ok) {
      throw new HttpException(
        emailAuthResult.data.reason,
        HttpStatus.BAD_GATEWAY,
      );
    }

    const { accessToken, refreshToken, userId } = emailAuthResult.payload;

    return {
      accessToken,
      refreshToken,
      userId,
    };
  }
}
