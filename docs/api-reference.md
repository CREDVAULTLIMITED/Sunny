# Sunny Payment Gateway API Reference

## Introduction

The Sunny API is organized around REST principles. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.

## Base URLs

- **Sandbox**: `https://sandbox.sunnypayments.com/v2`
- **Production**: `https://api.sunnypayments.com/v2`

## Authentication

All API requests must include your API key in the Authorization header:

```
Authorization: Bearer YOUR_API_KEY
```

You can obtain your API keys from the Sunny Dashboard.

## Request/Response Format

All requests should be encoded as JSON with the Content-Type header set to `application/json`. All responses will be returned in JSON format.

## Pagination

For endpoints that return lists of objects, we use cursor-based pagination. Use the `limit` parameter to specify how many objects to return (default 10, maximum 100), and use the `starting_after` or `ending_before` parameters to specify where in the list to start.

## Error Handling

The API uses conventional HTTP response codes to indicate the success or failure of an API request:

- `200 OK`: Request succeeded
- `201 Created`: Resource was successfully created
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication failed
- `402 Payment Required`: The requested action requires payment
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Request conflicts with current state
- `429 Too Many Requests`: Rate limit exceeded
- `500, 502, 503, 504`: Server errors

Error responses include a JSON object with the following properties:

```json
{
  "error": {
    "code": "invalid_request",
    "message": "The request was invalid",
    "param": "amount",
    "type": "validation_error"
  }
}
```

## API Endpoints

### Payments

#### Create a Payment

```
POST /payments
```

Create a new payment.

**Request Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| amount | integer | Yes | Amount in smallest currency unit (e.g., cents) |
| currency | string | Yes | Three-letter ISO currency code |
| payment_method | string | Yes | Payment method to use |
| description | string | No | Description of the payment |
| customer | object | No | Customer information |
| metadata | object | No | Additional metadata |

**Example Request:**

```json
{
  "amount": 1000,
  "currency": "USD",
  "payment_method": "card",
  "card": {
    "number": "4242424242424242",
    "exp_month": 12,
    "exp_year": 2025,
    "cvc": "123"
  },
  "customer": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "description": "Payment for order #1234",
  "metadata": {
    "order_id": "1234"
  }
}
```

**Example Response:**

```json
{
  "id": "pay_123456789",
  "object": "payment",
  "amount": 1000,
  "currency": "USD",
  "status": "succeeded",
  "payment_method": "card",
  "description": "Payment for order #1234",
  "customer": {
    "id": "cust_987654321",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "created_at": "2023-06-01T12:00:00Z",
  "updated_at": "2023-06-01T12:00:00Z",
  "fees": {
    "total": 59,
    "breakdown": {
      "percentage_fee": 29,
      "fixed_fee": 30
    }
  },
  "metadata": {
    "order_id": "1234"
  }
}
```

#### Retrieve a Payment

```
GET /payments/{id}
```

Retrieve details of a specific payment.

**Example Response:**

```json
{
  "id": "pay_123456789",
  "object": "payment",
  "amount": 1000,
  "currency": "USD",
  "status": "succeeded",
  "payment_method": "card",
  "description": "Payment for order #1234",
  "customer": {
    "id": "cust_987654321",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "created_at": "2023-06-01T12:00:00Z",
  "updated_at": "2023-06-01T12:00:00Z",
  "fees": {
    "total": 59,
    "breakdown": {
      "percentage_fee": 29,
      "fixed_fee": 30
    }
  },
  "metadata": {
    "order_id": "1234"
  }
}
```

#### List Payments

```
GET /payments
```

List all payments.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| limit | integer | No | Number of payments to return (default 10, max 100) |
| starting_after | string | No | Cursor for pagination |
| ending_before | string | No | Cursor for pagination |
| created | object | No | Filter by creation date |

**Example Response:**

```json
{
  "object": "list",
  "data": [
    {
      "id": "pay_123456789",
      "object": "payment",
      "amount": 1000,
      "currency": "USD",
      "status": "succeeded",
      "payment_method": "card",
      "created_at": "2023-06-01T12:00:00Z"
    },
    {
      "id": "pay_987654321",
      "object": "payment",
      "amount": 2000,
      "currency": "USD",
      "status": "succeeded",
      "payment_method": "bank_transfer",
      "created_at": "2023-06-01T11:00:00Z"
    }
  ],
  "has_more": true,
  "url": "/v2/payments"
}
```

### Refunds

#### Create a Refund

```
POST /refunds
```

Refund a payment.

**Request Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| payment | string | Yes | ID of the payment to refund |
| amount | integer | No | Amount to refund (defaults to full amount) |
| reason | string | No | Reason for the refund |
| metadata | object | No | Additional metadata |

**Example Request:**

```json
{
  "payment": "pay_123456789",
  "amount": 500,
  "reason": "Customer request",
  "metadata": {
    "return_id": "ret_123"
  }
}
```

**Example Response:**

```json
{
  "id": "ref_123456789",
  "object": "refund",
  "amount": 500,
  "currency": "USD",
  "payment": "pay_123456789",
  "status": "succeeded",
  "reason": "Customer request",
  "created_at": "2023-06-02T12:00:00Z",
  "metadata": {
    "return_id": "ret_123"
  }
}
```

### Customers

#### Create a Customer

```
POST /customers
```

Create a new customer.

**Request Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | No | Customer's name |
| email | string | No | Customer's email |
| phone | string | No | Customer's phone number |
| address | object | No | Customer's address |
| metadata | object | No | Additional metadata |

**Example Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "address": {
    "line1": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "postal_code": "94111",
    "country": "US"
  },
  "metadata": {
    "user_id": "user_123"
  }
}
```

**Example Response:**

```json
{
  "id": "cust_123456789",
  "object": "customer",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "address": {
    "line1": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "postal_code": "94111",
    "country": "US"
  },
  "created_at": "2023-06-01T12:00:00Z",
  "updated_at": "2023-06-01T12:00:00Z",
  "metadata": {
    "user_id": "user_123"
  }
}
```

### Subscriptions

#### Create a Subscription

```
POST /subscriptions
```

Create a new subscription.

**Request Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| customer | string | Yes | ID of the customer |
| plan | string | Yes | ID of the plan |
| payment_method | string | Yes | Payment method to use |
| metadata | object | No | Additional metadata |

**Example Request:**

```json
{
  "customer": "cust_123456789",
  "plan": "plan_premium_monthly",
  "payment_method": "pm_card_visa",
  "metadata": {
    "user_tier": "premium"
  }
}
```

**Example Response:**

```json
{
  "id": "sub_123456789",
  "object": "subscription",
  "customer": "cust_123456789",
  "plan": "plan_premium_monthly",
  "status": "active",
  "current_period_start": "2023-06-01T00:00:00Z",
  "current_period_end": "2023-07-01T00:00:00Z",
  "created_at": "2023-06-01T12:00:00Z",
  "metadata": {
    "user_tier": "premium"
  }
}
```

### Payment Links

#### Create a Payment Link

```
POST /payment_links
```

Create a payment link that can be shared with customers.

**Request Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| amount | integer | Yes | Amount in smallest currency unit |
| currency | string | Yes | Three-letter ISO currency code |
| description | string | Yes | Description of what's being paid for |
| expires_in | integer | No | Expiration time in seconds |
| success_url | string | No | URL to redirect after successful payment |
| cancel_url | string | No | URL to redirect after canceled payment |
| metadata | object | No | Additional metadata |

**Example Request:**

```json
{
  "amount": 2500,
  "currency": "USD",
  "description": "Premium subscription",
  "expires_in": 604800,
  "success_url": "https://example.com/success",
  "cancel_url": "https://example.com/cancel",
  "metadata": {
    "product_id": "prod_123"
  }
}
```

**Example Response:**

```json
{
  "id": "plink_123456789",
  "object": "payment_link",
  "url": "https://pay.sunnypayments.com/p/abcdef123456",
  "amount": 2500,
  "currency": "USD",
  "description": "Premium subscription",
  "expires_at": "2023-06-08T12:00:00Z",
  "created_at": "2023-06-01T12:00:00Z",
  "metadata": {
    "product_id": "prod_123"
  }
}
```

### Marketplace Payments

#### Create a Marketplace Payment

```
POST /marketplace/payments
```

Process a payment with splits between multiple recipients.

**Request Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| amount | integer | Yes | Total amount in smallest currency unit |
| currency | string | Yes | Three-letter ISO currency code |
| payment_method | string | Yes | Payment method to use |
| splits | array | Yes | Array of split recipients and amounts |
| metadata | object | No | Additional metadata |

**Example Request:**

```json
{
  "amount": 10000,
  "currency": "USD",
  "payment_method": "card",
  "card": {
    "number": "4242424242424242",
    "exp_month": 12,
    "exp_year": 2025,
    "cvc": "123"
  },
  "splits": [
    {
      "destination": "acct_seller1",
      "amount": 8500,
      "currency": "USD"
    },
    {
      "destination": "acct_platform",
      "amount": 1500,
      "currency": "USD"
    }
  ],
  "metadata": {
    "order_id": "order_123"
  }
}
```

**Example Response:**

```json
{
  "id": "mktp_123456789",
  "object": "marketplace_payment",
  "amount": 10000,
  "currency": "USD",
  "status": "succeeded",
  "payment_method": "card",
  "splits": [
    {
      "destination": "acct_seller1",
      "amount": 8500,
      "currency": "USD",
      "status": "transferred"
    },
    {
      "destination": "acct_platform",
      "amount": 1500,
      "currency": "USD",
      "status": "transferred"
    }
  ],
  "created_at": "2023-06-01T12:00:00Z",
  "metadata": {
    "order_id": "order_123"
  }
}
```

### Webhooks

#### Register a Webhook

```
POST /webhooks
```

Register a URL to receive webhook events.

**Request Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| url | string | Yes | URL to receive webhook events |
| events | array | Yes | Array of event types to subscribe to |
| description | string | No | Description of the webhook |
| metadata | object | No | Additional metadata |

**Example Request:**

```json
{
  "url": "https://example.com/webhooks/sunny",
  "events": [
    "payment.succeeded",
    "payment.failed",
    "refund.succeeded"
  ],
  "description": "Production webhook endpoint",
  "metadata": {
    "environment": "production"
  }
}
```

**Example Response:**

```json
{
  "id": "whk_123456789",
  "object": "webhook",
  "url": "https://example.com/webhooks/sunny",
  "events": [
    "payment.succeeded",
    "payment.failed",
    "refund.succeeded"
  ],
  "description": "Production webhook endpoint",
  "created_at": "2023-06-01T12:00:00Z",
  "metadata": {
    "environment": "production"
  }
}
```

## Webhook Events

Sunny sends webhook events to notify your application when events happen in your account.

### Event Types

| Event Type | Description |
|------------|-------------|
| `payment.succeeded` | Payment was successful |
| `payment.failed` | Payment failed |
| `payment.refunded` | Payment was refunded |
| `payment.disputed` | Payment was disputed |
| `refund.succeeded` | Refund was successful |
| `refund.failed` | Refund failed |
| `subscription.created` | Subscription was created |
| `subscription.updated` | Subscription was updated |
| `subscription.canceled` | Subscription was canceled |
| `subscription.payment.succeeded` | Subscription payment was successful |
| `subscription.payment.failed` | Subscription payment failed |

### Webhook Payload

```json
{
  "id": "evt_123456789",
  "object": "event",
  "type": "payment.succeeded",
  "created": 1622548800,
  "data": {
    "object": {
      "id": "pay_123456789",
      "object": "payment",
      "amount": 1000,
      "currency": "USD",
      "status": "succeeded",
      "payment_method": "card"
    }
  }
}
```

### Verifying Webhooks

To verify that a webhook was sent by Sunny, check the signature in the `Sunny-Signature` header:

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

## Rate Limits

The API has rate limits to protect against abuse. Current limits are:

- 100 requests per minute for standard accounts
- 1000 requests per minute for premium accounts
- 5000 requests per minute for enterprise accounts

If you exceed these limits, you'll receive a `429 Too Many Requests` response.

## Versioning

The API is versioned using the URL path. The current version is `v2`. We recommend specifying a version explicitly in your requests to ensure compatibility.

## Support

If you have any questions or need help with the API, please contact our support team at api-support@sunnypayments.com.