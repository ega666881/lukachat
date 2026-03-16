import { router } from "expo-router";
import { action, makeAutoObservable } from "mobx";
import { rootStore } from "..";
import User from "../../models/user.model";
import { chatService } from "../../services/chatService";
import { userService } from "../../services/userService";

export class SearchStore {
  findedUsers: User[] = [];
  searchEmail!: string;

  constructor() {
    makeAutoObservable(this);
  }

  setSearchEmail = action((newValue: string) => {
    this.searchEmail = newValue;
  });

  createChat = async (companionId: string) => {
    const createChatResult = await chatService.createChat(companionId);
    if (!createChatResult.ok) {
      rootStore.errorStore.setError({ text: createChatResult.data.reason });
      return router.navigate("/screens/error/errorScreen");
    }

    rootStore.activeChatStore.setActiveChat(createChatResult.payload);
    const { socketStore } = rootStore;
    socketStore.addClientToChatRoom(createChatResult.payload.id);
    return router.navigate("/screens/activeChat/activeChat");
  };

  search = action(async () => {
    const searchResult = await userService.searchUser(this.searchEmail);
    if (searchResult.ok === false) {
      rootStore.errorStore.setError({ text: searchResult.data.reason });
      return router.navigate("/screens/error/errorScreen");
    }

    this.findedUsers = searchResult.payload;
  });
}
