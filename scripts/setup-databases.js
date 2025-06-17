#!/usr/bin/env node
const connectionPool = require('../src/utils/connectionPool');
const dbSync = require('../src/utils/dbSync');
const logger = require('../src/utils/logger');

async function setupDatabases() {
  try {
    logger.info('Starting database setup...');

    // Initialize connection pools
    await connectionPool.initialize();
    logger.info('Connection pools initialized successfully');

    // Start database synchronization
    await dbSync.startSync();
    logger.info('Database synchronization started successfully');

    // Run a test query on each database to verify setup
    const mongoClient = await connectionPool.getMongoClient();
    const mongoDb = mongoClient.db(process.env.MONGODB_DATABASE);
    await mongoDb.command({ ping: 1 });
    logger.info('MongoDB connection verified');

    const pgClient = await connectionPool.getPgClient();
    try {
      await pgClient.query('SELECT 1');
      logger.info('PostgreSQL connection verified');
    } finally {
      pgClient.release();
    }

    const { id, client: redisClient } = await connectionPool.getRedisClient();
    try {
      await redisClient.ping();
      logger.info('Redis connection verified');
    } finally {
      connectionPool.releaseRedisClient(id);
    }

    logger.info('Database setup completed successfully');
  } catch (error) {
    logger.error('Database setup failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  setupDatabases().catch(error => {
    logger.error('Unhandled error during database setup:', error);
    process.exit(1);
  });
}

module.exports = setupDatabases;
