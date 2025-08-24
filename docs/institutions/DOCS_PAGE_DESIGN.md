# 📖 Sunny Institutions /docs Page - Complete Design Specification

## 📋 **Table of Contents**

- [Page Overview](#page-overview)
- [Hero Section](#hero-section)
- [Documentation Categories](#documentation-categories)
- [Interactive Components](#interactive-components)
- [Search & Discovery](#search--discovery)
- [Navigation Structure](#navigation-structure)
- [Responsive Design](#responsive-design)
- [Component Implementation](#component-implementation)

---

## 🎯 **Page Overview**

### **Page Purpose**
The `/docs` page serves as the main entry point for all institutional documentation, providing an organized, discoverable, and intuitive interface for institutions to find the exact resources they need based on their type, role, and current objectives.

### **Target URL Structure**
- **Main Entry**: `https://institutions.sunnypayments.com/docs`
- **Category Pages**: `https://institutions.sunnypayments.com/docs/{category}`
- **Specific Docs**: `https://institutions.sunnypayments.com/docs/{category}/{subcategory}/{page}`

### **User Journey Goals**
1. **Quick Discovery** - Find relevant documentation in under 30 seconds
2. **Guided Learning** - Follow structured learning paths
3. **Self-Service** - Resolve issues without contacting support
4. **Progressive Enhancement** - Access basic to advanced content seamlessly

---

## 🎨 **Hero Section**

### **Hero Component Structure**
```tsx
interface HeroSection {
  title: string;
  subtitle: string;
  searchBar: SearchComponent;
  quickActions: QuickAction[];
  featuredContent: FeaturedContent[];
  institutionTypeSelector: InstitutionSelector;
}

const DocsHero = () => {
  return (
    <section className="docs-hero bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="container mx-auto px-6">
        {/* Main Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sunny Institutions Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive guides, API references, and resources to help your institution 
            successfully implement and optimize payment solutions.
          </p>
        </div>

        {/* Global Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <GlobalSearch 
            placeholder="Search documentation, APIs, guides..."
            suggestions={searchSuggestions}
            shortcuts={["⌘K", "Ctrl+K"]}
          />
        </div>

        {/* Institution Type Selector */}
        <InstitutionTypeSelector 
          types={institutionTypes}
          onSelect={handleInstitutionSelect}
          currentSelection={selectedInstitution}
        />

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          <QuickActionCard 
            icon="🚀"
            title="Quick Start"
            description="Get started in 15 minutes"
            href="/docs/getting-started"
            time="15 min"
          />
          <QuickActionCard 
            icon="🔌"
            title="API Reference"
            description="Complete API documentation"
            href="/docs/api"
            badge="Interactive"
          />
          <QuickActionCard 
            icon="🔗"
            title="Integrations"
            description="Connect your systems"
            href="/docs/integrations"
            popular={true}
          />
          <QuickActionCard 
            icon="🛡️"
            title="Compliance"
            description="Regulatory guidelines"
            href="/docs/compliance"
            badge="Required"
          />
        </div>
      </div>
    </section>
  );
};
```

### **Institution Type Selector**
```tsx
const InstitutionTypeSelector = ({ types, onSelect, currentSelection }) => {
  return (
    <div className="institution-selector">
      <p className="text-center text-gray-600 mb-4">
        Select your institution type for personalized documentation:
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {types.map((type) => (
          <InstitutionTypeButton
            key={type.id}
            type={type}
            selected={currentSelection?.id === type.id}
            onClick={() => onSelect(type)}
          />
        ))}
      </div>
    </div>
  );
};

const institutionTypes = [
  {
    id: 'commercial_bank',
    name: 'Commercial Banks',
    icon: '🏦',
    color: 'blue',
    description: 'Traditional banking institutions',
    features: ['Corporate Banking', 'Retail Banking', 'Treasury Management']
  },
  {
    id: 'sacco',
    name: 'SACCOs',
    icon: '🤝',
    color: 'green',
    description: 'Savings & Credit Cooperatives',
    features: ['Member Management', 'Share Capital', 'Dividend Calculation']
  },
  {
    id: 'mfi',
    name: 'Microfinance',
    icon: '💰',
    color: 'orange',
    description: 'Microfinance Institutions',
    features: ['Group Lending', 'Micro Insurance', 'Rural Payments']
  },
  {
    id: 'fintech',
    name: 'Fintech',
    icon: '🚀',
    color: 'purple',
    description: 'Financial Technology Companies',
    features: ['API-First', 'Digital Lending', 'Mobile Wallets']
  },
  {
    id: 'processor',
    name: 'Payment Processors',
    icon: '💳',
    color: 'indigo',
    description: 'Payment Processing Companies',
    features: ['Multi-Merchant', 'Settlement', 'Risk Management']
  },
  {
    id: 'remittance',
    name: 'Remittance Services',
    icon: '🌍',
    color: 'teal',
    description: 'Money Transfer Operators',
    features: ['Cross-Border', 'Exchange Rates', 'Compliance']
  }
];
```

---

## 📚 **Documentation Categories**

### **Main Categories Section**
```tsx
const DocumentationCategories = ({ selectedInstitution }) => {
  return (
    <section className="docs-categories py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Documentation Categories
        </h2>
        
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              institutionType={selectedInstitution}
              customized={isCustomizedForInstitution(category, selectedInstitution)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const categories = [
  {
    id: 'getting_started',
    title: 'Getting Started',
    icon: '🚀',
    description: 'Quick start guides and initial setup instructions',
    color: 'blue',
    estimatedTime: '30 minutes',
    difficulty: 'Beginner',
    items: [
      'Institution Onboarding',
      'Dashboard Overview',
      'Initial Configuration',
      'First Transaction'
    ],
    institutionSpecific: {
      commercial_bank: ['CBS Integration', 'Branch Setup', 'Regulatory Config'],
      sacco: ['Member Portal Setup', 'Share Capital Config', 'SASRA Compliance'],
      mfi: ['Group Management', 'Loan Products', 'Rural Setup'],
      fintech: ['API Configuration', 'Digital Onboarding', 'Sandbox Testing'],
      processor: ['Merchant Onboarding', 'Settlement Config', 'Risk Rules'],
      remittance: ['Corridor Setup', 'Exchange Rates', 'Compliance Config']
    }
  },
  {
    id: 'api_documentation',
    title: 'API Documentation',
    icon: '🔌',
    description: 'Complete API reference with interactive examples',
    color: 'green',
    estimatedTime: '2 hours',
    difficulty: 'Intermediate',
    features: ['Interactive Explorer', 'Code Examples', 'SDKs'],
    items: [
      'Authentication',
      'Core Endpoints',
      'Webhook Management',
      'Error Handling'
    ],
    endpoints: {
      total: 127,
      categories: ['Institutions', 'Transactions', 'Customers', 'Compliance', 'Reporting'],
      languages: ['cURL', 'JavaScript', 'Python', 'PHP', 'Java', 'Go']
    }
  },
  {
    id: 'integration_guides',
    title: 'Integration Guides',
    icon: '🔗',
    description: 'Step-by-step integration instructions',
    color: 'purple',
    estimatedTime: '4-8 hours',
    difficulty: 'Advanced',
    popular: true,
    items: [
      'Core Banking Systems',
      'Mobile Money Platforms',
      'Government Systems',
      'Third-party Services'
    ],
    integrations: {
      cbs: ['Temenos T24', 'Infosys Finacle', 'Oracle Flexcube', 'Craft Silicon'],
      mobileMoney: ['M-Pesa', 'Airtel Money', 'T-Kash', 'Equitel'],
      government: ['KRA', 'CBK', 'CRB', 'IPRS'],
      thirdParty: ['CRM Systems', 'Accounting Software', 'Business Intelligence']
    }
  },
  {
    id: 'compliance_security',
    title: 'Compliance & Security',
    icon: '🛡️',
    description: 'Regulatory compliance and security guidelines',
    color: 'red',
    criticality: 'High',
    mandatory: true,
    items: [
      'CBK Compliance',
      'AML/CFT Procedures',
      'Data Protection',
      'Security Best Practices'
    ],
    regulations: {
      local: ['CBK Regulations', 'SASRA Guidelines', 'Kenya DPA'],
      international: ['PCI DSS', 'GDPR', 'ISO 27001'],
      updates: 'Monthly regulatory updates'
    }
  },
  {
    id: 'white_label',
    title: 'White-label Solutions',
    icon: '🎨',
    description: 'Customize and brand your payment solutions',
    color: 'pink',
    estimatedTime: '2-6 hours',
    difficulty: 'Intermediate',
    items: [
      'Branding Guidelines',
      'Mobile App Builder',
      'Web Portal Setup',
      'Payment Gateway Config'
    ],
    customization: {
      branding: ['Logos', 'Colors', 'Typography', 'Themes'],
      applications: ['Mobile Apps', 'Web Portals', 'Payment Pages'],
      deployment: ['App Stores', 'Custom Domains', 'SSL Certificates']
    }
  },
  {
    id: 'analytics_reporting',
    title: 'Analytics & Reporting',
    icon: '📊',
    description: 'Business intelligence and reporting tools',
    color: 'indigo',
    estimatedTime: '1-3 hours',
    difficulty: 'Intermediate',
    items: [
      'Dashboard Analytics',
      'Custom Reports',
      'Data Export',
      'Business Intelligence'
    ],
    features: {
      realTime: ['Live Dashboards', 'Real-time Alerts', 'Streaming Data'],
      historical: ['Trend Analysis', 'Historical Reports', 'Data Warehousing'],
      predictive: ['Forecasting', 'Risk Modeling', 'ML Insights']
    }
  },
  {
    id: 'training_education',
    title: 'Training & Education',
    icon: '🎓',
    description: 'Learning paths and certification programs',
    color: 'yellow',
    estimatedTime: '4-12 weeks',
    difficulty: 'All Levels',
    items: [
      'Learning Paths',
      'Video Tutorials',
      'Certification Programs',
      'Best Practices'
    ],
    programs: {
      paths: ['Technical', 'Business', 'Compliance'],
      certifications: ['Developer', 'Administrator', 'Specialist'],
      formats: ['Self-paced', 'Instructor-led', 'Virtual Workshops']
    }
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting & Support',
    icon: '🛠️',
    description: 'Common issues and diagnostic tools',
    color: 'orange',
    responseTime: '< 2 hours',
    availability: '24/7',
    items: [
      'Common Issues',
      'Error Codes',
      'Diagnostic Tools',
      'Support Channels'
    ],
    support: {
      selfService: ['Knowledge Base', 'FAQ', 'Troubleshooting Guides'],
      assisted: ['Live Chat', 'Phone Support', 'Email Support'],
      premium: ['Dedicated Manager', 'Priority Support', 'On-site Assistance']
    }
  },
  {
    id: 'reference_materials',
    title: 'Reference Materials',
    icon: '📚',
    description: 'Glossary, specifications, and reference docs',
    color: 'gray',
    searchable: true,
    downloadable: true,
    items: [
      'Glossary',
      'System Requirements',
      'Change Log',
      'Legal Documents'
    ],
    resources: {
      definitions: '500+ terms defined',
      specifications: 'Technical requirements',
      updates: 'Weekly change logs',
      legal: 'Terms, Privacy, Compliance'
    }
  }
];
```

### **Category Card Component**
```tsx
const CategoryCard = ({ category, institutionType, customized }) => {
  return (
    <div className={`category-card bg-white rounded-lg border border-gray-200 hover:border-${category.color}-300 hover:shadow-lg transition-all duration-200`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className={`text-3xl mr-4 p-3 bg-${category.color}-50 rounded-lg`}>
              {category.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {category.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                {category.description}
              </p>
            </div>
          </div>
          
          {/* Badges */}
          <div className="flex flex-col gap-1">
            {category.mandatory && (
              <Badge variant="red" size="sm">Required</Badge>
            )}
            {category.popular && (
              <Badge variant="blue" size="sm">Popular</Badge>
            )}
            {customized && (
              <Badge variant="green" size="sm">Customized</Badge>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
          {category.estimatedTime && (
            <div className="flex items-center">
              <ClockIcon className="w-4 h-4 mr-1" />
              {category.estimatedTime}
            </div>
          )}
          {category.difficulty && (
            <div className="flex items-center">
              <AcademicCapIcon className="w-4 h-4 mr-1" />
              {category.difficulty}
            </div>
          )}
          {category.criticality && (
            <div className="flex items-center">
              <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
              {category.criticality} Priority
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Standard Items */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Core Topics</h4>
          <ul className="space-y-1">
            {category.items.map((item, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Institution-Specific Items */}
        {institutionType && category.institutionSpecific?.[institutionType.id] && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">
              {institutionType.name} Specific
            </h4>
            <ul className="space-y-1">
              {category.institutionSpecific[institutionType.id].map((item, index) => (
                <li key={index} className="flex items-center text-sm text-blue-700">
                  <StarIcon className="w-4 h-4 text-blue-500 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Additional Features */}
        {category.features && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {category.features.map((feature, index) => (
                <span key={index} className={`px-2 py-1 bg-${category.color}-100 text-${category.color}-700 text-xs rounded`}>
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-4 border-t border-gray-100">
          <Link 
            href={`/docs/${category.id}`}
            className={`inline-flex items-center justify-center w-full px-4 py-2 bg-${category.color}-600 text-white rounded-lg hover:bg-${category.color}-700 transition-colors duration-200`}
          >
            Explore {category.title}
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};
```

---

## 🔍 **Search & Discovery**

### **Global Search Component**
```tsx
const GlobalSearch = ({ placeholder, suggestions, shortcuts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <div className="global-search relative">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsOpen(true)}
          className="block w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <kbd className="inline-flex items-center px-2 py-1 border border-gray-200 rounded text-xs font-sans font-medium text-gray-400">
            {shortcuts[0]}
          </kbd>
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {/* Quick Suggestions */}
          {searchQuery === '' && suggestions && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Popular Searches
              </h3>
              <div className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  >
                    <div className="flex items-center">
                      <TrendingUpIcon className="w-4 h-4 text-gray-400 mr-2" />
                      {suggestion.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {searchQuery !== '' && searchResults.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Search Results
              </h3>
              <div className="space-y-2">
                {searchResults.map((result, index) => (
                  <SearchResultItem
                    key={result.id}
                    result={result}
                    selected={index === selectedIndex}
                    onClick={() => handleResultClick(result)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {searchQuery !== '' && searchResults.length === 0 && (
            <div className="p-4 text-center">
              <div className="text-gray-500">
                <DocumentMagnifyingGlassIcon className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">No results found for "{searchQuery}"</p>
                <p className="text-xs mt-1">Try searching for a different term</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const SearchResultItem = ({ result, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`block w-full text-left px-3 py-3 rounded-lg transition-colors ${
        selected ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(result.type)}`}>
            {getTypeIcon(result.type)}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {result.title}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {result.description}
          </p>
          <div className="flex items-center mt-1">
            <span className={`inline-flex px-2 py-1 text-xs rounded ${getTypeColor(result.type)}`}>
              {result.type}
            </span>
            {result.category && (
              <span className="text-xs text-gray-400 ml-2">
                in {result.category}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};
```

### **Advanced Filter Panel**
```tsx
const AdvancedFilters = ({ filters, onFilterChange }) => {
  return (
    <div className="advanced-filters bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Filter Documentation
      </h3>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Institution Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Institution Type
          </label>
          <MultiSelect
            options={institutionTypeOptions}
            value={filters.institutionType}
            onChange={(value) => onFilterChange('institutionType', value)}
            placeholder="All types"
          />
        </div>

        {/* Difficulty Level Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty Level
          </label>
          <MultiSelect
            options={difficultyOptions}
            value={filters.difficulty}
            onChange={(value) => onFilterChange('difficulty', value)}
            placeholder="All levels"
          />
        </div>

        {/* Content Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Type
          </label>
          <MultiSelect
            options={contentTypeOptions}
            value={filters.contentType}
            onChange={(value) => onFilterChange('contentType', value)}
            placeholder="All types"
          />
        </div>

        {/* Estimated Time Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimated Time
          </label>
          <Select
            options={timeRangeOptions}
            value={filters.estimatedTime}
            onChange={(value) => onFilterChange('estimatedTime', value)}
            placeholder="Any duration"
          />
        </div>

        {/* Tags Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <TagInput
            tags={filters.tags}
            onChange={(tags) => onFilterChange('tags', tags)}
            suggestions={tagSuggestions}
            placeholder="Add tags..."
          />
        </div>

        {/* Last Updated Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Updated
          </label>
          <Select
            options={updateTimeOptions}
            value={filters.lastUpdated}
            onChange={(value) => onFilterChange('lastUpdated', value)}
            placeholder="Any time"
          />
        </div>
      </div>

      {/* Filter Actions */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={onClearFilters}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Clear all filters
        </button>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">
            {filteredCount} results
          </span>
          <button
            onClick={onApplyFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
```

---

## 🧭 **Navigation Structure**

### **Main Navigation Component**
```tsx
const DocumentationNavigation = ({ currentPath }) => {
  return (
    <nav className="docs-navigation bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Main Nav */}
          <div className="flex items-center">
            <Link href="/docs" className="flex items-center">
              <img src="/logo.svg" alt="Sunny" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-semibold">Docs</span>
            </Link>
            
            <div className="hidden md:block ml-8">
              <div className="flex items-baseline space-x-4">
                {mainNavItems.map((item) => (
                  <NavItem
                    key={item.id}
                    item={item}
                    active={isActive(item.path, currentPath)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Search and User Menu */}
          <div className="flex items-center space-x-4">
            <QuickSearch />
            <ThemeToggle />
            <LanguageSelector />
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

const mainNavItems = [
  {
    id: 'getting_started',
    title: 'Getting Started',
    path: '/docs/getting-started',
    icon: 'rocket'
  },
  {
    id: 'api',
    title: 'API',
    path: '/docs/api',
    icon: 'code',
    badge: 'Interactive'
  },
  {
    id: 'integrations',
    title: 'Integrations',
    path: '/docs/integrations',
    icon: 'link'
  },
  {
    id: 'compliance',
    title: 'Compliance',
    path: '/docs/compliance',
    icon: 'shield',
    badge: 'Required'
  },
  {
    id: 'support',
    title: 'Support',
    path: '/docs/support',
    icon: 'support'
  }
];
```

### **Breadcrumb Navigation**
```tsx
const BreadcrumbNavigation = ({ path }) => {
  const breadcrumbs = generateBreadcrumbs(path);
  
  return (
    <nav className="breadcrumb-nav py-4 px-6 bg-gray-50 border-b border-gray-200">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link 
            href="/docs" 
            className="text-gray-500 hover:text-gray-700"
          >
            Documentation
          </Link>
        </li>
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            <ChevronRightIcon className="w-4 h-4 text-gray-400 mx-2" />
            {index === breadcrumbs.length - 1 ? (
              <span className="text-gray-900 font-medium">
                {crumb.title}
              </span>
            ) : (
              <Link 
                href={crumb.path}
                className="text-gray-500 hover:text-gray-700"
              >
                {crumb.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
```

### **Sidebar Navigation**
```tsx
const SidebarNavigation = ({ currentPath, collapsed }) => {
  return (
    <aside className={`sidebar-nav ${collapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 z-30 transition-all duration-200`}>
      <div className="h-full overflow-y-auto">
        {/* Navigation Sections */}
        {navigationSections.map((section) => (
          <NavigationSection
            key={section.id}
            section={section}
            currentPath={currentPath}
            collapsed={collapsed}
          />
        ))}
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Version 2.1.0
            </span>
            <button
              onClick={toggleCollapsed}
              className="p-1 rounded hover:bg-gray-100"
            >
              <ChevronLeftIcon className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

const NavigationSection = ({ section, currentPath, collapsed }) => {
  const [expanded, setExpanded] = useState(section.defaultExpanded);
  
  return (
    <div className="navigation-section">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
      >
        <div className="flex items-center">
          <span className="text-lg mr-3">{section.icon}</span>
          {!collapsed && (
            <span className="font-medium text-gray-900">
              {section.title}
            </span>
          )}
        </div>
        {!collapsed && (
          <ChevronDownIcon 
            className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} 
          />
        )}
      </button>
      
      {expanded && !collapsed && (
        <div className="pb-4">
          {section.items.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              currentPath={currentPath}
              level={0}
            />
          ))}
        </div>
      )}
    </div>
  );
};
```

---

## 📱 **Responsive Design**

### **Mobile-First Approach**
```scss
// Mobile Base Styles
.docs-page {
  @apply min-h-screen bg-gray-50;
  
  // Mobile Navigation
  .mobile-nav {
    @apply fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50;
    @apply md:hidden;
    
    .nav-items {
      @apply flex justify-around items-center h-16;
      
      .nav-item {
        @apply flex flex-col items-center justify-center flex-1;
        
        .icon {
          @apply w-6 h-6 mb-1;
        }
        
        .label {
          @apply text-xs text-gray-600;
        }
        
        &.active {
          @apply text-blue-600;
        }
      }
    }
  }
  
  // Tablet Adjustments
  @screen md {
    .mobile-nav {
      @apply hidden;
    }
    
    .sidebar-nav {
      @apply block;
    }
    
    .main-content {
      @apply ml-64;
    }
  }
  
  // Desktop Enhancements
  @screen lg {
    .docs-categories {
      .category-grid {
        @apply grid-cols-3;
      }
    }
    
    .search-results {
      @apply max-w-4xl;
    }
  }
  
  // Large Screen Optimizations
  @screen xl {
    .container {
      @apply max-w-7xl;
    }
    
    .sidebar-nav {
      @apply w-80;
    }
    
    .main-content {
      @apply ml-80;
    }
  }
}
```

### **Touch-Friendly Interactions**
```tsx
const TouchOptimizedComponent = () => {
  return (
    <div className="touch-optimized">
      {/* Larger Touch Targets */}
      <button className="min-h-12 min-w-12 p-3 touch-manipulation">
        Touch Button
      </button>
      
      {/* Swipe Gestures */}
      <div 
        className="swipeable"
        {...useSwipeGestures({
          onSwipeLeft: handleSwipeLeft,
          onSwipeRight: handleSwipeRight
        })}
      >
        Swipeable Content
      </div>
      
      {/* Pull to Refresh */}
      <div 
        className="pull-to-refresh"
        {...usePullToRefresh({
          onRefresh: handleRefresh
        })}
      >
        Refreshable Content
      </div>
    </div>
  );
};
```

---

## ⚡ **Component Implementation**

### **Performance Optimizations**
```tsx
// Lazy Loading Components
const LazySearchResults = lazy(() => import('./SearchResults'));
const LazyAdvancedFilters = lazy(() => import('./AdvancedFilters'));

// Virtualized Lists for Large Data Sets
const VirtualizedDocsList = ({ docs }) => {
  return (
    <FixedSizeList
      height={600}
      itemCount={docs.length}
      itemSize={80}
      itemData={docs}
    >
      {DocumentItem}
    </FixedSizeList>
  );
};

// Memoized Components
const MemoizedCategoryCard = memo(CategoryCard, (prevProps, nextProps) => {
  return (
    prevProps.category.id === nextProps.category.id &&
    prevProps.selected === nextProps.selected
  );
});

// Debounced Search
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
};
```

### **Accessibility Features**
```tsx
const AccessibleDocumentation = () => {
  return (
    <div className="docs-page" role="main" aria-label="Documentation">
      {/* Skip Navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50"
      >
        Skip to main content
      </a>
      
      {/* Semantic HTML */}
      <header role="banner">
        <h1 id="page-title">Sunny Institutions Documentation</h1>
      </header>
      
      <nav role="navigation" aria-label="Main navigation">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <a 
                href={item.href}
                aria-current={item.active ? 'page' : undefined}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <main id="main-content" tabIndex="-1">
        {/* Content */}
      </main>
      
      {/* ARIA Live Regions */}
      <div 
        id="announcements" 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      >
        {announcement}
      </div>
      
      {/* Focus Management */}
      <FocusManager
        initialFocus="#search-input"
        returnFocus={true}
      >
        {/* Interactive Content */}
      </FocusManager>
    </div>
  );
};
```

### **State Management**
```tsx
// Documentation State Context
const DocumentationContext = createContext();

export const DocumentationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(documentationReducer, initialState);
  
  const value = {
    ...state,
    actions: {
      setInstitutionType: (type) => 
        dispatch({ type: 'SET_INSTITUTION_TYPE', payload: type }),
      updateFilters: (filters) => 
        dispatch({ type: 'UPDATE_FILTERS', payload: filters }),
      setSearchQuery: (query) => 
        dispatch({ type: 'SET_SEARCH_QUERY', payload: query }),
      toggleSidebar: () => 
        dispatch({ type: 'TOGGLE_SIDEBAR' }),
      setTheme: (theme) => 
        dispatch({ type: 'SET_THEME', payload: theme })
    }
  };
  
  return (
    <DocumentationContext.Provider value={value}>
      {children}
    </DocumentationContext.Provider>
  );
};

// Custom Hooks
export const useDocumentation = () => {
  const context = useContext(DocumentationContext);
  if (!context) {
    throw new Error('useDocumentation must be used within DocumentationProvider');
  }
  return context;
};

export const useSearchResults = (query, filters) => {
  return useQuery({
    queryKey: ['searchResults', query, filters],
    queryFn: () => searchDocumentation(query, filters),
    enabled: query.length > 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000 // 10 minutes
  });
};
```

---

This comprehensive design specification provides a complete blueprint for building the Sunny Institutions /docs page with all necessary components, interactions, and features to create an exceptional documentation experience for financial institutions.
