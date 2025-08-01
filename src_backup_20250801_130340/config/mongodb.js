/**
 * MongoDB connection configuration
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Connection URI - using env variable or fallback to default
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sunny_payments';

// MongoDB connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  maxPoolSize: 100,
  autoIndex: true, // build indexes
};

// Create a cached connection variable
let cached = global.mongoose;

// Initialize connection cache if not exists
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB
 * @returns {Promise<mongoose.Connection>} Mongoose connection
 */
export async function connectToDatabase() {
  // If we have connection, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection promise is in progress, return it
  if (!cached.promise) {
    const opts = { ...options };

    // Create a new connection promise
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('MongoDB connected successfully!');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        throw error;
      });
  }

  // Wait for and return the connection
  cached.conn = await cached.promise;
  return cached.conn;
}

// Graceful connection shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
});

export default mongoose;

