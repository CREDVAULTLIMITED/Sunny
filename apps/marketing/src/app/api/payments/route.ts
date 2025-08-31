/**
 * Next.js API Route for Payment Processing
 * Handles payment creation and processing
 */

import { NextRequest, NextResponse } from 'next/server';
import { SunnyPaymentGateway } from '@/lib/services/payment-gateway';
import { PaymentData, PaymentResult } from '@/lib/types/payment';

// Initialize payment gateway with environment variables
const paymentGateway = new SunnyPaymentGateway({
  merchantId: process.env.SUNNY_MERCHANT_ID || 'demo_merchant',
  apiKey: process.env.SUNNY_API_KEY || 'demo_api_key',
  apiSecret: process.env.SUNNY_API_SECRET || 'demo_secret',
  environment: (process.env.NODE_ENV === 'production' ? 'production' : 'sandbox') as 'production' | 'sandbox'
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    const paymentData: PaymentData = {
      amount: body.amount,
      currency: body.currency,
      paymentMethod: body.paymentMethod,
      customer: body.customer,
      metadata: body.metadata || {},
      instantSettlement: body.instantSettlement || false,
      description: body.description
    };

    // Process the payment
    const result: PaymentResult = await paymentGateway.processPayment(paymentData);

    // Return appropriate status code based on payment result
    const statusCode = result.success ? 200 : 400;

    return NextResponse.json(result, { status: statusCode });

  } catch (error) {
    console.error('Payment API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'An internal server error occurred'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('id');

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    // In a real implementation, this would fetch from a database
    // For now, return a mock response
    const mockPayment: PaymentResult = {
      success: true,
      transactionId: paymentId,
      status: 'completed' as any,
      amount: 1000,
      currency: 'USD',
      paymentMethod: 'card',
      fees: {
        processingFee: 59,
        totalFees: 59,
        currency: 'USD'
      }
    };

    return NextResponse.json(mockPayment);

  } catch (error) {
    console.error('Payment retrieval error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
