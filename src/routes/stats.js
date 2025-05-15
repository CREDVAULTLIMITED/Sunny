/**
 * Sunny Payment Gateway - Stats Routes
 * 
 * Routes for dashboard statistics
 */

import express from 'express';
import { protect } from '../middleware/auth.js';
import Transaction from '../models/Transaction.js';
import mongoose from 'mongoose';

const router = express.Router();

/**
 * @route   GET /api/stats
 * @desc    Get dashboard statistics
 * @access  Private
 */
router.get('/', protect, async (req, res) => {
  try {
    const { timeframe = '7d' } = req.query;
    
    // Calculate date range based on timeframe
    const now = new Date();
    let startDate;
    
    switch (timeframe) {
      case '24h':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
    
    // Query for total transactions
    const totalTransactions = await Transaction.countDocuments({
      userId: req.user._id,
      date: { $gte: startDate }
    });
    
    // Query for success rate
    const successfulTransactions = await Transaction.countDocuments({
      userId: req.user._id,
      date: { $gte: startDate },
      status: 'success'
    });
    
    const successRate = totalTransactions > 0
      ? Math.round((successfulTransactions / totalTransactions) * 100 * 10) / 10
      : 0;
    
    // Query for total volume
    const volumeResult = await Transaction.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(req.user._id),
          date: { $gte: startDate },
          status: 'success'
        }
      },
      {
        $group: {
          _id: null,
          totalVolume: { $sum: '$amount' }
        }
      }
    ]);
    
    const totalVolume = volumeResult.length > 0 ? volumeResult[0].totalVolume : 0;
    
    // Calculate average transaction value
    const averageValue = successfulTransactions > 0
      ? Math.round((totalVolume / successfulTransactions) * 100) / 100
      : 0;
    
    // Get recent transactions
    const recentTransactions = await Transaction.find({
      userId: req.user._id
    })
      .sort({ date: -1 })
      .limit(5);
    
    // Get payment method breakdown
    const paymentMethods = await Transaction.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(req.user._id),
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$paymentMethod',
          count: { $sum: 1 },
          volume: { $sum: '$amount' }
        }
      },
      {
        $sort: { volume: -1 }
      }
    ]);
    
    // Get volume by day
    const volumeByDay = await Transaction.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(req.user._id),
          date: { $gte: startDate },
          status: 'success'
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$date' }
          },
          volume: { $sum: '$amount' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    // Get country distribution
    const countryDistribution = await Transaction.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(req.user._id),
          date: { $gte: startDate },
          'metadata.country': { $exists: true }
        }
      },
      {
        $group: {
          _id: '$metadata.country',
          volume: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { volume: -1 }
      },
      {
        $limit: 10
      }
    ]);
    
    // Format response
    res.status(200).json({
      success: true,
      totalTransactions,
      successRate,
      totalVolume,
      averageValue,
      recentTransactions,
      paymentMethods: paymentMethods.map(method => ({
        method: method._id,
        count: method.count,
        volume: method.volume
      })),
      volumeByDay: volumeByDay.map(day => ({
        date: day._id,
        volume: day.volume
      })),
      countryDistribution: countryDistribution.map(country => ({
        country: country._id,
        volume: country.volume,
        count: country.count
      }))
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while fetching statistics'
    });
  }
});

export default router;