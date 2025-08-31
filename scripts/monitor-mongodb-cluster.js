#!/usr/bin/env node

const { MongoClient } = require('mongodb');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

// MongoDB connection string with replica set
const uri = process.env.MONGODB_URI || 'mongodb://mongo1:27017,mongo2:27017,mongo3:27017/admin?replicaSet=rs0';

// Monitoring function
async function monitorCluster() {
  const client = new MongoClient(uri, {
    ssl: true,
    sslValidate: true,
    sslCA: '/etc/ssl/mongodb/ca.crt',
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    await client.connect();
    
    // Get replica set status
    const admin = client.db('admin');
    const status = await admin.command({ replSetGetStatus: 1 });
    
    console.log('\nReplica Set Status:');
    console.log('-----------------');
    console.log(`Set Name: ${status.set}`);
    console.log(`Current State: ${status.myState}`);
    
    // Check each member's status
    status.members.forEach(member => {
      console.log(`\nMember ${member.name}:`);
      console.log(`  State: ${member.stateStr}`);
      console.log(`  Health: ${member.health}`);
      console.log(`  Uptime: ${Math.floor(member.uptime / 3600)} hours`);
      console.log(`  Ping MS: ${member.pingMs}`);
      
      if (member.stateStr === 'PRIMARY') {
        console.log('  Role: Primary');
      } else if (member.stateStr === 'SECONDARY') {
        console.log('  Role: Secondary');
        console.log(`  Sync Source: ${member.syncSourceHost || 'None'}`);
        console.log(`  Replication Lag: ${member.optimeDate ? Math.floor((Date.now() - member.optimeDate.getTime()) / 1000) : 'Unknown'} seconds`);
      }
    });

    // Check oplog status
    const oplogStats = await admin.command({ collStats: 'oplog.rs' });
    console.log('\nOplog Status:');
    console.log('------------');
    console.log(`Size: ${(oplogStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Storage Size: ${(oplogStats.storageSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Max Size: ${(oplogStats.maxSize / 1024 / 1024).toFixed(2)} MB`);

    // Get cluster statistics
    const stats = await admin.command({ serverStatus: 1 });
    console.log('\nCluster Statistics:');
    console.log('-----------------');
    console.log(`Connections: ${stats.connections.current}`);
    console.log(`Available Connections: ${stats.connections.available}`);
    console.log(`Memory Usage: ${(stats.mem.resident / 1024).toFixed(2)} GB`);
    console.log(`Page Faults: ${stats.extra_info.page_faults}`);

    // Check backup status
    const { stdout: backupStatus } = await exec('ls -l /backup/mongodb/');
    console.log('\nBackup Status:');
    console.log('-------------');
    console.log(backupStatus);

  } catch (err) {
    console.error('Error monitoring cluster:', err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Alert function for critical issues
async function sendAlert(message) {
  // Implement your preferred alerting mechanism here
  // Example: Send to monitoring service, email, Slack, etc.
  console.error(`[ALERT] ${message}`);
}

// Run monitoring
if (require.main === module) {
  monitorCluster().catch(console.error);
}

module.exports = { monitorCluster, sendAlert };
