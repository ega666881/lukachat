import { UserServiceClient } from "@luka/user-service-client";
import Constants from "expo-constants";
import { createAuthFetch } from "./authFetch";

const apiUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL;

console.log(apiUrl);

export const userServiceClient = new UserServiceClient({
  baseUrl: apiUrl,
  customFetch: createAuthFetch(10_000),
});
