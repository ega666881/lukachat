import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import CacheModule from '../shared/cache/cache.module';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './web/users.controller';

@Module({
  imports: [CacheModule, DatabaseModule],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
})
export class UsersModule {}
