import { createContext, useContext } from "react";
import { AuthFormStore } from "./auth/authForm";
import { ClientStore } from "./clientStore";

export class RootStore {
  authFormStore: AuthFormStore;
  clientStore: ClientStore;

  constructor() {
    this.authFormStore = new AuthFormStore();
    this.clientStore = new ClientStore();
  }
}

export const rootStore = new RootStore();

export const StoreContext = createContext(rootStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);
