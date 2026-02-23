import { Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class ProfileRepository {
  constructor(private readonly db: NodePgDatabase) {}
}
