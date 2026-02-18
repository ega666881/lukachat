import { UUID } from 'crypto';
import { MessageDto } from '../web/dto/message.dto';

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
    createdAt: string;
  }) {
    this.id = data.id;
    this.userId = data.userId;
    this.chatId = data.chatId;
    this.text = data.text;
    this.createdAt = new Date(data.createdAt);
  }

  static fromResponses(tables: MessageDto[]) {
    return tables.map((t) => Message.fromResponse(t));
  }

  static fromResponse(table: MessageDto) {
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
