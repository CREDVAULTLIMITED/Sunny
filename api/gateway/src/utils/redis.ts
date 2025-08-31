/**
 * Redis Client Utility
 */

import { createClient, RedisClientType } from 'redis';
import { config } from '../config/config';
import { logger } from './logger';

export class RedisClient {
  private client: RedisClientType;
  private isConnected: boolean = false;

  constructor() {
    this.client = createClient({
      socket: {
        host: config.database.redis.host,
        port: config.database.redis.port,
      },
      password: config.database.redis.password,
      database: config.database.redis.db,
    });

    this.setupEventHandlers();
    this.connect();
  }

  private setupEventHandlers(): void {
    this.client.on('connect', () => {
      logger.info('Redis client connected');
    });

    this.client.on('ready', () => {
      this.isConnected = true;
      logger.info('Redis client ready');
    });

    this.client.on('error', (err) => {
      logger.error('Redis client error:', err);
      this.isConnected = false;
    });

    this.client.on('end', () => {
      this.isConnected = false;
      logger.info('Redis client disconnected');
    });
  }

  private async connect(): Promise<void> {
    try {
      await this.client.connect();
    } catch (error) {
      logger.error('Failed to connect to Redis:', error);
    }
  }

  public getClient(): RedisClientType {
    return this.client;
  }

  public async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (error) {
      logger.error(`Redis GET error for key ${key}:`, error);
      return null;
    }
  }

  public async set(key: string, value: string): Promise<void> {
    try {
      await this.client.set(key, value);
    } catch (error) {
      logger.error(`Redis SET error for key ${key}:`, error);
    }
  }

  public async setex(key: string, seconds: number, value: string): Promise<void> {
    try {
      await this.client.setEx(key, seconds, value);
    } catch (error) {
      logger.error(`Redis SETEX error for key ${key}:`, error);
    }
  }

  public async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      logger.error(`Redis DEL error for key ${key}:`, error);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.client.disconnect();
      this.isConnected = false;
    } catch (error) {
      logger.error('Redis disconnect error:', error);
    }
  }

  public isHealthy(): boolean {
    return this.isConnected;
  }
}
