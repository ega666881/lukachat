import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { DatabaseModule } from './database/database.module';
import CacheModule from './shared/cache/cache.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CacheModule,
    DatabaseModule,
    UsersModule,
    RedisModule,
  ],
})
export class AppModule {}
