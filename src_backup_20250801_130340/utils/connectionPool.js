const { MongoClient } = require('mongodb');
const { Pool } = require('pg');
const Redis = require('ioredis');
const logger = require('./logger');
require('dotenv').config();

class ConnectionPoolManager {
  constructor() {
    this.mongoPool = null;
    this.pgPool = null;
    this.redisClients = new Map();
    this.maxRedisClients = 50;
    this.healthCheckInterval = null;
  }

  async initialize() {
    try {
      // Initialize MongoDB connection pool
      this.mongoPool = await MongoClient.connect(process.env.MONGODB_URI, {
        maxPoolSize: 50,
        minPoolSize: 10,
        maxIdleTimeMS: 60000,
        connectTimeoutMS: 5000,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        keepAlive: true
      });

      // Initialize PostgreSQL connection pool
      this.pgPool = new Pool({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000
      });

      // Start health checks
      this.startHealthChecks();
      logger.info('Connection pools initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize connection pools:', error);
      throw error;
    }
  }

  async getMongoClient() {
    if (!this.mongoPool) {
      throw new Error('MongoDB connection pool not initialized');
    }
    return this.mongoPool;
  }

  async getPgClient() {
    if (!this.pgPool) {
      throw new Error('PostgreSQL connection pool not initialized');
    }
    return await this.pgPool.connect();
  }

  async getRedisClient() {
    // Get or create a Redis client with connection pooling
    const availableClient = Array.from(this.redisClients.entries())
      .find(([_, client]) => client.status === 'ready' && !client.inUse);

    if (availableClient) {
      const [id, client] = availableClient;
      client.inUse = true;
      return { id, client };
    }

    if (this.redisClients.size >= this.maxRedisClients) {
      throw new Error('Maximum Redis connections reached');
    }

    const newClient = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      retryStrategy: (times) => Math.min(times * 50, 2000)
    });

    const id = Date.now().toString();
    newClient.inUse = true;
    this.redisClients.set(id, newClient);
    return { id, client: newClient };
  }

  releaseRedisClient(id) {
    const client = this.redisClients.get(id);
    if (client) {
      client.inUse = false;
    }
  }

  async startHealthChecks() {
    this.healthCheckInterval = setInterval(async () => {
      try {
        // Check MongoDB connection
        const mongoDb = this.mongoPool.db(process.env.MONGODB_DATABASE);
        await mongoDb.command({ ping: 1 });

        // Check PostgreSQL connection
        const pgClient = await this.pgPool.connect();
        try {
          await pgClient.query('SELECT 1');
        } finally {
          pgClient.release();
        }

        // Check Redis connections
        for (const [id, client] of this.redisClients) {
          try {
            await client.ping();
          } catch (error) {
            logger.warn(`Redis client ${id} health check failed:`, error);
            if (!client.inUse) {
              await client.quit();
              this.redisClients.delete(id);
            }
          }
        }

        logger.debug('Health check completed successfully');
      } catch (error) {
        logger.error('Health check failed:', error);
      }
    }, parseInt(process.env.DB_HEALTH_CHECK_INTERVAL) || 30000);
  }

  async close() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }

    try {
      // Close MongoDB connection
      await this.mongoPool?.close();

      // Close PostgreSQL pool
      await this.pgPool?.end();

      // Close all Redis clients
      for (const [id, client] of this.redisClients) {
        await client.quit();
        this.redisClients.delete(id);
      }

      logger.info('All connection pools closed successfully');
    } catch (error) {
      logger.error('Error closing connection pools:', error);
      throw error;
    }
  }
}

module.exports = new ConnectionPoolManager();
