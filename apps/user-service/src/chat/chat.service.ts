import {
  ChatServiceClient,
  GetChatsResponse,
  SendMessageResponse,
} from '@luka/chat-service-client';
import { Either, leftWithReason, right, WithReason } from '@luka/monads';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatService {
  private chatService!: ChatServiceClient<never>;

  constructor(private readonly configService: ConfigService) {
    this.chatService = new ChatServiceClient({
      baseUrl: configService.getOrThrow<string>('CHAT_SERVICE_URL'),
    });
  }

  async getChatById(chatId: string) {
    const getChatResponse =
      await this.chatService.chat.chatControllerGetChatById({ chatId });
    if (!getChatResponse.ok) {
      return leftWithReason(getChatResponse.error.message);
    }

    return right(getChatResponse.data);
  }

  async getChatLists(
    userId: string,
  ): Promise<Either<WithReason, GetChatsResponse>> {
    const getChatListResult =
      await this.chatService.chat.chatControllerGetChats({ userId });

    if (!getChatListResult.ok) {
      return leftWithReason(getChatListResult.error.message);
    }

    return right(getChatListResult.data);
  }

  async sendMessage(
    text: string,
    userId: string,
    chatId: string,
  ): Promise<Either<WithReason, SendMessageResponse>> {
    const sendMessageResult =
      await this.chatService.chat.chatControllerSendMessage({
        text,
        chatId,
        userId,
      });

    if (!sendMessageResult.ok) {
      return leftWithReason(sendMessageResult.error.message);
    }

    return right(sendMessageResult.data);
  }
}
