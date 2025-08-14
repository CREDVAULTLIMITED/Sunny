# 🔄 Sunny Platform - Shared Dashboard Components & Architecture

## 📋 **Table of Contents**

- [Overview](#overview)
- [Shared Component Architecture](#shared-component-architecture)
- [Cross-Dashboard Data Models](#cross-dashboard-data-models)
- [Common UI Components](#common-ui-components)
- [Shared Services & Utilities](#shared-services--utilities)
- [Dashboard Comparison Matrix](#dashboard-comparison-matrix)
- [Component Reusability Guidelines](#component-reusability-guidelines)
- [Shared State Management](#shared-state-management)

---

## 🎯 **Overview**

### **Shared Component Philosophy**
The Sunny platform consists of multiple dashboards (User, Business, Institution, Admin, Developer) that share common functionality while maintaining distinct user experiences. This document outlines the shared components, data structures, and architectural patterns used across all dashboards.

### **Dashboard Ecosystem**
```
🌟 Sunny Platform Ecosystem
┌─────────────────────────────────────────────────────────────┐
│                   Shared Component Layer                    │
├─────────────────────────────────────────────────────────────┤
│  👤 User       🏢 Business    🏛️ Institution  👑 Admin      │
│  Dashboard     Dashboard     Dashboard      Dashboard       │
│                                                             │
│  🧑‍💻 Developer  📱 Mobile      🌐 Marketing   🔧 Support     │
│  Portal        App           Site          Dashboard       │
└─────────────────────────────────────────────────────────────┘
```

### **Benefits of Shared Architecture**
- **Consistency**: Uniform user experience across platforms
- **Maintainability**: Single source of truth for common components
- **Performance**: Reduced bundle size through code reuse
- **Development Speed**: Faster feature development and bug fixes
- **Quality**: Centralized testing and quality assurance

---

## 🏗️ **Shared Component Architecture**

### **Package Structure**

```
@sunny/shared/
├── 📦 packages/
│   ├── ui/                    # Shared UI components
│   ├── auth/                  # Authentication logic
│   ├── api-client/           # API communication
│   ├── shared-types/         # TypeScript definitions
│   ├── utils/                # Utility functions
│   ├── security/             # Security utilities
│   └── database/             # Database abstractions
├── 🎨 design-system/
│   ├── tokens/               # Design tokens
│   ├── themes/               # Theme definitions
│   ├── icons/                # Icon library
│   └── assets/               # Shared assets
└── 🧪 testing/
    ├── fixtures/             # Test data
    ├── mocks/                # Mock implementations
    └── utilities/            # Testing utilities
```

### **Cross-Dashboard Component Categories**

#### **1. Navigation & Layout Components**
```typescript
// Shared across all dashboards with customization
interface NavigationComponent {
  // Common navigation patterns
  Sidebar: React.FC<SidebarProps>;
  TopNavigation: React.FC<TopNavProps>;
  Breadcrumbs: React.FC<BreadcrumbProps>;
  UserMenu: React.FC<UserMenuProps>;
  
  // Dashboard-specific variations
  UserSidebar: React.FC<UserSidebarProps>;
  BusinessSidebar: React.FC<BusinessSidebarProps>;
  InstitutionSidebar: React.FC<InstitutionSidebarProps>;
  AdminSidebar: React.FC<AdminSidebarProps>;
}
```

#### **2. Authentication & User Management**
```typescript
// Universal authentication components
interface AuthComponents {
  LoginForm: React.FC<LoginFormProps>;
  MFAVerification: React.FC<MFAProps>;
  PasswordReset: React.FC<PasswordResetProps>;
  UserProfile: React.FC<UserProfileProps>;
  SecuritySettings: React.FC<SecuritySettingsProps>;
  SessionManager: React.FC<SessionManagerProps>;
}
```

#### **3. Data Visualization & Analytics**
```typescript
// Reusable chart and visualization components
interface AnalyticsComponents {
  // Chart Components
  LineChart: React.FC<LineChartProps>;
  BarChart: React.FC<BarChartProps>;
  PieChart: React.FC<PieChartProps>;
  AreaChart: React.FC<AreaChartProps>;
  HeatMap: React.FC<HeatMapProps>;
  
  // Metric Components
  KPICard: React.FC<KPICardProps>;
  MetricGrid: React.FC<MetricGridProps>;
  TrendIndicator: React.FC<TrendProps>;
  ProgressRing: React.FC<ProgressRingProps>;
  
  // Dashboard Widgets
  RevenueWidget: React.FC<RevenueWidgetProps>;
  TransactionWidget: React.FC<TransactionWidgetProps>;
  CustomerWidget: React.FC<CustomerWidgetProps>;
  GrowthWidget: React.FC<GrowthWidgetProps>;
}
```

---

## 📊 **Cross-Dashboard Data Models**

### **Universal User Model**
```typescript
// Base user interface used across all dashboards
interface BaseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  
  // Account Information
  accountType: UserAccountType;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  emailVerified: boolean;
  phoneVerified: boolean;
  
  // Security
  mfaEnabled: boolean;
  lastLogin?: Date;
  passwordLastChanged?: Date;
  
  // Preferences
  language: string;
  timezone: string;
  currency: string;
  theme: 'light' | 'dark' | 'auto';
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  lastSeenAt?: Date;
}
```

### **Universal Transaction Model**
```typescript
// Core transaction structure used across all dashboards
interface BaseTransaction {
  id: string;
  reference: string;
  externalReference?: string;
  
  // Transaction Details
  amount: number;
  currency: string;
  description: string;
  type: 'payment' | 'transfer' | 'withdrawal' | 'deposit';
  category: TransactionCategory;
  
  // Parties
  sender: TransactionParty;
  receiver: TransactionParty;
  
  // Status & Timing
  status: TransactionStatus;
  createdAt: Date;
  processedAt?: Date;
  completedAt?: Date;
  
  // Payment Method
  paymentMethod: PaymentMethod;
  
  // Financial Details
  fees: Fee[];
  taxes: Tax[];
  netAmount: number;
  
  // Metadata
  channel: 'web' | 'mobile' | 'api' | 'batch';
  ipAddress?: string;
  userAgent?: string;
  location?: GeoLocation;
}
```

---

## 🎨 **Common UI Components**

### **Core Component Library (@sunny/ui)**

#### **1. Layout Components**
```typescript
// Layout.tsx - Universal layout wrapper
interface LayoutProps {
  children: React.ReactNode;
  variant: 'user' | 'business' | 'institution' | 'admin';
  showHeader?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
  sidebarCollapsed?: boolean;
  className?: string;
}
```

#### **2. Data Display Components**
```typescript
// DataTable.tsx - Universal data table
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  error?: string;
  
  // Pagination
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  };
  
  // Sorting
  sorting?: {
    column: string;
    direction: 'asc' | 'desc';
    onSort: (column: string) => void;
  };
  
  // Actions
  actions?: {
    onView?: (item: T) => void;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
  };
}
```

---

## 📊 **Dashboard Comparison Matrix**

### **Feature Comparison Across Dashboards**

| Feature Category | User Dashboard | Business Dashboard | Institution Dashboard | Admin Dashboard | Developer Portal |
|------------------|----------------|--------------------|-----------------------|-----------------|------------------|
| **Authentication** | ✅ Basic | ✅ Business | ✅ Institution | ✅ Admin | ✅ Developer |
| **Transaction View** | Personal | Business | Institution | Platform-wide | API Usage |
| **Analytics** | Personal Metrics | Business KPIs | Institution Analytics | Platform Analytics | API Analytics |
| **Customer Mgmt** | ❌ | ✅ Limited | ✅ Full | ✅ Platform-wide | ❌ |
| **Compliance** | Basic KYC | Business Compliance | Full Regulatory | Platform Compliance | ❌ |
| **Settings** | Personal | Business Config | Institution Config | Platform Config | API Config |
| **Reporting** | Personal Reports | Business Reports | Regulatory Reports | Admin Reports | API Reports |
| **White-labeling** | ❌ | Limited | ✅ Full | ✅ Platform | ❌ |
| **API Access** | Limited | Business APIs | Institution APIs | Full Access | Full Access |
| **Support** | Self-service | Business Support | Dedicated Support | Internal Tools | Developer Support |

---

## 🎯 **Component Reusability Guidelines**

### **Design Principles**

#### **1. Configuration Over Customization**
```typescript
// Good: Configurable component
interface MetricCardProps {
  variant: 'user' | 'business' | 'institution' | 'admin';
  data: MetricData;
  showTrend?: boolean;
  showActions?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

#### **2. Composition Over Inheritance**
```typescript
// Good: Composable components
const UserDashboard = () => (
  <Layout variant="user">
    <Header variant="user" />
    <Sidebar variant="user" navigation={userNavigation} />
    <MetricGrid variant="user" metrics={userMetrics} />
  </Layout>
);
```

---

## 🔄 **Shared State Management**

### **Global State Architecture**

```typescript
// GlobalState.ts - Shared state across dashboards
interface GlobalState {
  // Authentication
  auth: {
    user: BaseUser | null;
    token: string | null;
    permissions: string[];
    isAuthenticated: boolean;
  };
  
  // UI State
  ui: {
    theme: 'light' | 'dark' | 'auto';
    sidebarCollapsed: boolean;
    notifications: Notification[];
    loading: boolean;
    errors: Error[];
  };
  
  // Application Data
  data: {
    transactions: Transaction[];
    customers: Customer[];
    analytics: AnalyticsData;
    settings: UserSettings;
  };
}
```

---

This shared component architecture ensures consistency, maintainability, and efficiency across the entire Sunny platform while allowing each dashboard to maintain its unique functionality and user experience.

*Note: This is a condensed version. The complete documentation includes detailed implementation strategies, package dependencies, testing approaches, and real-time synchronization patterns.*
