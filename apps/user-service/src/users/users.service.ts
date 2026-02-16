import {
  EmailServiceClient,
  SendAuthCodeResponse,
} from '@luka/email-service-client';
import { Either, leftWithReason, right, WithReason } from '@luka/monads';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID, UUID } from 'crypto';
import CacheService from '../shared/cache/cache.service';
import User from './models/users.model';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  private emailServiceClient = new EmailServiceClient();

  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    private readonly repository: UserRepository,
  ) {
    this.emailServiceClient.baseUrl =
      configService.getOrThrow<string>('EMAIL_SERVICE_URL');
  }

  async getUser({
    email,
    userId,
  }: {
    email?: string;
    userId?: UUID;
  }): Promise<Either<WithReason, User>> {
    if (email) {
      return this.getByEmail(email);
    }
    if (userId) {
      return this.getById(userId);
    } else {
      return leftWithReason('No options provided');
    }
  }

  async getByEmail(email: string): Promise<Either<WithReason, User>> {
    return this.repository.getByEmail(email);
  }

  async getById(id: UUID): Promise<Either<WithReason, User>> {
    return this.repository.getById(id);
  }

  async getOrCreateUser(email: string) {
    const getUserResult = await this.getByEmail(email);
    if (getUserResult.ok === false) {
      const createUserResult = await this.repository.createUser(
        new User({
          id: randomUUID(),
          email,
          createdAt: new Date(),
        }),
      );
      if (!createUserResult.ok) {
        return leftWithReason(createUserResult.data.reason);
      }
      return right(createUserResult.payload);
    }
    return right(getUserResult.payload);
  }

  async requestEmailCode(
    email: string,
  ): Promise<Either<WithReason, SendAuthCodeResponse>> {
    const getOrCreateUserResult = await this.getOrCreateUser(email);

    if (!getOrCreateUserResult.ok) {
      return leftWithReason(getOrCreateUserResult.data.reason);
    }

    const code = '12345';
    const requestAuthCodeResult =
      await this.emailServiceClient.mail.mailControllerSendAuthCode({
        email,
        code,
      });

    if (!requestAuthCodeResult.ok) {
      return leftWithReason(requestAuthCodeResult.error.message);
    }

    return right(requestAuthCodeResult.data);
  }
}
