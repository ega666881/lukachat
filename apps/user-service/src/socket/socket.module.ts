import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [DatabaseModule, ConfigModule],
  providers: [SocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}
