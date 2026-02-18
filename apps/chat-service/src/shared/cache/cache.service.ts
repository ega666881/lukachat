import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export default class CacheService implements OnModuleDestroy, OnModuleInit {
  private client?: Redis;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(CacheService.name);
  }

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  private async connect(): Promise<void> {
    this.client = new Redis(this.configService.getOrThrow('REDIS_URL'));

    this.client.on('error', (err) => {
      this.logger.error('Redis error', err);
    });

    this.client.on('connect', () => {
      this.logger.info('Redis connected');
    });

    await new Promise((resolve, reject) => {
      this.client!.on('ready', resolve);
      this.client!.on('error', reject);
    });
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      this.client.removeAllListeners();
      await this.client.quit();
      this.logger.info('Redis disconnected');
    }
  }

  async setKey(key: string, value: string, seconds?: number): Promise<void> {
    if (!this.client || this.client.status !== 'ready') {
      this.logger.error(
        'Redis client not connected. Skipping setKey operation',
      );
      return;
    }

    try {
      if (seconds) {
        await this.client.set(key, value, 'EX', seconds);
      } else {
        await this.client.set(key, value);
      }
    } catch (error) {
      this.logger.error('Redis setKey error', error);
      throw error;
    }
  }

  async setKeyObj(key: string, value: object, seconds?: number): Promise<void> {
    if (!this.client || this.client.status !== 'ready') {
      this.logger.error(
        'Redis client not connected. Skipping setKeyObj operation',
      );
      return;
    }

    try {
      if (seconds) {
        await this.client.set(key, JSON.stringify(value), 'EX', seconds);
      } else {
        await this.client.set(key, JSON.stringify(value));
      }
    } catch (error) {
      this.logger.error('Redis setKeyObj error', error);
      throw error;
    }
  }

  async getKey(key: string): Promise<string | null> {
    if (!this.client || this.client.status !== 'ready') {
      this.logger.error(
        'Redis client not connected. Skipping getKey operation',
      );
      return null;
    }

    try {
      return await this.client.get(key);
    } catch (error) {
      this.logger.error('Redis getKey error', error);
      throw error;
    }
  }

  async deleteKey(key: string): Promise<void> {
    if (!this.client || this.client.status !== 'ready') {
      this.logger.error(
        'Redis client not connected. Skipping deleteKey operation',
      );
      return;
    }

    try {
      await this.client.del(key);
    } catch (error) {
      this.logger.error('Redis deleteKey error', error);
      throw error;
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      if (this.client && this.client.status === 'ready') {
        await this.client.ping();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
}
