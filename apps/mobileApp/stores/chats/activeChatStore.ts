import { router } from "expo-router";
import { action, makeAutoObservable } from "mobx";
import { rootStore } from "..";
import Chat from "../../models/chat.model";
import User from "../../models/user.model";
import { chatService } from "../../services/chatService";

export class ActiveChatStore {
  activeChat: Chat | null = null;
  opponentUser: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getOpponentUser = action(() => {
    const opponentUser = this.activeChat?.chatUsers.find(
      (user) => user.isSelf === false,
    );

    if (!opponentUser) {
      rootStore.errorStore.setError({
        text: "Не найден пользователь для переписки",
      });
      return router.navigate("/screens/error/errorScreen");
    }

    this.opponentUser = opponentUser;
  });

  getChat = action(async () => {
    if (!this.activeChat || !this.activeChat.id) {
      rootStore.errorStore.setError({
        text: "Error to open chat. ActiveChat is not defined",
      });

      return router.navigate("/screens/error/errorScreen");
    }

    const getChatResult = await chatService.getById(this.activeChat?.id);
    if (!getChatResult.ok) {
      rootStore.errorStore.setError({ text: getChatResult.data.reason });
      return router.navigate("/screens/error/errorScreen");
    }

    this.activeChat = getChatResult.payload;
    this.getOpponentUser();
  });

  setActiveChat = action((newActiveChat: Chat) => {
    this.activeChat = newActiveChat;
  });
}
