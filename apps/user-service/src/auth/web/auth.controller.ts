import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from '../auth.service';
import { AuthCreditailsResponse, EmailAuthRequest } from './dto/email-auth.dto';
import { RefreshTokenRequestDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('email-auth')
  @ApiOkResponse({ type: AuthCreditailsResponse })
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
  @Post('token/refresh')
  @ApiOkResponse({ type: AuthCreditailsResponse })
  async tokenRefresh(@Body() dto: RefreshTokenRequestDto) {
    const refreshTokenResult = await this.service.refreshToken(
      dto.refreshToken,
    );
    if (!refreshTokenResult.ok) {
      throw new HttpException(
        refreshTokenResult.data.reason,
        HttpStatus.BAD_GATEWAY,
      );
    }
    const { accessToken, refreshToken, userId } = refreshTokenResult.payload;
    return {
      accessToken,
      refreshToken,
      userId,
    };
  }
}
