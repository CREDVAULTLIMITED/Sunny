/**
 * Sunny Payment Gateway - Database Seeder Runner
 * 
 * Script to run the database seeder
 */

import { exec } from 'child_process';

// Run the seeder script
exec('node src/utils/seed-data.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  
  console.log(stdout);
});