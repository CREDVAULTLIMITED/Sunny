const { MongoClient } = require('mongodb');
const { Pool } = require('pg');
const Redis = require('ioredis');
const logger = require('./logger');
require('dotenv').config();

class DatabaseSynchronizer {
  constructor() {
    this.mongo = null;
    this.postgres = null;
    this.redis = null;
    this.syncInterval = 5000; // 5 seconds
    this.syncInProgress = false;
  }

  async connect() {
    try {
      // MongoDB connection with connection pooling
      this.mongo = await MongoClient.connect(process.env.MONGODB_URI, {
        maxPoolSize: 50,
        minPoolSize: 10,
        maxIdleTimeMS: 60000,
        connectTimeoutMS: 5000
      });

      // PostgreSQL connection pool
      this.postgres = new Pool({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000
      });

      // Redis connection
      this.redis = new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
        maxRetriesPerRequest: 3,
        enableReadyCheck: true
      });

      logger.info('Database connections established successfully');
    } catch (error) {
      logger.error('Failed to establish database connections:', error);
      throw error;
    }
  }

  async syncPayments() {
    if (this.syncInProgress) return;
    this.syncInProgress = true;

    try {
      const mongoDb = this.mongo.db(process.env.MONGODB_DATABASE);
      const lastSync = await this.redis.get('last_payment_sync');
      const query = lastSync ? { updatedAt: { $gt: new Date(lastSync) } } : {};

      const payments = await mongoDb.collection('payments')
        .find(query)
        .toArray();

      if (payments.length > 0) {
        // Batch insert/update to PostgreSQL
        const pgClient = await this.postgres.connect();
        try {
          await pgClient.query('BEGIN');
          
          for (const payment of payments) {
            await pgClient.query(
              `INSERT INTO payments (
                id, amount, currency, status, payment_method, metadata, 
                risk_assessment, created_at, updated_at
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
              ON CONFLICT (id) DO UPDATE SET
                amount = EXCLUDED.amount,
                status = EXCLUDED.status,
                payment_method = EXCLUDED.payment_method,
                metadata = EXCLUDED.metadata,
                risk_assessment = EXCLUDED.risk_assessment,
                updated_at = EXCLUDED.updated_at`,
              [
                payment._id.toString(),
                payment.amount,
                payment.currency,
                payment.status,
                payment.paymentMethod,
                payment.metadata,
                payment.riskAssessment,
                payment.createdAt,
                payment.updatedAt
              ]
            );
          }

          await pgClient.query('COMMIT');
          await this.redis.set('last_payment_sync', new Date().toISOString());
          logger.info(`Synchronized ${payments.length} payments`);
        } catch (error) {
          await pgClient.query('ROLLBACK');
          throw error;
        } finally {
          pgClient.release();
        }
      }
    } catch (error) {
      logger.error('Payment synchronization failed:', error);
    } finally {
      this.syncInProgress = false;
    }
  }

  async startSync() {
    await this.connect();
    setInterval(() => this.syncPayments(), this.syncInterval);
    logger.info('Database synchronization started');
  }

  async close() {
    await this.mongo?.close();
    await this.postgres?.end();
    await this.redis?.quit();
    logger.info('Database connections closed');
  }
}

module.exports = new DatabaseSynchronizer();
