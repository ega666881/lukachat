import { router } from "expo-router";
import { makeAutoObservable } from "mobx";
import { rootStore } from "..";
import Chat from "../../models/chat.model";
import { chatService } from "../../services/chatService";

export class ChatsListStore {
  chatsList: Chat[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getChats() {
    const getChatsResult = await chatService.getChatList();
    if (!getChatsResult.ok) {
      rootStore.errorStore.setError({
        text: getChatsResult.data.reason,
      });
      return router.navigate("/screens/error/errorScreen");
    }
    this.chatsList = getChatsResult.payload;
  }
}
