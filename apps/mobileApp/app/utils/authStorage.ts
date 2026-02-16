import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "jwt_token";

export const authStorage = {
  saveToken: async (token: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (error) {
      throw error;
    }
  },

  getToken: async (): Promise<string | null> => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      return token;
    } catch {
      return null;
    }
  },

  deleteToken: async (): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      console.log("🗑️ Токен удалён");
    } catch (error) {
      console.error("❌ Ошибка удаления токена:", error);
    }
  },

  hasToken: async (): Promise<boolean> => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      return !!token;
    } catch {
      return false;
    }
  },
};
