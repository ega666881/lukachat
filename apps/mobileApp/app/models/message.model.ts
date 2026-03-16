import { MessageDto } from "@luka/user-service-client";

export default class Message {
  readonly id: string;
  readonly text: string;
  readonly userId: string;
  readonly chatId: string;
  readonly createdAt: Date;

  constructor(data: {
    id: string;
    userId: string;
    chatId: string;
    text: string;
    createdAt: Date | string;
  }) {
    this.id = data.id;
    this.userId = data.userId;
    this.chatId = data.chatId;
    this.text = data.text;
    this.createdAt = new Date(data.createdAt);
  }

  static fromResponse(message: MessageDto) {
    return new Message(message);
  }

  static fromResponseMany(messages: MessageDto[]) {
    return messages.map((message) => new Message(message));
  }
}
