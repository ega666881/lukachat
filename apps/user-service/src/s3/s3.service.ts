import {
  HeadBucketCommand,
  PutBucketPolicyCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
  S3ServiceException,
} from '@aws-sdk/client-s3';
import { Either, leftWithReason, right, WithReason } from '@luka/monads';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucketName!: string;
  private readonly endpoint!: string;
  private readonly logger = new Logger(S3Service.name);

  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.getOrThrow<string>('S3_BUCKET_NAME');
    this.endpoint = this.configService.getOrThrow<string>('S3_ENDPOINT');
    this.s3Client = new S3Client({
      endpoint: this.endpoint,
      forcePathStyle: true,
      region: this.configService.getOrThrow<string>('S3_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('S3_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow<string>(
          'S3_SECRET_ACCESS_KEY',
        ),
      },
    });

    this.ensureBucket();
  }

  async ensureBucket(): Promise<void> {
    try {
      await this.s3Client.send(
        new HeadBucketCommand({ Bucket: this.bucketName }),
      );
      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Sid: 'PublicReadGetObject',
            Effect: 'Allow',
            Principal: '*',
            Action: 's3:GetObject',
            Resource: `arn:aws:s3:::${this.bucketName}/*`,
          },
        ],
      };

      await this.s3Client.send(
        new PutBucketPolicyCommand({
          Bucket: this.bucketName,
          Policy: JSON.stringify(policy),
        }),
      );
      return;
    } catch (error) {
      if (error instanceof S3ServiceException && error.name === 'NotFound') {
        this.logger.debug(`Bucket ${this.bucketName} not found. Creating`);
      } else {
        this.logger.error(
          new Error(
            `Error check bucket: ${JSON.stringify({
              name: error.name,
              message: error.message,
              code: error.$metadata?.httpStatusCode,
            })}`,
          ),
        );
        throw error;
      }
    }
  }

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<Either<WithReason, string>> {
    if (!file) {
      throw new BadRequestException('Файл не предоставлен');
    }

    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedMimes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Разрешены только изображения (JPEG, PNG, WEBP)',
      );
    }

    const fileExtension = file.originalname.split('.').pop();
    const key = `uploads/${randomUUID()}.${fileExtension}`;

    const uploadParams: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      await this.s3Client.send(new PutObjectCommand(uploadParams));

      const location = `${this.endpoint}/${this.bucketName}/${key}`;

      this.logger.log(`Файл успешно загружен: ${key}`);
      return right(location);
    } catch (error) {
      this.logger.error('Ошибка загрузки в S3', error);
      return leftWithReason('Не удалось загрузить файл в хранилище');
    }
  }
}
