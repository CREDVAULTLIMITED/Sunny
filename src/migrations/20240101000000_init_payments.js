const { MongoClient } = require('mongodb');
require('dotenv').config();

async function up() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db(process.env.MONGODB_DATABASE);

  // Create collections with schemas and indexes
  await db.createCollection('payments', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['amount', 'currency', 'status', 'paymentMethod', 'createdAt'],
        properties: {
          amount: { bsonType: 'decimal' },
          currency: { bsonType: 'string' },
          status: { 
            bsonType: 'string',
            enum: ['pending', 'processing', 'completed', 'failed', 'refunded']
          },
          paymentMethod: {
            bsonType: 'object',
            required: ['type'],
            properties: {
              type: { bsonType: 'string' },
              details: { bsonType: 'object' }
            }
          },
          metadata: { bsonType: 'object' },
          riskAssessment: {
            bsonType: 'object',
            properties: {
              score: { bsonType: 'number' },
              factors: { bsonType: 'array' }
            }
          },
          createdAt: { bsonType: 'date' },
          updatedAt: { bsonType: 'date' }
        }
      }
    }
  });

  // Create indexes
  await db.collection('payments').createIndexes([
    { key: { createdAt: 1 } },
    { key: { status: 1 } },
    { key: { 'paymentMethod.type': 1 } },
    { key: { 'metadata.merchantId': 1 } }
  ]);

  await client.close();
}

async function down() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db(process.env.MONGODB_DATABASE);

  await db.collection('payments').drop();
  await client.close();
}

module.exports = { up, down };
