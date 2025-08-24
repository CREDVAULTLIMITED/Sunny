"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ACCOUNT_TYPE_DESTINATIONS: () => ACCOUNT_TYPE_DESTINATIONS,
  APIEndpointSchema: () => APIEndpointSchema,
  AdminUserSchema: () => AdminUserSchema,
  AuthProvider: () => AuthProvider,
  BaseUserSchema: () => BaseUserSchema,
  BusinessType: () => BusinessType,
  BusinessUserSchema: () => BusinessUserSchema,
  ComplianceRequirementSchema: () => ComplianceRequirementSchema,
  DEFAULT_DOCS_COLORS: () => DEFAULT_DOCS_COLORS,
  DOCS_ITEMS_PER_PAGE: () => DOCS_ITEMS_PER_PAGE,
  DOCS_MAX_BOOKMARKS: () => DOCS_MAX_BOOKMARKS,
  DOCS_MAX_RECENT_SEARCHES: () => DOCS_MAX_RECENT_SEARCHES,
  DOCS_SEARCH_DEBOUNCE_MS: () => DOCS_SEARCH_DEBOUNCE_MS,
  DeveloperUserSchema: () => DeveloperUserSchema,
  DocsCategory: () => DocsCategory,
  DocsCategorySchema: () => DocsCategorySchema,
  DocsContentType: () => DocsContentType,
  DocsDifficulty: () => DocsDifficulty,
  DocsInstitutionType: () => DocsInstitutionType,
  DocsInstitutionTypeSchema: () => DocsInstitutionTypeSchema,
  DocsMetadataSchema: () => DocsMetadataSchema,
  DocsUserPreferencesSchema: () => DocsUserPreferencesSchema,
  FeaturedContentSchema: () => FeaturedContentSchema,
  INSTITUTION_CONFIGS: () => INSTITUTION_CONFIGS,
  IndividualUserSchema: () => IndividualUserSchema,
  InstitutionType: () => InstitutionType,
  InstitutionUserSchema: () => InstitutionUserSchema,
  IntegrationSchema: () => IntegrationSchema,
  LearningPathSchema: () => LearningPathSchema,
  MFASetupSchema: () => MFASetupSchema,
  MFAType: () => MFAType,
  PasswordResetConfirmSchema: () => PasswordResetConfirmSchema,
  PasswordResetSchema: () => PasswordResetSchema,
  QuickActionSchema: () => QuickActionSchema,
  SearchResultSchema: () => SearchResultSchema,
  SearchSuggestionSchema: () => SearchSuggestionSchema,
  SessionSchema: () => SessionSchema,
  SignInSchema: () => SignInSchema,
  SignUpSchema: () => SignUpSchema,
  SocialAuthSchema: () => SocialAuthSchema,
  SupportCategory: () => SupportCategory,
  SupportPriority: () => SupportPriority,
  SupportStatus: () => SupportStatus,
  SupportTicketSchema: () => SupportTicketSchema,
  UserAccountType: () => UserAccountType,
  VerificationStatus: () => VerificationStatus
});
module.exports = __toCommonJS(index_exports);

// src/auth.ts
var import_zod = require("zod");
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
var BaseUserSchema = import_zod.z.object({
  id: import_zod.z.string().uuid(),
  email: import_zod.z.string().email(),
  emailVerified: import_zod.z.boolean().default(false),
  phone: import_zod.z.string().optional(),
  phoneVerified: import_zod.z.boolean().default(false),
  accountType: import_zod.z.nativeEnum(UserAccountType),
  firstName: import_zod.z.string().min(1),
  lastName: import_zod.z.string().min(1),
  avatar: import_zod.z.string().url().optional(),
  timezone: import_zod.z.string().default("UTC"),
  locale: import_zod.z.string().default("en"),
  currency: import_zod.z.string().length(3).default("USD"),
  mfaEnabled: import_zod.z.boolean().default(false),
  mfaMethods: import_zod.z.array(import_zod.z.nativeEnum(MFAType)).default([]),
  lastLoginAt: import_zod.z.date().optional(),
  createdAt: import_zod.z.date(),
  updatedAt: import_zod.z.date()
});
var IndividualUserSchema = BaseUserSchema.extend({
  accountType: import_zod.z.literal("individual" /* INDIVIDUAL */),
  dateOfBirth: import_zod.z.date().optional(),
  nationality: import_zod.z.string().optional(),
  occupation: import_zod.z.string().optional(),
  kycStatus: import_zod.z.nativeEnum(VerificationStatus).default("pending" /* PENDING */)
});
var BusinessUserSchema = BaseUserSchema.extend({
  accountType: import_zod.z.literal("business" /* BUSINESS */),
  businessName: import_zod.z.string().min(1),
  businessType: import_zod.z.nativeEnum(BusinessType),
  businessRegistrationNumber: import_zod.z.string().optional(),
  taxId: import_zod.z.string().optional(),
  website: import_zod.z.string().url().optional(),
  businessVerificationStatus: import_zod.z.nativeEnum(VerificationStatus).default("pending" /* PENDING */),
  monthlyVolume: import_zod.z.number().optional(),
  industry: import_zod.z.string().optional()
});
var InstitutionUserSchema = BaseUserSchema.extend({
  accountType: import_zod.z.literal("institution" /* INSTITUTION */),
  institutionName: import_zod.z.string().min(1),
  institutionType: import_zod.z.nativeEnum(InstitutionType),
  regulatoryLicense: import_zod.z.string().optional(),
  swiftCode: import_zod.z.string().optional(),
  institutionVerificationStatus: import_zod.z.nativeEnum(VerificationStatus).default("pending" /* PENDING */),
  complianceOfficer: import_zod.z.object({
    name: import_zod.z.string(),
    email: import_zod.z.string().email(),
    phone: import_zod.z.string()
  }).optional()
});
var DeveloperUserSchema = BaseUserSchema.extend({
  accountType: import_zod.z.literal("developer" /* DEVELOPER */),
  githubUsername: import_zod.z.string().optional(),
  company: import_zod.z.string().optional(),
  yearsExperience: import_zod.z.number().min(0).max(50).optional(),
  preferredLanguages: import_zod.z.array(import_zod.z.string()).default([]),
  apiKeyTier: import_zod.z.enum(["sandbox", "development", "production"]).default("sandbox")
});
var AdminUserSchema = BaseUserSchema.extend({
  accountType: import_zod.z.literal("admin" /* ADMIN */),
  permissions: import_zod.z.array(import_zod.z.string()).default([]),
  department: import_zod.z.string().optional(),
  level: import_zod.z.enum(["admin", "super_admin", "system_admin"]).default("admin")
});
var SignInSchema = import_zod.z.object({
  email: import_zod.z.string().email(),
  password: import_zod.z.string().min(8),
  accountType: import_zod.z.nativeEnum(UserAccountType).optional(),
  // For routing
  rememberMe: import_zod.z.boolean().optional().default(false),
  mfaCode: import_zod.z.string().optional()
});
var SignUpSchema = import_zod.z.object({
  email: import_zod.z.string().email(),
  password: import_zod.z.string().min(8).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
  ),
  confirmPassword: import_zod.z.string(),
  firstName: import_zod.z.string().min(1),
  lastName: import_zod.z.string().min(1),
  phone: import_zod.z.string().optional(),
  accountType: import_zod.z.nativeEnum(UserAccountType),
  agreeToTerms: import_zod.z.boolean().refine((val) => val === true, "You must agree to the terms and conditions"),
  agreeToPrivacy: import_zod.z.boolean().refine((val) => val === true, "You must agree to the privacy policy"),
  marketingConsent: import_zod.z.boolean().default(false),
  // Conditional fields based on account type
  businessName: import_zod.z.string().optional(),
  businessType: import_zod.z.nativeEnum(BusinessType).optional(),
  institutionName: import_zod.z.string().optional(),
  institutionType: import_zod.z.nativeEnum(InstitutionType).optional(),
  company: import_zod.z.string().optional(),
  // For developers
  referralCode: import_zod.z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
var SocialAuthSchema = import_zod.z.object({
  provider: import_zod.z.nativeEnum(AuthProvider),
  providerUserId: import_zod.z.string(),
  accessToken: import_zod.z.string(),
  refreshToken: import_zod.z.string().optional(),
  accountType: import_zod.z.nativeEnum(UserAccountType).optional()
});
var PasswordResetSchema = import_zod.z.object({
  email: import_zod.z.string().email()
});
var PasswordResetConfirmSchema = import_zod.z.object({
  token: import_zod.z.string(),
  password: import_zod.z.string().min(8),
  confirmPassword: import_zod.z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});
var MFASetupSchema = import_zod.z.object({
  method: import_zod.z.nativeEnum(MFAType),
  phoneNumber: import_zod.z.string().optional(),
  // For SMS
  backupCodes: import_zod.z.array(import_zod.z.string()).optional()
});
var SessionSchema = import_zod.z.object({
  id: import_zod.z.string(),
  userId: import_zod.z.string().uuid(),
  user: BaseUserSchema,
  accessToken: import_zod.z.string(),
  refreshToken: import_zod.z.string(),
  expiresAt: import_zod.z.date(),
  device: import_zod.z.object({
    userAgent: import_zod.z.string(),
    ip: import_zod.z.string(),
    location: import_zod.z.string().optional()
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
var import_zod2 = require("zod");
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
var DocsInstitutionTypeSchema = import_zod2.z.object({
  id: import_zod2.z.nativeEnum(DocsInstitutionType),
  name: import_zod2.z.string(),
  icon: import_zod2.z.string(),
  color: import_zod2.z.string(),
  description: import_zod2.z.string(),
  features: import_zod2.z.array(import_zod2.z.string()),
  docs: import_zod2.z.number(),
  popular: import_zod2.z.boolean().optional(),
  category: import_zod2.z.enum(["banking", "cooperative", "fintech", "payment", "remittance"]).optional(),
  compliance: import_zod2.z.array(import_zod2.z.string()).optional(),
  integrations: import_zod2.z.array(import_zod2.z.string()).optional(),
  estimatedSetupTime: import_zod2.z.string().optional()
});
var DocsCategorySchema = import_zod2.z.object({
  id: import_zod2.z.nativeEnum(DocsCategory),
  title: import_zod2.z.string(),
  description: import_zod2.z.string(),
  color: import_zod2.z.string(),
  estimatedTime: import_zod2.z.string().optional(),
  difficulty: import_zod2.z.nativeEnum(DocsDifficulty).optional(),
  items: import_zod2.z.array(import_zod2.z.string()),
  badge: import_zod2.z.string().optional(),
  popular: import_zod2.z.boolean().optional(),
  mandatory: import_zod2.z.boolean().optional(),
  prerequisites: import_zod2.z.array(import_zod2.z.string()).optional(),
  outcomes: import_zod2.z.array(import_zod2.z.string()).optional(),
  relatedCategories: import_zod2.z.array(import_zod2.z.string()).optional(),
  institutionSpecific: import_zod2.z.record(import_zod2.z.string(), import_zod2.z.array(import_zod2.z.string())).optional()
});
var QuickActionSchema = import_zod2.z.object({
  title: import_zod2.z.string(),
  description: import_zod2.z.string(),
  href: import_zod2.z.string(),
  color: import_zod2.z.string(),
  time: import_zod2.z.string().optional(),
  badge: import_zod2.z.string().optional(),
  category: import_zod2.z.string().optional(),
  icon: import_zod2.z.string().optional(),
  popular: import_zod2.z.boolean().optional()
});
var SearchResultSchema = import_zod2.z.object({
  id: import_zod2.z.string(),
  title: import_zod2.z.string(),
  description: import_zod2.z.string(),
  href: import_zod2.z.string(),
  category: import_zod2.z.string(),
  type: import_zod2.z.nativeEnum(DocsContentType),
  content: import_zod2.z.string().optional(),
  tags: import_zod2.z.array(import_zod2.z.string()).optional(),
  difficulty: import_zod2.z.nativeEnum(DocsDifficulty).optional(),
  estimatedTime: import_zod2.z.string().optional(),
  lastUpdated: import_zod2.z.date().optional(),
  relevanceScore: import_zod2.z.number().optional()
});
var SearchSuggestionSchema = import_zod2.z.object({
  title: import_zod2.z.string(),
  href: import_zod2.z.string(),
  category: import_zod2.z.string(),
  type: import_zod2.z.nativeEnum(DocsContentType),
  popularity: import_zod2.z.number().optional(),
  lastUpdated: import_zod2.z.date().optional()
});
var FeaturedContentSchema = import_zod2.z.object({
  id: import_zod2.z.string(),
  title: import_zod2.z.string(),
  description: import_zod2.z.string(),
  type: import_zod2.z.nativeEnum(DocsContentType),
  readTime: import_zod2.z.string(),
  href: import_zod2.z.string(),
  image: import_zod2.z.string().optional(),
  popular: import_zod2.z.boolean().optional(),
  new: import_zod2.z.boolean().optional(),
  trending: import_zod2.z.boolean().optional(),
  author: import_zod2.z.string().optional(),
  publishedDate: import_zod2.z.date().optional(),
  tags: import_zod2.z.array(import_zod2.z.string()).optional(),
  institutionTypes: import_zod2.z.array(import_zod2.z.string()).optional()
});
var DocsMetadataSchema = import_zod2.z.object({
  title: import_zod2.z.string(),
  description: import_zod2.z.string(),
  lastUpdated: import_zod2.z.date(),
  author: import_zod2.z.string(),
  contributors: import_zod2.z.array(import_zod2.z.string()).optional(),
  version: import_zod2.z.string(),
  status: import_zod2.z.enum(["published", "draft", "archived", "under_review"]),
  tags: import_zod2.z.array(import_zod2.z.string()),
  institutionTypes: import_zod2.z.array(import_zod2.z.string()),
  difficulty: import_zod2.z.nativeEnum(DocsDifficulty),
  estimatedTime: import_zod2.z.string(),
  prerequisites: import_zod2.z.array(import_zod2.z.string()).optional(),
  learningObjectives: import_zod2.z.array(import_zod2.z.string()).optional(),
  relatedDocs: import_zod2.z.array(import_zod2.z.string()).optional()
});
var APIEndpointSchema = import_zod2.z.object({
  method: import_zod2.z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  path: import_zod2.z.string(),
  summary: import_zod2.z.string(),
  description: import_zod2.z.string(),
  parameters: import_zod2.z.array(import_zod2.z.object({
    name: import_zod2.z.string(),
    in: import_zod2.z.enum(["query", "path", "header", "cookie"]),
    required: import_zod2.z.boolean(),
    type: import_zod2.z.string(),
    description: import_zod2.z.string(),
    example: import_zod2.z.any().optional(),
    enum: import_zod2.z.array(import_zod2.z.string()).optional(),
    format: import_zod2.z.string().optional()
  })).optional(),
  requestBody: import_zod2.z.object({
    required: import_zod2.z.boolean(),
    contentType: import_zod2.z.string(),
    schema: import_zod2.z.any(),
    examples: import_zod2.z.record(import_zod2.z.string(), import_zod2.z.any()).optional()
  }).optional(),
  responses: import_zod2.z.array(import_zod2.z.object({
    statusCode: import_zod2.z.number(),
    description: import_zod2.z.string(),
    schema: import_zod2.z.any().optional(),
    examples: import_zod2.z.record(import_zod2.z.string(), import_zod2.z.any()).optional(),
    headers: import_zod2.z.record(import_zod2.z.string(), import_zod2.z.string()).optional()
  })),
  examples: import_zod2.z.array(import_zod2.z.object({
    name: import_zod2.z.string(),
    description: import_zod2.z.string(),
    request: import_zod2.z.object({
      method: import_zod2.z.string(),
      url: import_zod2.z.string(),
      headers: import_zod2.z.record(import_zod2.z.string(), import_zod2.z.string()).optional(),
      body: import_zod2.z.any().optional()
    }),
    response: import_zod2.z.object({
      statusCode: import_zod2.z.number(),
      headers: import_zod2.z.record(import_zod2.z.string(), import_zod2.z.string()).optional(),
      body: import_zod2.z.any()
    })
  })).optional(),
  deprecated: import_zod2.z.boolean().optional(),
  authentication: import_zod2.z.array(import_zod2.z.string()).optional(),
  rateLimit: import_zod2.z.object({
    requests: import_zod2.z.number(),
    period: import_zod2.z.string()
  }).optional()
});
var IntegrationSchema = import_zod2.z.object({
  id: import_zod2.z.string(),
  name: import_zod2.z.string(),
  provider: import_zod2.z.string(),
  type: import_zod2.z.enum(["core_banking", "mobile_money", "government", "third_party"]),
  status: import_zod2.z.enum(["available", "beta", "coming_soon", "deprecated"]),
  description: import_zod2.z.string(),
  features: import_zod2.z.array(import_zod2.z.string()),
  requirements: import_zod2.z.array(import_zod2.z.string()),
  setup: import_zod2.z.object({
    difficulty: import_zod2.z.enum(["Easy", "Medium", "Hard"]),
    estimatedTime: import_zod2.z.string(),
    steps: import_zod2.z.array(import_zod2.z.string())
  }),
  documentation: import_zod2.z.string(),
  support: import_zod2.z.object({
    email: import_zod2.z.string().optional(),
    phone: import_zod2.z.string().optional(),
    documentation: import_zod2.z.string().optional(),
    community: import_zod2.z.string().optional()
  }),
  pricing: import_zod2.z.object({
    model: import_zod2.z.enum(["free", "subscription", "transaction", "custom"]),
    details: import_zod2.z.string().optional()
  }).optional()
});
var ComplianceRequirementSchema = import_zod2.z.object({
  id: import_zod2.z.string(),
  name: import_zod2.z.string(),
  regulator: import_zod2.z.string(),
  description: import_zod2.z.string(),
  applicableTo: import_zod2.z.array(import_zod2.z.string()),
  requirements: import_zod2.z.array(import_zod2.z.string()),
  automationLevel: import_zod2.z.enum(["manual", "semi_automated", "fully_automated"]),
  reportingFrequency: import_zod2.z.string(),
  documentation: import_zod2.z.array(import_zod2.z.string()),
  penalties: import_zod2.z.string().optional(),
  lastUpdated: import_zod2.z.date()
});
var LearningPathSchema = import_zod2.z.object({
  id: import_zod2.z.string(),
  title: import_zod2.z.string(),
  description: import_zod2.z.string(),
  target: import_zod2.z.enum(["technical", "business", "compliance", "mixed"]),
  level: import_zod2.z.enum(["beginner", "intermediate", "advanced"]),
  estimatedDuration: import_zod2.z.string(),
  modules: import_zod2.z.array(import_zod2.z.object({
    id: import_zod2.z.string(),
    title: import_zod2.z.string(),
    description: import_zod2.z.string(),
    type: import_zod2.z.enum(["reading", "video", "interactive", "quiz", "project"]),
    estimatedTime: import_zod2.z.string(),
    content: import_zod2.z.string(),
    resources: import_zod2.z.array(import_zod2.z.string()).optional(),
    quiz: import_zod2.z.object({
      questions: import_zod2.z.number(),
      passingScore: import_zod2.z.number()
    }).optional(),
    project: import_zod2.z.object({
      description: import_zod2.z.string(),
      deliverables: import_zod2.z.array(import_zod2.z.string()),
      evaluation: import_zod2.z.array(import_zod2.z.string())
    }).optional()
  })),
  prerequisites: import_zod2.z.array(import_zod2.z.string()).optional(),
  outcomes: import_zod2.z.array(import_zod2.z.string()),
  certification: import_zod2.z.object({
    available: import_zod2.z.boolean(),
    name: import_zod2.z.string(),
    validityPeriod: import_zod2.z.string(),
    renewalRequirements: import_zod2.z.array(import_zod2.z.string())
  }).optional()
});
var SupportTicketSchema = import_zod2.z.object({
  id: import_zod2.z.string(),
  subject: import_zod2.z.string(),
  description: import_zod2.z.string(),
  category: import_zod2.z.nativeEnum(SupportCategory),
  priority: import_zod2.z.nativeEnum(SupportPriority),
  status: import_zod2.z.nativeEnum(SupportStatus),
  createdAt: import_zod2.z.date(),
  updatedAt: import_zod2.z.date(),
  assignedTo: import_zod2.z.string().optional(),
  institution: import_zod2.z.string(),
  user: import_zod2.z.string(),
  attachments: import_zod2.z.array(import_zod2.z.string()).optional(),
  responses: import_zod2.z.array(import_zod2.z.object({
    id: import_zod2.z.string(),
    message: import_zod2.z.string(),
    author: import_zod2.z.string(),
    isStaff: import_zod2.z.boolean(),
    createdAt: import_zod2.z.date(),
    attachments: import_zod2.z.array(import_zod2.z.string()).optional()
  })).optional()
});
var DocsUserPreferencesSchema = import_zod2.z.object({
  selectedInstitution: DocsInstitutionTypeSchema.optional(),
  bookmarkedDocs: import_zod2.z.array(import_zod2.z.string()).optional(),
  recentlyViewed: import_zod2.z.array(import_zod2.z.string()).optional(),
  learningPath: import_zod2.z.string().optional(),
  progressTracking: import_zod2.z.record(import_zod2.z.string(), import_zod2.z.number()).optional(),
  notificationSettings: import_zod2.z.object({
    newContent: import_zod2.z.boolean(),
    updates: import_zod2.z.boolean(),
    reminders: import_zod2.z.boolean()
  }).optional(),
  displaySettings: import_zod2.z.object({
    theme: import_zod2.z.enum(["light", "dark", "auto"]),
    compactMode: import_zod2.z.boolean(),
    sidebarCollapsed: import_zod2.z.boolean()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
