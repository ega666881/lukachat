import { AuthCredentials } from '@luka/models';
import { Either, leftWithReason, right, WithReason } from '@luka/monads';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { R } from '../shared/enums/reason.enum';
import User from '../users/models/users.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private accessTokenExpiration!: string;
  private jwtSecret!: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {
    this.accessTokenExpiration = this.configService.getOrThrow(
      'ACCESS_TOKEN_EXPIRATION',
    );
    this.jwtSecret = configService.getOrThrow<string>('JWT_SECRET');
  }

  async refreshToken(
    oldRefreshToken: string,
  ): Promise<Either<WithReason, AuthCredentials>> {
    let payload;
    try {
      payload = this.jwtService.verify(oldRefreshToken, {
        secret: this.jwtSecret,
      }) as {
        userId: string;
      };
    } catch {
      return leftWithReason(R.REFRESH_TOKEN_INVALID);
    }

    const userResult = await this.userService.getById(payload.userId);
    if (!userResult.ok) return userResult;

    return right(this.getAuthCredentials(userResult.payload));
  }

  getAuthCredentials(user: User): AuthCredentials {
    const accessToken = this.jwtService.sign(
      { userId: user.id, type: 'access' },
      { expiresIn: this.accessTokenExpiration, secret: this.jwtSecret },
    );

    const refreshToken = this.jwtService.sign(
      { userId: user.id, type: 'refresh' },
      { expiresIn: '100y', secret: this.jwtSecret },
    );

    return new AuthCredentials(user.id, accessToken, refreshToken);
  }

  async emailAuth(
    email: string,
    code: string,
  ): Promise<Either<WithReason, AuthCredentials>> {
    const verifyEmailCode = await this.userService.verifyEmailCode(email, code);

    if (!verifyEmailCode) {
      return leftWithReason(R.EMAIL_CODE_INVALID);
    }

    this.userService.deleteEmailCode(email);

    const getOrCreateUserResult = await this.userService.getOrCreateUser(email);

    if (!getOrCreateUserResult.ok) {
      return leftWithReason(getOrCreateUserResult.data.reason);
    }

    const user = getOrCreateUserResult.payload;

    const authCreditails = this.getAuthCredentials(user);
    return right(authCreditails);
  }
}
