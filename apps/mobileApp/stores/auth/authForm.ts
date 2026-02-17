import { router } from "expo-router";
import { action, makeAutoObservable } from "mobx";
import { authService } from "../../services/authService";

export class AuthFormStore {
  email: string = "";
  code: string = "";
  isCodeProcessSending: boolean = false;
  isAuthProcess: boolean = false;
  isCodeSend: boolean = false;
  isSendButtonCodeDisabled: boolean = true;
  isAuthButtonDisabled: boolean = true;
  errorMessage: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setCode = action((newValue: string) => {
    this.code = newValue;
    if (this.code.length === 6) {
      this.isAuthButtonDisabled = false;
    } else {
      this.isAuthButtonDisabled = true;
    }
  });

  setEmail = action((newValue: string) => {
    this.email = newValue;
    if (this.email) {
      this.isSendButtonCodeDisabled = false;
    } else {
      this.isSendButtonCodeDisabled = true;
    }
  });

  sendEmailCode = action(async () => {
    this.isCodeProcessSending = true;
    const sendEmailCodeResult = await authService.requestEmailCode(this.email);
    this.isCodeProcessSending = false;
    if (!sendEmailCodeResult.ok) {
      this.errorMessage = sendEmailCodeResult.data.reason;
      return;
    }

    this.isCodeSend = true;
  });

  login = action(async () => {
    const loginResp = await authService.login(this.email, this.code);
    if (!loginResp.ok) {
      this.errorMessage = loginResp.data.reason;
      return;
    }

    router.navigate("/screens/chats/chatsScreen");
  });
}
