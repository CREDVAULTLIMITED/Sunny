// src/auth.ts
import { z } from "zod";
var UserAccountType = /* @__PURE__ */ ((UserAccountType2) => {
  UserAccountType2["INDIVIDUAL"] = "individual";
  UserAccountType2["BUSINESS"] = "business";
  UserAccountType2["INSTITUTION"] = "institution";
  UserAccountType2["DEVELOPER"] = "developer";
  UserAccountType2["ADMIN"] = "admin";
  return UserAccountType2;
})(UserAccountType || {});
var AuthProvider = /* @__PURE__ */ ((AuthProvider2) => {
  AuthProvider2["EMAIL"] = "email";
  AuthProvider2["GOOGLE"] = "google";
  AuthProvider2["APPLE"] = "apple";
  AuthProvider2["MICROSOFT"] = "microsoft";
  AuthProvider2["GITHUB"] = "github";
  AuthProvider2["LINKEDIN"] = "linkedin";
  return AuthProvider2;
})(AuthProvider || {});
var MFAType = /* @__PURE__ */ ((MFAType2) => {
  MFAType2["SMS"] = "sms";
  MFAType2["EMAIL"] = "email";
  MFAType2["TOTP"] = "totp";
  MFAType2["BIOMETRIC"] = "biometric";
  MFAType2["HARDWARE_TOKEN"] = "hardware_token";
  return MFAType2;
})(MFAType || {});
var VerificationStatus = /* @__PURE__ */ ((VerificationStatus2) => {
  VerificationStatus2["PENDING"] = "pending";
  VerificationStatus2["VERIFIED"] = "verified";
  VerificationStatus2["REJECTED"] = "rejected";
  VerificationStatus2["EXPIRED"] = "expired";
  return VerificationStatus2;
})(VerificationStatus || {});
var InstitutionType = /* @__PURE__ */ ((InstitutionType2) => {
  InstitutionType2["BANK"] = "bank";
  InstitutionType2["CREDIT_UNION"] = "credit_union";
  InstitutionType2["FINTECH"] = "fintech";
  InstitutionType2["PAYMENT_PROCESSOR"] = "payment_processor";
  InstitutionType2["REMITTANCE_SERVICE"] = "remittance_service";
  InstitutionType2["SACCO"] = "sacco";
  InstitutionType2["MICROFINANCE"] = "microfinance";
  return InstitutionType2;
})(InstitutionType || {});
var BusinessType = /* @__PURE__ */ ((BusinessType2) => {
  BusinessType2["SOLE_PROPRIETORSHIP"] = "sole_proprietorship";
  BusinessType2["PARTNERSHIP"] = "partnership";
  BusinessType2["CORPORATION"] = "corporation";
  BusinessType2["LLC"] = "llc";
  BusinessType2["NON_PROFIT"] = "non_profit";
  BusinessType2["STARTUP"] = "startup";
  BusinessType2["ENTERPRISE"] = "enterprise";
  return BusinessType2;
})(BusinessType || {});
var BaseUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  emailVerified: z.boolean().default(false),
  phone: z.string().optional(),
  phoneVerified: z.boolean().default(false),
  accountType: z.nativeEnum(UserAccountType),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  avatar: z.string().url().optional(),
  timezone: z.string().default("UTC"),
  locale: z.string().default("en"),
  currency: z.string().length(3).default("USD"),
  mfaEnabled: z.boolean().default(false),
  mfaMethods: z.array(z.nativeEnum(MFAType)).default([]),
  lastLoginAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});
var IndividualUserSchema = BaseUserSchema.extend({
  accountType: z.literal("individual" /* INDIVIDUAL */),
  dateOfBirth: z.date().optional(),
  nationality: z.string().optional(),
  occupation: z.string().optional(),
  kycStatus: z.nativeEnum(VerificationStatus).default("pending" /* PENDING */)
});
var BusinessUserSchema = BaseUserSchema.extend({
  accountType: z.literal("business" /* BUSINESS */),
  businessName: z.string().min(1),
  businessType: z.nativeEnum(BusinessType),
  businessRegistrationNumber: z.string().optional(),
  taxId: z.string().optional(),
  website: z.string().url().optional(),
  businessVerificationStatus: z.nativeEnum(VerificationStatus).default("pending" /* PENDING */),
  monthlyVolume: z.number().optional(),
  industry: z.string().optional()
});
var InstitutionUserSchema = BaseUserSchema.extend({
  accountType: z.literal("institution" /* INSTITUTION */),
  institutionName: z.string().min(1),
  institutionType: z.nativeEnum(InstitutionType),
  regulatoryLicense: z.string().optional(),
  swiftCode: z.string().optional(),
  institutionVerificationStatus: z.nativeEnum(VerificationStatus).default("pending" /* PENDING */),
  complianceOfficer: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string()
  }).optional()
});
var DeveloperUserSchema = BaseUserSchema.extend({
  accountType: z.literal("developer" /* DEVELOPER */),
  githubUsername: z.string().optional(),
  company: z.string().optional(),
  yearsExperience: z.number().min(0).max(50).optional(),
  preferredLanguages: z.array(z.string()).default([]),
  apiKeyTier: z.enum(["sandbox", "development", "production"]).default("sandbox")
});
var AdminUserSchema = BaseUserSchema.extend({
  accountType: z.literal("admin" /* ADMIN */),
  permissions: z.array(z.string()).default([]),
  department: z.string().optional(),
  level: z.enum(["admin", "super_admin", "system_admin"]).default("admin")
});
var SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  accountType: z.nativeEnum(UserAccountType).optional(),
  // For routing
  rememberMe: z.boolean().optional().default(false),
  mfaCode: z.string().optional()
});
var SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
  ),
  confirmPassword: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
  accountType: z.nativeEnum(UserAccountType),
  agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to the terms and conditions"),
  agreeToPrivacy: z.boolean().refine((val) => val === true, "You must agree to the privacy policy"),
  marketingConsent: z.boolean().default(false),
  // Conditional fields based on account type
  businessName: z.string().optional(),
  businessType: z.nativeEnum(BusinessType).optional(),
  institutionName: z.string().optional(),
  institutionType: z.nativeEnum(InstitutionType).optional(),
  company: z.string().optional(),
  // For developers
  referralCode: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
var SocialAuthSchema = z.object({
  provider: z.nativeEnum(AuthProvider),
  providerUserId: z.string(),
  accessToken: z.string(),
  refreshToken: z.string().optional(),
  accountType: z.nativeEnum(UserAccountType).optional()
});
var PasswordResetSchema = z.object({
  email: z.string().email()
});
var PasswordResetConfirmSchema = z.object({
  token: z.string(),
  password: z.string().min(8),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
var MFASetupSchema = z.object({
  method: z.nativeEnum(MFAType),
  phoneNumber: z.string().optional(),
  // For SMS
  backupCodes: z.array(z.string()).optional()
});
var SessionSchema = z.object({
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
var ACCOUNT_TYPE_DESTINATIONS = {
  ["individual" /* INDIVIDUAL */]: "https://app.sunnypayments.com",
  ["business" /* BUSINESS */]: "https://business.sunnypayments.com",
  ["institution" /* INSTITUTION */]: "https://institutions.sunnypayments.com",
  ["developer" /* DEVELOPER */]: "https://developers.sunnypayments.com",
  ["admin" /* ADMIN */]: "https://admin.sunnypayments.com"
};

// src/docs.ts
import { z as z2 } from "zod";
var DocsInstitutionType = /* @__PURE__ */ ((DocsInstitutionType2) => {
  DocsInstitutionType2["COMMERCIAL_BANK"] = "commercial_bank";
  DocsInstitutionType2["SACCO"] = "sacco";
  DocsInstitutionType2["MICROFINANCE"] = "mfi";
  DocsInstitutionType2["FINTECH"] = "fintech";
  DocsInstitutionType2["PAYMENT_PROCESSOR"] = "processor";
  DocsInstitutionType2["REMITTANCE_SERVICE"] = "remittance";
  return DocsInstitutionType2;
})(DocsInstitutionType || {});
var DocsContentType = /* @__PURE__ */ ((DocsContentType2) => {
  DocsContentType2["GUIDE"] = "guide";
  DocsContentType2["API"] = "api";
  DocsContentType2["TUTORIAL"] = "tutorial";
  DocsContentType2["REFERENCE"] = "reference";
  DocsContentType2["VIDEO"] = "video";
  DocsContentType2["CASE_STUDY"] = "case_study";
  return DocsContentType2;
})(DocsContentType || {});
var DocsDifficulty = /* @__PURE__ */ ((DocsDifficulty2) => {
  DocsDifficulty2["BEGINNER"] = "Beginner";
  DocsDifficulty2["INTERMEDIATE"] = "Intermediate";
  DocsDifficulty2["ADVANCED"] = "Advanced";
  return DocsDifficulty2;
})(DocsDifficulty || {});
var DocsCategory = /* @__PURE__ */ ((DocsCategory2) => {
  DocsCategory2["GETTING_STARTED"] = "getting_started";
  DocsCategory2["API_DOCS"] = "api_docs";
  DocsCategory2["INTEGRATIONS"] = "integrations";
  DocsCategory2["COMPLIANCE"] = "compliance";
  DocsCategory2["WHITE_LABEL"] = "white_label";
  DocsCategory2["ANALYTICS"] = "analytics";
  DocsCategory2["TRAINING"] = "training";
  DocsCategory2["SUPPORT"] = "support";
  return DocsCategory2;
})(DocsCategory || {});
var SupportCategory = /* @__PURE__ */ ((SupportCategory2) => {
  SupportCategory2["TECHNICAL"] = "technical";
  SupportCategory2["BILLING"] = "billing";
  SupportCategory2["COMPLIANCE"] = "compliance";
  SupportCategory2["GENERAL"] = "general";
  return SupportCategory2;
})(SupportCategory || {});
var SupportPriority = /* @__PURE__ */ ((SupportPriority2) => {
  SupportPriority2["LOW"] = "low";
  SupportPriority2["MEDIUM"] = "medium";
  SupportPriority2["HIGH"] = "high";
  SupportPriority2["URGENT"] = "urgent";
  return SupportPriority2;
})(SupportPriority || {});
var SupportStatus = /* @__PURE__ */ ((SupportStatus2) => {
  SupportStatus2["OPEN"] = "open";
  SupportStatus2["IN_PROGRESS"] = "in_progress";
  SupportStatus2["WAITING_RESPONSE"] = "waiting_response";
  SupportStatus2["RESOLVED"] = "resolved";
  SupportStatus2["CLOSED"] = "closed";
  return SupportStatus2;
})(SupportStatus || {});
var DocsInstitutionTypeSchema = z2.object({
  id: z2.nativeEnum(DocsInstitutionType),
  name: z2.string(),
  icon: z2.string(),
  color: z2.string(),
  description: z2.string(),
  features: z2.array(z2.string()),
  docs: z2.number(),
  popular: z2.boolean().optional(),
  category: z2.enum(["banking", "cooperative", "fintech", "payment", "remittance"]).optional(),
  compliance: z2.array(z2.string()).optional(),
  integrations: z2.array(z2.string()).optional(),
  estimatedSetupTime: z2.string().optional()
});
var DocsCategorySchema = z2.object({
  id: z2.nativeEnum(DocsCategory),
  title: z2.string(),
  description: z2.string(),
  color: z2.string(),
  estimatedTime: z2.string().optional(),
  difficulty: z2.nativeEnum(DocsDifficulty).optional(),
  items: z2.array(z2.string()),
  badge: z2.string().optional(),
  popular: z2.boolean().optional(),
  mandatory: z2.boolean().optional(),
  prerequisites: z2.array(z2.string()).optional(),
  outcomes: z2.array(z2.string()).optional(),
  relatedCategories: z2.array(z2.string()).optional(),
  institutionSpecific: z2.record(z2.string(), z2.array(z2.string())).optional()
});
var QuickActionSchema = z2.object({
  title: z2.string(),
  description: z2.string(),
  href: z2.string(),
  color: z2.string(),
  time: z2.string().optional(),
  badge: z2.string().optional(),
  category: z2.string().optional(),
  icon: z2.string().optional(),
  popular: z2.boolean().optional()
});
var SearchResultSchema = z2.object({
  id: z2.string(),
  title: z2.string(),
  description: z2.string(),
  href: z2.string(),
  category: z2.string(),
  type: z2.nativeEnum(DocsContentType),
  content: z2.string().optional(),
  tags: z2.array(z2.string()).optional(),
  difficulty: z2.nativeEnum(DocsDifficulty).optional(),
  estimatedTime: z2.string().optional(),
  lastUpdated: z2.date().optional(),
  relevanceScore: z2.number().optional()
});
var SearchSuggestionSchema = z2.object({
  title: z2.string(),
  href: z2.string(),
  category: z2.string(),
  type: z2.nativeEnum(DocsContentType),
  popularity: z2.number().optional(),
  lastUpdated: z2.date().optional()
});
var FeaturedContentSchema = z2.object({
  id: z2.string(),
  title: z2.string(),
  description: z2.string(),
  type: z2.nativeEnum(DocsContentType),
  readTime: z2.string(),
  href: z2.string(),
  image: z2.string().optional(),
  popular: z2.boolean().optional(),
  new: z2.boolean().optional(),
  trending: z2.boolean().optional(),
  author: z2.string().optional(),
  publishedDate: z2.date().optional(),
  tags: z2.array(z2.string()).optional(),
  institutionTypes: z2.array(z2.string()).optional()
});
var DocsMetadataSchema = z2.object({
  title: z2.string(),
  description: z2.string(),
  lastUpdated: z2.date(),
  author: z2.string(),
  contributors: z2.array(z2.string()).optional(),
  version: z2.string(),
  status: z2.enum(["published", "draft", "archived", "under_review"]),
  tags: z2.array(z2.string()),
  institutionTypes: z2.array(z2.string()),
  difficulty: z2.nativeEnum(DocsDifficulty),
  estimatedTime: z2.string(),
  prerequisites: z2.array(z2.string()).optional(),
  learningObjectives: z2.array(z2.string()).optional(),
  relatedDocs: z2.array(z2.string()).optional()
});
var APIEndpointSchema = z2.object({
  method: z2.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  path: z2.string(),
  summary: z2.string(),
  description: z2.string(),
  parameters: z2.array(z2.object({
    name: z2.string(),
    in: z2.enum(["query", "path", "header", "cookie"]),
    required: z2.boolean(),
    type: z2.string(),
    description: z2.string(),
    example: z2.any().optional(),
    enum: z2.array(z2.string()).optional(),
    format: z2.string().optional()
  })).optional(),
  requestBody: z2.object({
    required: z2.boolean(),
    contentType: z2.string(),
    schema: z2.any(),
    examples: z2.record(z2.string(), z2.any()).optional()
  }).optional(),
  responses: z2.array(z2.object({
    statusCode: z2.number(),
    description: z2.string(),
    schema: z2.any().optional(),
    examples: z2.record(z2.string(), z2.any()).optional(),
    headers: z2.record(z2.string(), z2.string()).optional()
  })),
  examples: z2.array(z2.object({
    name: z2.string(),
    description: z2.string(),
    request: z2.object({
      method: z2.string(),
      url: z2.string(),
      headers: z2.record(z2.string(), z2.string()).optional(),
      body: z2.any().optional()
    }),
    response: z2.object({
      statusCode: z2.number(),
      headers: z2.record(z2.string(), z2.string()).optional(),
      body: z2.any()
    })
  })).optional(),
  deprecated: z2.boolean().optional(),
  authentication: z2.array(z2.string()).optional(),
  rateLimit: z2.object({
    requests: z2.number(),
    period: z2.string()
  }).optional()
});
var IntegrationSchema = z2.object({
  id: z2.string(),
  name: z2.string(),
  provider: z2.string(),
  type: z2.enum(["core_banking", "mobile_money", "government", "third_party"]),
  status: z2.enum(["available", "beta", "coming_soon", "deprecated"]),
  description: z2.string(),
  features: z2.array(z2.string()),
  requirements: z2.array(z2.string()),
  setup: z2.object({
    difficulty: z2.enum(["Easy", "Medium", "Hard"]),
    estimatedTime: z2.string(),
    steps: z2.array(z2.string())
  }),
  documentation: z2.string(),
  support: z2.object({
    email: z2.string().optional(),
    phone: z2.string().optional(),
    documentation: z2.string().optional(),
    community: z2.string().optional()
  }),
  pricing: z2.object({
    model: z2.enum(["free", "subscription", "transaction", "custom"]),
    details: z2.string().optional()
  }).optional()
});
var ComplianceRequirementSchema = z2.object({
  id: z2.string(),
  name: z2.string(),
  regulator: z2.string(),
  description: z2.string(),
  applicableTo: z2.array(z2.string()),
  requirements: z2.array(z2.string()),
  automationLevel: z2.enum(["manual", "semi_automated", "fully_automated"]),
  reportingFrequency: z2.string(),
  documentation: z2.array(z2.string()),
  penalties: z2.string().optional(),
  lastUpdated: z2.date()
});
var LearningPathSchema = z2.object({
  id: z2.string(),
  title: z2.string(),
  description: z2.string(),
  target: z2.enum(["technical", "business", "compliance", "mixed"]),
  level: z2.enum(["beginner", "intermediate", "advanced"]),
  estimatedDuration: z2.string(),
  modules: z2.array(z2.object({
    id: z2.string(),
    title: z2.string(),
    description: z2.string(),
    type: z2.enum(["reading", "video", "interactive", "quiz", "project"]),
    estimatedTime: z2.string(),
    content: z2.string(),
    resources: z2.array(z2.string()).optional(),
    quiz: z2.object({
      questions: z2.number(),
      passingScore: z2.number()
    }).optional(),
    project: z2.object({
      description: z2.string(),
      deliverables: z2.array(z2.string()),
      evaluation: z2.array(z2.string())
    }).optional()
  })),
  prerequisites: z2.array(z2.string()).optional(),
  outcomes: z2.array(z2.string()),
  certification: z2.object({
    available: z2.boolean(),
    name: z2.string(),
    validityPeriod: z2.string(),
    renewalRequirements: z2.array(z2.string())
  }).optional()
});
var SupportTicketSchema = z2.object({
  id: z2.string(),
  subject: z2.string(),
  description: z2.string(),
  category: z2.nativeEnum(SupportCategory),
  priority: z2.nativeEnum(SupportPriority),
  status: z2.nativeEnum(SupportStatus),
  createdAt: z2.date(),
  updatedAt: z2.date(),
  assignedTo: z2.string().optional(),
  institution: z2.string(),
  user: z2.string(),
  attachments: z2.array(z2.string()).optional(),
  responses: z2.array(z2.object({
    id: z2.string(),
    message: z2.string(),
    author: z2.string(),
    isStaff: z2.boolean(),
    createdAt: z2.date(),
    attachments: z2.array(z2.string()).optional()
  })).optional()
});
var DocsUserPreferencesSchema = z2.object({
  selectedInstitution: DocsInstitutionTypeSchema.optional(),
  bookmarkedDocs: z2.array(z2.string()).optional(),
  recentlyViewed: z2.array(z2.string()).optional(),
  learningPath: z2.string().optional(),
  progressTracking: z2.record(z2.string(), z2.number()).optional(),
  notificationSettings: z2.object({
    newContent: z2.boolean(),
    updates: z2.boolean(),
    reminders: z2.boolean()
  }).optional(),
  displaySettings: z2.object({
    theme: z2.enum(["light", "dark", "auto"]),
    compactMode: z2.boolean(),
    sidebarCollapsed: z2.boolean()
  }).optional()
});
var DEFAULT_DOCS_COLORS = [
  "blue",
  "green",
  "purple",
  "red",
  "orange",
  "pink",
  "indigo",
  "yellow",
  "teal",
  "gray"
];
var DOCS_SEARCH_DEBOUNCE_MS = 300;
var DOCS_ITEMS_PER_PAGE = 20;
var DOCS_MAX_RECENT_SEARCHES = 5;
var DOCS_MAX_BOOKMARKS = 50;
var INSTITUTION_CONFIGS = {
  ["commercial_bank" /* COMMERCIAL_BANK */]: {
    name: "Commercial Banks",
    icon: "\u{1F3E6}",
    color: "blue",
    primaryFeatures: ["RTGS Integration", "Correspondent Banking", "Corporate Banking"],
    complianceRequirements: ["CBK Tier 1", "Basel III", "AML/CFT"]
  },
  ["sacco" /* SACCO */]: {
    name: "SACCOs",
    icon: "\u{1F91D}",
    color: "green",
    primaryFeatures: ["Member Management", "Share Capital", "Dividend Calculation"],
    complianceRequirements: ["SASRA Guidelines", "Cooperative Development", "Member Protection"]
  },
  ["mfi" /* MICROFINANCE */]: {
    name: "Microfinance Institutions",
    icon: "\u{1F4B0}",
    color: "orange",
    primaryFeatures: ["Group Lending", "Micro Insurance", "Rural Payments"],
    complianceRequirements: ["Microfinance Regulations", "Consumer Protection", "Interest Rate Controls"]
  },
  ["fintech" /* FINTECH */]: {
    name: "Fintech Companies",
    icon: "\u{1F680}",
    color: "purple",
    primaryFeatures: ["API-First Architecture", "Digital Lending", "Mobile Wallets"],
    complianceRequirements: ["Payment Service Provider License", "Data Protection", "API Security"]
  },
  ["processor" /* PAYMENT_PROCESSOR */]: {
    name: "Payment Processors",
    icon: "\u{1F4B3}",
    color: "indigo",
    primaryFeatures: ["Multi-Merchant Support", "Settlement Services", "Risk Management"],
    complianceRequirements: ["PCI DSS Level 1", "Payment Card Industry", "Merchant Compliance"]
  },
  ["remittance" /* REMITTANCE_SERVICE */]: {
    name: "Remittance Services",
    icon: "\u{1F30D}",
    color: "teal",
    primaryFeatures: ["Cross-Border Payments", "Exchange Rate Management", "Correspondent Banking"],
    complianceRequirements: ["Money Transfer License", "AML/CFT Enhanced", "Foreign Exchange Regulations"]
  }
};
export {
  ACCOUNT_TYPE_DESTINATIONS,
  APIEndpointSchema,
  AdminUserSchema,
  AuthProvider,
  BaseUserSchema,
  BusinessType,
  BusinessUserSchema,
  ComplianceRequirementSchema,
  DEFAULT_DOCS_COLORS,
  DOCS_ITEMS_PER_PAGE,
  DOCS_MAX_BOOKMARKS,
  DOCS_MAX_RECENT_SEARCHES,
  DOCS_SEARCH_DEBOUNCE_MS,
  DeveloperUserSchema,
  DocsCategory,
  DocsCategorySchema,
  DocsContentType,
  DocsDifficulty,
  DocsInstitutionType,
  DocsInstitutionTypeSchema,
  DocsMetadataSchema,
  DocsUserPreferencesSchema,
  FeaturedContentSchema,
  INSTITUTION_CONFIGS,
  IndividualUserSchema,
  InstitutionType,
  InstitutionUserSchema,
  IntegrationSchema,
  LearningPathSchema,
  MFASetupSchema,
  MFAType,
  PasswordResetConfirmSchema,
  PasswordResetSchema,
  QuickActionSchema,
  SearchResultSchema,
  SearchSuggestionSchema,
  SessionSchema,
  SignInSchema,
  SignUpSchema,
  SocialAuthSchema,
  SupportCategory,
  SupportPriority,
  SupportStatus,
  SupportTicketSchema,
  UserAccountType,
  VerificationStatus
};
