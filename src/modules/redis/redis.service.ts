import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CONNECTION') private readonly redis: Redis) {}

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async hget(key: string, field: string): Promise<object | string | null> {
    return this.redis.hget(key, field);
  }

  async hgetall(key: string): Promise<object | string | null> {
    return this.redis.hgetall(key);
  }

  async hdel(key: string, fieldsArray: any): Promise<number> {
    return this.redis.hdel(key, fieldsArray);
  }
}
