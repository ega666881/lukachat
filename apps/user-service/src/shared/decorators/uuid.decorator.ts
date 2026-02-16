import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsUUID as IsUuidValidator,
  Validate,
} from 'class-validator';
import { EntityExistsRule } from '../validators/entityExists.validator';

interface UuidOptions {
  // eslint-disable-next-line
  table: any;
  column?: string;
  description?: string;
  required?: boolean;
}

export function IsUuid(
  options: UuidOptions & { required: true },
): PropertyDecorator;
export function IsUuid(
  options: UuidOptions & { required?: false },
): PropertyDecorator;
export function IsUuid(options: UuidOptions): PropertyDecorator {
  const {
    table,
    column = 'id',
    description = 'UUID идентификатор',
    required = true,
  } = options;

  return applyDecorators(
    ApiProperty({
      format: 'uuid',
      description,
      required,
      type: String,
      example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    IsString({ message: 'Должен быть строкой' }),
    ...(required ? [] : [IsOptional()]),
    IsUuidValidator('4', { message: 'Неверный формат UUID' }),
    Transform(({ value }) =>
      value ? String(value).toLowerCase().trim() : value,
    ),
    Validate(EntityExistsRule, [table, column], {
      message: `Сущность не найдена`,
    }),
  );
}
