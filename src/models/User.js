/**
 * Sunny Payment Gateway - User Model
 * 
 * Defines the schema and methods for user accounts
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Schema definition
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot be more than 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false // Don't include password in queries by default
  },
  accountType: {
    type: String,
    enum: ['individual', 'business', 'developer', 'admin'],
    default: 'individual'
  },
  role: {
    type: String,
    enum: ['user', 'merchant', 'admin'],
    default: 'user'
  },
  country: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationTokenExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  acceptedTerms: {
    type: Boolean,
    required: [true, 'Terms must be accepted']
  },
  acceptedMarketing: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  twoFactorSecret: {
    type: String,
    select: false
  },
  recoveryCodes: {
    type: [String],
    select: false
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  // Only hash password if it's modified or new
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    
    // Hash password
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Method to generate JWT token
UserSchema.methods.generateAuthToken = function() {
  try {
    return jwt.sign(
      { 
        id: this._id,
        email: this.email,
        role: this.role
      },
      process.env.JWT_SECRET || 'fallback_secret_dev_only',
      { 
        expiresIn: process.env.JWT_EXPIRY || '24h' 
      }
    );
  } catch (error) {
    throw new Error('Token generation failed');
  }
};

// Method to generate password reset token
UserSchema.methods.generatePasswordResetToken = function() {
  try {
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
      
    // Set token expiration (30 minutes)
    this.resetPasswordExpires = Date.now() + 30 * 60 * 1000;
    
    return resetToken;
  } catch (error) {
    throw new Error('Reset token generation failed');
  }
};

// Create a model from the schema
const User = mongoose.model('User', UserSchema);

module.exports = User;
