import {
  ChatServiceClient,
  SendMessageResponse,
} from '@luka/chat-service-client';
import { ChatType } from '@luka/enums';
import { Either, leftWithReason, right, WithReason } from '@luka/monads';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import Chat from './models/chat.model';

@Injectable()
export class ChatService {
  private chatService!: ChatServiceClient<never>;

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
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

  async getChatLists(userId: string): Promise<Either<WithReason, Chat[]>> {
    const getChatListResult =
      await this.chatService.chat.chatControllerGetChats({ userId });

    if (!getChatListResult.ok) {
      return leftWithReason(getChatListResult.error.message);
    }

    const { chats } = getChatListResult.data;

    const allUserIds = [
      ...new Set(chats.flatMap((item) => item.chatUsers || [])),
    ];

    const users = await this.usersService.getManyUsersByIds(allUserIds);

    const usersMap = new Map<string, (typeof users)[number]>();
    for (const user of users) {
      usersMap.set(user.id, user);
    }

    const result = chats.map((item) => ({
      chat: {
        id: item.id,
        type: item.type as ChatType,
        createdAt: item.createdAt,
      },
      messages: item.messages,
      chatUsers: (item.chatUsers || [])
        .map((userId) => usersMap.get(userId))
        .filter((user): user is NonNullable<typeof user> => user !== undefined),
    }));

    return right(Chat.fromResponses(result));
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
