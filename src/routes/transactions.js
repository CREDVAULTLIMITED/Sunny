/**
 * Sunny Payment Gateway - Transaction Routes
 * 
 * Routes for transaction data
 */

import express from 'express';
import { protect } from '../middleware/auth.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();

/**
 * @route   GET /api/transactions
 * @desc    Get user transactions
 * @access  Private
 */
router.get('/', protect, async (req, res) => {
  try {
    const { status, dateFrom, dateTo, limit = 10 } = req.query;
    
    // Build query
    const query = { userId: req.user._id };
    
    // Add filters if provided
    if (status) {
      query.status = status;
    }
    
    if (dateFrom || dateTo) {
      query.date = {};
      if (dateFrom) {
        query.date.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        query.date.$lte = new Date(dateTo);
      }
    }
    
    // Execute query
    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit));
    
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while fetching transactions'
    });
  }
});

export default router;