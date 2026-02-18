import { ChatType } from '@luka/enums';
import { UUID } from 'crypto';

import User from '../../users/models/users.model';
import { ChatDto } from '../web/dto/chat.dto';
import { MessageDto } from '../web/dto/message.dto';
import Message from './message.model';

export default class Chat {
  readonly id: UUID;
  readonly type: ChatType;
  readonly createdAt: Date;
  readonly messages?: Message[];
  readonly chatUsers: User[];

  constructor(data: {
    id: UUID;
    type: ChatType;
    createdAt: string;
    messages?: Message[];
    chatUsers: User[];
  }) {
    this.id = data.id;
    this.type = data.type;
    this.messages = data.messages;
    this.chatUsers = data.chatUsers;
    this.createdAt = new Date(data.createdAt);
  }

  static fromResponses(
    tables: {
      chat: ChatDto;
      messages: MessageDto[];
      chatUsers: User[];
    }[],
  ) {
    return tables.map((t) =>
      Chat.fromResponse(t.chat, t.messages, t.chatUsers),
    );
  }

  static fromResponse(
    chat: ChatDto,
    messages: MessageDto[],
    chatUsers: User[],
  ) {
    return new Chat({
      id: chat.id as UUID,
      type: chat.type,
      createdAt: chat.createdAt!,
      chatUsers,
      messages: Message.fromResponses(messages),
    });
  }

  static toResponse(chat: Chat) {
    return {
      id: chat.id,
      type: chat.type,
      createdAt: chat.createdAt,
    };
  }

  static toResponseMany(chats: Chat[]) {
    return chats.map((chat) => Chat.toResponse(chat));
  }
}
