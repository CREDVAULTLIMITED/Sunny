/**
 * Sunny Payment Gateway - Transaction Model
 * 
 * Defines the transaction schema and model for payment transactions
 */

import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: 'USD'
  },
  status: {
    type: String,
    enum: ['success', 'pending', 'failed'],
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'bank_transfer', 'mobile_money', 'crypto', 'apple_pay', 'google_pay'],
    required: true
  },
  customer: {
    name: String,
    email: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  metadata: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true
});

// Create and export the Transaction model
const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;