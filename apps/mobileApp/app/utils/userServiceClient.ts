import { UserServiceClient } from "@luka/user-service-client";
import Constants from "expo-constants";
import { createAuthFetch } from "./authFetch";

const apiUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL;

console.log(apiUrl, process.env.EXPO_PUBLIC_API_URL);

export const userServiceClient = new UserServiceClient({
  baseUrl: process.env.EXPO_PUBLIC_API_URL,
  customFetch: createAuthFetch(10_000),
});
