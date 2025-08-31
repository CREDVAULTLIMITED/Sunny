import mongoose from 'mongoose';
import config from '../config/config';

class MongoConnection {
  constructor() {
    this.isConnected = false;
    this.retryAttempts = 0;
    this.maxRetries = 3;
  }

  async connect() {
    if (this.isConnected) return;

    try {
      const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/sunny_payments';
      
      await mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        retryWrites: true
      });

      this.isConnected = true;
      this.retryAttempts = 0;
      console.log('Successfully connected to MongoDB');

      mongoose.connection.on('error', this.handleError.bind(this));
      mongoose.connection.on('disconnected', this.handleDisconnect.bind(this));
      
    } catch (error) {
      console.error('MongoDB connection error:', error);
      await this.handleConnectionFailure(error);
    }
  }

  async handleConnectionFailure(error) {
    this.retryAttempts++;
    
    if (this.retryAttempts < this.maxRetries) {
      console.log(`Retrying MongoDB connection (attempt ${this.retryAttempts}/${this.maxRetries})...`);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      await this.connect();
    } else {
      console.error('Failed to connect to MongoDB after multiple attempts');
      this.fallbackToPostgres();
    }
  }

  async handleError(error) {
    console.error('MongoDB error:', error);
    if (!this.isConnected) {
      await this.handleConnectionFailure(error);
    }
  }

  async handleDisconnect() {
    console.log('MongoDB disconnected');
    this.isConnected = false;
    await this.connect();
  }

  async fallbackToPostgres() {
    console.log('Falling back to PostgreSQL database...');
    // The database.js utility will handle the actual fallback
  }

  async disconnect() {
    if (!this.isConnected) return;
    
    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
    }
  }
}

export default new MongoConnection();
