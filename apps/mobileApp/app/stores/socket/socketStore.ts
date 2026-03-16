import { AddClientToChatRoom, CreateChat, NewMessage } from "@luka/websocket";
import { makeAutoObservable, runInAction } from "mobx";
import { rootStore } from "..";
import { socketService } from "../../services/socketService";

export class SocketStore {
  isConnected = false;
  userId: string | null = null;
  messages: any[] = [];

  constructor() {
    makeAutoObservable(this);
    this.setupListeners();
  }

  private setupListeners() {
    socketService.on("disconnect", () => {
      runInAction(() => {
        this.isConnected = false;
      });
    });

    socketService.on(NewMessage.ExchangeName, (data: NewMessage.Message) => {
      runInAction(() => {
        const { chatsListStore, activeChatStore } = rootStore;
        const promises = [chatsListStore.getChats()];

        if (activeChatStore.activeChat) {
          promises.push(activeChatStore.getChat());
        }
        Promise.all(promises);
      });
    });

    socketService.on(CreateChat.ExchangeName, (data: CreateChat.Message) => {
      runInAction(() => {
        this.addClientToChatRoom(data.chatId);
        const { chatsListStore, activeChatStore } = rootStore;
        const promises = [chatsListStore.getChats()];

        if (activeChatStore.activeChat) {
          promises.push(activeChatStore.getChat());
        }
        Promise.all(promises);
      });
    });
  }

  connect(userId: string) {
    this.userId = userId;
    socketService.connect(userId);
  }

  disconnect() {
    socketService.disconnect();
    runInAction(() => {
      this.isConnected = false;
      this.userId = null;
    });
  }

  addClientToChatRoom(chatId: string) {
    const message: AddClientToChatRoom.Message = {
      chatId,
    };
    socketService.emit(AddClientToChatRoom.ExchangeName, message);
  }

  cleanup() {
    socketService.off("connect");
    socketService.off("disconnect");
    socketService.off("new_message");
  }
}
