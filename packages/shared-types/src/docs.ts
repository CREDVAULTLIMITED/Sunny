import { z } from 'zod';

/**
 * Documentation-related types for Sunny Institutions Portal
 * Used across all documentation pages and components
 */

/**
 * Institution Types for Documentation Customization
 */
export enum DocsInstitutionType {
  COMMERCIAL_BANK = 'commercial_bank',
  SACCO = 'sacco',
  MICROFINANCE = 'mfi',
  FINTECH = 'fintech',
  PAYMENT_PROCESSOR = 'processor',
  REMITTANCE_SERVICE = 'remittance'
}

/**
 * Documentation Content Types
 */
export enum DocsContentType {
  GUIDE = 'guide',
  API = 'api',
  TUTORIAL = 'tutorial',
  REFERENCE = 'reference',
  VIDEO = 'video',
  CASE_STUDY = 'case_study'
}

/**
 * Documentation Difficulty Levels
 */
export enum DocsDifficulty {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

/**
 * Documentation Category Types
 */
export enum DocsCategory {
  GETTING_STARTED = 'getting_started',
  API_DOCS = 'api_docs',
  INTEGRATIONS = 'integrations',
  COMPLIANCE = 'compliance',
  WHITE_LABEL = 'white_label',
  ANALYTICS = 'analytics',
  TRAINING = 'training',
  SUPPORT = 'support'
}

/**
 * Support Ticket Categories and Priorities
 */
export enum SupportCategory {
  TECHNICAL = 'technical',
  BILLING = 'billing',
  COMPLIANCE = 'compliance',
  GENERAL = 'general'
}

export enum SupportPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum SupportStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  WAITING_RESPONSE = 'waiting_response',
  RESOLVED = 'resolved',
  CLOSED = 'closed'
}

/**
 * Institution Type Schema for Documentation
 */
export const DocsInstitutionTypeSchema = z.object({
  id: z.nativeEnum(DocsInstitutionType),
  name: z.string(),
  icon: z.string(),
  color: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  docs: z.number(),
  popular: z.boolean().optional(),
  category: z.enum(['banking', 'cooperative', 'fintech', 'payment', 'remittance']).optional(),
  compliance: z.array(z.string()).optional(),
  integrations: z.array(z.string()).optional(),
  estimatedSetupTime: z.string().optional()
});

/**
 * Documentation Category Schema
 */
export const DocsCategorySchema = z.object({
  id: z.nativeEnum(DocsCategory),
  title: z.string(),
  description: z.string(),
  color: z.string(),
  estimatedTime: z.string().optional(),
  difficulty: z.nativeEnum(DocsDifficulty).optional(),
  items: z.array(z.string()),
  badge: z.string().optional(),
  popular: z.boolean().optional(),
  mandatory: z.boolean().optional(),
  prerequisites: z.array(z.string()).optional(),
  outcomes: z.array(z.string()).optional(),
  relatedCategories: z.array(z.string()).optional(),
  institutionSpecific: z.record(z.string(), z.array(z.string())).optional()
});

/**
 * Quick Action Schema
 */
export const QuickActionSchema = z.object({
  title: z.string(),
  description: z.string(),
  href: z.string(),
  color: z.string(),
  time: z.string().optional(),
  badge: z.string().optional(),
  category: z.string().optional(),
  icon: z.string().optional(),
  popular: z.boolean().optional()
});

/**
 * Search Result Schema
 */
export const SearchResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  href: z.string(),
  category: z.string(),
  type: z.nativeEnum(DocsContentType),
  content: z.string().optional(),
  tags: z.array(z.string()).optional(),
  difficulty: z.nativeEnum(DocsDifficulty).optional(),
  estimatedTime: z.string().optional(),
  lastUpdated: z.date().optional(),
  relevanceScore: z.number().optional()
});

/**
 * Search Suggestion Schema
 */
export const SearchSuggestionSchema = z.object({
  title: z.string(),
  href: z.string(),
  category: z.string(),
  type: z.nativeEnum(DocsContentType),
  popularity: z.number().optional(),
  lastUpdated: z.date().optional()
});

/**
 * Featured Content Schema
 */
export const FeaturedContentSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  type: z.nativeEnum(DocsContentType),
  readTime: z.string(),
  href: z.string(),
  image: z.string().optional(),
  popular: z.boolean().optional(),
  new: z.boolean().optional(),
  trending: z.boolean().optional(),
  author: z.string().optional(),
  publishedDate: z.date().optional(),
  tags: z.array(z.string()).optional(),
  institutionTypes: z.array(z.string()).optional()
});

/**
 * Documentation Metadata Schema
 */
export const DocsMetadataSchema = z.object({
  title: z.string(),
  description: z.string(),
  lastUpdated: z.date(),
  author: z.string(),
  contributors: z.array(z.string()).optional(),
  version: z.string(),
  status: z.enum(['published', 'draft', 'archived', 'under_review']),
  tags: z.array(z.string()),
  institutionTypes: z.array(z.string()),
  difficulty: z.nativeEnum(DocsDifficulty),
  estimatedTime: z.string(),
  prerequisites: z.array(z.string()).optional(),
  learningObjectives: z.array(z.string()).optional(),
  relatedDocs: z.array(z.string()).optional()
});

/**
 * API Endpoint Schema for Documentation
 */
export const APIEndpointSchema = z.object({
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
  path: z.string(),
  summary: z.string(),
  description: z.string(),
  parameters: z.array(z.object({
    name: z.string(),
    in: z.enum(['query', 'path', 'header', 'cookie']),
    required: z.boolean(),
    type: z.string(),
    description: z.string(),
    example: z.any().optional(),
    enum: z.array(z.string()).optional(),
    format: z.string().optional()
  })).optional(),
  requestBody: z.object({
    required: z.boolean(),
    contentType: z.string(),
    schema: z.any(),
    examples: z.record(z.string(), z.any()).optional()
  }).optional(),
  responses: z.array(z.object({
    statusCode: z.number(),
    description: z.string(),
    schema: z.any().optional(),
    examples: z.record(z.string(), z.any()).optional(),
    headers: z.record(z.string(), z.string()).optional()
  })),
  examples: z.array(z.object({
    name: z.string(),
    description: z.string(),
    request: z.object({
      method: z.string(),
      url: z.string(),
      headers: z.record(z.string(), z.string()).optional(),
      body: z.any().optional()
    }),
    response: z.object({
      statusCode: z.number(),
      headers: z.record(z.string(), z.string()).optional(),
      body: z.any()
    })
  })).optional(),
  deprecated: z.boolean().optional(),
  authentication: z.array(z.string()).optional(),
  rateLimit: z.object({
    requests: z.number(),
    period: z.string()
  }).optional()
});

/**
 * Integration Schema
 */
export const IntegrationSchema = z.object({
  id: z.string(),
  name: z.string(),
  provider: z.string(),
  type: z.enum(['core_banking', 'mobile_money', 'government', 'third_party']),
  status: z.enum(['available', 'beta', 'coming_soon', 'deprecated']),
  description: z.string(),
  features: z.array(z.string()),
  requirements: z.array(z.string()),
  setup: z.object({
    difficulty: z.enum(['Easy', 'Medium', 'Hard']),
    estimatedTime: z.string(),
    steps: z.array(z.string())
  }),
  documentation: z.string(),
  support: z.object({
    email: z.string().optional(),
    phone: z.string().optional(),
    documentation: z.string().optional(),
    community: z.string().optional()
  }),
  pricing: z.object({
    model: z.enum(['free', 'subscription', 'transaction', 'custom']),
    details: z.string().optional()
  }).optional()
});

/**
 * Compliance Requirement Schema
 */
export const ComplianceRequirementSchema = z.object({
  id: z.string(),
  name: z.string(),
  regulator: z.string(),
  description: z.string(),
  applicableTo: z.array(z.string()),
  requirements: z.array(z.string()),
  automationLevel: z.enum(['manual', 'semi_automated', 'fully_automated']),
  reportingFrequency: z.string(),
  documentation: z.array(z.string()),
  penalties: z.string().optional(),
  lastUpdated: z.date()
});

/**
 * Learning Path Schema
 */
export const LearningPathSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  target: z.enum(['technical', 'business', 'compliance', 'mixed']),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  estimatedDuration: z.string(),
  modules: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    type: z.enum(['reading', 'video', 'interactive', 'quiz', 'project']),
    estimatedTime: z.string(),
    content: z.string(),
    resources: z.array(z.string()).optional(),
    quiz: z.object({
      questions: z.number(),
      passingScore: z.number()
    }).optional(),
    project: z.object({
      description: z.string(),
      deliverables: z.array(z.string()),
      evaluation: z.array(z.string())
    }).optional()
  })),
  prerequisites: z.array(z.string()).optional(),
  outcomes: z.array(z.string()),
  certification: z.object({
    available: z.boolean(),
    name: z.string(),
    validityPeriod: z.string(),
    renewalRequirements: z.array(z.string())
  }).optional()
});

/**
 * Support Ticket Schema
 */
export const SupportTicketSchema = z.object({
  id: z.string(),
  subject: z.string(),
  description: z.string(),
  category: z.nativeEnum(SupportCategory),
  priority: z.nativeEnum(SupportPriority),
  status: z.nativeEnum(SupportStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
  assignedTo: z.string().optional(),
  institution: z.string(),
  user: z.string(),
  attachments: z.array(z.string()).optional(),
  responses: z.array(z.object({
    id: z.string(),
    message: z.string(),
    author: z.string(),
    isStaff: z.boolean(),
    createdAt: z.date(),
    attachments: z.array(z.string()).optional()
  })).optional()
});

/**
 * User Preferences Schema for Documentation
 */
export const DocsUserPreferencesSchema = z.object({
  selectedInstitution: DocsInstitutionTypeSchema.optional(),
  bookmarkedDocs: z.array(z.string()).optional(),
  recentlyViewed: z.array(z.string()).optional(),
  learningPath: z.string().optional(),
  progressTracking: z.record(z.string(), z.number()).optional(),
  notificationSettings: z.object({
    newContent: z.boolean(),
    updates: z.boolean(),
    reminders: z.boolean()
  }).optional(),
  displaySettings: z.object({
    theme: z.enum(['light', 'dark', 'auto']),
    compactMode: z.boolean(),
    sidebarCollapsed: z.boolean()
  }).optional()
});

/**
 * TypeScript Types derived from Zod schemas
 */
export type DocsInstitutionTypeType = z.infer<typeof DocsInstitutionTypeSchema>;
export type DocsCategoryType = z.infer<typeof DocsCategorySchema>;
export type QuickActionType = z.infer<typeof QuickActionSchema>;
export type SearchResultType = z.infer<typeof SearchResultSchema>;
export type SearchSuggestionType = z.infer<typeof SearchSuggestionSchema>;
export type FeaturedContentType = z.infer<typeof FeaturedContentSchema>;
export type DocsMetadataType = z.infer<typeof DocsMetadataSchema>;
export type APIEndpointType = z.infer<typeof APIEndpointSchema>;
export type IntegrationType = z.infer<typeof IntegrationSchema>;
export type ComplianceRequirementType = z.infer<typeof ComplianceRequirementSchema>;
export type LearningPathType = z.infer<typeof LearningPathSchema>;
export type SupportTicketType = z.infer<typeof SupportTicketSchema>;
export type DocsUserPreferencesType = z.infer<typeof DocsUserPreferencesSchema>;

/**
 * Default values and constants
 */
export const DEFAULT_DOCS_COLORS = [
  'blue', 'green', 'purple', 'red', 'orange', 'pink', 'indigo', 'yellow', 'teal', 'gray'
] as const;

export const DOCS_SEARCH_DEBOUNCE_MS = 300;
export const DOCS_ITEMS_PER_PAGE = 20;
export const DOCS_MAX_RECENT_SEARCHES = 5;
export const DOCS_MAX_BOOKMARKS = 50;

/**
 * Institution-specific configuration
 */
export const INSTITUTION_CONFIGS = {
  [DocsInstitutionType.COMMERCIAL_BANK]: {
    name: 'Commercial Banks',
    icon: '🏦',
    color: 'blue',
    primaryFeatures: ['RTGS Integration', 'Correspondent Banking', 'Corporate Banking'],
    complianceRequirements: ['CBK Tier 1', 'Basel III', 'AML/CFT']
  },
  [DocsInstitutionType.SACCO]: {
    name: 'SACCOs',
    icon: '🤝',
    color: 'green',
    primaryFeatures: ['Member Management', 'Share Capital', 'Dividend Calculation'],
    complianceRequirements: ['SASRA Guidelines', 'Cooperative Development', 'Member Protection']
  },
  [DocsInstitutionType.MICROFINANCE]: {
    name: 'Microfinance Institutions',
    icon: '💰',
    color: 'orange',
    primaryFeatures: ['Group Lending', 'Micro Insurance', 'Rural Payments'],
    complianceRequirements: ['Microfinance Regulations', 'Consumer Protection', 'Interest Rate Controls']
  },
  [DocsInstitutionType.FINTECH]: {
    name: 'Fintech Companies',
    icon: '🚀',
    color: 'purple',
    primaryFeatures: ['API-First Architecture', 'Digital Lending', 'Mobile Wallets'],
    complianceRequirements: ['Payment Service Provider License', 'Data Protection', 'API Security']
  },
  [DocsInstitutionType.PAYMENT_PROCESSOR]: {
    name: 'Payment Processors',
    icon: '💳',
    color: 'indigo',
    primaryFeatures: ['Multi-Merchant Support', 'Settlement Services', 'Risk Management'],
    complianceRequirements: ['PCI DSS Level 1', 'Payment Card Industry', 'Merchant Compliance']
  },
  [DocsInstitutionType.REMITTANCE_SERVICE]: {
    name: 'Remittance Services',
    icon: '🌍',
    color: 'teal',
    primaryFeatures: ['Cross-Border Payments', 'Exchange Rate Management', 'Correspondent Banking'],
    complianceRequirements: ['Money Transfer License', 'AML/CFT Enhanced', 'Foreign Exchange Regulations']
  }
} as const;
