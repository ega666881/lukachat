import { Either, leftWithReason, right, WithReason } from "@luka/monads";
import User from "../models/user.model";
import { userServiceClient } from "../utils/userServiceClient";
import { apiHelper } from "./apiHelper";

class UserService {
  async get() {
    const response =
      await userServiceClient.profile.profileControllerGetProfile({
        headers: await apiHelper.authHeaders(),
      });

    if (!response.ok) {
      return leftWithReason(response.error.message);
    }

    return right(User.fromResponse(response.data.user));
  }
  async searchUser(email: string): Promise<Either<WithReason, User[]>> {
    const response =
      await userServiceClient.users.usersControllerFindUserByEmail({ email });

    if (!response.ok) {
      return leftWithReason(response.error.message);
    }

    return right(User.fromResponseMany(response.data.foundedUsers));
  }
}

export const userService = new UserService();
