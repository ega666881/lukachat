import { router } from "expo-router";
import { action, makeAutoObservable } from "mobx";
import { rootStore } from ".";
import User from "../models/user.model";
import { userService } from "../services/userService";
import { authStorage } from "../utils/authStorage";

export class ClientStore {
  isLogin = false;
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
    this.checkLogin();
  }

  async getUser() {
    const getUserResult = await userService.get();
    if (!getUserResult.ok) {
      rootStore.errorStore.setError({
        text: getUserResult.data.reason,
      });
      return router.navigate("/screens/error/errorScreen");
    }
    this.user = getUserResult.payload;
    const { socketStore } = rootStore;
    socketStore.connect(this.user.id);
  }

  checkLogin = action(async () => {
    const token = await authStorage.getToken();
    if (token) {
      this.isLogin = true;
      console.log(token);
    }
  });
}
