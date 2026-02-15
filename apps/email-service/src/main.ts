import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const config = new DocumentBuilder()
    .setTitle('Email Service')
    .setDescription('HTTP API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });

  SwaggerModule.setup('swagger', app, document);
  app
    .getHttpAdapter()
    .getInstance()
    .get('/swagger-json', (_req: Request, res: Response) => {
      res.json(document);
    });

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
