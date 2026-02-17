import { AuthCredentials } from "@luka/models";
import { Either, leftWithReason, right, WithReason } from "@luka/monads";
import { UserServiceClient } from "@luka/user-service-client";
import { router } from "expo-router";
import { authStorage } from "../app/utils/authStorage";

class AuthService {
  private readonly userService = new UserServiceClient({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
  });

  async requestEmailCode(email: string): Promise<Either<WithReason, boolean>> {
    console.log(process.env.EXPO_PUBLIC_API_URL);
    const response =
      await this.userService.users.usersControllerRequestEmailCode({ email });

    if (!response.ok) {
      return leftWithReason(response.error.message);
    }

    return right(response.data.success);
  }

  async login(
    email: string,
    code: string,
  ): Promise<Either<WithReason, boolean>> {
    const response = await this.userService.auth.authControllerEmailAuth({
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
