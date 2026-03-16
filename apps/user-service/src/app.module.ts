import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { DatabaseModule } from './database/database.module';
import { ProfileModule } from './profile/profile.module';
import { S3Module } from './s3/s3.module';
import CacheModule from './shared/cache/cache.module';
import { SocketModule } from './socket/socket.module';
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
    AuthModule,
    ChatModule,
    S3Module,
    ProfileModule,
    SocketModule,
  ],
})
export class AppModule {}
