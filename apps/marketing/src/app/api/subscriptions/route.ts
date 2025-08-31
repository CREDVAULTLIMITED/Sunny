/**
 * Next.js API Route for Subscription Management
 * Handles subscription creation, updates, and cancellations
 */

import { NextRequest, NextResponse } from 'next/server';
import { SunnyPaymentGateway } from '@/lib/services/payment-gateway';
import { SubscriptionData, SubscriptionResult } from '@/lib/types/payment';

// Initialize payment gateway
const paymentGateway = new SunnyPaymentGateway({
  merchantId: process.env.SUNNY_MERCHANT_ID || 'demo_merchant',
  apiKey: process.env.SUNNY_API_KEY || 'demo_api_key',
  apiSecret: process.env.SUNNY_API_SECRET || 'demo_secret',
  environment: (process.env.NODE_ENV === 'production' ? 'production' : 'sandbox') as 'production' | 'sandbox'
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const subscriptionData: SubscriptionData = {
      customerId: body.customerId,
      planId: body.planId,
      paymentMethod: body.paymentMethod,
      startDate: body.startDate,
      metadata: body.metadata || {}
    };

    const result: SubscriptionResult = await paymentGateway.createSubscription(subscriptionData);

    const statusCode = result.success ? 201 : 400;
    return NextResponse.json(result, { status: statusCode });

  } catch (error) {
    console.error('Subscription creation error:', error);
    
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
    const subscriptionId = searchParams.get('id');
    const customerId = searchParams.get('customerId');

    if (subscriptionId) {
      // Get specific subscription
      const mockSubscription: SubscriptionResult = {
        success: true,
        subscriptionId,
        customerId: 'customer_123',
        planId: 'plan_456',
        status: 'active',
        startDate: new Date().toISOString(),
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      };

      return NextResponse.json(mockSubscription);
    }

    if (customerId) {
      // Get subscriptions for customer
      const mockSubscriptions = [
        {
          success: true,
          subscriptionId: 'sub_123',
          customerId,
          planId: 'plan_456',
          status: 'active',
          startDate: new Date().toISOString(),
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];

      return NextResponse.json({ subscriptions: mockSubscriptions });
    }

    return NextResponse.json(
      { error: 'Subscription ID or Customer ID is required' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Subscription retrieval error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const subscriptionId = searchParams.get('id');

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Subscription ID is required' },
        { status: 400 }
      );
    }

    // In a real implementation, this would cancel the subscription in the database
    const cancelledSubscription: SubscriptionResult = {
      success: true,
      subscriptionId,
      customerId: 'customer_123',
      planId: 'plan_456',
      status: 'cancelled',
      startDate: new Date().toISOString(),
      nextBillingDate: ''
    };

    return NextResponse.json(cancelledSubscription);

  } catch (error) {
    console.error('Subscription cancellation error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
