import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import User from '../models/users.model';
import { UsersService } from '../users.service';
import { GetUserRequest, GetUserResponse } from './dto/get-user.dto';
import {
  RequestEmailCodeRequest,
  RequestEmailCodeResponse,
} from './dto/request-email-code.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('/')
  @ApiOkResponse({ type: GetUserResponse })
  async getUser(@Query() dto: GetUserRequest) {
    const { email, userId } = dto;
    const getUserResult = await this.service.getUser({ email, userId });
    if (!getUserResult.ok) {
      throw new HttpException(
        getUserResult.data.reason,
        HttpStatus.BAD_GATEWAY,
      );
    }

    return { user: User.toResponse(getUserResult.payload) };
  }

  @Post('email-auth')
  @ApiOkResponse({ type: RequestEmailCodeResponse })
  async emailAuth(@Body() dto: RequestEmailCodeRequest) {
    const requestEmailCodeRequest = await this.service.requestEmailCode(
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
