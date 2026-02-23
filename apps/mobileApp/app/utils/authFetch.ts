import { router } from "expo-router";
import { apiHelper } from "../../services/apiHelper";
import { authService } from "../../services/authService";
import { authStorage } from "./authStorage";

let isRefreshing = false;

let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshFailed = () => {
  refreshSubscribers = [];
  router.navigate("/utils/authFetch");
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

export const createAuthFetch = (timeoutMs: number = 10_000) => {
  return async (
    input: RequestInfo | URL,
    init?: RequestInit,
  ): Promise<Response> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    const headers = new Headers(init?.headers);
    const authHeaders = await apiHelper.authHeaders();
    if (authHeaders?.Authorization) {
      headers.set("Authorization", authHeaders.Authorization);
    }
    try {
      let response = await fetch(input, {
        ...init,
        headers,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const tokens = await authStorage.getToken();
      if (response.status === 401) {
        if (!tokens?.refreshToken) {
          await authStorage.deleteToken();
          throw new Error("No refresh token");
        }

        if (isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((newToken: string) => {
              const retryHeaders = new Headers(init?.headers);
              retryHeaders.set("Authorization", `Bearer ${newToken}`);

              fetch(input, { ...init, headers: retryHeaders })
                .then(resolve)
                .catch(() => resolve(response));
            });
          });
        }

        isRefreshing = true;

        try {
          const refreshTokenResult = await authService.refreshAccessToken(
            tokens.refreshToken,
          );

          if (!refreshTokenResult.ok) {
            await authStorage.deleteToken();
            onRefreshFailed();
            return response;
          }

          const authCred = refreshTokenResult.payload;

          await authStorage.saveToken(authCred);

          onRefreshed(authCred.accessToken);

          const retryHeaders = new Headers(init?.headers);
          retryHeaders.set("Authorization", `Bearer ${authCred.accessToken}`);

          response = await fetch(input, {
            ...init,
            headers: retryHeaders,
            signal: controller.signal,
          });
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          await authStorage.deleteToken();
          onRefreshFailed();

          throw new Error("Session expired");
        } finally {
          isRefreshing = false;
        }
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  };
};
