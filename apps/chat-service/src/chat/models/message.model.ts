import { UUID } from 'crypto';
import { MessagesTable } from '../schemas/messages.schema';

export default class Message {
  readonly id: UUID;
  readonly text: string;
  readonly userId: UUID;
  readonly chatId: UUID;
  readonly createdAt: Date;

  constructor(data: {
    id: UUID;
    userId: UUID;
    chatId: UUID;
    text: string;
    createdAt: Date;
  }) {
    this.id = data.id;
    this.userId = data.userId;
    this.chatId = data.chatId;
    this.text = data.text;
    this.createdAt = data.createdAt;
  }

  static fromTables(tables: MessagesTable[]) {
    return tables.map((t) => Message.fromTable(t));
  }

  static fromTable(table: MessagesTable) {
    return new Message({
      id: table.id as UUID,
      userId: table.userId as UUID,
      chatId: table.chatId as UUID,
      text: table.text,
      createdAt: table.createdAt!,
    });
  }

  static toResponse(message: Message) {
    return {
      id: message.id,
      userId: message.userId,
      chatId: message.chatId,
      text: message.text,
      createdAt: message.createdAt,
    };
  }

  static toResponseMany(chats: Message[]) {
    return chats.map((chat) => Message.toResponse(chat));
  }
}
