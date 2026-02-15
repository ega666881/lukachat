import { Either, leftWithReason, right, WithReason } from '@luka/monads';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter!: nodemailer.Transporter;
  private emailFrom!: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'yandex',
      auth: {
        user: `sytnxxhelp`,
        pass: `npqvphgiqbtgkowh`,
      },
    });

    this.emailFrom = configService.getOrThrow<string>('EMAIL_FROM');
  }

  private async sendMail(
    email: string,
    text: string,
    subject: string,
  ): Promise<Either<WithReason, boolean>> {
    const mailOptions = {
      from: this.emailFrom,
      to: email,
      subject: subject,
      text: text,
    };
    try {
      await this.transporter.sendMail(mailOptions);
      return right(true);
    } catch (e) {
      this.logger.error(
        `Failed send email ${e}. Mail options ${JSON.stringify(mailOptions)}`,
      );
      return leftWithReason('Failed to send email');
    }
  }

  async sendAuthCode(
    email: string,
    code: string,
  ): Promise<Either<WithReason, boolean>> {
    return this.sendMail(email, code, 'Код для входа');
  }
}
