/**
 * Kenya-specific tax types and interfaces
 * Based on Kenya Revenue Authority (KRA) regulations
 */

export interface KenyaTaxRates {
  vat: {
    standard: number; // 16%
    zeroRated: number; // 0%
    exempt: boolean;
  };
  withholding: {
    professionalServices: number; // 5%
    digitalServices: number; // 20% for non-residents
    dividends: number; // 5%
    interest: number; // 15%
    royalties: number; // 20%
    rent: number; // 10%
  };
  excise: {
    mobileMoneyTransfer: number; // KES 15 per transaction
    airtime: number; // 15%
    internetData: number; // 15%
  };
  corporate: {
    standard: number; // 30%
    manufacturing: number; // 25% (under certain conditions)
    insurance: number; // 30%
  };
  digitalServiceTax: {
    rate: number; // 1.5%
    threshold: number; // KES 1 million annually
  };
  paye: {
    bands: PayeBand[];
  };
}

export interface PayeBand {
  min: number;
  max: number | null;
  rate: number;
  description: string;
}

export interface KRAIntegrationStatus {
  iTax: {
    connected: boolean;
    lastSync: string;
    status: 'active' | 'error' | 'maintenance';
  };
  eTIMS: {
    connected: boolean;
    deviceRegistered: boolean;
    lastReceipt: string;
    status: 'active' | 'error' | 'maintenance';
  };
  pinValidation: {
    available: boolean;
    responseTime: number;
    status: 'active' | 'error' | 'maintenance';
  };
}

export interface KenyaTaxCalculation {
  grossAmount: number;
  netAmount: number;
  currency: 'KES' | 'USD' | 'EUR';
  taxes: {
    vat?: {
      rate: number;
      amount: number;
      type: 'standard' | 'zero-rated' | 'exempt';
    };
    withholding?: {
      rate: number;
      amount: number;
      type: keyof KenyaTaxRates['withholding'];
    };
    excise?: {
      rate: number;
      amount: number;
      type: keyof KenyaTaxRates['excise'];
    };
    digitalServiceTax?: {
      rate: number;
      amount: number;
      applicable: boolean;
    };
  };
  breakdown: {
    subtotal: number;
    totalTax: number;
    finalAmount: number;
  };
  compliance: {
    kraCompliant: boolean;
    receiptRequired: boolean;
    reportingRequired: boolean;
    filingDeadline?: string;
  };
}

export interface KenyaBusinessType {
  type: 'individual' | 'partnership' | 'company' | 'trust' | 'ngo' | 'government';
  category: 'resident' | 'non-resident';
  sector?: 'manufacturing' | 'agriculture' | 'services' | 'mining' | 'other';
  registrationNumber?: string;
  kraPin: string;
  vatRegistered: boolean;
  payeEmployer: boolean;
}

export interface KenyaTransactionContext {
  transactionType: 'sale' | 'service' | 'digital' | 'import' | 'export' | 'transfer';
  customerType: 'individual' | 'business' | 'government';
  customerLocation: 'kenya' | 'eac' | 'international'; // EAC = East African Community
  paymentMethod: 'cash' | 'mpesa' | 'bank' | 'card' | 'crypto' | 'other';
  isB2B: boolean;
  isB2C: boolean;
  requiresReceipt: boolean;
  exemptionReason?: string;
}

export interface MPesaTaxDetails {
  transactionAmount: number;
  exciseDuty: number; // Fixed KES 15
  vatOnExcise: number; // 16% of excise duty
  totalTax: number;
  netAmount: number;
  operatorFee: number;
  customerCharge: number;
}

export interface EastAfricanCountry {
  code: string;
  name: string;
  currency: string;
  taxSystem: 'vat' | 'gst' | 'sales_tax';
  standardRate: number;
  kraEquivalent: string; // Tax authority name
  integrationStatus: 'live' | 'development' | 'planned';
  launchTimeline?: string;
}

export interface KenyaTaxReport {
  reportType: 'vat' | 'paye' | 'withholding' | 'excise' | 'corporate';
  period: {
    start: string;
    end: string;
    frequency: 'monthly' | 'quarterly' | 'annual';
  };
  totals: {
    grossSales: number;
    taxableAmount: number;
    taxDue: number;
    taxPaid: number;
    balance: number;
  };
  transactions: KenyaTaxCalculation[];
  filingStatus: 'draft' | 'submitted' | 'accepted' | 'rejected';
  submissionDate?: string;
  kraReference?: string;
}

// Current Kenya tax rates (as of 2024)
export const KENYA_TAX_RATES: KenyaTaxRates = {
  vat: {
    standard: 16,
    zeroRated: 0,
    exempt: false
  },
  withholding: {
    professionalServices: 5,
    digitalServices: 20,
    dividends: 5,
    interest: 15,
    royalties: 20,
    rent: 10
  },
  excise: {
    mobileMoneyTransfer: 15, // Fixed amount in KES
    airtime: 15,
    internetData: 15
  },
  corporate: {
    standard: 30,
    manufacturing: 25,
    insurance: 30
  },
  digitalServiceTax: {
    rate: 1.5,
    threshold: 1000000 // KES 1 million
  },
  paye: {
    bands: [
      { min: 0, max: 24000, rate: 10, description: 'First KES 24,000' },
      { min: 24001, max: 32333, rate: 25, description: 'Next KES 8,333' },
      { min: 32334, max: null, rate: 30, description: 'Excess over KES 32,333' }
    ]
  }
};

// East African expansion countries
export const EAST_AFRICAN_COUNTRIES: EastAfricanCountry[] = [
  {
    code: 'UG',
    name: 'Uganda',
    currency: 'UGX',
    taxSystem: 'vat',
    standardRate: 18,
    kraEquivalent: 'URA (Uganda Revenue Authority)',
    integrationStatus: 'planned',
    launchTimeline: 'Q3 2024'
  },
  {
    code: 'TZ',
    name: 'Tanzania',
    currency: 'TZS',
    taxSystem: 'vat',
    standardRate: 18,
    kraEquivalent: 'TRA (Tanzania Revenue Authority)',
    integrationStatus: 'planned',
    launchTimeline: 'Q4 2024'
  },
  {
    code: 'RW',
    name: 'Rwanda',
    currency: 'RWF',
    taxSystem: 'vat',
    standardRate: 18,
    kraEquivalent: 'RRA (Rwanda Revenue Authority)',
    integrationStatus: 'planned',
    launchTimeline: 'Q1 2025'
  },
  {
    code: 'ET',
    name: 'Ethiopia',
    currency: 'ETB',
    taxSystem: 'vat',
    standardRate: 15,
    kraEquivalent: 'ERCA (Ethiopian Revenues and Customs Authority)',
    integrationStatus: 'planned',
    launchTimeline: 'Q2 2025'
  }
];
