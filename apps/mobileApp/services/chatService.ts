import { Either, leftWithReason, right, WithReason } from "@luka/monads";
import { UserServiceClient } from "@luka/user-service-client";
import Chat from "../models/chat.model";
import { apiHelper } from "./apiHelper";

export class ChatService {
  private readonly userService = new UserServiceClient({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
  });

  async getChatList(): Promise<Either<WithReason, Chat[]>> {
    const getChatListResult =
      await this.userService.chat.chatControllerGetChatsList({
        headers: await apiHelper.authHeaders(),
      });
    if (!getChatListResult.ok) {
      return leftWithReason(getChatListResult.error.message);
    }

    return right(Chat.fromResponseMany(getChatListResult.data.chats));
  }
}

export const chatService = new ChatService();
