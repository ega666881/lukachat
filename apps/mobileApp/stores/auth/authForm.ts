import { action, makeAutoObservable } from "mobx";
import { authStorage } from "../../app/utils/authStorage";

export class AuthFormStore {
  email: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setEmail = action((newValue: string) => {
    this.email = newValue;
    authStorage.saveToken("666");
  });
}
