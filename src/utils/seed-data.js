/**
 * Sunny Payment Gateway - Database Seeder
 * 
 * Script to seed the database with initial data for testing
 */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import connectDB from '../config/db.js';

// Load environment variables
dotenv.config();

// Connect to database
await connectDB();

/**
 * Seed users
 */
async function seedUsers() {
  try {
    // Clear existing users
    await User.deleteMany({});
    
    // Create test users
    const users = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('password123', 10),
        accountType: 'individual',
        country: 'US',
        isVerified: true,
        acceptedTerms: true,
        role: 'user'
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        password: await bcrypt.hash('password123', 10),
        accountType: 'business',
        country: 'UK',
        company: 'Smith Enterprises',
        isVerified: true,
        acceptedTerms: true,
        role: 'user'
      },
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10),
        accountType: 'business',
        country: 'US',
        isVerified: true,
        acceptedTerms: true,
        role: 'admin'
      }
    ];
    
    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users seeded`);
    return createdUsers;
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

/**
 * Seed transactions
 */
async function seedTransactions(users) {
  try {
    // Clear existing transactions
    await Transaction.deleteMany({});
    
    // Create transactions for each user
    const transactions = [];
    
    // Payment methods
    const paymentMethods = ['card', 'bank_transfer', 'mobile_money', 'crypto', 'apple_pay', 'google_pay'];
    
    // Statuses
    const statuses = ['success', 'pending', 'failed'];
    
    // Generate transactions for each user
    for (const user of users) {
      // Generate 10-20 transactions per user
      const transactionCount = Math.floor(Math.random() * 11) + 10;
      
      for (let i = 0; i < transactionCount; i++) {
        // Random date in the last 30 days
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        
        // Random amount between $10 and $1000
        const amount = parseFloat((Math.random() * 990 + 10).toFixed(2));
        
        // Random payment method
        const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
        
        // Random status (weighted towards success)
        const statusIndex = Math.random() < 0.8 ? 0 : (Math.random() < 0.5 ? 1 : 2);
        const status = statuses[statusIndex];
        
        // Create transaction
        transactions.push({
          userId: user._id,
          amount,
          currency: 'USD',
          status,
          paymentMethod,
          customer: {
            name: `Customer ${i + 1}`,
            email: `customer${i + 1}@example.com`
          },
          date,
          metadata: {
            ip: '192.168.1.1',
            userAgent: 'Mozilla/5.0',
            referrer: 'https://example.com'
          }
        });
      }
    }
    
    const createdTransactions = await Transaction.insertMany(transactions);
    console.log(`${createdTransactions.length} transactions seeded`);
  } catch (error) {
    console.error('Error seeding transactions:', error);
    throw error;
  }
}

/**
 * Main seeder function
 */
async function seedDatabase() {
  try {
    console.log('Seeding database...');
    
    // Seed users
    const users = await seedUsers();
    
    // Seed transactions
    await seedTransactions(users);
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run seeder
seedDatabase();