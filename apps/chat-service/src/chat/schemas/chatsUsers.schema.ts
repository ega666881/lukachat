import { InferSelectModel } from 'drizzle-orm';
import {
  index,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { chatsTable } from './chats.schema';

export const chatsUsersTable = pgTable(
  'chats_users',
  {
    userId: uuid('user_id').notNull(),
    chatId: uuid('chat_id')
      .notNull()
      .references(() => chatsTable.id, { onDelete: 'cascade' }),
    joinedAt: timestamp('joined_at').defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.chatId] }),
    userIdIdx: index('chats_users_user_id_idx').on(table.userId),
    chatIdIdx: index('chats_users_chat_id_idx').on(table.chatId),
  }),
);

export type ChatUsersTable = InferSelectModel<typeof chatsUsersTable>;
