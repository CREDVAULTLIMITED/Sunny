/**
 * PaymentOrchestrator.js
 * Core payment processing engine for Sunny Payment Gateway
 */

import { validatePaymentMethod } from '../api/validation';
import { encryptSensitiveData } from '../security/encryption';
import { detectFraud } from '../security/enhancedFraudDetection';
import { PAYMENT_METHODS, PAYMENT_STATUS } from './constants';
import ReceiptService from '../services/ReceiptService';

class PaymentOrchestrator {
  constructor() {
    this.processors = {
      CARD: new CardPaymentProcessor(),
      MOBILE_MONEY: new MobileMoneyProcessor(),
      BANK_TRANSFER: new BankTransferProcessor(),
      CRYPTO: new CryptoPaymentProcessor(),
      QR: new QRPaymentProcessor()
    };
  }

  /**
   * Process a payment using the appropriate processor
   */
  async processPayment(paymentRequest) {
    try {
      // 1. Pre-processing checks
      await this.performPreProcessingChecks(paymentRequest);

      // 2. Select appropriate processor
      const processor = this.getProcessor(paymentRequest.paymentMethod);
      
      // 3. Process payment
      const paymentResult = await processor.process(paymentRequest);

      // 4. Post-processing tasks
      await this.handlePostProcessing(paymentResult);

      return paymentResult;
    } catch (error) {
      throw this.handleProcessingError(error);
    }
  }

  /**
   * Perform pre-processing checks
   */
  async performPreProcessingChecks(request) {
    // Validate amount and currency
    if (!this.isValidAmount(request.amount) || !this.isValidCurrency(request.currency)) {
      throw new Error('Invalid amount or currency');
    }

    // Check for fraud
    const fraudCheck = await detectFraud(request);
    if (fraudCheck.isSuspicious) {
      throw new Error('Transaction flagged as suspicious');
    }

    // Validate merchant
    await this.validateMerchant(request.merchantId);
  }

  /**
   * Get the appropriate payment processor
   */
  getProcessor(paymentMethod) {
    const processor = this.processors[paymentMethod];
    if (!processor) {
      throw new Error(`Unsupported payment method: ${paymentMethod}`);
    }
    return processor;
  }

  /**
   * Handle post-processing tasks
   */
  async handlePostProcessing(result) {
    // Send webhooks
    await this.sendWebhooks(result);

    // Update balances
    await this.updateMerchantBalance(result);

    // Generate receipts
    await this.generateReceipts(result);
  }

  /**
   * Send webhook notifications
   */
  async sendWebhooks(result) {
    const webhookPayload = {
      event: 'payment.completed',
      data: {
        transactionId: result.transactionId,
        status: result.status,
        amount: result.amount,
        currency: result.currency,
        paymentMethod: result.paymentMethod,
        timestamp: new Date().toISOString()
      }
    };

    // Send to configured webhook URLs
    await WebhookManager.sendWebhooks(webhookPayload);
  }

  /**
   * Amount validation with currency-specific rules
   */
  isValidAmount(amount) {
    return amount > 0 && 
           Number.isFinite(amount) && 
           amount <= this.getMaxAmount();
  }

  /**
   * Currency validation against supported currencies
   */
  isValidCurrency(currency) {
    return SUPPORTED_CURRENCIES.includes(currency.toUpperCase());
  }

  /**
   * Get maximum allowed amount based on merchant level
   */
  getMaxAmount() {
    // Implement merchant-specific limits
    return 1000000000; // Default max amount
  }

  /**
   * Generate receipt for payment
   */
  async generateReceipts(result) {
    try {
      // Generate PDF receipt
      const pdfDoc = await ReceiptService.generatePDFReceipt(result);
      const pdfPath = `receipts/${result.transactionId}.pdf`;
      await this.saveReceipt(pdfPath, pdfDoc);

      // Generate HTML receipt for email
      const htmlReceipt = await ReceiptService.generateHTMLReceipt(result, 'email');
      
      // Store receipt references
      await this.storeReceiptReferences(result.transactionId, {
        pdfPath,
        htmlContent: htmlReceipt
      });

      // Send receipt to customer if email is available
      if (result.customer?.email) {
        await this.sendReceiptEmail(result, {
          pdfPath,
          htmlContent: htmlReceipt
        });
      }

      return {
        pdfUrl: `/api/receipts/${result.transactionId}/pdf`,
        htmlUrl: `/api/receipts/${result.transactionId}/html`
      };
    } catch (error) {
      console.error('Error generating receipts:', error);
      // Don't fail the payment process if receipt generation fails
      return null;
    }
  }

  /**
   * Save receipt file
   */
  async saveReceipt(path, doc) {
    return new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(path);
      doc.pipe(writeStream);
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
      doc.end();
    });
  }

  /**
   * Store receipt references in database
   */
  async storeReceiptReferences(transactionId, receiptInfo) {
    // This would store receipt references in your database
    // Implementation depends on your database structure
    await db.receipts.create({
      transactionId,
      ...receiptInfo,
      createdAt: new Date()
    });
  }

  /**
   * Send receipt via email
   */
  async sendReceiptEmail(payment, receiptInfo) {
    const emailData = {
      to: payment.customer.email,
      subject: `Payment Receipt - ${payment.transactionId}`,
      template: 'payment-receipt',
      context: {
        payment,
        receiptUrls: {
          pdf: `/api/receipts/${payment.transactionId}/pdf`,
          html: `/api/receipts/${payment.transactionId}/html`
        }
      },
      attachments: [{
        filename: `receipt-${payment.transactionId}.pdf`,
        path: receiptInfo.pdfPath
      }]
    };

    await this.emailService.sendEmail(emailData);
  }
}

export default PaymentOrchestrator;
