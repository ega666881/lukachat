import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { S3Module } from '../s3/s3.module';
import CacheModule from '../shared/cache/cache.module';
import { ValidatorsModule } from '../shared/validators/validators.module';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './web/users.controller';

@Module({
  imports: [CacheModule, DatabaseModule, ValidatorsModule, S3Module],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
