#!/usr/bin/env node

/**
 * Script to add .js extensions to all local imports in JavaScript files
 * Required for package.json with "type": "module"
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directories to process
const directories = [
  './src/core',
  './src/services',
  './src/components',
  './src/security',
  './src/sdk'
];

// Find all JavaScript files in the given directory
const findJsFiles = (dir) => {
  let results = [];
  const files = readdirSync(dir);
  
  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively search directories
      results = results.concat(findJsFiles(filePath));
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      results.push(filePath);
    }
  }
  
  return results;
}

// Process JS files for conversion
const processJsFile = (filePath) => {
  console.log(`Processing ${filePath}`);
  let content = readFileSync(filePath, 'utf8');
  
  // Find import statements and add .js extension to local imports
  const importRegex = /import\s+(?:(?:{[^}]+})|(?:[^{}\s,]+))\s+from\s+['"](\.\/[^'"]+|\.\.\/[^'"]+)['"];/g;
  const matches = content.match(importRegex);
  
  if (matches) {
    for (const match of matches) {
      // Skip if it already has .js or .jsx extension
      if (match.includes('.js') || match.includes('.css')) continue;
      
      // Replace the import with one that has .js extension
      const newImport = match.replace(/(['"])([^'"]+)(['"])/, '$1$2.js$3');
      content = content.replace(match, newImport);
    }
    
    // Fix jwt-decode import if exists
    if (content.includes('import jwtDecode from \'jwt-decode\'')) {
      content = content.replace(
        'import jwtDecode from \'jwt-decode\'',
        'import { jwtDecode } from \'jwt-decode\''
      );
    }
    
    // Write the updated content
    writeFileSync(filePath, content, 'utf8');
    console.log(`- Updated ${filePath}`);
  }
}

// Main execution
console.log('Fixing imports to add .js extensions...');

for (const dir of directories) {
  try {
    const files = findJsFiles(dir);
    for (const file of files) {
      processJsFile(file);
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error);
  }
}

console.log('Done!');

