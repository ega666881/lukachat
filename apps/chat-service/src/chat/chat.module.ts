import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { ChatRepository } from './chat.repository';
import { ChatService } from './chat.service';
import { ChatController } from './web/chat.controller';

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [ChatService, ChatRepository],
  controllers: [ChatController],
})
export class ChatModule {}
