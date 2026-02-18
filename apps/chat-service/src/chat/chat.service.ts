import { ChatType } from '@luka/enums';
import { Either, leftWithReason, right, WithReason } from '@luka/monads';
import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import Chat from './models/chat.model';
import Message from './models/message.model';

@Injectable()
export class ChatService {
  constructor(private readonly repository: ChatRepository) {}

  async getChatsList(userId: string) {
    return this.repository.getChatsList(userId);
  }

  async getById(chatId: string) {
    return this.repository.getById(chatId);
  }

  async sendMessage(
    userId: string,
    text: string,
    chatId: string,
  ): Promise<Either<WithReason, Message>> {
    const createMessageResult = await this.repository.createMessage(
      chatId,
      userId,
      text,
    );

    if (!createMessageResult.ok) {
      return leftWithReason(createMessageResult.data.reason);
    }

    return right(createMessageResult.payload);
  }

  async createChat(
    type: ChatType,
    addingUserIds: string[],
  ): Promise<Either<WithReason, Chat>> {
    const createChatResult = await this.repository.createChat(type);
    if (!createChatResult.ok) {
      return leftWithReason(createChatResult.data.reason);
    }

    const chat = createChatResult.payload;

    const addUsersToChatResult = await this.repository.addUsersToChat(
      chat.id,
      addingUserIds,
    );

    if (!addUsersToChatResult.ok) {
      return leftWithReason(addUsersToChatResult.data.reason);
    }

    return right(chat);
  }
}
