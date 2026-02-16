import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@ValidatorConstraint({ name: 'EntityExists', async: true })
@Injectable()
export class EntityExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly db: NodePgDatabase) {}

  // eslint-disable-next-line
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [table, colName] = args.constraints;

    if (!(table instanceof Object)) {
      throw new Error('First constraint must be a Drizzle table object');
    }

    const columnName = colName || 'id';
    // eslint-disable-next-line
    const column = (table as any)[columnName];

    if (!column) {
      throw new Error(`Column "${columnName}" not found`);
    }

    const result = await this.db
      .select()
      .from(table)
      .where(eq(column, value))
      .limit(1);

    return result.length > 0;
  }

  defaultMessage(): string {
    return `Entity does not exist.`;
  }
}
