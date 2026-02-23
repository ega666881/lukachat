import { UserDto } from "@luka/user-service-client";

export interface IUserResponse {
  id: string;
  email: string;
  avatarUrl: string | null;
}

export default class User {
  readonly id: string;
  readonly email: string;
  readonly avatarUrl: string | null;
  readonly isSelf?: boolean | null;

  constructor(data: {
    id: string;
    email: string;
    avatarUrl: string | null;
    isSelf?: boolean | null;
  }) {
    this.id = data.id;
    this.email = data.email;
    this.isSelf = data.isSelf;
    this.avatarUrl = data.avatarUrl;
  }

  static fromResponse(data: UserDto) {
    return new User(data);
  }

  static fromResponseMany(users: UserDto[]) {
    return users.map((user) => User.fromResponse(user));
  }
}
