import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { EntityExistsRule } from './entityExists.validator';

@Module({
  imports: [DatabaseModule],
  providers: [EntityExistsRule],
  exports: [EntityExistsRule],
})
export class ValidatorsModule {}
