import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { ChatService } from './chat.service';
import { ChatController } from './web/chat.controller';

@Module({
  imports: [UsersModule],
  providers: [ConfigModule, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
