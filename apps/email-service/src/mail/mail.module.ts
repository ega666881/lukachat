import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './web/mail.controller';

@Module({
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
