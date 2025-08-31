import mongoose from 'mongoose';
import config from './config';
import { createClient } from 'redis';
import { Pool } from 'pg';

// Database connection URLs
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/sunny_payments';
const REDIS_URL = config.redis.url;
const PG_URL = process.env.DATABASE_URL;

// Connection pools
let mongoConnection = null;
let redisClient = null;
let pgPool = null;

// Database connection states
const dbStates = {
  mongodb: false,
  redis: false,
  postgres: false
};

// Connect to MongoDB
export const connectMongoDB = async () => {
  try {
    if (!mongoConnection) {
      mongoConnection = await mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
      });
      dbStates.mongodb = true;
      console.log('MongoDB connected successfully');
    }
    return mongoConnection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    dbStates.mongodb = false;
    throw error;
  }
};

// Connect to Redis
export const connectRedis = async () => {
  try {
    if (!redisClient) {
      redisClient = createClient({ url: REDIS_URL });
      await redisClient.connect();
      dbStates.redis = true;
      console.log('Redis connected successfully');
    }
    return redisClient;
  } catch (error) {
    console.error('Redis connection error:', error);
    dbStates.redis = false;
    throw error;
  }
};

// Connect to PostgreSQL
export const connectPostgres = async () => {
  try {
    if (!pgPool) {
      pgPool = new Pool({
        connectionString: PG_URL,
        max: config.database.connectionLimit
      });
      await pgPool.query('SELECT NOW()'); // Test connection
      dbStates.postgres = true;
      console.log('PostgreSQL connected successfully');
    }
    return pgPool;
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
    dbStates.postgres = false;
    throw error;
  }
};

// Get database connection based on priority
export const getDatabaseConnection = async () => {
  try {
    // Try primary database (PostgreSQL)
    if (!dbStates.postgres) {
      await connectPostgres();
    }
    return { type: 'postgres', connection: pgPool };
  } catch (pgError) {
    console.warn('PostgreSQL unavailable, trying MongoDB...');
    try {
      // Fallback to MongoDB
      if (!dbStates.mongodb) {
        await connectMongoDB();
      }
      return { type: 'mongodb', connection: mongoConnection };
    } catch (mongoError) {
      console.error('All database connections failed');
      throw new Error('No available database connections');
    }
  }
};

// Health check for all databases
export const checkDatabaseHealth = async () => {
  const health = {
    postgres: false,
    mongodb: false,
    redis: false
  };

  try {
    if (pgPool) {
      await pgPool.query('SELECT 1');
      health.postgres = true;
    }
  } catch (e) {
    console.error('PostgreSQL health check failed:', e);
  }

  try {
    if (mongoConnection) {
      await mongoose.connection.db.admin().ping();
      health.mongodb = true;
    }
  } catch (e) {
    console.error('MongoDB health check failed:', e);
  }

  try {
    if (redisClient) {
      await redisClient.ping();
      health.redis = true;
    }
  } catch (e) {
    console.error('Redis health check failed:', e);
  }

  return health;
};

// Close all connections
export const closeConnections = async () => {
  if (pgPool) await pgPool.end();
  if (mongoConnection) await mongoose.disconnect();
  if (redisClient) await redisClient.quit();
};

export default {
  connectMongoDB,
  connectRedis,
  connectPostgres,
  getDatabaseConnection,
  checkDatabaseHealth,
  closeConnections
};
