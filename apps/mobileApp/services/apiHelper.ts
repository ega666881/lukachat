import { router } from "expo-router";
import { authStorage } from "../app/utils/authStorage";

export class ApiHelper {
  async authHeaders() {
    const authCred = await authStorage.getToken();
    if (!authCred) {
      router.navigate("/screens/auth/authScreen");
    }

    return {
      Authorization: `Bearer ${authCred?.accessToken}`,
    };
  }
}

export const apiHelper = new ApiHelper();
