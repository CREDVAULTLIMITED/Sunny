/**
 * KRA (Kenya Revenue Authority) Integration Service
 * Handles eTIMS, iTax, PIN validation, and tax compliance
 */

import { Service } from 'typedi';
import axios, { AxiosInstance } from 'axios';
import crypto from 'crypto';
import { parseString as parseXML } from 'xml2js';
import { promisify } from 'util';

import { logger } from '../utils/logger';
import { config } from '../config/config';
import { 
  KRAPinValidationRequest,
  KRAPinValidationResponse,
  ETIMSInvoiceRequest,
  ETIMSInvoiceResponse,
  ITaxReturnRequest,
  ITaxReturnResponse,
  TaxRatesResponse
} from '../types/kra.types';

const parseXMLAsync = promisify(parseXML);

@Service()
export class KRAService {
  private etimsClient: AxiosInstance;
  private itaxClient: AxiosInstance;
  private pinValidationClient: AxiosInstance;
  private isETIMSConnected: boolean = false;
  private isITaxConnected: boolean = false;

  constructor() {
    this.setupClients();
  }

  private setupClients(): void {
    // eTIMS API Client
    this.etimsClient = axios.create({
      baseURL: config.kra.etims.baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Sunny-Kenya-Service/1.0.0'
      }
    });

    // iTax API Client
    this.itaxClient = axios.create({
      baseURL: config.kra.itax.baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/soap+xml',
        'SOAPAction': '',
        'User-Agent': 'Sunny-Kenya-Service/1.0.0'
      }
    });

    // PIN Validation Client
    this.pinValidationClient = axios.create({
      baseURL: config.kra.pinValidation.baseUrl,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Sunny-Kenya-Service/1.0.0'
      }
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // eTIMS request interceptor
    this.etimsClient.interceptors.request.use((config) => {
      const timestamp = new Date().toISOString();
      const signature = this.generateETIMSSignature(config.data, timestamp);
      
      config.headers['X-Timestamp'] = timestamp;
      config.headers['X-Signature'] = signature;
      config.headers['Authorization'] = `Bearer ${this.getETIMSToken()}`;
      
      return config;
    });

    // iTax request interceptor
    this.itaxClient.interceptors.request.use((config) => {
      const credentials = Buffer.from(
        `${config.kra.itax.username}:${config.kra.itax.password}`
      ).toString('base64');
      
      config.headers['Authorization'] = `Basic ${credentials}`;
      return config;
    });

    // Response interceptors for logging
    [this.etimsClient, this.itaxClient, this.pinValidationClient].forEach(client => {
      client.interceptors.response.use(
        response => {
          logger.info('KRA API Response', {
            url: response.config.url,
            status: response.status,
            duration: Date.now() - response.config.metadata?.startTime
          });
          return response;
        },
        error => {
          logger.error('KRA API Error', {
            url: error.config?.url,
            status: error.response?.status,
            message: error.message,
            data: error.response?.data
          });
          return Promise.reject(error);
        }
      );
    });
  }

  /**
   * Initialize KRA service connections
   */
  async initialize(): Promise<void> {
    try {
      logger.info('🔄 Initializing KRA Service...');

      // Test eTIMS connection
      await this.testETIMSConnection();
      
      // Test iTax connection
      await this.testITaxConnection();

      // Test PIN validation
      await this.testPinValidationConnection();

      logger.info('✅ KRA Service initialized successfully');
    } catch (error) {
      logger.error('❌ KRA Service initialization failed:', error);
      throw error;
    }
  }

  /**
   * Validate KRA PIN
   */
  async validateKRAPin(request: KRAPinValidationRequest): Promise<KRAPinValidationResponse> {
    try {
      logger.info('🔍 Validating KRA PIN', { pin: this.maskPIN(request.pin) });

      const response = await this.pinValidationClient.post('/validate', {
        pin: request.pin,
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString()
      });

      const result: KRAPinValidationResponse = {
        isValid: response.data.valid,
        pin: this.maskPIN(request.pin),
        taxpayerName: response.data.taxpayerName,
        taxpayerType: response.data.taxpayerType,
        registrationDate: response.data.registrationDate,
        status: response.data.status,
        validationId: response.data.validationId,
        timestamp: new Date().toISOString()
      };

      if (result.isValid) {
        logger.info('✅ KRA PIN validation successful', { 
          pin: this.maskPIN(request.pin),
          taxpayerName: result.taxpayerName 
        });
      } else {
        logger.warn('❌ KRA PIN validation failed', { 
          pin: this.maskPIN(request.pin),
          reason: response.data.reason 
        });
      }

      return result;
    } catch (error) {
      logger.error('❌ KRA PIN validation error:', error);
      throw new Error(`PIN validation failed: ${error.message}`);
    }
  }

  /**
   * Submit eTIMS invoice
   */
  async submitETIMSInvoice(request: ETIMSInvoiceRequest): Promise<ETIMSInvoiceResponse> {
    try {
      logger.info('📄 Submitting eTIMS invoice', {
        invoiceNumber: request.invoiceNumber,
        amount: request.totalAmount,
        currency: request.currency
      });

      // Prepare eTIMS invoice payload
      const invoicePayload = {
        invoiceNumber: request.invoiceNumber,
        invoiceDate: request.invoiceDate,
        dueDate: request.dueDate,
        seller: {
          pin: request.seller.pin,
          name: request.seller.name,
          address: request.seller.address,
          telephone: request.seller.telephone,
          email: request.seller.email
        },
        buyer: {
          pin: request.buyer.pin,
          name: request.buyer.name,
          address: request.buyer.address,
          telephone: request.buyer.telephone,
          email: request.buyer.email
        },
        items: request.items.map(item => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalAmount: item.totalAmount,
          taxType: item.taxType,
          taxRate: item.taxRate,
          taxAmount: item.taxAmount,
          exemptionReason: item.exemptionReason
        })),
        summary: {
          subtotal: request.subtotal,
          totalVAT: request.totalVAT,
          totalAmount: request.totalAmount,
          currency: request.currency
        },
        paymentMethod: request.paymentMethod,
        reference: request.reference
      };

      const response = await this.etimsClient.post('/invoices', invoicePayload);

      const result: ETIMSInvoiceResponse = {
        success: response.data.success,
        invoiceNumber: request.invoiceNumber,
        etimsReference: response.data.etimsReference,
        qrCode: response.data.qrCode,
        digitalSignature: response.data.digitalSignature,
        submissionDate: response.data.submissionDate,
        status: response.data.status,
        verificationUrl: response.data.verificationUrl,
        errors: response.data.errors || []
      };

      if (result.success) {
        logger.info('✅ eTIMS invoice submitted successfully', {
          invoiceNumber: request.invoiceNumber,
          etimsReference: result.etimsReference
        });
      } else {
        logger.error('❌ eTIMS invoice submission failed', {
          invoiceNumber: request.invoiceNumber,
          errors: result.errors
        });
      }

      return result;
    } catch (error) {
      logger.error('❌ eTIMS invoice submission error:', error);
      throw new Error(`eTIMS submission failed: ${error.message}`);
    }
  }

  /**
   * Submit iTax return
   */
  async submitITaxReturn(request: ITaxReturnRequest): Promise<ITaxReturnResponse> {
    try {
      logger.info('📊 Submitting iTax return', {
        period: request.period,
        returnType: request.returnType,
        pin: this.maskPIN(request.taxpayerPIN)
      });

      // Create SOAP envelope for iTax
      const soapEnvelope = this.createITaxSOAPEnvelope(request);

      const response = await this.itaxClient.post('/returns', soapEnvelope, {
        headers: {
          'SOAPAction': 'submitReturn'
        }
      });

      // Parse XML response
      const parsedResponse = await parseXMLAsync(response.data);
      const returnData = parsedResponse['soap:Envelope']['soap:Body']['submitReturnResponse'];

      const result: ITaxReturnResponse = {
        success: returnData.success === 'true',
        referenceNumber: returnData.referenceNumber,
        submissionDate: returnData.submissionDate,
        status: returnData.status,
        acknowledgmentNumber: returnData.acknowledgmentNumber,
        errors: returnData.errors ? returnData.errors.error : []
      };

      if (result.success) {
        logger.info('✅ iTax return submitted successfully', {
          referenceNumber: result.referenceNumber,
          acknowledgmentNumber: result.acknowledgmentNumber
        });
      } else {
        logger.error('❌ iTax return submission failed', {
          errors: result.errors
        });
      }

      return result;
    } catch (error) {
      logger.error('❌ iTax return submission error:', error);
      throw new Error(`iTax submission failed: ${error.message}`);
    }
  }

  /**
   * Get current tax rates from KRA
   */
  async getCurrentTaxRates(): Promise<TaxRatesResponse> {
    try {
      logger.info('📈 Fetching current tax rates from KRA');

      const response = await this.etimsClient.get('/tax-rates');

      const result: TaxRatesResponse = {
        vat: {
          standard: response.data.vat.standard,
          zeroRated: response.data.vat.zeroRated,
          exempt: response.data.vat.exempt
        },
        withholding: {
          professionalServices: response.data.withholding.professionalServices,
          digitalServices: response.data.withholding.digitalServices,
          management: response.data.withholding.management,
          dividends: response.data.withholding.dividends,
          interest: response.data.withholding.interest,
          royalties: response.data.withholding.royalties
        },
        digitalServiceTax: {
          rate: response.data.digitalServiceTax.rate,
          threshold: response.data.digitalServiceTax.threshold
        },
        excise: {
          mobileMoneyTransfer: response.data.excise.mobileMoneyTransfer,
          bankTransfer: response.data.excise.bankTransfer
        },
        lastUpdated: response.data.lastUpdated,
        effectiveDate: response.data.effectiveDate
      };

      logger.info('✅ Tax rates fetched successfully', {
        vatStandard: result.vat.standard,
        lastUpdated: result.lastUpdated
      });

      return result;
    } catch (error) {
      logger.error('❌ Failed to fetch tax rates:', error);
      throw new Error(`Failed to fetch tax rates: ${error.message}`);
    }
  }

  /**
   * Helper methods
   */
  private async testETIMSConnection(): Promise<void> {
    try {
      await this.etimsClient.get('/health');
      this.isETIMSConnected = true;
      logger.info('✅ eTIMS connection successful');
    } catch (error) {
      this.isETIMSConnected = false;
      logger.warn('⚠️ eTIMS connection failed:', error.message);
    }
  }

  private async testITaxConnection(): Promise<void> {
    try {
      const soapEnvelope = `
        <?xml version="1.0" encoding="UTF-8"?>
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <healthCheck/>
          </soap:Body>
        </soap:Envelope>
      `;
      
      await this.itaxClient.post('/health', soapEnvelope);
      this.isITaxConnected = true;
      logger.info('✅ iTax connection successful');
    } catch (error) {
      this.isITaxConnected = false;
      logger.warn('⚠️ iTax connection failed:', error.message);
    }
  }

  private async testPinValidationConnection(): Promise<void> {
    try {
      await this.pinValidationClient.get('/health');
      logger.info('✅ PIN validation service connection successful');
    } catch (error) {
      logger.warn('⚠️ PIN validation service connection failed:', error.message);
    }
  }

  private generateETIMSSignature(data: any, timestamp: string): string {
    const payload = JSON.stringify(data) + timestamp + config.kra.etims.apiSecret;
    return crypto.createHmac('sha256', config.kra.etims.apiSecret).update(payload).digest('hex');
  }

  private getETIMSToken(): string {
    // In production, this would implement proper OAuth token management
    return config.kra.etims.accessToken;
  }

  private maskPIN(pin: string): string {
    if (!pin || pin.length < 4) return '***';
    return pin.substring(0, 2) + '*'.repeat(pin.length - 4) + pin.substring(pin.length - 2);
  }

  private createITaxSOAPEnvelope(request: ITaxReturnRequest): string {
    return `
      <?xml version="1.0" encoding="UTF-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:itax="http://itax.kra.go.ke">
        <soap:Header>
          <itax:Authentication>
            <itax:Username>${config.kra.itax.username}</itax:Username>
            <itax:Password>${config.kra.itax.password}</itax:Password>
          </itax:Authentication>
        </soap:Header>
        <soap:Body>
          <itax:submitReturn>
            <itax:taxpayerPIN>${request.taxpayerPIN}</itax:taxpayerPIN>
            <itax:period>${request.period}</itax:period>
            <itax:returnType>${request.returnType}</itax:returnType>
            <itax:returnData>${JSON.stringify(request.returnData)}</itax:returnData>
          </itax:submitReturn>
        </soap:Body>
      </soap:Envelope>
    `;
  }

  /**
   * Public getters for service status
   */
  public isETIMSConnected(): boolean {
    return this.isETIMSConnected;
  }

  public isITaxConnected(): boolean {
    return this.isITaxConnected;
  }

  /**
   * Disconnect and cleanup
   */
  async disconnect(): Promise<void> {
    logger.info('🔌 Disconnecting KRA Service...');
    // Cleanup any persistent connections or resources
  }
}
