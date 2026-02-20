import { InferSelectModel } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: varchar('email').notNull(),
  avatarUrl: varchar('avatar_url').default(''),
  createdAt: timestamp('created_at').defaultNow(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
export type UsersTable = InferSelectModel<typeof usersTable>;
