import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import * as crypto from 'crypto';
import { IsUuid } from '../../../shared/decorators/uuid.decorator';
import { EntityExistsRule } from '../../../shared/validators/entityExists.validator';
import { usersTable } from '../../schemas/users.schema';
import { UserDto } from './user.dto';

export class GetUserRequest {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @IsUUID()
  @IsUuid({
    table: usersTable,
    column: 'id',
    description: 'ID пользователя',
    required: false,
  })
  userId?: crypto.UUID;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @IsEmail()
  @Validate(EntityExistsRule, [usersTable, 'email'])
  email?: string;
}

export class GetUserResponse {
  @ApiProperty()
  @IsNotEmpty()
  user!: UserDto;
}
