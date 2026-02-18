import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { ChatModule } from './chat/chat.module';
import { DatabaseModule } from './database/database.module';
import CacheModule from './shared/cache/cache.module';
import { ValidatorsModule } from './shared/validators/validators.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CacheModule,
    DatabaseModule,
    ValidatorsModule,
    RedisModule,
    ChatModule,
  ],
})
export class AppModule {}
