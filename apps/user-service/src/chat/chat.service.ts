import {
  ChatDto,
  ChatServiceClient,
  SendMessageResponse,
} from '@luka/chat-service-client';
import { ChatType } from '@luka/enums';
import { Either, leftWithReason, right, WithReason } from '@luka/monads';
import { CreateChat, NewMessage, RoomSlug } from '@luka/websocket';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SocketGateway } from '../socket/socket.gateway';
import { UsersService } from '../users/users.service';
import Chat from './models/chat.model';

@Injectable()
export class ChatService {
  private chatService!: ChatServiceClient<never>;

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly socketGateway: SocketGateway,
  ) {
    this.chatService = new ChatServiceClient({
      baseUrl: configService.getOrThrow<string>('CHAT_SERVICE_URL'),
    });
  }

  private async buildChatsObject(chats: ChatDto[], userId: string) {
    const allUserIds = [
      ...new Set(chats.flatMap((item) => item.chatUsers || [])),
    ];

    const users = await this.usersService.getManyUsersByIds(allUserIds);

    const usersMap = new Map<string, (typeof users)[number]>();
    for (const user of users) {
      usersMap.set(user.id, user);
    }

    return chats.map((item) => ({
      chat: {
        id: item.id,
        type: item.type as ChatType,
        createdAt: item.createdAt,
      },
      messages: item.messages,
      chatUsers: (item.chatUsers || [])
        .map((userId) => usersMap.get(userId))
        .filter((user): user is NonNullable<typeof user> => user !== undefined)
        .map((user) => ({
          ...user,
          isSelf: user.id === userId,
        })),
    }));
  }

  async createChat(
    userId: string,
    typeChat: ChatType,
    companionId: string,
  ): Promise<Either<WithReason, ChatDto>> {
    const response = await this.chatService.chat.chatControllerCreateChat({
      type: typeChat,
      addingUserIds: [userId, companionId],
    });

    if (!response.ok) {
      return leftWithReason(response.error.message);
    }
    const { chat } = response.data;
    const eventMessage: CreateChat.Message = {
      chatId: chat.id,
    };
    this.socketGateway.server
      .to(`${RoomSlug.USER}_${companionId}`)
      .emit(CreateChat.ExchangeName, eventMessage);

    await this.sendMessage('Привет', userId, chat.id);

    return right(chat);
  }

  async getChatById(chatId: string, userId: string) {
    const getChatResponse =
      await this.chatService.chat.chatControllerGetChatById({ chatId });

    if (!getChatResponse.ok) {
      return leftWithReason(getChatResponse.error.message);
    }

    const buildedChat = await this.buildChatsObject(
      [getChatResponse.data.chat],
      userId,
    );

    const { chat, messages, chatUsers } = buildedChat[0];

    return right(Chat.fromResponse(chat, messages, chatUsers));
  }

  async getChatLists(userId: string): Promise<Either<WithReason, Chat[]>> {
    const getChatListResult =
      await this.chatService.chat.chatControllerGetChats({ userId });

    if (!getChatListResult.ok) {
      return leftWithReason(getChatListResult.error.message);
    }

    const { chats } = getChatListResult.data;

    const result = await this.buildChatsObject(chats, userId);
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

    const eventMessage: NewMessage.Message = {
      chatId,
    };

    this.socketGateway.server
      .to(`${RoomSlug.CHAT}_${chatId}`)
      .emit(NewMessage.ExchangeName, eventMessage);

    return right(sendMessageResult.data);
  }
}
