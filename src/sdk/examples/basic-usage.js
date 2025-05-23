/**
 * Basic usage example for the Sunny Payment Gateway SDK
 */

import SunnySDK from '../SunnySDK.js';

// Initialize the SDK
const sunny = new SunnySDK({
  apiKey: 'your_api_key',
  environment: 'sandbox', // or 'production'
  merchantId: 'your_merchant_id'
});

// Example 1: Process a card payment
async function processCardPayment() {
  try {
    const result = await sunny.createPayment({
      amount: '100.00',
      currency: 'USD',
      paymentMethod: 'CARD',
      cardDetails: {
        cardNumber: '4242424242424242',
        expiryMonth: '12',
        expiryYear: '2025',
        cvv: '123',
        cardholderName: 'John Smith'
      },
      metadata: {
        orderId: '12345',
        customerName: 'John Smith'
      }
    });
    
    console.log('Payment result:', result);
    
    if (result.success) {
      console.log(`Payment successful! Transaction ID: ${result.transactionId}`);
      
      // Check transaction status
      const status = await sunny.getTransactionStatus(result.transactionId);
      console.log('Transaction status:', status);
    } else {
      console.error(`Payment failed: ${result.message}`);
    }
  } catch (error) {
    console.error('Error processing payment:', error);
  }
}

// Example 2: Process a mobile money payment
async function processMobileMoneyPayment() {
  try {
    const result = await sunny.createPayment({
      amount: '1000.00',
      currency: 'KES',
      paymentMethod: 'MOBILE_MONEY',
      mobileMoneyDetails: {
        provider: 'MPESA',
        phoneNumber: '+254712345678'
      }
    });
    
    console.log('Mobile money payment result:', result);
    
    if (result.success) {
      console.log(`Mobile money payment initiated! Transaction ID: ${result.transactionId}`);
    } else {
      console.error(`Mobile money payment failed: ${result.message}`);
    }
  } catch (error) {
    console.error('Error processing mobile money payment:', error);
  }
}

// Example 3: Generate a payment link
async function generatePaymentLink() {
  try {
    const result = await sunny.generatePaymentLink({
      amount: '50.00',
      currency: 'USD',
      expiresIn: 3600, // 1 hour
      metadata: {
        productName: 'Premium Subscription',
        customerId: 'cust_12345'
      }
    });
    
    console.log('Payment link result:', result);
    
    if (result.success) {
      console.log(`Payment link generated: ${result.paymentLink}`);
      console.log(`QR code: ${result.qrCode}`);
      console.log(`Expires at: ${result.expiresAt}`);
    } else {
      console.error(`Failed to generate payment link: ${result.message}`);
    }
  } catch (error) {
    console.error('Error generating payment link:', error);
  }
}

// Example 4: Tokenize a payment method
async function tokenizeCard() {
  try {
    const result = await sunny.tokenizePaymentMethod({
      cardNumber: '4242424242424242',
      expiryMonth: '12',
      expiryYear: '2025',
      cardholderName: 'John Smith'
    }, 'cust_12345');
    
    console.log('Tokenization result:', result);
    
    if (result.success) {
      console.log(`Card tokenized! Token: ${result.token}`);
      
      // Use the token for a payment
      const paymentResult = await sunny.createTokenPayment({
        amount: '75.00',
        currency: 'USD',
        token: result.token,
        customerId: 'cust_12345'
      });
      
      console.log('Token payment result:', paymentResult);
    } else {
      console.error(`Tokenization failed: ${result.message}`);
    }
  } catch (error) {
    console.error('Error tokenizing card:', error);
  }
}

// Example 5: Create a P2P transfer
async function createP2PTransfer() {
  try {
    const result = await sunny.createP2PTransfer({
      senderId: 'user_1001',
      recipientId: 'user_1002',
      amount: '25.00',
      currency: 'USD',
      note: 'Lunch payment'
    });
    
    console.log('P2P transfer result:', result);
    
    if (result.success) {
      console.log(`P2P transfer successful! Transaction ID: ${result.transactionId}`);
    } else {
      console.error(`P2P transfer failed: ${result.message}`);
    }
  } catch (error) {
    console.error('Error creating P2P transfer:', error);
  }
}

// Example 6: Create a money request
async function createMoneyRequest() {
  try {
    const result = await sunny.createMoneyRequest({
      requesterId: 'user_1001',
      requesteeId: 'user_1002',
      amount: '35.00',
      currency: 'USD',
      note: 'Movie tickets',
      expiryDays: 7
    });
    
    console.log('Money request result:', result);
    
    if (result.success) {
      console.log(`Money request created! Request ID: ${result.requestId}`);
    } else {
      console.error(`Money request failed: ${result.message}`);
    }
  } catch (error) {
    console.error('Error creating money request:', error);
  }
}

// Example 7: Generate a QR code
async function generateQRCode() {
  try {
    const result = await sunny.generateQRCode({
      amount: '15.00',
      currency: 'USD',
      type: 'DYNAMIC',
      expiresIn: 1800 // 30 minutes
    });
    
    console.log('QR code result:', result);
    
    if (result.success) {
      console.log(`QR code generated! QR ID: ${result.qrId}`);
      console.log(`QR content: ${result.qrContent}`);
    } else {
      console.error(`QR code generation failed: ${result.message}`);
    }
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
}

// Run examples
(async () => {
  console.log('Running Sunny SDK examples...');
  
  await processCardPayment();
  await processMobileMoneyPayment();
  await generatePaymentLink();
  await tokenizeCard();
  await createP2PTransfer();
  await createMoneyRequest();
  await generateQRCode();
  
  console.log('Examples completed!');
})();