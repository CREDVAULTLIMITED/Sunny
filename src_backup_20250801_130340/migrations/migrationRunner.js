const fs = require('fs').promises;
const path = require('path');
const { MongoClient } = require('mongodb');
require('dotenv').config();

async function getMigrationFiles() {
  const migrationsDir = path.join(__dirname);
  const files = await fs.readdir(migrationsDir);
  return files
    .filter(f => f.endsWith('.js') && f !== 'migrationRunner.js')
    .sort();
}

async function getAppliedMigrations(db) {
  const collection = db.collection('migrations');
  const migrations = await collection.find().toArray();
  return new Set(migrations.map(m => m.name));
}

async function runMigrations(direction = 'up') {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db(process.env.MONGODB_DATABASE);

  try {
    // Ensure migrations collection exists
    await db.createCollection('migrations');

    const migrationFiles = await getMigrationFiles();
    const appliedMigrations = await getAppliedMigrations(db);

    const migrations = direction === 'up' 
      ? migrationFiles.filter(f => !appliedMigrations.has(f))
      : [...migrationFiles].reverse().filter(f => appliedMigrations.has(f));

    for (const file of migrations) {
      console.log(`Running ${direction} migration: ${file}`);
      const migration = require(path.join(__dirname, file));
      
      try {
        await migration[direction]();
        
        if (direction === 'up') {
          await db.collection('migrations').insertOne({
            name: file,
            appliedAt: new Date()
          });
        } else {
          await db.collection('migrations').deleteOne({ name: file });
        }
        console.log(`Successfully completed ${direction} migration: ${file}`);
      } catch (error) {
        console.error(`Error in migration ${file}:`, error);
        throw error;
      }
    }
  } finally {
    await client.close();
  }
}

// Handle command line arguments
const direction = process.argv[2] === 'down' ? 'down' : 'up';
runMigrations(direction).catch(console.error);
