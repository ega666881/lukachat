import { ChatType } from '@luka/enums';
import { Either, leftWithReason, right, WithReason } from '@luka/monads';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { and, desc, eq, max } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { R } from '../shared/enums/reason.enum';
import Chat from './models/chat.model';
import Message from './models/message.model';
import { chatsTable } from './schemas/chats.schema';
import { chatsUsersTable, ChatUsersTable } from './schemas/chatsUsers.schema';
import { messagesTable } from './schemas/messages.schema';

@Injectable()
export class ChatRepository {
  constructor(private readonly db: NodePgDatabase) {}

  async getById(chatId: string): Promise<Either<WithReason, Chat>> {
    const result = await this.db
      .select({
        chat: chatsTable,
        messages: messagesTable,
      })
      .from(chatsTable)
      .leftJoin(messagesTable, eq(chatsTable.id, messagesTable.chatId))
      .where(eq(chatsTable.id, chatId))
      .orderBy(desc(messagesTable.createdAt));

    if (!result[0]) {
      return leftWithReason(R.CHAT_NOT_FOUND);
    }

    const { chat } = result[0];

    const messages = result
      .map((item) => item.messages)
      .filter(
        (msg): msg is NonNullable<typeof msg> =>
          msg !== null && msg !== undefined,
      );

    return right(Chat.fromTable(chat, messages));
  }

  async createMessage(
    chatId: string,
    userId: string,
    text: string,
  ): Promise<Either<WithReason, Message>> {
    const result = await this.db
      .insert(messagesTable)
      .values({
        id: randomUUID(),
        userId: userId,
        chatId,
        text,
        createdAt: new Date(),
      })
      .returning();

    if (!result[0]) {
      return leftWithReason('Failed create message');
    }

    return right(Message.fromTable(result[0]));
  }

  async createChat(type: ChatType): Promise<Either<WithReason, Chat>> {
    const result = await this.db
      .insert(chatsTable)
      .values({ id: randomUUID(), type, createdAt: new Date() })
      .returning();

    if (!result[0]) {
      return leftWithReason('Failed create message');
    }

    const [insertedChat] = result;

    return right(Chat.fromTable(insertedChat, []));
  }

  async addUsersToChat(
    chatId: string,
    usersIds: string[],
  ): Promise<Either<WithReason, boolean>> {
    try {
      const usersCandidate: ChatUsersTable[] = usersIds.map((userId) => {
        return { id: randomUUID(), userId, joinedAt: new Date(), chatId };
      });
      await this.db.insert(chatsUsersTable).values(usersCandidate).returning();

      return right(true);
    } catch {
      return leftWithReason('Failed insert users to chat');
    }
  }

  async getChatsList(userId: string) {
    const latestMessageSubquery = this.db
      .select({
        chatId: messagesTable.chatId,
        createdAt: max(messagesTable.createdAt).as('createdAt'),
      })
      .from(messagesTable)
      .groupBy(messagesTable.chatId)
      .as('latest_message');

    const result = await this.db
      .select({
        chat: chatsTable,
        lastMessage: messagesTable,
      })
      .from(chatsTable)
      .innerJoin(chatsUsersTable, eq(chatsTable.id, chatsUsersTable.chatId))
      .leftJoin(
        latestMessageSubquery,
        eq(chatsTable.id, latestMessageSubquery.chatId),
      )
      .leftJoin(
        messagesTable,
        and(
          eq(messagesTable.chatId, latestMessageSubquery.chatId),
          eq(messagesTable.createdAt, latestMessageSubquery.createdAt),
        ),
      )
      .where(eq(chatsUsersTable.userId, userId));

    const filtredResult = result.map((item) => ({
      chat: item.chat,
      messages: item.lastMessage ? [item.lastMessage] : [],
    }));

    return Chat.fromTables(filtredResult);
  }
}
