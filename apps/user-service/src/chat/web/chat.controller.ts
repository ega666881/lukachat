import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import type { CurrentUserPayload } from '../../auth/interfaces/jwt-payload.interface';
import { JwtAuthGuard } from '../../auth/jwt/jwt.auth.guard';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { ChatService } from '../chat.service';
import {
  GetChatByIdRequest,
  GetChatByIdResponse,
} from './dto/get-chat-by-id.dto';
import { GetChatListResponse } from './dto/get-chat-list.dto';
import {
  SendMessageRequest,
  SendMessageResponse,
} from './dto/send-message.dto';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly service: ChatService) {}

  @Get('/get-chats-list')
  @ApiOkResponse({ type: GetChatListResponse })
  async getChatsList(@CurrentUser() currentUser: CurrentUserPayload) {
    const getChatListResult = await this.service.getChatLists(
      currentUser.userId,
    );

    if (!getChatListResult.ok) {
      throw new HttpException(
        getChatListResult.data.reason,
        HttpStatus.BAD_GATEWAY,
      );
    }

    return { chats: getChatListResult.payload };
  }

  @Get('/get-chat-by-id')
  @ApiOkResponse({ type: GetChatByIdResponse })
  async getChatById(@Query() dto: GetChatByIdRequest) {
    const { chatId } = dto;
    const getChatResult = await this.service.getChatById(chatId);

    if (!getChatResult.ok) {
      throw new HttpException(
        getChatResult.data.reason,
        HttpStatus.BAD_GATEWAY,
      );
    }

    return getChatResult.payload;
  }

  @Post('/send-message')
  @ApiOkResponse({ type: SendMessageResponse })
  async sendMessage(
    @Body() dto: SendMessageRequest,
    @CurrentUser() currentUser: CurrentUserPayload,
  ) {
    const { text, chatId } = dto;
    const { userId } = currentUser;
    const sendMessageResult = await this.service.sendMessage(
      text,
      userId,
      chatId,
    );

    if (!sendMessageResult.ok) {
      throw new HttpException(
        sendMessageResult.data.reason,
        HttpStatus.BAD_GATEWAY,
      );
    }

    return sendMessageResult.payload;
  }
}
