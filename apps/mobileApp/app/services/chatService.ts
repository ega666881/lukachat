import { Either, leftWithReason, right, WithReason } from "@luka/monads";
import Chat from "../models/chat.model";
import Message from "../models/message.model";
import { userServiceClient } from "../utils/userServiceClient";

export class ChatService {
  async getChatList(): Promise<Either<WithReason, Chat[]>> {
    const getChatListResult =
      await userServiceClient.chat.chatControllerGetChatsList();
    if (!getChatListResult.ok) {
      return leftWithReason(getChatListResult.error.message);
    }

    return right(Chat.fromResponseMany(getChatListResult.data.chats));
  }

  async createChat(companionId: string): Promise<Either<WithReason, Chat>> {
    const response = await userServiceClient.chat.chatControllerCreateChat({
      type: "private_chat",
      companionId,
    });

    if (!response.ok) {
      return leftWithReason(response.error.message);
    }

    return right(Chat.fromResponse(response.data.createdChat));
  }

  async sendMessage(
    chatId: string,
    text: string,
  ): Promise<Either<WithReason, Message>> {
    const response = await userServiceClient.chat.chatControllerSendMessage({
      chatId,
      text,
    });

    if (!response.ok) {
      return leftWithReason(response.error.message);
    }

    return right(Message.fromResponse(response.data.message));
  }

  async getById(chatId: string): Promise<Either<WithReason, Chat>> {
    const getChatResult =
      await userServiceClient.chat.chatControllerGetChatById({ chatId });

    if (!getChatResult.ok) {
      return leftWithReason(getChatResult.error.message);
    }

    return right(Chat.fromResponse(getChatResult.data.chat));
  }
}

export const chatService = new ChatService();
