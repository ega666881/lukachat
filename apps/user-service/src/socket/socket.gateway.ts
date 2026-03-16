import { ChatDto, ChatServiceClient } from '@luka/chat-service-client';
import { Either, leftWithReason, right, WithReason } from '@luka/monads';
import { AddClientToChatRoom, RoomSlug } from '@luka/websocket';
import { ConfigService } from '@nestjs/config';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { PinoLogger } from 'nestjs-pino';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection {
  private chatServiceClient: ChatServiceClient<never>;
  constructor(
    private readonly logger: PinoLogger,
    private readonly configService: ConfigService,
  ) {
    this.chatServiceClient = new ChatServiceClient({
      baseUrl: this.configService.getOrThrow<string>('CHAT_SERVICE_URL'),
    });
  }

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.info('WebSocket сервер инициализирован');
  }

  private async getUserChats(
    userId: string,
  ): Promise<Either<WithReason, ChatDto[]>> {
    const response = await this.chatServiceClient.chat.chatControllerGetChats({
      userId,
    });

    if (!response.ok) {
      return leftWithReason(response.error.message);
    }

    return right(response.data.chats);
  }

  async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (!userId) {
      return;
    }
    client.join(`${RoomSlug.USER}_${userId}`);
    this.logger.info(`Клиент подключен: ${userId}`);
    const getChatUserResult = await this.getUserChats(userId);
    if (!getChatUserResult.ok) {
      return;
    }

    const chats = getChatUserResult.payload;
    chats.map((chat) => client.join(`${RoomSlug.CHAT}_${chat.id}`));
  }

  @SubscribeMessage('add-client-to-chat-room')
  async handleUserLogin(
    @MessageBody() data: AddClientToChatRoom.Message,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`${RoomSlug.CHAT}_${data.chatId}`);
  }
}
