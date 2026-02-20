import { right } from '@luka/monads';
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import type { CurrentUserPayload } from '../../auth/interfaces/jwt-payload.interface';
import { JwtAuthGuard } from '../../auth/jwt/jwt.auth.guard';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import User from '../models/users.model';
import { UsersService } from '../users.service';
import { GetUserRequest, GetUserResponse } from './dto/get-user.dto';
import {
  RequestEmailCodeRequest,
  RequestEmailCodeResponse,
} from './dto/request-email-code.dto';
import { UploadAvatarResponse } from './dto/upload-avatar.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('/upload/avatar')
  @UseInterceptors(FileInterceptor('photo'))
  @ApiOkResponse({ type: UploadAvatarResponse })
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['photo'],
      properties: {
        photos: {
          type: 'string',
          format: 'binary',
          description: 'Файл изображения (jpeg, png, webp)',
        },
      },
    },
  })
  async uploadPhoto(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/(jpeg|png|jpg|webp)' }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @CurrentUser()
    user: CurrentUserPayload,
  ) {
    const { userId } = user;
    const result = await this.service.uploadAvatar(file, userId);
    if (!result.ok) {
      throw new HttpException(result.data.reason, HttpStatus.BAD_GATEWAY);
    }
    return right(result.payload);
  }

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

  @Post('request-email-code')
  @ApiOkResponse({ type: RequestEmailCodeResponse })
  async requestEmailCode(@Body() dto: RequestEmailCodeRequest) {
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
