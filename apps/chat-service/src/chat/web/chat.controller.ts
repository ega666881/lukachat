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
import { ChatService } from '../chat.service';
import { CreateChatRequest, CreateChatResponse } from './dto/create-chat.dto';
import { GetChatByIdRequest } from './dto/get-chat-by-id.dto';
import { GetChatsRequest, GetChatsResponse } from './dto/get-chats.dto';
import {
  SendMessageRequest,
  SendMessageResponse,
} from './dto/send-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly service: ChatService) {}

  @Get('/get-chat-list')
  @ApiOkResponse({ type: GetChatsResponse })
  async getChats(@Query() dto: GetChatsRequest) {
    const { userId } = dto;
    return this.service.getChatsList(userId);
  }

  @Get('/get-chat')
  @ApiOkResponse({ type: GetChatsResponse })
  async getChatById(@Query() dto: GetChatByIdRequest) {
    const { chatId } = dto;
    const getChatResult = await this.service.getById(chatId);

    if (!getChatResult.ok) {
      throw new HttpException(
        getChatResult.data.reason,
        HttpStatus.BAD_GATEWAY,
      );
    }

    return { chat: getChatResult.payload };
  }

  @Post('/send-message')
  @ApiOkResponse({ type: SendMessageResponse })
  async sendMessage(@Body() dto: SendMessageRequest) {
    const { userId, chatId, text } = dto;
    const sendMessageResult = await this.service.sendMessage(
      userId,
      text,
      chatId,
    );

    if (!sendMessageResult.ok) {
      throw new HttpException(
        sendMessageResult.data.reason,
        HttpStatus.BAD_GATEWAY,
      );
    }

    return { message: sendMessageResult.payload };
  }
  @Post('/create-chat')
  @ApiOkResponse({ type: CreateChatResponse })
  async createChat(@Body() dto: CreateChatRequest) {
    const { type, addingUserIds } = dto;

    const createChatResult = await this.service.createChat(type, addingUserIds);

    if (!createChatResult.ok) {
      throw new HttpException(
        createChatResult.data.reason,
        HttpStatus.BAD_GATEWAY,
      );
    }

    return { chat: createChatResult.payload };
  }
}
