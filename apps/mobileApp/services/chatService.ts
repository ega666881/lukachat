import { Either, leftWithReason, right, WithReason } from "@luka/monads";
import { userServiceClient } from "../app/utils/userServiceClient";
import Chat from "../models/chat.model";

export class ChatService {
  async getChatList(): Promise<Either<WithReason, Chat[]>> {
    const getChatListResult =
      await userServiceClient.chat.chatControllerGetChatsList();
    if (!getChatListResult.ok) {
      return leftWithReason(getChatListResult.error.message);
    }

    return right(Chat.fromResponseMany(getChatListResult.data.chats));
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
