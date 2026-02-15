import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MailService } from '../mail.service';
import {
  SendAuthCodeRequest,
  SendAuthCodeResponse,
} from './dto/send-auth-code.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiTags('mail')
  @Post('send-auth-code')
  @ApiOkResponse({ type: SendAuthCodeResponse })
  async sendAuthCode(@Body() dto: SendAuthCodeRequest) {
    const sendAuthCodeResult = await this.mailService.sendAuthCode(
      dto.email,
      dto.code,
    );

    if (!sendAuthCodeResult.ok) {
      throw new HttpException(
        sendAuthCodeResult.data.reason,
        HttpStatus.BAD_GATEWAY,
      );
    }

    return sendAuthCodeResult.payload;
  }
}
