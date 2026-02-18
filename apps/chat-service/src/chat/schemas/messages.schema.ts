import { InferSelectModel } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { chatsTable } from './chats.schema';

export const messagesTable = pgTable('messages', {
  id: uuid('id').primaryKey(),
  chatId: uuid('chat_id')
    .notNull()
    .references(() => chatsTable.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull(),
  text: text().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type MessagesTable = InferSelectModel<typeof messagesTable>;
