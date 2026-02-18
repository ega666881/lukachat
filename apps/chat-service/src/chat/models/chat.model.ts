import { ChatType } from '@luka/enums';
import { UUID } from 'crypto';
import { ChatsTable } from '../schemas/chats.schema';
import { MessagesTable } from '../schemas/messages.schema';
import Message from './message.model';

export default class Chat {
  readonly id: UUID;
  readonly type: ChatType;
  readonly createdAt: Date;
  readonly messages?: Message[];

  constructor(data: {
    id: UUID;
    type: ChatType;
    createdAt: Date;
    messages?: Message[];
  }) {
    this.id = data.id;
    this.type = data.type;
    this.messages = data.messages;
    this.createdAt = data.createdAt;
  }

  static fromTables(tables: { chat: ChatsTable; messages: MessagesTable[] }[]) {
    return tables.map((t) => Chat.fromTable(t.chat, t.messages));
  }

  static fromTable(chat: ChatsTable, messages: MessagesTable[]) {
    return new Chat({
      id: chat.id as UUID,
      type: chat.type,
      createdAt: chat.createdAt!,
      messages: Message.fromTables(messages),
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
