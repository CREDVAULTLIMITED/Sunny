/**
 * Sunny Payment Gateway Server
 * 
 * Express server with MongoDB integration
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './src/config/db.js';
import User from './src/models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Import routes
import authRoutes from './src/routes/auth.js';
import transactionRoutes from './src/routes/transactions.js';
import statsRoutes from './src/routes/stats.js';
import userRoutes from './src/routes/user.js';

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();
const PORT = process.env.PORT || 3002;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Add content type header to ensure proper encoding
app.use((req, res, next) => {
  res.header('Content-Type', 'text/html; charset=utf-8');
  next();
});

// Direct routes - no redirects or client-side routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard/index.html'));
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
    }
  }
}));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/user', userRoutes);

// Handle all other routes
app.get('*', (req, res) => {
  // Check if the path ends with a file extension
  const hasFileExtension = /\.[^/]*$/.test(req.path);
  
  // If it's a file request that wasn't found in the static middleware, return 404
  if (hasFileExtension) {
    return res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  }
  
  // For all other routes, serve the appropriate HTML file based on the path
  if (req.path.startsWith('/login')) {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
  } else if (req.path.startsWith('/signup')) {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
  } else if (req.path.startsWith('/forgot-password')) {
    res.sendFile(path.join(__dirname, 'public', 'forgot-password.html'));
  } else if (req.path.startsWith('/reset-password')) {
    res.sendFile(path.join(__dirname, 'public', 'reset-password.html'));
  } else {
    res.redirect('/');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Homepage: http://localhost:${PORT}/`);
  console.log(`Dashboard: http://localhost:${PORT}/dashboard`);
});