/**
 * Database seeding script for development environment
 */

const { Pool } = require('pg');
const dotenv = require('dotenv');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

// Load environment variables
dotenv.config();

// Create a connection pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'sunny_payments',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

// Generate a secure random API key
function generateApiKey() {
  return crypto.randomBytes(24).toString('hex');
}

// Generate a secure random API secret
function generateApiSecret() {
  return crypto.randomBytes(32).toString('hex');
}

// Hash a secret
function hashSecret(secret) {
  return crypto
    .createHash('sha256')
    .update(secret)
    .digest('hex');
}

async function seedDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('Starting database seeding...');
    
    // Begin transaction
    await client.query('BEGIN');
    
    // Check if merchants table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'merchants'
      )
    `);
    
    if (!tableCheck.rows[0].exists) {
      console.error('Merchants table does not exist. Run migrations first.');
      process.exit(1);
    }
    
    // Check if test merchant already exists
    const merchantCheck = await client.query(
      "SELECT id FROM merchants WHERE email = 'test@sunnypayments.com'"
    );
    
    if (merchantCheck.rows.length === 0) {
      // Create test merchant
      const merchantId = 'MERCH_' + uuidv4().replace(/-/g, '').substring(0, 16);
      const apiKey = generateApiKey();
      const apiSecret = generateApiSecret();
      const hashedSecret = hashSecret(apiSecret);
      
      await client.query(
        `INSERT INTO merchants (
          id, name, email, api_key, api_secret, status
        ) VALUES ($1, $2, $3, $4, $5, $6)`,
        [merchantId, 'Test Merchant', 'test@sunnypayments.com', apiKey, hashedSecret, 'active']
      );
      
      console.log('Created test merchant:');
      console.log(`  Merchant ID: ${merchantId}`);
      console.log(`  API Key: ${apiKey}`);
      console.log(`  API Secret: ${apiSecret}`);
      
      // Create test customers
      const customers = [
        { name: 'John Doe', email: 'john@example.com', phone: '+1234567890' },
        { name: 'Jane Smith', email: 'jane@example.com', phone: '+1987654321' }
      ];
      
      for (const customer of customers) {
        const customerId = 'CUST_' + uuidv4().replace(/-/g, '').substring(0, 16);
        
        await client.query(
          `INSERT INTO customers (
            id, merchant_id, name, email, phone
          ) VALUES ($1, $2, $3, $4, $5)`,
          [customerId, merchantId, customer.name, customer.email, customer.phone]
        );
        
        console.log(`Created test customer: ${customer.name} (${customerId})`);
      }
      
      // Create test transactions
      const statuses = ['COMPLETED', 'FAILED', 'PENDING'];
      const paymentMethods = ['CARD', 'BANK_TRANSFER', 'MOBILE_MONEY'];
      const currencies = ['USD', 'EUR', 'GBP'];
      
      for (let i = 0; i < 10; i++) {
        const transactionId = 'TXN_' + uuidv4().replace(/-/g, '').substring(0, 16);
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
        const currency = currencies[Math.floor(Math.random() * currencies.length)];
        const amount = (Math.random() * 1000).toFixed(2);
        
        await client.query(
          `INSERT INTO transactions (
            id, merchant_id, amount, currency, status, payment_method,
            description, metadata
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [
            transactionId,
            merchantId,
            amount,
            currency,
            status,
            paymentMethod,
            'Test transaction',
            JSON.stringify({ test: true, source: 'seed script' })
          ]
        );
        
        console.log(`Created test transaction: ${transactionId} (${currency} ${amount})`);
      }
    } else {
      console.log('Test merchant already exists, skipping seed data creation.');
    }
    
    // Commit transaction
    await client.query('COMMIT');
    
    console.log('Database seeding completed successfully');
  } catch (error) {
    // Rollback transaction on error
    await client.query('ROLLBACK');
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    // Release client
    client.release();
    
    // Close pool
    await pool.end();
  }
}

// Run seeding
seedDatabase();