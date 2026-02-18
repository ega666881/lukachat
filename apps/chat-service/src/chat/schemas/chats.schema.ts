import { ChatType } from '@luka/enums';
import { InferSelectModel } from 'drizzle-orm';
import { pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

export const chatEnum = pgEnum('chat_type', [
  ChatType.CHANNEL,
  ChatType.GROUP,
  ChatType.PRIVATE,
]);

export const chatsTable = pgTable('chats', {
  id: uuid('id').primaryKey(),
  type: chatEnum().notNull().default(ChatType.PRIVATE),
  createdAt: timestamp('created_at').defaultNow(),
});

export type ChatsTable = InferSelectModel<typeof chatsTable>;
