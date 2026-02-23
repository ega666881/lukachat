import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import type { CurrentUserPayload } from '../../auth/interfaces/jwt-payload.interface';
import { JwtAuthGuard } from '../../auth/jwt/jwt.auth.guard';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { ProfileService } from '../profile.service';
import { GetProfileResponse } from './dto/get-profile.dto';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get('/')
  @ApiOkResponse({ type: GetProfileResponse })
  async getProfile(@CurrentUser() user: CurrentUserPayload) {
    const { userId } = user;
    const getProfileResult = await this.service.getProfile(userId);
    if (!getProfileResult.ok) {
      throw new HttpException(
        getProfileResult.data.reason,
        HttpStatus.BAD_GATEWAY,
      );
    }

    return { user: getProfileResult.payload };
  }
}
