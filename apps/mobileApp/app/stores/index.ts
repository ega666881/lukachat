import { createContext, useContext } from "react";
import { AuthFormStore } from "./auth/authForm";
import { ActiveChatStore } from "./chats/activeChatStore";
import { ChatsListStore } from "./chats/chatsListStore";
import { ClientStore } from "./clientStore";
import { ErrorStore } from "./error/errorStore";
import { SearchStore } from "./search/searchStore";
import { SocketStore } from "./socket/socketStore";

export class RootStore {
  authFormStore: AuthFormStore;
  clientStore: ClientStore;
  chatsListStore: ChatsListStore;
  errorStore: ErrorStore;
  activeChatStore: ActiveChatStore;
  searchStore: SearchStore;
  socketStore: SocketStore;

  constructor() {
    this.authFormStore = new AuthFormStore();
    this.clientStore = new ClientStore();
    this.chatsListStore = new ChatsListStore();
    this.errorStore = new ErrorStore();
    this.activeChatStore = new ActiveChatStore();
    this.searchStore = new SearchStore();
    this.socketStore = new SocketStore();
  }
}

export const rootStore = new RootStore();

export const StoreContext = createContext(rootStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);
