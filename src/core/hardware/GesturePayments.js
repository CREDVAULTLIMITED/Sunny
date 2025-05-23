import { BiometricVerifier } from '@sunnypay/biometrics';
import { ERROR_CODES } from '../constants.js';

export class GesturePaymentProcessor {
  constructor(config = {}) {
    this.verifier = new BiometricVerifier({
      apiKey: config.apiKey,
      gestureTypes: ['palm', 'hand_swipe', 'finger_pattern']
    });
  }

  async processGesturePayment(paymentRequest) {
    try {
      const { gestureData, amount, currency } = paymentRequest;
      
      // Step 1: Verify gesture pattern
      const verification = await this.verifier.verifyGesture(
        gestureData.sensorReadings,
        gestureData.userId
      );

      if (!verification.match) {
        throw new Error('Gesture verification failed');
      }

      // Step 2: Process payment through core system
      const paymentResult = await fetch(`${process.env.API_URL}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Gesture-Signature': this.createSignature(gestureData)
        },
        body: JSON.stringify({
          amount,
          currency,
          paymentMethod: 'gesture',
          metadata: {
            gestureType: verification.gestureType,
            confidence: verification.confidenceScore
          }
        })
      });

      return this.formatResult(paymentResult);
    } catch (error) {
      return {
        success: false,
        errorCode: ERROR_CODES.GESTURE_PAYMENT_FAILED,
        message: 'Gesture payment processing error'
      };
    }
  }

  createSignature(gestureData) {
    // Implementation for security signature
    return crypto
      .createHmac('sha256', process.env.GESTURE_SECRET)
      .update(JSON.stringify(gestureData))
      .digest('hex');
  }
}