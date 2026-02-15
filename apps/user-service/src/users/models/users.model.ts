import { UUID } from 'crypto';
import { UsersTable } from '../schemas/users.schema';
import { UserDto } from '../web/dto/user.dto';

export default class User {
  readonly id: UUID;
  readonly email: string;
  readonly createdAt: Date;

  constructor(data: { id: UUID; email: string; createdAt: Date }) {
    this.id = data.id;
    this.email = data.email;
    this.createdAt = data.createdAt;
  }

  static fromTables(tables: UsersTable[]) {
    return tables.map((t) => User.fromTable(t));
  }

  static fromTable(table: UsersTable) {
    return new User({
      id: table.id as UUID,
      email: table.email ?? undefined,
      createdAt: table.createdAt!,
    });
  }

  static toResponse(user: User): UserDto {
    return {
      id: user.id,
      email: user.email!,
    };
  }

  static toResponseMany(users: User[]): UserDto[] {
    return users.map((u) => User.toResponse(u));
  }
}
