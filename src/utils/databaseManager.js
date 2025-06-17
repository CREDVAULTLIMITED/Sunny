import mongoose from 'mongoose';
import { Pool } from 'pg';
import Redis from 'ioredis';
import config from '../config/config';
import mongoConnect from '../utils/mongoConnect';

class DatabaseManager {
  constructor() {
    this.databases = {
      mongodb: null,
      postgres: null,
      redis: null
    };
    this.healthStates = {
      mongodb: false,
      postgres: false,
      redis: false
    };
  }

  async initialize() {
    try {
      // Initialize all database connections in parallel
      await Promise.all([
        this.initializeMongoDB(),
        this.initializePostgres(),
        this.initializeRedis()
      ]);

      // Set up health check interval
      setInterval(() => this.checkHealth(), 30000);

    } catch (error) {
      console.error('Error initializing databases:', error);
      throw error;
    }
  }

  async initializeMongoDB() {
    try {
      await mongoConnect.connect();
      this.databases.mongodb = mongoose.connection;
      this.healthStates.mongodb = true;
    } catch (error) {
      console.error('MongoDB initialization error:', error);
      this.healthStates.mongodb = false;
    }
  }

  async initializePostgres() {
    try {
      const pool = new Pool({
        connectionString: config.database.url,
        max: config.database.connectionLimit
      });
      await pool.query('SELECT NOW()');
      this.databases.postgres = pool;
      this.healthStates.postgres = true;
    } catch (error) {
      console.error('PostgreSQL initialization error:', error);
      this.healthStates.postgres = false;
    }
  }

  async initializeRedis() {
    try {
      const redis = new Redis(config.redis.url);
      await redis.ping();
      this.databases.redis = redis;
      this.healthStates.redis = true;
    } catch (error) {
      console.error('Redis initialization error:', error);
      this.healthStates.redis = false;
    }
  }

  async checkHealth() {
    try {
      // Check MongoDB
      if (this.databases.mongodb) {
        try {
          await this.databases.mongodb.db.admin().ping();
          this.healthStates.mongodb = true;
        } catch (error) {
          this.healthStates.mongodb = false;
          console.error('MongoDB health check failed:', error);
        }
      }

      // Check PostgreSQL
      if (this.databases.postgres) {
        try {
          await this.databases.postgres.query('SELECT 1');
          this.healthStates.postgres = true;
        } catch (error) {
          this.healthStates.postgres = false;
          console.error('PostgreSQL health check failed:', error);
        }
      }

      // Check Redis
      if (this.databases.redis) {
        try {
          await this.databases.redis.ping();
          this.healthStates.redis = true;
        } catch (error) {
          this.healthStates.redis = false;
          console.error('Redis health check failed:', error);
        }
      }

    } catch (error) {
      console.error('Health check error:', error);
    }
  }

  getPaymentDatabase() {
    // Prefer MongoDB for payments if healthy
    if (this.healthStates.mongodb) {
      return {
        type: 'mongodb',
        connection: this.databases.mongodb
      };
    }
    
    // Fallback to PostgreSQL
    if (this.healthStates.postgres) {
      return {
        type: 'postgres',
        connection: this.databases.postgres
      };
    }

    throw new Error('No available database for payment processing');
  }

  getCacheDatabase() {
    // Use Redis for caching if healthy
    if (this.healthStates.redis) {
      return {
        type: 'redis',
        connection: this.databases.redis
      };
    }

    // Fallback to in-memory caching
    console.warn('Redis unavailable, using in-memory cache');
    return {
      type: 'memory',
      connection: new Map()
    };
  }

  async closeAll() {
    try {
      if (this.databases.mongodb) {
        await mongoConnect.disconnect();
      }
      if (this.databases.postgres) {
        await this.databases.postgres.end();
      }
      if (this.databases.redis) {
        await this.databases.redis.quit();
      }
    } catch (error) {
      console.error('Error closing database connections:', error);
      throw error;
    }
  }
}

export default new DatabaseManager();
