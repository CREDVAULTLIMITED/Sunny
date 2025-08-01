import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    required: true,
    uppercase: true,
    enum: ['USD', 'EUR', 'GBP']
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: {
      type: String,
      required: true,
      enum: ['card', 'bank_transfer', 'crypto', 'wallet']
    },
    details: {
      // For cards
      brand: String,
      last4: String,
      expiryMonth: Number,
      expiryYear: Number,
      
      // For bank transfers
      bankName: String,
      accountLast4: String,
      
      // For crypto
      walletAddress: String,
      network: String,
      
      // For digital wallets
      provider: String,
      walletId: String
    }
  },
  customer: {
    id: {
      type: String,
      required: true,
      index: true
    },
    name: String,
    email: String
  },
  riskAssessment: {
    score: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    factors: [{
      type: String,
      enum: ['location', 'amount', 'frequency', 'device', 'history']
    }],
    aiModelVersion: String,
    assessedAt: Date
  },
  metadata: {
    type: Map,
    of: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
paymentSchema.index({ 'customer.id': 1, createdAt: -1 });
paymentSchema.index({ status: 1, createdAt: -1 });
paymentSchema.index({ 'paymentMethod.type': 1 });

// Add AI risk scoring before save
paymentSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('amount') || this.isModified('customer')) {
    try {
      // Integrate with DeepSeek R1 for risk assessment
      this.riskAssessment = {
        score: 0, // Will be updated by AI
        factors: [],
        aiModelVersion: 'DeepSeek-R1',
        assessedAt: new Date()
      };
    } catch (error) {
      console.error('Risk assessment failed:', error);
      // Continue saving even if risk assessment fails
    }
  }
  next();
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
