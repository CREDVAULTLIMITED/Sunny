import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserAccountType, VerificationStatus, MFAType } from '@sunny/shared-types';

// Enhanced User Schema integrating with our new type system
const UserSchema = new mongoose.Schema({
  // Basic Information
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  passwordHash: {
    type: String,
    required: function() {
      return !this.socialProviders || this.socialProviders.length === 0;
    }
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true,
    sparse: true,
    index: true
  },
  
  // Account Configuration
  accountType: {
    type: String,
    enum: Object.values(UserAccountType),
    required: true,
    default: UserAccountType.INDIVIDUAL
  },
  
  // Verification Status
  emailVerified: {
    type: Boolean,
    default: false
  },
  phoneVerified: {
    type: Boolean,
    default: false
  },
  kycStatus: {
    type: String,
    enum: Object.values(VerificationStatus),
    default: VerificationStatus.PENDING
  },
  
  // MFA Configuration
  mfaEnabled: {
    type: Boolean,
    default: false
  },
  mfaMethods: [{
    type: String,
    enum: Object.values(MFAType)
  }],
  mfaSecrets: {
    totp: String,
    backupCodes: [String],
    phoneNumber: String
  },
  
  // Social Authentication
  socialProviders: [{
    provider: {
      type: String,
      enum: ['google', 'apple', 'microsoft', 'linkedin', 'github']
    },
    providerId: String,
    email: String,
    verifiedAt: Date
  }],
  
  // Account Type Specific Data
  businessDetails: {
    businessName: String,
    businessType: String,
    registrationNumber: String,
    taxId: String,
    website: String,
    industry: String,
    monthlyVolume: Number,
    verificationStatus: {
      type: String,
      enum: Object.values(VerificationStatus),
      default: VerificationStatus.PENDING
    }
  },
  
  institutionDetails: {
    institutionName: String,
    institutionType: String,
    regulatoryLicense: String,
    swiftCode: String,
    complianceOfficer: {
      name: String,
      email: String,
      phone: String
    },
    verificationStatus: {
      type: String,
      enum: Object.values(VerificationStatus),
      default: VerificationStatus.PENDING
    }
  },
  
  developerDetails: {
    githubUsername: String,
    company: String,
    yearsExperience: Number,
    preferredLanguages: [String],
    apiKeyTier: {
      type: String,
      enum: ['sandbox', 'development', 'production'],
      default: 'sandbox'
    }
  },
  
  adminDetails: {
    permissions: [String],
    department: String,
    level: {
      type: String,
      enum: ['admin', 'super_admin', 'system_admin'],
      default: 'admin'
    }
  },
  
  // Preferences
  timezone: {
    type: String,
    default: 'UTC'
  },
  locale: {
    type: String,
    default: 'en'
  },
  currency: {
    type: String,
    default: 'USD',
    length: 3
  },
  
  // Security & Tracking
  lastLoginAt: Date,
  lastLoginIP: String,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockoutUntil: Date,
  avatar: String,
  
  // Consent & Compliance
  agreedToTerms: {
    type: Boolean,
    required: true
  },
  agreedToPrivacy: {
    type: Boolean,
    required: true
  },
  marketingConsent: {
    type: Boolean,
    default: false
  },
  termsVersion: String,
  privacyVersion: String,
  
  // Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: Date, // Soft delete support
  
  // Session Management
  activeSessions: [{
    sessionId: String,
    deviceInfo: {
      userAgent: String,
      ip: String,
      location: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    lastAccessAt: {
      type: Date,
      default: Date.now
    },
    expiresAt: Date
  }],
  
  // Biometric Data (encrypted references)
  biometricTemplates: [{
    type: {
      type: String,
      enum: ['fingerprint', 'face', 'voice']
    },
    templateId: String,
    encryptedTemplate: String,
    enrolledAt: Date
  }]
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash;
      delete ret.mfaSecrets;
      delete ret.biometricTemplates;
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes for performance
UserSchema.index({ email: 1 });
UserSchema.index({ accountType: 1 });
UserSchema.index({ 'socialProviders.provider': 1, 'socialProviders.providerId': 1 });
UserSchema.index({ createdAt: 1 });
UserSchema.index({ lastLoginAt: 1 });

// Virtual for full name
UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Instance Methods
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.passwordHash) return false;
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

UserSchema.methods.isAccountLocked = function(): boolean {
  return !!(this.lockoutUntil && this.lockoutUntil > Date.now());
};

UserSchema.methods.incrementLoginAttempts = function(): Promise<any> {
  // Clear attempts if lock has expired
  if (this.lockoutUntil && this.lockoutUntil < Date.now()) {
    return this.updateOne({
      $unset: {
        loginAttempts: 1,
        lockoutUntil: 1
      }
    });
  }

  const updates: any = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 failed attempts for 30 minutes
  if (this.loginAttempts + 1 >= 5 && !this.isAccountLocked()) {
    updates.$set = {
      lockoutUntil: Date.now() + 30 * 60 * 1000 // 30 minutes
    };
  }
  
  return this.updateOne(updates);
};

UserSchema.methods.resetLoginAttempts = function(): Promise<any> {
  return this.updateOne({
    $unset: {
      loginAttempts: 1,
      lockoutUntil: 1
    }
  });
};

UserSchema.methods.addSession = function(sessionData: any): Promise<any> {
  this.activeSessions = this.activeSessions || [];
  this.activeSessions.push(sessionData);
  
  // Keep only last 5 sessions per user
  if (this.activeSessions.length > 5) {
    this.activeSessions = this.activeSessions.slice(-5);
  }
  
  return this.save();
};

UserSchema.methods.removeSession = function(sessionId: string): Promise<any> {
  this.activeSessions = this.activeSessions.filter(
    (session: any) => session.sessionId !== sessionId
  );
  return this.save();
};

UserSchema.methods.addSocialProvider = function(providerData: any): Promise<any> {
  this.socialProviders = this.socialProviders || [];
  
  // Remove existing provider if exists
  this.socialProviders = this.socialProviders.filter(
    (p: any) => p.provider !== providerData.provider
  );
  
  this.socialProviders.push({
    ...providerData,
    verifiedAt: new Date()
  });
  
  return this.save();
};

// Static Methods
UserSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

UserSchema.statics.findBySocialProvider = function(provider: string, providerId: string) {
  return this.findOne({
    'socialProviders.provider': provider,
    'socialProviders.providerId': providerId
  });
};

UserSchema.statics.findByAccountType = function(accountType: UserAccountType) {
  return this.find({ accountType });
};

// Pre-save hooks
UserSchema.pre('save', async function(next) {
  // Hash password if modified
  if (this.isModified('passwordHash') && this.passwordHash) {
    try {
      const salt = await bcrypt.genSalt(12);
      this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    } catch (error) {
      return next(error);
    }
  }
  
  // Update timestamp
  this.updatedAt = new Date();
  
  next();
});

// Pre-update hooks
UserSchema.pre(['updateOne', 'findOneAndUpdate'], function() {
  this.set({ updatedAt: new Date() });
});

export interface IUser extends mongoose.Document {
  email: string;
  passwordHash?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  accountType: UserAccountType;
  emailVerified: boolean;
  phoneVerified: boolean;
  kycStatus: VerificationStatus;
  mfaEnabled: boolean;
  mfaMethods: MFAType[];
  mfaSecrets?: {
    totp?: string;
    backupCodes?: string[];
    phoneNumber?: string;
  };
  socialProviders?: Array<{
    provider: string;
    providerId: string;
    email: string;
    verifiedAt: Date;
  }>;
  businessDetails?: any;
  institutionDetails?: any;
  developerDetails?: any;
  adminDetails?: any;
  timezone: string;
  locale: string;
  currency: string;
  lastLoginAt?: Date;
  lastLoginIP?: string;
  loginAttempts: number;
  lockoutUntil?: Date;
  avatar?: string;
  agreedToTerms: boolean;
  agreedToPrivacy: boolean;
  marketingConsent: boolean;
  termsVersion?: string;
  privacyVersion?: string;
  activeSessions?: Array<any>;
  biometricTemplates?: Array<any>;
  fullName: string;
  
  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  isAccountLocked(): boolean;
  incrementLoginAttempts(): Promise<any>;
  resetLoginAttempts(): Promise<any>;
  addSession(sessionData: any): Promise<any>;
  removeSession(sessionId: string): Promise<any>;
  addSocialProvider(providerData: any): Promise<any>;
}

export interface IUserModel extends mongoose.Model<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
  findBySocialProvider(provider: string, providerId: string): Promise<IUser | null>;
  findByAccountType(accountType: UserAccountType): Promise<IUser[]>;
}

export const User = mongoose.model<IUser, IUserModel>('User', UserSchema);
