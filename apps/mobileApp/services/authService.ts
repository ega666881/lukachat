import { AuthCredentials } from "@luka/models";
import { Either, leftWithReason, right, WithReason } from "@luka/monads";
import { router } from "expo-router";
import { authStorage } from "../app/utils/authStorage";
import { userServiceClient } from "../app/utils/userServiceClient";

class AuthService {
  async refreshAccessToken(
    refreshToken: string,
  ): Promise<Either<WithReason, AuthCredentials>> {
    const response = await userServiceClient.auth.authControllerTokenRefresh({
      refreshToken,
    });

    if (!response.ok) {
      return leftWithReason("Error refresh token");
    }

    const { data } = response;

    return right(
      new AuthCredentials(data.userId, data.accessToken, data.refreshToken),
    );
  }

  async requestEmailCode(email: string): Promise<Either<WithReason, boolean>> {
    const response =
      await userServiceClient.users.usersControllerRequestEmailCode({ email });

    if (!response.ok) {
      console.log(response.error, email);
      return leftWithReason(response.error.message);
    }

    return right(response.data.success);
  }

  async login(
    email: string,
    code: string,
  ): Promise<Either<WithReason, boolean>> {
    const response = await userServiceClient.auth.authControllerEmailAuth({
      email,
      code,
    });

    if (!response.ok) {
      return leftWithReason(response.error.message);
    }

    const { accessToken, refreshToken, userId } = response.data;

    await authStorage.saveToken(
      new AuthCredentials(userId, accessToken, refreshToken),
    );

    return right(true);
  }

  async logout() {
    router.navigate("/screens/auth/authScreen");
  }
}

export const authService = new AuthService();
