import { AuthCredentials } from "@luka/models";
import * as SecureStore from "expo-secure-store";

enum TOKEN_KEY {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
  USER_ID = "userId",
}

const getData = () => {
  return Promise.all([
    SecureStore.getItemAsync(TOKEN_KEY.ACCESS_TOKEN),
    SecureStore.getItemAsync(TOKEN_KEY.REFRESH_TOKEN),
    SecureStore.getItemAsync(TOKEN_KEY.USER_ID),
  ]);
};

export const authStorage = {
  saveToken: async (authCredentials: AuthCredentials): Promise<void> => {
    try {
      const { accessToken, refreshToken, userId } = authCredentials;
      await Promise.all([
        SecureStore.setItemAsync(TOKEN_KEY.ACCESS_TOKEN, accessToken),
        SecureStore.setItemAsync(TOKEN_KEY.REFRESH_TOKEN, refreshToken),
        SecureStore.setItemAsync(TOKEN_KEY.USER_ID, userId),
      ]);
    } catch (error) {
      throw error;
    }
  },

  getToken: async (): Promise<AuthCredentials | null> => {
    try {
      const [accessToken, refreshToken, userId] = await getData();
      if (accessToken && refreshToken && userId) {
        return new AuthCredentials(userId, accessToken, refreshToken);
      }
      return null;
    } catch {
      return null;
    }
  },

  deleteToken: async (): Promise<void> => {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(TOKEN_KEY.ACCESS_TOKEN),
        SecureStore.deleteItemAsync(TOKEN_KEY.REFRESH_TOKEN),
        SecureStore.deleteItemAsync(TOKEN_KEY.USER_ID),
      ]);
      console.log("🗑️ Токен удалён");
    } catch (error) {
      console.error("❌ Ошибка удаления токена:", error);
    }
  },

  hasToken: async (): Promise<boolean> => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY.ACCESS_TOKEN);
      return !!token;
    } catch {
      return false;
    }
  },
};
