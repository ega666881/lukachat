import { router } from "expo-router";
import { action, makeAutoObservable } from "mobx";
import { rootStore } from ".";
import { authStorage } from "../app/utils/authStorage";
import User from "../models/user.model";
import { userService } from "../services/userService";

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
  }

  checkLogin = action(async () => {
    const token = await authStorage.getToken();
    if (token) {
      this.isLogin = true;
      console.log(token);
    }
  });
}
