import { createContext, useContext } from "react";
import { AuthFormStore } from "./auth/authForm";
import { ChatsListStore } from "./chats/chatsListStore";
import { ClientStore } from "./clientStore";
import { ErrorStore } from "./error/errorStore";

export class RootStore {
  authFormStore: AuthFormStore;
  clientStore: ClientStore;
  chatsListStore: ChatsListStore;
  errorStore: ErrorStore;

  constructor() {
    this.authFormStore = new AuthFormStore();
    this.clientStore = new ClientStore();
    this.chatsListStore = new ChatsListStore();
    this.errorStore = new ErrorStore();
  }
}

export const rootStore = new RootStore();

export const StoreContext = createContext(rootStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);
