import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';
import { ProfileController } from './web/profile.controller';

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [ProfileService, ProfileRepository],
  controllers: [ProfileController],
})
export class ProfileModule {}
