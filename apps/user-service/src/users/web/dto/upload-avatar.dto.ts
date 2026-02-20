import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadAvatarResponse {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  uploadedUrl!: string;
}
