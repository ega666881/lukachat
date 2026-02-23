import { Either, leftWithReason, right, WithReason } from '@luka/monads';
import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { eq, inArray } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import User from './models/users.model';
import { usersTable } from './schemas/users.schema';

@Injectable()
export class UserRepository {
  constructor(private readonly db: NodePgDatabase) {}

  async getByEmail(email: string): Promise<Either<WithReason, User>> {
    const result = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (!result[0]) {
      return leftWithReason('User not found');
    }

    return right(User.fromTable(result[0]));
  }

  async updateAvatar(avatarUrl: string, userId: string): Promise<boolean> {
    await this.db
      .update(usersTable)
      .set({ avatarUrl })
      .where(eq(usersTable.id, userId));

    return true;
  }

  async getByIdMany(ids: string[]): Promise<User[]> {
    const result = await this.db
      .select()
      .from(usersTable)
      .where(inArray(usersTable.id, ids));

    return User.fromTables(result);
  }

  async getById(id: UUID | string): Promise<Either<WithReason, User>> {
    const result = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);

    if (!result[0]) {
      return leftWithReason('User not found');
    }

    return right(User.fromTable(result[0]));
  }

  async createUser(user: User): Promise<Either<WithReason, User>> {
    const result = await this.db
      .insert(usersTable)
      .values({
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      })
      .returning();

    if (!result[0]) {
      return leftWithReason('Failed to create user');
    }

    return right(user);
  }
}
