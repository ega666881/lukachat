import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatService } from './chat.service';
import { ChatController } from './web/chat.controller';

@Module({
  providers: [ConfigModule, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
