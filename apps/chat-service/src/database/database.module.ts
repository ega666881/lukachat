import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: NodePgDatabase,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const url = configService.getOrThrow<string>('DATABASE_URL');
        const pool = new Pool({ connectionString: url });
        return drizzle(pool);
      },
    },
  ],
  exports: [NodePgDatabase],
})
export class DatabaseModule {}
