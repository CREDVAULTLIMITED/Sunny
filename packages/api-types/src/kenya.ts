/**
 * Kenya-specific TypeScript types
 */

// KRA (Kenya Revenue Authority) Types
export interface KRAPinValidationRequest {
  pin: string;
  requestId?: string;
}

export interface KRAPinValidationResponse {
  isValid: boolean;
  pin: string;
  taxpayerName?: string;
  taxpayerType?: 'individual' | 'company' | 'partnership' | 'trust';
  registrationDate?: string;
  status?: 'active' | 'inactive' | 'suspended';
  validationId: string;
  timestamp: string;
}

// eTIMS (Electronic Tax Invoice Management System) Types
export interface ETIMSInvoiceRequest {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate?: string;
  seller: ETIMSEntity;
  buyer: ETIMSEntity;
  items: ETIMSInvoiceItem[];
  subtotal: number;
  totalVAT: number;
  totalAmount: number;
  currency: string;
  paymentMethod?: string;
  reference?: string;
}

export interface ETIMSEntity {
  pin: string;
  name: string;
  address: string;
  telephone?: string;
  email?: string;
}

export interface ETIMSInvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  taxType: 'VAT' | 'EXEMPT' | 'ZERO_RATED';
  taxRate: number;
  taxAmount: number;
  exemptionReason?: string;
}

export interface ETIMSInvoiceResponse {
  success: boolean;
  invoiceNumber: string;
  etimsReference?: string;
  qrCode?: string;
  digitalSignature?: string;
  submissionDate?: string;
  status: 'submitted' | 'approved' | 'rejected';
  verificationUrl?: string;
  errors: string[];
}

// iTax Types
export interface ITaxReturnRequest {
  taxpayerPIN: string;
  period: string; // YYYY-MM format
  returnType: 'VAT' | 'PAYE' | 'WHT' | 'CORPORATE';
  returnData: Record<string, any>;
}

export interface ITaxReturnResponse {
  success: boolean;
  referenceNumber?: string;
  submissionDate?: string;
  status: 'submitted' | 'processed' | 'rejected';
  acknowledgmentNumber?: string;
  errors: string[];
}

// Tax Rates
export interface TaxRatesResponse {
  vat: {
    standard: number;
    zeroRated: number;
    exempt: number;
  };
  withholding: {
    professionalServices: number;
    digitalServices: number;
    management: number;
    dividends: number;
    interest: number;
    royalties: number;
  };
  digitalServiceTax: {
    rate: number;
    threshold: number;
  };
  excise: {
    mobileMoneyTransfer: number;
    bankTransfer: number;
  };
  lastUpdated: string;
  effectiveDate: string;
}

// M-Pesa Types
export interface MPesaSTKPushRequest {
  phoneNumber: string;
  amount: number;
  accountReference: string;
  transactionDesc: string;
  callbackUrl?: string;
}

export interface MPesaSTKPushResponse {
  success: boolean;
  merchantRequestID?: string;
  checkoutRequestID?: string;
  responseCode?: string;
  responseDescription?: string;
  customerMessage?: string;
  errorCode?: string;
  errorMessage?: string;
}

export interface MPesaC2BRequest {
  shortCode: string;
  commandID: 'CustomerPayBillOnline' | 'CustomerBuyGoodsOnline';
  amount: number;
  msisdn: string;
  billRefNumber?: string;
  accountNumber?: string;
}

export interface MPesaB2CRequest {
  initiatorName: string;
  securityCredential: string;
  commandID: 'BusinessPayment' | 'SalaryPayment' | 'PromotionPayment';
  amount: number;
  partyA: string;
  partyB: string;
  remarks: string;
  queueTimeOutURL: string;
  resultURL: string;
  occasion?: string;
}

export interface MPesaTransactionStatusRequest {
  transactionID: string;
  identifierType: 'MSISDN' | 'TILL_NUMBER' | 'ORGANIZATION_SHORT_CODE';
  partyA: string;
  remarks: string;
  initiator: string;
  securityCredential: string;
  queueTimeOutURL: string;
  resultURL: string;
}

export interface MPesaCallback {
  Body: {
    stkCallback?: {
      MerchantRequestID: string;
      CheckoutRequestID: string;
      ResultCode: number;
      ResultDesc: string;
      CallbackMetadata?: {
        Item: Array<{
          Name: string;
          Value: any;
        }>;
      };
    };
    CallbackMetadata?: {
      Item: Array<{
        Name: string;
        Value: any;
      }>;
    };
  };
}

// Tax Calculation Types
export interface KenyaTaxCalculationRequest {
  amount: number;
  currency: string;
  transactionType: 'goods' | 'services' | 'digital' | 'transfer';
  customerLocation: 'kenya' | 'international';
  isB2B: boolean;
  exemptionReason?: string;
  paymentMethod?: string;
}

export interface KenyaTaxCalculationResponse {
  grossAmount: number;
  netAmount: number;
  currency: string;
  taxes: {
    vat?: TaxComponent;
    withholding?: TaxComponent;
    digitalServiceTax?: TaxComponent;
    excise?: TaxComponent;
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

export interface TaxComponent {
  rate: number;
  amount: number;
  type: string;
  applicable?: boolean;
}

// Business Types
export interface KenyaBusinessType {
  category: 'resident' | 'non-resident';
  vatRegistered: boolean;
  pinNumber: string;
  businessType: 'individual' | 'company' | 'partnership' | 'trust';
}

export interface KenyaTransactionContext {
  transactionType: 'goods' | 'services' | 'digital' | 'transfer' | 'export';
  customerLocation: 'kenya' | 'international';
  isB2B: boolean;
  requiresReceipt: boolean;
  paymentMethod?: 'mpesa' | 'card' | 'bank_transfer';
}

// M-Pesa Tax Details
export interface MPesaTaxDetails {
  transactionAmount: number;
  exciseDuty: number;
  vatOnExcise: number;
  totalTax: number;
  netAmount: number;
  operatorFee: number;
  customerCharge: number;
}

// Banking Types
export interface KenyaBankAccount {
  bankCode: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  branchCode?: string;
  swiftCode?: string;
  currency: 'KES' | 'USD' | 'EUR' | 'GBP';
}

export interface PesaLinkTransferRequest {
  senderAccount: KenyaBankAccount;
  receiverAccount: KenyaBankAccount;
  amount: number;
  currency: 'KES';
  reference: string;
  narration: string;
}

export interface PesaLinkTransferResponse {
  success: boolean;
  transactionId?: string;
  referenceNumber?: string;
  status: 'pending' | 'completed' | 'failed';
  fees?: number;
  exchangeRate?: number;
  errorCode?: string;
  errorMessage?: string;
}

// Compliance Types
export interface CBKReportingData {
  reportingPeriod: string;
  institutionCode: string;
  transactionData: Array<{
    transactionId: string;
    amount: number;
    currency: string;
    transactionType: string;
    customerType: 'individual' | 'corporate';
    crossBorder: boolean;
  }>;
}

export interface DataProtectionCompliance {
  dataSubjectConsent: boolean;
  dataMinimization: boolean;
  purposeLimitation: boolean;
  retentionPeriod: number;
  dataSubjectRights: {
    access: boolean;
    rectification: boolean;
    erasure: boolean;
    portability: boolean;
  };
}

export interface AMLCFTCompliance {
  customerDueDiligence: boolean;
  enhancedDueDiligence: boolean;
  suspiciousTransactionReporting: boolean;
  recordKeeping: boolean;
  staffTraining: boolean;
  riskAssessment: {
    customerRisk: 'low' | 'medium' | 'high';
    productRisk: 'low' | 'medium' | 'high';
    geographicRisk: 'low' | 'medium' | 'high';
    deliveryChannelRisk: 'low' | 'medium' | 'high';
  };
}

// Receipt Types
export interface KenyaReceiptData {
  receiptNumber: string;
  transactionId: string;
  invoiceNumber?: string;
  etimsReference?: string;
  issueDate: string;
  merchant: {
    name: string;
    pin: string;
    address: string;
    telephone: string;
    email: string;
  };
  customer: {
    name: string;
    pin?: string;
    address?: string;
    telephone?: string;
    email?: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    taxRate: number;
    taxAmount: number;
  }>;
  totals: {
    subtotal: number;
    totalVAT: number;
    totalAmount: number;
  };
  paymentMethod: string;
  qrCode?: string;
  digitalSignature?: string;
}

// Constants
export const KENYA_TAX_RATES = {
  vat: {
    standard: 16,
    zeroRated: 0,
    exempt: 0
  },
  withholding: {
    professionalServices: 5,
    digitalServices: 20,
    management: 20,
    dividends: 5,
    interest: 15,
    royalties: 20
  },
  digitalServiceTax: {
    rate: 1.5,
    threshold: 3000000 // KES 3M annually
  },
  excise: {
    mobileMoneyTransfer: 15, // KES 15 flat rate
    bankTransfer: 0
  },
  paye: {
    bands: [
      { min: 0, max: 24000, rate: 10 },
      { min: 24001, max: 32333, rate: 25 },
      { min: 32334, max: null, rate: 30 }
    ]
  }
} as const;

export const KENYA_BANK_CODES = {
  'KCB': '01',
  'EQUITY': '68',
  'COOPERATIVE': '11',
  'ABSA': '03',
  'STANDARD_CHARTERED': '02',
  'FAMILY': '70',
  'DIAMOND_TRUST': '63',
  'NCBA': '07',
  'I&M': '57',
  'STANBIC': '31'
} as const;

export const MPESA_PROVIDERS = {
  SAFARICOM: {
    shortCode: '174379',
    consumerKey: process.env.MPESA_CONSUMER_KEY,
    consumerSecret: process.env.MPESA_CONSUMER_SECRET,
    passkey: process.env.MPESA_PASSKEY,
    environment: process.env.MPESA_ENVIRONMENT || 'sandbox'
  }
} as const;
