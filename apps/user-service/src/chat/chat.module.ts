import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SocketModule } from '../socket/socket.module';
import { UsersModule } from '../users/users.module';
import { ChatService } from './chat.service';
import { ChatController } from './web/chat.controller';

@Module({
  imports: [UsersModule, SocketModule],
  providers: [ConfigModule, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
