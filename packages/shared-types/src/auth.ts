import { z } from 'zod';

/**
 * User Account Types
 * Maps to different dashboard destinations
 */
export enum UserAccountType {
  INDIVIDUAL = 'individual',
  BUSINESS = 'business',
  INSTITUTION = 'institution',
  DEVELOPER = 'developer',
  ADMIN = 'admin'
}

/**
 * Authentication Provider Types
 */
export enum AuthProvider {
  EMAIL = 'email',
  GOOGLE = 'google',
  APPLE = 'apple',
  MICROSOFT = 'microsoft',
  GITHUB = 'github', // For developers
  LINKEDIN = 'linkedin' // For business users
}

/**
 * Multi-Factor Authentication Types
 */
export enum MFAType {
  SMS = 'sms',
  EMAIL = 'email',
  TOTP = 'totp', // Authenticator app
  BIOMETRIC = 'biometric',
  HARDWARE_TOKEN = 'hardware_token'
}

/**
 * Account Verification Status
 */
export enum VerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

/**
 * Institution Types (for institutions portal)
 */
export enum InstitutionType {
  BANK = 'bank',
  CREDIT_UNION = 'credit_union',
  FINTECH = 'fintech',
  PAYMENT_PROCESSOR = 'payment_processor',
  REMITTANCE_SERVICE = 'remittance_service',
  SACCO = 'sacco', // Kenya-specific
  MICROFINANCE = 'microfinance'
}

/**
 * Business Types (for business dashboard)
 */
export enum BusinessType {
  SOLE_PROPRIETORSHIP = 'sole_proprietorship',
  PARTNERSHIP = 'partnership',
  CORPORATION = 'corporation',
  LLC = 'llc',
  NON_PROFIT = 'non_profit',
  STARTUP = 'startup',
  ENTERPRISE = 'enterprise'
}

/**
 * Zod Schemas for Validation
 */

// Base User Schema
export const BaseUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  emailVerified: z.boolean().default(false),
  phone: z.string().optional(),
  phoneVerified: z.boolean().default(false),
  accountType: z.nativeEnum(UserAccountType),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  avatar: z.string().url().optional(),
  timezone: z.string().default('UTC'),
  locale: z.string().default('en'),
  currency: z.string().length(3).default('USD'),
  mfaEnabled: z.boolean().default(false),
  mfaMethods: z.array(z.nativeEnum(MFAType)).default([]),
  lastLoginAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

// Individual User Schema
export const IndividualUserSchema = BaseUserSchema.extend({
  accountType: z.literal(UserAccountType.INDIVIDUAL),
  dateOfBirth: z.date().optional(),
  nationality: z.string().optional(),
  occupation: z.string().optional(),
  kycStatus: z.nativeEnum(VerificationStatus).default(VerificationStatus.PENDING)
});

// Business User Schema
export const BusinessUserSchema = BaseUserSchema.extend({
  accountType: z.literal(UserAccountType.BUSINESS),
  businessName: z.string().min(1),
  businessType: z.nativeEnum(BusinessType),
  businessRegistrationNumber: z.string().optional(),
  taxId: z.string().optional(),
  website: z.string().url().optional(),
  businessVerificationStatus: z.nativeEnum(VerificationStatus).default(VerificationStatus.PENDING),
  monthlyVolume: z.number().optional(),
  industry: z.string().optional()
});

// Institution User Schema
export const InstitutionUserSchema = BaseUserSchema.extend({
  accountType: z.literal(UserAccountType.INSTITUTION),
  institutionName: z.string().min(1),
  institutionType: z.nativeEnum(InstitutionType),
  regulatoryLicense: z.string().optional(),
  swiftCode: z.string().optional(),
  institutionVerificationStatus: z.nativeEnum(VerificationStatus).default(VerificationStatus.PENDING),
  complianceOfficer: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string()
  }).optional()
});

// Developer User Schema
export const DeveloperUserSchema = BaseUserSchema.extend({
  accountType: z.literal(UserAccountType.DEVELOPER),
  githubUsername: z.string().optional(),
  company: z.string().optional(),
  yearsExperience: z.number().min(0).max(50).optional(),
  preferredLanguages: z.array(z.string()).default([]),
  apiKeyTier: z.enum(['sandbox', 'development', 'production']).default('sandbox')
});

// Admin User Schema
export const AdminUserSchema = BaseUserSchema.extend({
  accountType: z.literal(UserAccountType.ADMIN),
  permissions: z.array(z.string()).default([]),
  department: z.string().optional(),
  level: z.enum(['admin', 'super_admin', 'system_admin']).default('admin')
});

// Authentication Request Schemas
export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  accountType: z.nativeEnum(UserAccountType).optional(), // For routing
  rememberMe: z.boolean().optional().default(false),
  mfaCode: z.string().optional()
});

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
  ),
  confirmPassword: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
  accountType: z.nativeEnum(UserAccountType),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions'),
  agreeToPrivacy: z.boolean().refine(val => val === true, 'You must agree to the privacy policy'),
  marketingConsent: z.boolean().default(false),
  
  // Conditional fields based on account type
  businessName: z.string().optional(),
  businessType: z.nativeEnum(BusinessType).optional(),
  institutionName: z.string().optional(),
  institutionType: z.nativeEnum(InstitutionType).optional(),
  company: z.string().optional(), // For developers
  referralCode: z.string().optional()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Social Authentication Schema
export const SocialAuthSchema = z.object({
  provider: z.nativeEnum(AuthProvider),
  providerUserId: z.string(),
  accessToken: z.string(),
  refreshToken: z.string().optional(),
  accountType: z.nativeEnum(UserAccountType).optional()
});

// Password Reset Schema
export const PasswordResetSchema = z.object({
  email: z.string().email()
});

export const PasswordResetConfirmSchema = z.object({
  token: z.string(),
  password: z.string().min(8),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// MFA Setup Schema
export const MFASetupSchema = z.object({
  method: z.nativeEnum(MFAType),
  phoneNumber: z.string().optional(), // For SMS
  backupCodes: z.array(z.string()).optional()
});

// Session Schema
export const SessionSchema = z.object({
  id: z.string(),
  userId: z.string().uuid(),
  user: BaseUserSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.date(),
  device: z.object({
    userAgent: z.string(),
    ip: z.string(),
    location: z.string().optional()
  })
});

/**
 * Destination URL Mapping
 */
export const ACCOUNT_TYPE_DESTINATIONS = {
  [UserAccountType.INDIVIDUAL]: 'https://app.sunnypayments.com',
  [UserAccountType.BUSINESS]: 'https://business.sunnypayments.com',
  [UserAccountType.INSTITUTION]: 'https://institutions.sunnypayments.com',
  [UserAccountType.DEVELOPER]: 'https://developers.sunnypayments.com',
  [UserAccountType.ADMIN]: 'https://admin.sunnypayments.com'
} as const;

/**
 * Type Exports
 */
export type BaseUser = z.infer<typeof BaseUserSchema>;
export type IndividualUser = z.infer<typeof IndividualUserSchema>;
export type BusinessUser = z.infer<typeof BusinessUserSchema>;
export type InstitutionUser = z.infer<typeof InstitutionUserSchema>;
export type DeveloperUser = z.infer<typeof DeveloperUserSchema>;
export type AdminUser = z.infer<typeof AdminUserSchema>;

export type User = IndividualUser | BusinessUser | InstitutionUser | DeveloperUser | AdminUser;

export type SignInRequest = z.infer<typeof SignInSchema>;
export type SignUpRequest = z.infer<typeof SignUpSchema>;
export type SocialAuthRequest = z.infer<typeof SocialAuthSchema>;
export type PasswordResetRequest = z.infer<typeof PasswordResetSchema>;
export type PasswordResetConfirmRequest = z.infer<typeof PasswordResetConfirmSchema>;
export type MFASetupRequest = z.infer<typeof MFASetupSchema>;
export type Session = z.infer<typeof SessionSchema>;

/**
 * Authentication Response Types
 */
export interface AuthResponse {
  success: boolean;
  user?: User;
  session?: Session;
  redirectUrl?: string;
  requiresMFA?: boolean;
  mfaMethods?: MFAType[];
  error?: {
    code: string;
    message: string;
    field?: string;
  };
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (data: SignInRequest) => Promise<AuthResponse>;
  signUp: (data: SignUpRequest) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  resetPassword: (data: PasswordResetRequest) => Promise<AuthResponse>;
  confirmPasswordReset: (data: PasswordResetConfirmRequest) => Promise<AuthResponse>;
  socialAuth: (data: SocialAuthRequest) => Promise<AuthResponse>;
  setupMFA: (data: MFASetupRequest) => Promise<AuthResponse>;
  verifyMFA: (code: string, method: MFAType) => Promise<AuthResponse>;
  refreshSession: () => Promise<AuthResponse>;
}
