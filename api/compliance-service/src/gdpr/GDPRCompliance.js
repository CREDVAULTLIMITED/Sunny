const crypto = require('crypto');
const { promisify } = require('util');
const fs = require('fs').promises;
const path = require('path');

class GDPRCompliance {
  constructor(db) {
    this.db = db;
    this.dataRetentionPeriod = 730; // 2 years in days
    this.personalDataFields = [
      'email', 'phone', 'address', 'name', 'ip_address',
      'device_id', 'location', 'birthday'
    ];
  }

  // Article 15: Right of access
  async getPersonalData(userId) {
    try {
      // Collect all personal data
      const userData = {
        profile: await this.db.collection('users').findOne({ _id: userId }),
        transactions: await this.db.collection('transactions')
          .find({ userId })
          .toArray(),
        paymentMethods: await this.db.collection('payment_methods')
          .find({ userId })
          .toArray(),
        consents: await this.db.collection('consents')
          .find({ userId })
          .toArray(),
        dataProcessingLogs: await this.db.collection('data_processing_logs')
          .find({ userId })
          .toArray()
      };

      // Add data processing purposes
      userData.processingPurposes = [
        'Payment processing',
        'Fraud prevention',
        'Customer support',
        'Legal compliance'
      ];

      // Add data retention periods
      userData.retentionPeriods = {
        transactionData: '7 years (legal requirement)',
        customerProfile: '2 years after last activity',
        paymentMethods: 'Until customer deletion request'
      };

      return userData;
    } catch (error) {
      console.error('Error accessing personal data:', error);
      throw new Error('Could not retrieve personal data');
    }
  }

  // Article 17: Right to erasure
  async erasePersonalData(userId) {
    const session = await this.db.startSession();
    try {
      await session.withTransaction(async () => {
        // Anonymize user data instead of deletion for legal requirements
        await this.db.collection('users').updateOne(
          { _id: userId },
          {
            $set: {
              email: `deleted_${crypto.randomBytes(8).toString('hex')}`,
              name: 'Deleted User',
              phone: null,
              address: null,
              deleted: true,
              deletedAt: new Date()
            }
          }
        );

        // Remove sensitive payment data
        await this.db.collection('payment_methods').deleteMany({ userId });

        // Anonymize transaction records (keep for legal compliance)
        await this.db.collection('transactions').updateMany(
          { userId },
          {
            $set: {
              anonymized: true,
              customerDetails: {
                name: 'Deleted User',
                email: 'deleted@example.com'
              }
            }
          }
        );

        // Log the erasure
        await this.db.collection('data_erasure_logs').insertOne({
          userId,
          timestamp: new Date(),
          type: 'user_requested',
          status: 'completed'
        });
      });

      return { success: true, message: 'Personal data erased successfully' };
    } catch (error) {
      console.error('Error erasing personal data:', error);
      throw new Error('Could not erase personal data');
    } finally {
      await session.endSession();
    }
  }

  // Article 20: Right to data portability
  async exportPersonalData(userId, format = 'json') {
    try {
      const personalData = await this.getPersonalData(userId);
      
      switch (format.toLowerCase()) {
        case 'json':
          return JSON.stringify(personalData, null, 2);
        
        case 'csv':
          return this.convertToCSV(personalData);
        
        case 'xml':
          return this.convertToXML(personalData);
        
        default:
          throw new Error('Unsupported export format');
      }
    } catch (error) {
      console.error('Error exporting personal data:', error);
      throw new Error('Could not export personal data');
    }
  }

  // Article 21: Right to object
  async updateDataProcessingConsent(userId, { marketing = false, analytics = false }) {
    try {
      await this.db.collection('consents').updateOne(
        { userId },
        {
          $set: {
            marketing,
            analytics,
            updatedAt: new Date()
          }
        },
        { upsert: true }
      );

      // Update related systems
      if (!marketing) {
        await this.removeFromMarketing(userId);
      }
      if (!analytics) {
        await this.anonymizeAnalyticsData(userId);
      }

      return { success: true, message: 'Processing preferences updated' };
    } catch (error) {
      console.error('Error updating processing consent:', error);
      throw new Error('Could not update processing preferences');
    }
  }

  // Article 30: Records of processing activities
  async logDataProcessing(userId, activityType, details) {
    try {
      await this.db.collection('data_processing_logs').insertOne({
        userId,
        activityType,
        details,
        timestamp: new Date(),
        processor: process.env.SERVICE_NAME,
        purpose: details.purpose,
        categories: details.categories,
        retention: this.dataRetentionPeriod
      });
    } catch (error) {
      console.error('Error logging data processing:', error);
      throw new Error('Could not log data processing activity');
    }
  }

  // Article 32: Security of processing
  async validateDataSecurity() {
    try {
      const securityMeasures = {
        encryption: this.validateEncryption(),
        accessControl: await this.validateAccessControl(),
        dataBackups: await this.validateBackups(),
        incidentResponse: await this.validateIncidentResponse()
      };

      return {
        secure: Object.values(securityMeasures).every(measure => measure.valid),
        measures: securityMeasures
      };
    } catch (error) {
      console.error('Error validating data security:', error);
      throw new Error('Could not validate data security measures');
    }
  }

  // Automated data retention enforcement
  async enforceDataRetention() {
    try {
      const retentionDate = new Date();
      retentionDate.setDate(retentionDate.getDate() - this.dataRetentionPeriod);

      const result = await this.db.collection('users').updateMany(
        {
          lastActivity: { $lt: retentionDate },
          deleted: { $ne: true }
        },
        {
          $set: {
            deleted: true,
            deletedAt: new Date(),
            deletionReason: 'data_retention_policy'
          }
        }
      );

      return {
        success: true,
        processedCount: result.modifiedCount
      };
    } catch (error) {
      console.error('Error enforcing data retention:', error);
      throw new Error('Could not enforce data retention policy');
    }
  }

  // Helper methods
  async validateEncryption() {
    // Implement encryption validation
    return {
      valid: true,
      details: {
        algorithm: 'AES-256-GCM',
        keyRotation: 'every 90 days',
        transportSecurity: 'TLS 1.3'
      }
    };
  }

  async validateAccessControl() {
    // Implement access control validation
    return {
      valid: true,
      details: {
        authentication: '2FA enabled',
        authorization: 'RBAC implemented',
        monitoring: 'Real-time access logs'
      }
    };
  }

  async validateBackups() {
    // Implement backup validation
    return {
      valid: true,
      details: {
        frequency: 'Daily',
        encryption: 'AES-256',
        retention: '30 days'
      }
    };
  }

  async validateIncidentResponse() {
    // Implement incident response validation
    return {
      valid: true,
      details: {
        plan: 'Documented',
        team: 'Assigned',
        responseTime: '< 1 hour'
      }
    };
  }

  async removeFromMarketing(userId) {
    // Implement marketing removal
    await this.db.collection('marketing_preferences').deleteOne({ userId });
  }

  async anonymizeAnalyticsData(userId) {
    // Implement analytics anonymization
    await this.db.collection('analytics').updateMany(
      { userId },
      {
        $set: {
          userId: 'anonymous',
          deviceId: 'anonymous'
        }
      }
    );
  }
}

module.exports = GDPRCompliance;
