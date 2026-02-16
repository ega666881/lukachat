import { action, makeAutoObservable } from "mobx";
import { authStorage } from "../app/utils/authStorage";

export class ClientStore {
  isLogin = false;

  constructor() {
    makeAutoObservable(this);
    this.checkLogin();
  }

  checkLogin = action(async () => {
    const token = await authStorage.getToken();
    if (token) {
      this.isLogin = true;
      console.log(token);
    }
  });
}
