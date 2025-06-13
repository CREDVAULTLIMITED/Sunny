/**
 * ReceiptService.js
 * Handles generation and management of payment receipts
 */

import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import { format } from 'date-fns';
import { formatCryptoAmount, formatAddress } from '../utils/formatters';
import config from '../config/config';

class ReceiptService {
  constructor() {
    this.iconPaths = {
      BTC: '/assets/logos/bitcoin.svg',
      ETH: '/assets/logos/ethereum.svg',
      USDT: '/assets/logos/tether.svg',
      USDC: '/assets/logos/usdc.svg',
      VISA: '/assets/logos/visa.svg',
      MASTERCARD: '/assets/logos/mastercard.svg',
      PAYPAL: '/assets/logos/paypal.svg',
      APPLEPAY: '/assets/logos/apple-pay.svg',
      GOOGLEPAY: '/assets/logos/google-pay.svg'
    };
  }

  /**
   * Generate PDF receipt for a payment
   */
  async generatePDFReceipt(payment, options = {}) {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      info: {
        Title: `Payment Receipt - ${payment.transactionId}`,
        Author: 'Sunny Payment Gateway',
        Subject: 'Payment Receipt'
      }
    });

    // Add company logo and header
    await this.addHeader(doc, payment);

    // Add payment details
    await this.addPaymentDetails(doc, payment);

    // Add merchant details
    await this.addMerchantDetails(doc, payment);

    // Add payment method details with icon
    await this.addPaymentMethodDetails(doc, payment);

    // Add QR code with payment verification
    if (payment.currency.startsWith('crypto_')) {
      await this.addBlockchainVerification(doc, payment);
    }

    // Add footer with terms and support info
    await this.addFooter(doc, payment);

    return doc;
  }

  /**
   * Generate HTML receipt for web/email
   */
  async generateHTMLReceipt(payment, format = 'web') {
    const template = await this.getReceiptTemplate(format);
    const data = await this.prepareReceiptData(payment);
    return template(data);
  }

  /**
   * Add header to PDF receipt
   */
  async addHeader(doc, payment) {
    // Add company logo
    doc.image('/assets/logos/sunny-logo.svg', 50, 45, { width: 120 });

    // Add receipt title and date
    doc.fontSize(20)
       .text('Payment Receipt', 200, 60)
       .fontSize(10)
       .text(`Date: ${format(new Date(payment.createdAt), 'PPpp')}`, 200, 80)
       .text(`Receipt No: ${payment.receiptNumber}`, 200, 95)
       .moveDown();
  }

  /**
   * Add payment details to PDF receipt
   */
  async addPaymentDetails(doc, payment) {
    doc.fontSize(12)
       .text('Payment Details', 50, 150)
       .moveDown(0.5);

    const details = [
      ['Transaction ID:', payment.transactionId],
      ['Amount:', this.formatAmount(payment)],
      ['Status:', this.formatStatus(payment.status)],
      ['Date:', format(new Date(payment.createdAt), 'PPpp')],
      ['Payment Method:', this.formatPaymentMethod(payment)]
    ];

    if (payment.fiatAmount) {
      details.push(['Converted Amount:', `${payment.fiatAmount} ${payment.fiatCurrency}`]);
      details.push(['Conversion Rate:', `1 ${payment.currency} = ${payment.conversionRate} ${payment.fiatCurrency}`]);
    }

    let y = 170;
    details.forEach(([label, value]) => {
      doc.fontSize(10)
         .text(label, 70, y, { width: 150 })
         .text(value, 220, y)
         .moveDown(0.5);
      y += 20;
    });
  }

  /**
   * Add merchant details to PDF receipt
   */
  async addMerchantDetails(doc, payment) {
    doc.fontSize(12)
       .text('Merchant Details', 50, 320)
       .moveDown(0.5);

    const merchant = await this.getMerchantDetails(payment.merchantId);
    const details = [
      ['Business Name:', merchant.businessName],
      ['Address:', merchant.address],
      ['Contact:', merchant.contact],
      ['Registration No:', merchant.registrationNumber]
    ];

    let y = 340;
    details.forEach(([label, value]) => {
      doc.fontSize(10)
         .text(label, 70, y, { width: 150 })
         .text(value, 220, y)
         .moveDown(0.5);
      y += 20;
    });
  }

  /**
   * Add payment method details with icon to PDF receipt
   */
  async addPaymentMethodDetails(doc, payment) {
    const iconPath = this.getPaymentMethodIcon(payment);
    if (iconPath) {
      doc.image(iconPath, 50, 460, { width: 40 });
    }

    doc.fontSize(12)
       .text('Payment Method Details', 100, 460)
       .moveDown(0.5);

    const details = this.getPaymentMethodDetails(payment);
    let y = 480;
    details.forEach(([label, value]) => {
      doc.fontSize(10)
         .text(label, 120, y, { width: 150 })
         .text(value, 270, y)
         .moveDown(0.5);
      y += 20;
    });
  }

  /**
   * Add blockchain verification QR code for crypto payments
   */
  async addBlockchainVerification(doc, payment) {
    const verificationUrl = this.getBlockchainVerificationUrl(payment);
    const qrCode = await QRCode.toDataURL(verificationUrl);

    doc.image(qrCode, 50, 600, { width: 100 })
       .fontSize(10)
       .text('Scan to verify on blockchain', 160, 640);
  }

  /**
   * Add footer with terms and support info
   */
  async addFooter(doc, payment) {
    doc.fontSize(8)
       .text('This is an official receipt from Sunny Payment Gateway.', 50, 750)
       .text(`For support, contact ${config.support.email} or call ${config.support.phone}`, 50, 765)
       .text(`Receipt generated on ${format(new Date(), 'PPpp')}`, 50, 780);
  }

  /**
   * Format amount with currency symbol
   */
  formatAmount(payment) {
    if (payment.currency.startsWith('crypto_')) {
      return `${formatCryptoAmount(payment.amount, payment.currency)} ${payment.currency}`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: payment.currency
    }).format(payment.amount);
  }

  /**
   * Format payment status with color coding
   */
  formatStatus(status) {
    const statusColors = {
      SUCCESS: '#4CAF50',
      PENDING: '#FFC107',
      FAILED: '#F44336'
    };
    return {
      text: status,
      color: statusColors[status] || '#000000'
    };
  }

  /**
   * Get payment method icon path
   */
  getPaymentMethodIcon(payment) {
    if (payment.paymentMethodType === 'CARD') {
      return this.iconPaths[payment.card.brand.toUpperCase()];
    }
    if (payment.paymentMethodType === 'CRYPTO') {
      return this.iconPaths[payment.currency];
    }
    return this.iconPaths[payment.paymentMethodType];
  }

  /**
   * Get payment method details for display
   */
  getPaymentMethodDetails(payment) {
    if (payment.paymentMethodType === 'CARD') {
      return [
        ['Card Type:', payment.card.brand],
        ['Last 4 Digits:', payment.card.last4],
        ['Expiry:', `${payment.card.expMonth}/${payment.card.expYear}`]
      ];
    }
    if (payment.paymentMethodType === 'CRYPTO') {
      return [
        ['Currency:', payment.currency],
        ['Network:', this.getNetworkName(payment.currency)],
        ['From Address:', formatAddress(payment.fromAddress)],
        ['To Address:', formatAddress(payment.toAddress)]
      ];
    }
    return [
      ['Method:', payment.paymentMethodType],
      ['Provider:', payment.provider]
    ];
  }

  /**
   * Get blockchain verification URL
   */
  getBlockchainVerificationUrl(payment) {
    const explorers = {
      BTC: 'https://blockchain.info/tx/',
      ETH: 'https://etherscan.io/tx/',
      USDT: 'https://etherscan.io/tx/',
      USDC: 'https://etherscan.io/tx/'
    };
    return `${explorers[payment.currency]}${payment.blockchainTxId}`;
  }

  /**
   * Get network name for crypto payments
   */
  getNetworkName(currency) {
    const networks = {
      BTC: 'Bitcoin',
      ETH: 'Ethereum',
      USDT: 'Ethereum (ERC-20)',
      USDC: 'Ethereum (ERC-20)'
    };
    return networks[currency] || currency;
  }

  /**
   * Get merchant details
   */
  async getMerchantDetails(merchantId) {
    // This would fetch merchant details from your database
    // For now returning placeholder data
    return {
      businessName: 'Sample Business',
      address: '123 Business St, City, Country',
      contact: 'contact@business.com',
      registrationNumber: 'REG123456'
    };
  }
}

export default new ReceiptService();
