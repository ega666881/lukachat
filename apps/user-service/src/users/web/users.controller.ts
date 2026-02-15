import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { UsersService } from '../users.service';
import {
  RequestEmailCodeRequest,
  RequestEmailCodeResponse,
} from './dto/request-email-code.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('email-auth')
  @ApiOkResponse({ type: RequestEmailCodeResponse })
  async emailAuth(@Body() dto: RequestEmailCodeRequest) {
    const requestEmailCodeRequest = await this.userService.requestEmailCode(
      dto.email,
    );
    if (!requestEmailCodeRequest.ok) {
      throw new HttpException(
        requestEmailCodeRequest.data.reason,
        HttpStatus.BAD_GATEWAY,
      );
    }

    return requestEmailCodeRequest.payload;
  }
}
