import Message from "@/models/message.model";
import { ChatType } from "@luka/enums";
import { ChatDto } from "@luka/user-service-client";
import User from "./user.model";

export default class Chat {
  readonly id: string;
  readonly type: ChatType;
  readonly createdAt: Date;
  readonly chatUsers: User[];
  readonly messages: Message[];

  constructor(data: {
    id: string;
    type: ChatType;
    createdAt: Date | string;
    chatUsers: User[];
    messages: Message[];
  }) {
    this.id = data.id;
    this.type = data.type;
    this.messages = data.messages;
    this.chatUsers = data.chatUsers;
    this.createdAt = new Date(data.createdAt);
  }

  static fromResponse(data: ChatDto) {
    const chatType = data.type as ChatType;
    console.log(data.messages, "fsdfd");
    return new Chat({
      id: data.id,
      createdAt: data.createdAt,
      messages: Message.fromResponseMany(data.messages),
      chatUsers: User.fromResponseMany(data.chatUsers),
      type: chatType,
    });
  }

  static fromResponseMany(chats: ChatDto[]) {
    return chats.map((chat) => Chat.fromResponse(chat));
  }
}
