import { z } from 'zod';

/**
 * User Account Types
 * Maps to different dashboard destinations
 */
declare enum UserAccountType {
    INDIVIDUAL = "individual",
    BUSINESS = "business",
    INSTITUTION = "institution",
    DEVELOPER = "developer",
    ADMIN = "admin"
}
/**
 * Authentication Provider Types
 */
declare enum AuthProvider {
    EMAIL = "email",
    GOOGLE = "google",
    APPLE = "apple",
    MICROSOFT = "microsoft",
    GITHUB = "github",// For developers
    LINKEDIN = "linkedin"
}
/**
 * Multi-Factor Authentication Types
 */
declare enum MFAType {
    SMS = "sms",
    EMAIL = "email",
    TOTP = "totp",// Authenticator app
    BIOMETRIC = "biometric",
    HARDWARE_TOKEN = "hardware_token"
}
/**
 * Account Verification Status
 */
declare enum VerificationStatus {
    PENDING = "pending",
    VERIFIED = "verified",
    REJECTED = "rejected",
    EXPIRED = "expired"
}
/**
 * Institution Types (for institutions portal)
 */
declare enum InstitutionType {
    BANK = "bank",
    CREDIT_UNION = "credit_union",
    FINTECH = "fintech",
    PAYMENT_PROCESSOR = "payment_processor",
    REMITTANCE_SERVICE = "remittance_service",
    SACCO = "sacco",// Kenya-specific
    MICROFINANCE = "microfinance"
}
/**
 * Business Types (for business dashboard)
 */
declare enum BusinessType {
    SOLE_PROPRIETORSHIP = "sole_proprietorship",
    PARTNERSHIP = "partnership",
    CORPORATION = "corporation",
    LLC = "llc",
    NON_PROFIT = "non_profit",
    STARTUP = "startup",
    ENTERPRISE = "enterprise"
}
/**
 * Zod Schemas for Validation
 */
declare const BaseUserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    emailVerified: z.ZodDefault<z.ZodBoolean>;
    phone: z.ZodOptional<z.ZodString>;
    phoneVerified: z.ZodDefault<z.ZodBoolean>;
    accountType: z.ZodEnum<typeof UserAccountType>;
    firstName: z.ZodString;
    lastName: z.ZodString;
    avatar: z.ZodOptional<z.ZodString>;
    timezone: z.ZodDefault<z.ZodString>;
    locale: z.ZodDefault<z.ZodString>;
    currency: z.ZodDefault<z.ZodString>;
    mfaEnabled: z.ZodDefault<z.ZodBoolean>;
    mfaMethods: z.ZodDefault<z.ZodArray<z.ZodEnum<typeof MFAType>>>;
    lastLoginAt: z.ZodOptional<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
declare const IndividualUserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    emailVerified: z.ZodDefault<z.ZodBoolean>;
    phone: z.ZodOptional<z.ZodString>;
    phoneVerified: z.ZodDefault<z.ZodBoolean>;
    firstName: z.ZodString;
    lastName: z.ZodString;
    avatar: z.ZodOptional<z.ZodString>;
    timezone: z.ZodDefault<z.ZodString>;
    locale: z.ZodDefault<z.ZodString>;
    currency: z.ZodDefault<z.ZodString>;
    mfaEnabled: z.ZodDefault<z.ZodBoolean>;
    mfaMethods: z.ZodDefault<z.ZodArray<z.ZodEnum<typeof MFAType>>>;
    lastLoginAt: z.ZodOptional<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    accountType: z.ZodLiteral<UserAccountType.INDIVIDUAL>;
    dateOfBirth: z.ZodOptional<z.ZodDate>;
    nationality: z.ZodOptional<z.ZodString>;
    occupation: z.ZodOptional<z.ZodString>;
    kycStatus: z.ZodDefault<z.ZodEnum<typeof VerificationStatus>>;
}, z.core.$strip>;
declare const BusinessUserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    emailVerified: z.ZodDefault<z.ZodBoolean>;
    phone: z.ZodOptional<z.ZodString>;
    phoneVerified: z.ZodDefault<z.ZodBoolean>;
    firstName: z.ZodString;
    lastName: z.ZodString;
    avatar: z.ZodOptional<z.ZodString>;
    timezone: z.ZodDefault<z.ZodString>;
    locale: z.ZodDefault<z.ZodString>;
    currency: z.ZodDefault<z.ZodString>;
    mfaEnabled: z.ZodDefault<z.ZodBoolean>;
    mfaMethods: z.ZodDefault<z.ZodArray<z.ZodEnum<typeof MFAType>>>;
    lastLoginAt: z.ZodOptional<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    accountType: z.ZodLiteral<UserAccountType.BUSINESS>;
    businessName: z.ZodString;
    businessType: z.ZodEnum<typeof BusinessType>;
    businessRegistrationNumber: z.ZodOptional<z.ZodString>;
    taxId: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
    businessVerificationStatus: z.ZodDefault<z.ZodEnum<typeof VerificationStatus>>;
    monthlyVolume: z.ZodOptional<z.ZodNumber>;
    industry: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const InstitutionUserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    emailVerified: z.ZodDefault<z.ZodBoolean>;
    phone: z.ZodOptional<z.ZodString>;
    phoneVerified: z.ZodDefault<z.ZodBoolean>;
    firstName: z.ZodString;
    lastName: z.ZodString;
    avatar: z.ZodOptional<z.ZodString>;
    timezone: z.ZodDefault<z.ZodString>;
    locale: z.ZodDefault<z.ZodString>;
    currency: z.ZodDefault<z.ZodString>;
    mfaEnabled: z.ZodDefault<z.ZodBoolean>;
    mfaMethods: z.ZodDefault<z.ZodArray<z.ZodEnum<typeof MFAType>>>;
    lastLoginAt: z.ZodOptional<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    accountType: z.ZodLiteral<UserAccountType.INSTITUTION>;
    institutionName: z.ZodString;
    institutionType: z.ZodEnum<typeof InstitutionType>;
    regulatoryLicense: z.ZodOptional<z.ZodString>;
    swiftCode: z.ZodOptional<z.ZodString>;
    institutionVerificationStatus: z.ZodDefault<z.ZodEnum<typeof VerificationStatus>>;
    complianceOfficer: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const DeveloperUserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    emailVerified: z.ZodDefault<z.ZodBoolean>;
    phone: z.ZodOptional<z.ZodString>;
    phoneVerified: z.ZodDefault<z.ZodBoolean>;
    firstName: z.ZodString;
    lastName: z.ZodString;
    avatar: z.ZodOptional<z.ZodString>;
    timezone: z.ZodDefault<z.ZodString>;
    locale: z.ZodDefault<z.ZodString>;
    currency: z.ZodDefault<z.ZodString>;
    mfaEnabled: z.ZodDefault<z.ZodBoolean>;
    mfaMethods: z.ZodDefault<z.ZodArray<z.ZodEnum<typeof MFAType>>>;
    lastLoginAt: z.ZodOptional<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    accountType: z.ZodLiteral<UserAccountType.DEVELOPER>;
    githubUsername: z.ZodOptional<z.ZodString>;
    company: z.ZodOptional<z.ZodString>;
    yearsExperience: z.ZodOptional<z.ZodNumber>;
    preferredLanguages: z.ZodDefault<z.ZodArray<z.ZodString>>;
    apiKeyTier: z.ZodDefault<z.ZodEnum<{
        sandbox: "sandbox";
        development: "development";
        production: "production";
    }>>;
}, z.core.$strip>;
declare const AdminUserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    emailVerified: z.ZodDefault<z.ZodBoolean>;
    phone: z.ZodOptional<z.ZodString>;
    phoneVerified: z.ZodDefault<z.ZodBoolean>;
    firstName: z.ZodString;
    lastName: z.ZodString;
    avatar: z.ZodOptional<z.ZodString>;
    timezone: z.ZodDefault<z.ZodString>;
    locale: z.ZodDefault<z.ZodString>;
    currency: z.ZodDefault<z.ZodString>;
    mfaEnabled: z.ZodDefault<z.ZodBoolean>;
    mfaMethods: z.ZodDefault<z.ZodArray<z.ZodEnum<typeof MFAType>>>;
    lastLoginAt: z.ZodOptional<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    accountType: z.ZodLiteral<UserAccountType.ADMIN>;
    permissions: z.ZodDefault<z.ZodArray<z.ZodString>>;
    department: z.ZodOptional<z.ZodString>;
    level: z.ZodDefault<z.ZodEnum<{
        admin: "admin";
        super_admin: "super_admin";
        system_admin: "system_admin";
    }>>;
}, z.core.$strip>;
declare const SignInSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    accountType: z.ZodOptional<z.ZodEnum<typeof UserAccountType>>;
    rememberMe: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    mfaCode: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const SignUpSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    accountType: z.ZodEnum<typeof UserAccountType>;
    agreeToTerms: z.ZodBoolean;
    agreeToPrivacy: z.ZodBoolean;
    marketingConsent: z.ZodDefault<z.ZodBoolean>;
    businessName: z.ZodOptional<z.ZodString>;
    businessType: z.ZodOptional<z.ZodEnum<typeof BusinessType>>;
    institutionName: z.ZodOptional<z.ZodString>;
    institutionType: z.ZodOptional<z.ZodEnum<typeof InstitutionType>>;
    company: z.ZodOptional<z.ZodString>;
    referralCode: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const SocialAuthSchema: z.ZodObject<{
    provider: z.ZodEnum<typeof AuthProvider>;
    providerUserId: z.ZodString;
    accessToken: z.ZodString;
    refreshToken: z.ZodOptional<z.ZodString>;
    accountType: z.ZodOptional<z.ZodEnum<typeof UserAccountType>>;
}, z.core.$strip>;
declare const PasswordResetSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
declare const PasswordResetConfirmSchema: z.ZodObject<{
    token: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
declare const MFASetupSchema: z.ZodObject<{
    method: z.ZodEnum<typeof MFAType>;
    phoneNumber: z.ZodOptional<z.ZodString>;
    backupCodes: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
declare const SessionSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    user: z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        emailVerified: z.ZodDefault<z.ZodBoolean>;
        phone: z.ZodOptional<z.ZodString>;
        phoneVerified: z.ZodDefault<z.ZodBoolean>;
        accountType: z.ZodEnum<typeof UserAccountType>;
        firstName: z.ZodString;
        lastName: z.ZodString;
        avatar: z.ZodOptional<z.ZodString>;
        timezone: z.ZodDefault<z.ZodString>;
        locale: z.ZodDefault<z.ZodString>;
        currency: z.ZodDefault<z.ZodString>;
        mfaEnabled: z.ZodDefault<z.ZodBoolean>;
        mfaMethods: z.ZodDefault<z.ZodArray<z.ZodEnum<typeof MFAType>>>;
        lastLoginAt: z.ZodOptional<z.ZodDate>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, z.core.$strip>;
    accessToken: z.ZodString;
    refreshToken: z.ZodString;
    expiresAt: z.ZodDate;
    device: z.ZodObject<{
        userAgent: z.ZodString;
        ip: z.ZodString;
        location: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Destination URL Mapping
 */
declare const ACCOUNT_TYPE_DESTINATIONS: {
    readonly individual: "https://app.sunnypayments.com";
    readonly business: "https://business.sunnypayments.com";
    readonly institution: "https://institutions.sunnypayments.com";
    readonly developer: "https://developers.sunnypayments.com";
    readonly admin: "https://admin.sunnypayments.com";
};
/**
 * Type Exports
 */
type BaseUser = z.infer<typeof BaseUserSchema>;
type IndividualUser = z.infer<typeof IndividualUserSchema>;
type BusinessUser = z.infer<typeof BusinessUserSchema>;
type InstitutionUser = z.infer<typeof InstitutionUserSchema>;
type DeveloperUser = z.infer<typeof DeveloperUserSchema>;
type AdminUser = z.infer<typeof AdminUserSchema>;
type User = IndividualUser | BusinessUser | InstitutionUser | DeveloperUser | AdminUser;
type SignInRequest = z.infer<typeof SignInSchema>;
type SignUpRequest = z.infer<typeof SignUpSchema>;
type SocialAuthRequest = z.infer<typeof SocialAuthSchema>;
type PasswordResetRequest = z.infer<typeof PasswordResetSchema>;
type PasswordResetConfirmRequest = z.infer<typeof PasswordResetConfirmSchema>;
type MFASetupRequest = z.infer<typeof MFASetupSchema>;
type Session = z.infer<typeof SessionSchema>;
/**
 * Authentication Response Types
 */
interface AuthResponse {
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
interface AuthContextType {
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

/**
 * Documentation-related types for Sunny Institutions Portal
 * Used across all documentation pages and components
 */
/**
 * Institution Types for Documentation Customization
 */
declare enum DocsInstitutionType {
    COMMERCIAL_BANK = "commercial_bank",
    SACCO = "sacco",
    MICROFINANCE = "mfi",
    FINTECH = "fintech",
    PAYMENT_PROCESSOR = "processor",
    REMITTANCE_SERVICE = "remittance"
}
/**
 * Documentation Content Types
 */
declare enum DocsContentType {
    GUIDE = "guide",
    API = "api",
    TUTORIAL = "tutorial",
    REFERENCE = "reference",
    VIDEO = "video",
    CASE_STUDY = "case_study"
}
/**
 * Documentation Difficulty Levels
 */
declare enum DocsDifficulty {
    BEGINNER = "Beginner",
    INTERMEDIATE = "Intermediate",
    ADVANCED = "Advanced"
}
/**
 * Documentation Category Types
 */
declare enum DocsCategory {
    GETTING_STARTED = "getting_started",
    API_DOCS = "api_docs",
    INTEGRATIONS = "integrations",
    COMPLIANCE = "compliance",
    WHITE_LABEL = "white_label",
    ANALYTICS = "analytics",
    TRAINING = "training",
    SUPPORT = "support"
}
/**
 * Support Ticket Categories and Priorities
 */
declare enum SupportCategory {
    TECHNICAL = "technical",
    BILLING = "billing",
    COMPLIANCE = "compliance",
    GENERAL = "general"
}
declare enum SupportPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    URGENT = "urgent"
}
declare enum SupportStatus {
    OPEN = "open",
    IN_PROGRESS = "in_progress",
    WAITING_RESPONSE = "waiting_response",
    RESOLVED = "resolved",
    CLOSED = "closed"
}
/**
 * Institution Type Schema for Documentation
 */
declare const DocsInstitutionTypeSchema: z.ZodObject<{
    id: z.ZodEnum<typeof DocsInstitutionType>;
    name: z.ZodString;
    icon: z.ZodString;
    color: z.ZodString;
    description: z.ZodString;
    features: z.ZodArray<z.ZodString>;
    docs: z.ZodNumber;
    popular: z.ZodOptional<z.ZodBoolean>;
    category: z.ZodOptional<z.ZodEnum<{
        fintech: "fintech";
        remittance: "remittance";
        banking: "banking";
        cooperative: "cooperative";
        payment: "payment";
    }>>;
    compliance: z.ZodOptional<z.ZodArray<z.ZodString>>;
    integrations: z.ZodOptional<z.ZodArray<z.ZodString>>;
    estimatedSetupTime: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Documentation Category Schema
 */
declare const DocsCategorySchema: z.ZodObject<{
    id: z.ZodEnum<typeof DocsCategory>;
    title: z.ZodString;
    description: z.ZodString;
    color: z.ZodString;
    estimatedTime: z.ZodOptional<z.ZodString>;
    difficulty: z.ZodOptional<z.ZodEnum<typeof DocsDifficulty>>;
    items: z.ZodArray<z.ZodString>;
    badge: z.ZodOptional<z.ZodString>;
    popular: z.ZodOptional<z.ZodBoolean>;
    mandatory: z.ZodOptional<z.ZodBoolean>;
    prerequisites: z.ZodOptional<z.ZodArray<z.ZodString>>;
    outcomes: z.ZodOptional<z.ZodArray<z.ZodString>>;
    relatedCategories: z.ZodOptional<z.ZodArray<z.ZodString>>;
    institutionSpecific: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
/**
 * Quick Action Schema
 */
declare const QuickActionSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    href: z.ZodString;
    color: z.ZodString;
    time: z.ZodOptional<z.ZodString>;
    badge: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    icon: z.ZodOptional<z.ZodString>;
    popular: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
/**
 * Search Result Schema
 */
declare const SearchResultSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    href: z.ZodString;
    category: z.ZodString;
    type: z.ZodEnum<typeof DocsContentType>;
    content: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
    difficulty: z.ZodOptional<z.ZodEnum<typeof DocsDifficulty>>;
    estimatedTime: z.ZodOptional<z.ZodString>;
    lastUpdated: z.ZodOptional<z.ZodDate>;
    relevanceScore: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
/**
 * Search Suggestion Schema
 */
declare const SearchSuggestionSchema: z.ZodObject<{
    title: z.ZodString;
    href: z.ZodString;
    category: z.ZodString;
    type: z.ZodEnum<typeof DocsContentType>;
    popularity: z.ZodOptional<z.ZodNumber>;
    lastUpdated: z.ZodOptional<z.ZodDate>;
}, z.core.$strip>;
/**
 * Featured Content Schema
 */
declare const FeaturedContentSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    type: z.ZodEnum<typeof DocsContentType>;
    readTime: z.ZodString;
    href: z.ZodString;
    image: z.ZodOptional<z.ZodString>;
    popular: z.ZodOptional<z.ZodBoolean>;
    new: z.ZodOptional<z.ZodBoolean>;
    trending: z.ZodOptional<z.ZodBoolean>;
    author: z.ZodOptional<z.ZodString>;
    publishedDate: z.ZodOptional<z.ZodDate>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
    institutionTypes: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
/**
 * Documentation Metadata Schema
 */
declare const DocsMetadataSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    lastUpdated: z.ZodDate;
    author: z.ZodString;
    contributors: z.ZodOptional<z.ZodArray<z.ZodString>>;
    version: z.ZodString;
    status: z.ZodEnum<{
        published: "published";
        draft: "draft";
        archived: "archived";
        under_review: "under_review";
    }>;
    tags: z.ZodArray<z.ZodString>;
    institutionTypes: z.ZodArray<z.ZodString>;
    difficulty: z.ZodEnum<typeof DocsDifficulty>;
    estimatedTime: z.ZodString;
    prerequisites: z.ZodOptional<z.ZodArray<z.ZodString>>;
    learningObjectives: z.ZodOptional<z.ZodArray<z.ZodString>>;
    relatedDocs: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
/**
 * API Endpoint Schema for Documentation
 */
declare const APIEndpointSchema: z.ZodObject<{
    method: z.ZodEnum<{
        GET: "GET";
        POST: "POST";
        PUT: "PUT";
        DELETE: "DELETE";
        PATCH: "PATCH";
    }>;
    path: z.ZodString;
    summary: z.ZodString;
    description: z.ZodString;
    parameters: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        in: z.ZodEnum<{
            path: "path";
            query: "query";
            header: "header";
            cookie: "cookie";
        }>;
        required: z.ZodBoolean;
        type: z.ZodString;
        description: z.ZodString;
        example: z.ZodOptional<z.ZodAny>;
        enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
        format: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
    requestBody: z.ZodOptional<z.ZodObject<{
        required: z.ZodBoolean;
        contentType: z.ZodString;
        schema: z.ZodAny;
        examples: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, z.core.$strip>>;
    responses: z.ZodArray<z.ZodObject<{
        statusCode: z.ZodNumber;
        description: z.ZodString;
        schema: z.ZodOptional<z.ZodAny>;
        examples: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, z.core.$strip>>;
    examples: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        request: z.ZodObject<{
            method: z.ZodString;
            url: z.ZodString;
            headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            body: z.ZodOptional<z.ZodAny>;
        }, z.core.$strip>;
        response: z.ZodObject<{
            statusCode: z.ZodNumber;
            headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            body: z.ZodAny;
        }, z.core.$strip>;
    }, z.core.$strip>>>;
    deprecated: z.ZodOptional<z.ZodBoolean>;
    authentication: z.ZodOptional<z.ZodArray<z.ZodString>>;
    rateLimit: z.ZodOptional<z.ZodObject<{
        requests: z.ZodNumber;
        period: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Integration Schema
 */
declare const IntegrationSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    provider: z.ZodString;
    type: z.ZodEnum<{
        core_banking: "core_banking";
        mobile_money: "mobile_money";
        government: "government";
        third_party: "third_party";
    }>;
    status: z.ZodEnum<{
        deprecated: "deprecated";
        available: "available";
        beta: "beta";
        coming_soon: "coming_soon";
    }>;
    description: z.ZodString;
    features: z.ZodArray<z.ZodString>;
    requirements: z.ZodArray<z.ZodString>;
    setup: z.ZodObject<{
        difficulty: z.ZodEnum<{
            Easy: "Easy";
            Medium: "Medium";
            Hard: "Hard";
        }>;
        estimatedTime: z.ZodString;
        steps: z.ZodArray<z.ZodString>;
    }, z.core.$strip>;
    documentation: z.ZodString;
    support: z.ZodObject<{
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        documentation: z.ZodOptional<z.ZodString>;
        community: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    pricing: z.ZodOptional<z.ZodObject<{
        model: z.ZodEnum<{
            custom: "custom";
            free: "free";
            subscription: "subscription";
            transaction: "transaction";
        }>;
        details: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Compliance Requirement Schema
 */
declare const ComplianceRequirementSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    regulator: z.ZodString;
    description: z.ZodString;
    applicableTo: z.ZodArray<z.ZodString>;
    requirements: z.ZodArray<z.ZodString>;
    automationLevel: z.ZodEnum<{
        manual: "manual";
        semi_automated: "semi_automated";
        fully_automated: "fully_automated";
    }>;
    reportingFrequency: z.ZodString;
    documentation: z.ZodArray<z.ZodString>;
    penalties: z.ZodOptional<z.ZodString>;
    lastUpdated: z.ZodDate;
}, z.core.$strip>;
/**
 * Learning Path Schema
 */
declare const LearningPathSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    target: z.ZodEnum<{
        business: "business";
        compliance: "compliance";
        technical: "technical";
        mixed: "mixed";
    }>;
    level: z.ZodEnum<{
        beginner: "beginner";
        intermediate: "intermediate";
        advanced: "advanced";
    }>;
    estimatedDuration: z.ZodString;
    modules: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        description: z.ZodString;
        type: z.ZodEnum<{
            video: "video";
            reading: "reading";
            interactive: "interactive";
            quiz: "quiz";
            project: "project";
        }>;
        estimatedTime: z.ZodString;
        content: z.ZodString;
        resources: z.ZodOptional<z.ZodArray<z.ZodString>>;
        quiz: z.ZodOptional<z.ZodObject<{
            questions: z.ZodNumber;
            passingScore: z.ZodNumber;
        }, z.core.$strip>>;
        project: z.ZodOptional<z.ZodObject<{
            description: z.ZodString;
            deliverables: z.ZodArray<z.ZodString>;
            evaluation: z.ZodArray<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    prerequisites: z.ZodOptional<z.ZodArray<z.ZodString>>;
    outcomes: z.ZodArray<z.ZodString>;
    certification: z.ZodOptional<z.ZodObject<{
        available: z.ZodBoolean;
        name: z.ZodString;
        validityPeriod: z.ZodString;
        renewalRequirements: z.ZodArray<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Support Ticket Schema
 */
declare const SupportTicketSchema: z.ZodObject<{
    id: z.ZodString;
    subject: z.ZodString;
    description: z.ZodString;
    category: z.ZodEnum<typeof SupportCategory>;
    priority: z.ZodEnum<typeof SupportPriority>;
    status: z.ZodEnum<typeof SupportStatus>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    assignedTo: z.ZodOptional<z.ZodString>;
    institution: z.ZodString;
    user: z.ZodString;
    attachments: z.ZodOptional<z.ZodArray<z.ZodString>>;
    responses: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        message: z.ZodString;
        author: z.ZodString;
        isStaff: z.ZodBoolean;
        createdAt: z.ZodDate;
        attachments: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
/**
 * User Preferences Schema for Documentation
 */
declare const DocsUserPreferencesSchema: z.ZodObject<{
    selectedInstitution: z.ZodOptional<z.ZodObject<{
        id: z.ZodEnum<typeof DocsInstitutionType>;
        name: z.ZodString;
        icon: z.ZodString;
        color: z.ZodString;
        description: z.ZodString;
        features: z.ZodArray<z.ZodString>;
        docs: z.ZodNumber;
        popular: z.ZodOptional<z.ZodBoolean>;
        category: z.ZodOptional<z.ZodEnum<{
            fintech: "fintech";
            remittance: "remittance";
            banking: "banking";
            cooperative: "cooperative";
            payment: "payment";
        }>>;
        compliance: z.ZodOptional<z.ZodArray<z.ZodString>>;
        integrations: z.ZodOptional<z.ZodArray<z.ZodString>>;
        estimatedSetupTime: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    bookmarkedDocs: z.ZodOptional<z.ZodArray<z.ZodString>>;
    recentlyViewed: z.ZodOptional<z.ZodArray<z.ZodString>>;
    learningPath: z.ZodOptional<z.ZodString>;
    progressTracking: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    notificationSettings: z.ZodOptional<z.ZodObject<{
        newContent: z.ZodBoolean;
        updates: z.ZodBoolean;
        reminders: z.ZodBoolean;
    }, z.core.$strip>>;
    displaySettings: z.ZodOptional<z.ZodObject<{
        theme: z.ZodEnum<{
            light: "light";
            dark: "dark";
            auto: "auto";
        }>;
        compactMode: z.ZodBoolean;
        sidebarCollapsed: z.ZodBoolean;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * TypeScript Types derived from Zod schemas
 */
type DocsInstitutionTypeType = z.infer<typeof DocsInstitutionTypeSchema>;
type DocsCategoryType = z.infer<typeof DocsCategorySchema>;
type QuickActionType = z.infer<typeof QuickActionSchema>;
type SearchResultType = z.infer<typeof SearchResultSchema>;
type SearchSuggestionType = z.infer<typeof SearchSuggestionSchema>;
type FeaturedContentType = z.infer<typeof FeaturedContentSchema>;
type DocsMetadataType = z.infer<typeof DocsMetadataSchema>;
type APIEndpointType = z.infer<typeof APIEndpointSchema>;
type IntegrationType = z.infer<typeof IntegrationSchema>;
type ComplianceRequirementType = z.infer<typeof ComplianceRequirementSchema>;
type LearningPathType = z.infer<typeof LearningPathSchema>;
type SupportTicketType = z.infer<typeof SupportTicketSchema>;
type DocsUserPreferencesType = z.infer<typeof DocsUserPreferencesSchema>;
/**
 * Default values and constants
 */
declare const DEFAULT_DOCS_COLORS: readonly ["blue", "green", "purple", "red", "orange", "pink", "indigo", "yellow", "teal", "gray"];
declare const DOCS_SEARCH_DEBOUNCE_MS = 300;
declare const DOCS_ITEMS_PER_PAGE = 20;
declare const DOCS_MAX_RECENT_SEARCHES = 5;
declare const DOCS_MAX_BOOKMARKS = 50;
/**
 * Institution-specific configuration
 */
declare const INSTITUTION_CONFIGS: {
    readonly commercial_bank: {
        readonly name: "Commercial Banks";
        readonly icon: "🏦";
        readonly color: "blue";
        readonly primaryFeatures: readonly ["RTGS Integration", "Correspondent Banking", "Corporate Banking"];
        readonly complianceRequirements: readonly ["CBK Tier 1", "Basel III", "AML/CFT"];
    };
    readonly sacco: {
        readonly name: "SACCOs";
        readonly icon: "🤝";
        readonly color: "green";
        readonly primaryFeatures: readonly ["Member Management", "Share Capital", "Dividend Calculation"];
        readonly complianceRequirements: readonly ["SASRA Guidelines", "Cooperative Development", "Member Protection"];
    };
    readonly mfi: {
        readonly name: "Microfinance Institutions";
        readonly icon: "💰";
        readonly color: "orange";
        readonly primaryFeatures: readonly ["Group Lending", "Micro Insurance", "Rural Payments"];
        readonly complianceRequirements: readonly ["Microfinance Regulations", "Consumer Protection", "Interest Rate Controls"];
    };
    readonly fintech: {
        readonly name: "Fintech Companies";
        readonly icon: "🚀";
        readonly color: "purple";
        readonly primaryFeatures: readonly ["API-First Architecture", "Digital Lending", "Mobile Wallets"];
        readonly complianceRequirements: readonly ["Payment Service Provider License", "Data Protection", "API Security"];
    };
    readonly processor: {
        readonly name: "Payment Processors";
        readonly icon: "💳";
        readonly color: "indigo";
        readonly primaryFeatures: readonly ["Multi-Merchant Support", "Settlement Services", "Risk Management"];
        readonly complianceRequirements: readonly ["PCI DSS Level 1", "Payment Card Industry", "Merchant Compliance"];
    };
    readonly remittance: {
        readonly name: "Remittance Services";
        readonly icon: "🌍";
        readonly color: "teal";
        readonly primaryFeatures: readonly ["Cross-Border Payments", "Exchange Rate Management", "Correspondent Banking"];
        readonly complianceRequirements: readonly ["Money Transfer License", "AML/CFT Enhanced", "Foreign Exchange Regulations"];
    };
};

export { ACCOUNT_TYPE_DESTINATIONS, APIEndpointSchema, type APIEndpointType, type AdminUser, AdminUserSchema, type AuthContextType, AuthProvider, type AuthResponse, type BaseUser, BaseUserSchema, BusinessType, type BusinessUser, BusinessUserSchema, ComplianceRequirementSchema, type ComplianceRequirementType, DEFAULT_DOCS_COLORS, DOCS_ITEMS_PER_PAGE, DOCS_MAX_BOOKMARKS, DOCS_MAX_RECENT_SEARCHES, DOCS_SEARCH_DEBOUNCE_MS, type DeveloperUser, DeveloperUserSchema, DocsCategory, DocsCategorySchema, type DocsCategoryType, DocsContentType, DocsDifficulty, DocsInstitutionType, DocsInstitutionTypeSchema, type DocsInstitutionTypeType, DocsMetadataSchema, type DocsMetadataType, DocsUserPreferencesSchema, type DocsUserPreferencesType, FeaturedContentSchema, type FeaturedContentType, INSTITUTION_CONFIGS, type IndividualUser, IndividualUserSchema, InstitutionType, type InstitutionUser, InstitutionUserSchema, IntegrationSchema, type IntegrationType, LearningPathSchema, type LearningPathType, type MFASetupRequest, MFASetupSchema, MFAType, type PasswordResetConfirmRequest, PasswordResetConfirmSchema, type PasswordResetRequest, PasswordResetSchema, QuickActionSchema, type QuickActionType, SearchResultSchema, type SearchResultType, SearchSuggestionSchema, type SearchSuggestionType, type Session, SessionSchema, type SignInRequest, SignInSchema, type SignUpRequest, SignUpSchema, type SocialAuthRequest, SocialAuthSchema, SupportCategory, SupportPriority, SupportStatus, SupportTicketSchema, type SupportTicketType, type User, UserAccountType, VerificationStatus };
