import { leftWithReason, right } from "@luka/monads";
import { userServiceClient } from "../app/utils/userServiceClient";
import User from "../models/user.model";
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
}

export const userService = new UserService();
