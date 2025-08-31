/**
 * Kenya Tax Calculator Utilities
 * Handles all Kenya-specific tax calculations according to KRA regulations
 */

import {
  KenyaTaxCalculation,
  KenyaTransactionContext,
  KenyaBusinessType,
  MPesaTaxDetails,
  KENYA_TAX_RATES
} from '@/types/kenya-tax';

export class KenyaTaxCalculator {
  private static readonly KES_TO_USD_RATE = 150; // Approximate rate - should be fetched from API
  private static readonly VAT_EXEMPT_ITEMS = [
    'medical supplies',
    'basic food items',
    'educational materials',
    'agricultural inputs'
  ];

  /**
   * Calculate VAT for Kenya transactions
   */
  static calculateVAT(
    amount: number,
    context: KenyaTransactionContext,
    exemptionReason?: string
  ) {
    // Check for exemptions
    if (exemptionReason && this.VAT_EXEMPT_ITEMS.includes(exemptionReason.toLowerCase())) {
      return {
        rate: 0,
        amount: 0,
        type: 'exempt' as const,
        exemptionReason
      };
    }

    // Zero-rated for exports
    if (context.customerLocation === 'international' && context.transactionType === 'export') {
      return {
        rate: 0,
        amount: 0,
        type: 'zero-rated' as const
      };
    }

    // Standard VAT rate
    const vatRate = KENYA_TAX_RATES.vat.standard;
    const vatAmount = (amount * vatRate) / 100;

    return {
      rate: vatRate,
      amount: vatAmount,
      type: 'standard' as const
    };
  }

  /**
   * Calculate Withholding Tax
   */
  static calculateWithholdingTax(
    amount: number,
    serviceType: keyof typeof KENYA_TAX_RATES.withholding,
    isResident: boolean = true
  ) {
    let rate = KENYA_TAX_RATES.withholding[serviceType];

    // Non-residents have different rates for some services
    if (!isResident && serviceType === 'digitalServices') {
      rate = 20; // 20% for non-resident digital services
    }

    const taxAmount = (amount * rate) / 100;

    return {
      rate,
      amount: taxAmount,
      type: serviceType
    };
  }

  /**
   * Calculate M-Pesa transaction taxes
   */
  static calculateMPesaTax(transactionAmount: number): MPesaTaxDetails {
    const exciseDuty = KENYA_TAX_RATES.excise.mobileMoneyTransfer; // Fixed KES 15
    const vatOnExcise = (exciseDuty * KENYA_TAX_RATES.vat.standard) / 100; // 16% of excise
    const totalTax = exciseDuty + vatOnExcise;
    
    // Typical M-Pesa charges (simplified)
    const operatorFee = this.calculateMPesaFee(transactionAmount);
    const customerCharge = operatorFee + totalTax;
    const netAmount = transactionAmount - customerCharge;

    return {
      transactionAmount,
      exciseDuty,
      vatOnExcise,
      totalTax,
      netAmount,
      operatorFee,
      customerCharge
    };
  }

  /**
   * Calculate M-Pesa operator fees (simplified structure)
   */
  private static calculateMPesaFee(amount: number): number {
    if (amount <= 100) return 0;
    if (amount <= 500) return 7;
    if (amount <= 1000) return 13;
    if (amount <= 1500) return 23;
    if (amount <= 2500) return 33;
    if (amount <= 3500) return 53;
    if (amount <= 5000) return 57;
    if (amount <= 7500) return 78;
    if (amount <= 10000) return 90;
    if (amount <= 15000) return 108;
    if (amount <= 20000) return 135;
    if (amount <= 35000) return 137;
    if (amount <= 50000) return 185;
    return 300; // For amounts above 50,000
  }

  /**
   * Calculate Digital Service Tax (DST)
   */
  static calculateDigitalServiceTax(
    grossIncome: number,
    isResident: boolean = true
  ) {
    // DST only applies to non-residents or specific digital services
    if (isResident) {
      return {
        rate: 0,
        amount: 0,
        applicable: false
      };
    }

    // Check if income exceeds threshold
    const threshold = KENYA_TAX_RATES.digitalServiceTax.threshold;
    if (grossIncome < threshold) {
      return {
        rate: 0,
        amount: 0,
        applicable: false
      };
    }

    const rate = KENYA_TAX_RATES.digitalServiceTax.rate;
    const amount = (grossIncome * rate) / 100;

    return {
      rate,
      amount,
      applicable: true
    };
  }

  /**
   * Calculate PAYE (Pay As You Earn) tax
   */
  static calculatePAYE(monthlyIncome: number): number {
    let totalTax = 0;
    let remainingIncome = monthlyIncome;

    for (const band of KENYA_TAX_RATES.paye.bands) {
      if (remainingIncome <= 0) break;

      const bandMin = band.min;
      const bandMax = band.max || Infinity;
      const bandWidth = Math.min(remainingIncome, bandMax - bandMin + 1);

      if (bandWidth > 0) {
        const taxOnBand = (bandWidth * band.rate) / 100;
        totalTax += taxOnBand;
        remainingIncome -= bandWidth;
      }
    }

    return totalTax;
  }

  /**
   * Comprehensive Kenya tax calculation
   */
  static calculateComprehensiveTax(
    amount: number,
    context: KenyaTransactionContext,
    business: KenyaBusinessType,
    exemptionReason?: string
  ): KenyaTaxCalculation {
    const calculation: KenyaTaxCalculation = {
      grossAmount: amount,
      netAmount: amount,
      currency: 'KES',
      taxes: {},
      breakdown: {
        subtotal: amount,
        totalTax: 0,
        finalAmount: amount
      },
      compliance: {
        kraCompliant: true,
        receiptRequired: context.requiresReceipt,
        reportingRequired: context.isB2B || amount > 50000 // Threshold for reporting
      }
    };

    // Calculate VAT if applicable
    if (business.vatRegistered && context.transactionType !== 'transfer') {
      const vat = this.calculateVAT(amount, context, exemptionReason);
      calculation.taxes.vat = vat;
      calculation.breakdown.totalTax += vat.amount;
    }

    // Calculate Withholding Tax for services
    if (context.transactionType === 'service' && context.isB2B) {
      const withholding = this.calculateWithholdingTax(
        amount,
        'professionalServices',
        business.category === 'resident'
      );
      calculation.taxes.withholding = withholding;
      calculation.breakdown.totalTax += withholding.amount;
    }

    // Calculate Digital Service Tax for digital services
    if (context.transactionType === 'digital') {
      const dst = this.calculateDigitalServiceTax(
        amount,
        business.category === 'resident'
      );
      if (dst.applicable) {
        calculation.taxes.digitalServiceTax = dst;
        calculation.breakdown.totalTax += dst.amount;
      }
    }

    // Calculate Excise Duty for mobile money
    if (context.paymentMethod === 'mpesa') {
      const mpesaTax = this.calculateMPesaTax(amount);
      calculation.taxes.excise = {
        rate: 15, // Fixed rate for mobile money
        amount: mpesaTax.totalTax,
        type: 'mobileMoneyTransfer'
      };
      calculation.breakdown.totalTax += mpesaTax.totalTax;
    }

    // Calculate final amounts
    calculation.breakdown.finalAmount = calculation.breakdown.subtotal + calculation.breakdown.totalTax;
    calculation.netAmount = calculation.breakdown.finalAmount;

    // Set compliance requirements
    calculation.compliance.receiptRequired = 
      context.requiresReceipt || 
      calculation.breakdown.totalTax > 0 || 
      amount > 10000;

    calculation.compliance.reportingRequired = 
      context.isB2B || 
      amount > 50000 || 
      calculation.taxes.withholding !== undefined;

    // Set filing deadline based on tax types
    if (calculation.taxes.vat) {
      calculation.compliance.filingDeadline = this.getNextVATDeadline();
    }

    return calculation;
  }

  /**
   * Get next VAT filing deadline
   */
  private static getNextVATDeadline(): string {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // VAT is due by 20th of the following month
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    
    return new Date(nextYear, nextMonth, 20).toISOString().split('T')[0];
  }

  /**
   * Format currency in KES
   */
  static formatKES(amount: number): string {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 2
    }).format(amount);
  }

  /**
   * Convert KES to other currencies (simplified)
   */
  static convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
    // Simplified conversion - in production, use real-time rates
    if (fromCurrency === 'KES' && toCurrency === 'USD') {
      return amount / this.KES_TO_USD_RATE;
    }
    if (fromCurrency === 'USD' && toCurrency === 'KES') {
      return amount * this.KES_TO_USD_RATE;
    }
    return amount; // Same currency or unsupported conversion
  }

  /**
   * Validate KRA PIN format
   */
  static validateKRAPin(pin: string): boolean {
    // KRA PIN format: A000000000A (Letter + 9 digits + Letter)
    const kraPattern = /^[A-Z]\d{9}[A-Z]$/;
    return kraPattern.test(pin);
  }

  /**
   * Generate tax summary for reporting
   */
  static generateTaxSummary(calculations: KenyaTaxCalculation[]): {
    totalGross: number;
    totalVAT: number;
    totalWithholding: number;
    totalExcise: number;
    totalDST: number;
    totalNet: number;
    transactionCount: number;
  } {
    return calculations.reduce((summary, calc) => ({
      totalGross: summary.totalGross + calc.grossAmount,
      totalVAT: summary.totalVAT + (calc.taxes.vat?.amount || 0),
      totalWithholding: summary.totalWithholding + (calc.taxes.withholding?.amount || 0),
      totalExcise: summary.totalExcise + (calc.taxes.excise?.amount || 0),
      totalDST: summary.totalDST + (calc.taxes.digitalServiceTax?.amount || 0),
      totalNet: summary.totalNet + calc.netAmount,
      transactionCount: summary.transactionCount + 1
    }), {
      totalGross: 0,
      totalVAT: 0,
      totalWithholding: 0,
      totalExcise: 0,
      totalDST: 0,
      totalNet: 0,
      transactionCount: 0
    });
  }
}
