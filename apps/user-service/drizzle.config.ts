import 'dotenv/config';

import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './drizzle',
  schema: './src/**/*.schema.ts',
  dialect: 'postgresql',
  migrations: {
    table: 'user_service_migrations',
  },
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
