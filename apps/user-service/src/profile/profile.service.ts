import { Either, leftWithReason, right, WithReason } from '@luka/monads';
import { Injectable } from '@nestjs/common';
import User, { IUserResponse } from '../users/models/users.model';
import { UsersService } from '../users/users.service';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    private readonly repository: ProfileRepository,
    private readonly usersService: UsersService,
  ) {}

  async getProfile(userId: string): Promise<Either<WithReason, IUserResponse>> {
    const getUserResp = await this.usersService.getUser({ userId });
    if (!getUserResp.ok) {
      return leftWithReason(getUserResp.data.reason);
    }

    return right(User.toResponse(getUserResp.payload));
  }
}
