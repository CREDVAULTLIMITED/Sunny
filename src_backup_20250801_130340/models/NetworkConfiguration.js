/**
 * NetworkConfiguration.js
 * Model for storing dynamic network configurations
 */

import mongoose from 'mongoose';

const networkConfigurationSchema = new mongoose.Schema({
  networkId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['PAYMENT_NETWORK', 'BANKING_NETWORK', 'CRYPTO_NETWORK', 'MOBILE_MONEY', 'REGIONAL'],
    index: true
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'TESTING', 'DEPRECATED'],
    default: 'ACTIVE',
    index: true
  },
  userConfigurable: {
    type: Boolean,
    default: false,
    index: true
  },
  region: {
    type: String,
    required: true,
    uppercase: true,
    index: true
  },
  supportedCurrencies: [{
    type: String,
    uppercase: true
  }],
  configuration: {
    apiEndpoint: String,
    apiVersion: String,
    credentials: {
      apiKey: String,
      secretKey: String,
      merchantId: String,
      certificatePath: String
    },
    protocols: [{
      name: String,
      version: String,
      specification: String
    }],
    features: [{
      name: String,
      enabled: Boolean,
      parameters: Map
    }],
    limits: {
      minAmount: Number,
      maxAmount: Number,
      dailyLimit: Number,
      monthlyLimit: Number
    },
    fees: {
      fixed: Number,
      percentage: Number,
      currency: String
    }
  },
  processors: [{
    processorId: String,
    processorClass: String,
    priority: {
      type: Number,
      min: 1,
      max: 10,
      default: 5
    },
    isDefault: {
      type: Boolean,
      default: false
    },
    successRate: {
      type: Number,
      min: 0,
      max: 100,
      default: 100
    },
    responseTime: {
      type: Number,
      default: 0
    }
  }],
  discoveryInfo: {
    discoveredBy: {
      type: String,
      enum: ['MANUAL', 'API_DISCOVERY', 'WEBHOOK', 'AI_RECOMMENDATION']
    },
    discoveredAt: Date,
    lastUpdated: Date,
    updateFrequency: {
      type: String,
      enum: ['REAL_TIME', 'HOURLY', 'DAILY', 'WEEKLY', 'MANUAL'],
      default: 'DAILY'
    },
    healthCheckUrl: String,
    lastHealthCheck: Date,
    isHealthy: {
      type: Boolean,
      default: true
    }
  },
  compliance: {
    certifications: [String],
    regulations: [String],
    auditDate: Date,
    complianceScore: {
      type: Number,
      min: 0,
      max: 100
    }
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
networkConfigurationSchema.index({ type: 1, region: 1, status: 1 });
networkConfigurationSchema.index({ 'processors.processorId': 1 });
networkConfigurationSchema.index({ 'discoveryInfo.isHealthy': 1 });
networkConfigurationSchema.index({ supportedCurrencies: 1 });

// Pre-save middleware to update timestamps
networkConfigurationSchema.pre('save', function(next) {
  if (!this.isNew) {
    this.updatedAt = new Date();
    if (this.discoveryInfo) {
      this.discoveryInfo.lastUpdated = new Date();
    }
  }
  next();
});

// Method to check if network supports currency
networkConfigurationSchema.methods.supportsCurrency = function(currency) {
  return this.supportedCurrencies.includes(currency.toUpperCase());
};

// Method to get default processor
networkConfigurationSchema.methods.getDefaultProcessor = function() {
  return this.processors.find(p => p.isDefault) || this.processors[0];
};

// Method to get processors sorted by priority
networkConfigurationSchema.methods.getProcessorsByPriority = function() {
  return this.processors.sort((a, b) => b.priority - a.priority);
};

// Static method to find networks by region and currency
networkConfigurationSchema.statics.findActiveNetworks = function(region, currency) {
  const query = {
    status: 'ACTIVE',
    'discoveryInfo.isHealthy': true
  };
  
  if (region) query.region = region;
  if (currency) query.supportedCurrencies = currency.toUpperCase();
  
  return this.find(query).sort({ 'processors.priority': -1 });
};

const NetworkConfiguration = mongoose.model('NetworkConfiguration', networkConfigurationSchema);

export default NetworkConfiguration;
