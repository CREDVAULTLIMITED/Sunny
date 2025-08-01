# Sunny Payments API Documentation

## Overview

The Sunny Payments API provides a secure and reliable way to process payments, manage transactions, and handle user data. This documentation covers all available endpoints, authentication methods, and best practices.

## Base URL

Production: `https://api.sunnypayments.com/v1`
Staging: `https://staging-api.sunnypayments.com/v1`

## Authentication

All API requests must include an API key in the Authorization header:

```
Authorization: Bearer YOUR_API_KEY
```

To obtain an API key, contact our support team or generate one in the dashboard.

## Rate Limiting

- Standard tier: 100 requests per minute
- Premium tier: 1000 requests per minute
- Enterprise tier: Custom limits

When rate limit is exceeded, the API returns status code 429.

## Endpoints

### Payments

#### Create Payment

POST `/payments`

Creates a new payment transaction.

**Request Body:**
```json
{
  "amount": 1000,
  "currency": "USD",
  "paymentMethod": {
    "type": "card",
    "number": "4111111111111111",
    "expMonth": 12,
    "expYear": 2025,
    "cvc": "123"
  },
  "customer": {
    "id": "cust_123",
    "email": "customer@example.com"
  },
  "metadata": {
    "orderId": "order_123"
  }
}
```

**Response:**
```json
{
  "id": "pay_123",
  "status": "succeeded",
  "amount": 1000,
  "currency": "USD",
  "created": "2025-06-16T10:00:00Z",
  "paymentMethod": {
    "type": "card",
    "last4": "1111",
    "brand": "visa"
  }
}
```

#### Get Payment

GET `/payments/{id}`

Retrieves a specific payment.

**Response:**
```json
{
  "id": "pay_123",
  "status": "succeeded",
  "amount": 1000,
  "currency": "USD",
  "created": "2025-06-16T10:00:00Z",
  "paymentMethod": {
    "type": "card",
    "last4": "1111",
    "brand": "visa"
  }
}
```

### Refunds

#### Create Refund

POST `/payments/{id}/refund`

Refunds a payment partially or fully.

**Request Body:**
```json
{
  "amount": 500,
  "reason": "customer_request"
}
```

**Response:**
```json
{
  "id": "ref_123",
  "payment": "pay_123",
  "amount": 500,
  "status": "succeeded",
  "created": "2025-06-16T10:00:00Z"
}
```

### Customers

#### Create Customer

POST `/customers`

Creates a new customer profile.

**Request Body:**
```json
{
  "email": "customer@example.com",
  "name": "John Doe",
  "metadata": {
    "company": "Acme Inc"
  }
}
```

**Response:**
```json
{
  "id": "cust_123",
  "email": "customer@example.com",
  "name": "John Doe",
  "created": "2025-06-16T10:00:00Z"
}
```

### Payment Methods

#### Add Payment Method

POST `/customers/{id}/payment-methods`

Adds a new payment method to a customer.

**Request Body:**
```json
{
  "type": "card",
  "number": "4111111111111111",
  "expMonth": 12,
  "expYear": 2025,
  "cvc": "123"
}
```

**Response:**
```json
{
  "id": "pm_123",
  "type": "card",
  "last4": "1111",
  "brand": "visa",
  "expMonth": 12,
  "expYear": 2025
}
```

## Webhooks

### Event Types

- `payment.succeeded`
- `payment.failed`
- `refund.succeeded`
- `refund.failed`
- `customer.created`
- `customer.updated`

### Webhook Format

```json
{
  "id": "evt_123",
  "type": "payment.succeeded",
  "created": "2025-06-16T10:00:00Z",
  "data": {
    "object": {
      "id": "pay_123",
      "amount": 1000,
      "currency": "USD"
    }
  }
}
```

### Webhook Verification

Verify webhook signatures using the `X-Sunny-Signature` header:

```javascript
const signature = req.headers['x-sunny-signature'];
const isValid = verifyWebhook(signature, req.body, webhookSecret);
```

## Error Handling

The API uses conventional HTTP response codes:

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

Error Response Format:

```json
{
  "error": {
    "code": "payment_failed",
    "message": "Your card was declined",
    "type": "card_error"
  }
}
```

## SDK Libraries

- [Node.js](https://github.com/sunny-payments/sunny-node)
- [Python](https://github.com/sunny-payments/sunny-python)
- [PHP](https://github.com/sunny-payments/sunny-php)
- [Ruby](https://github.com/sunny-payments/sunny-ruby)
- [Java](https://github.com/sunny-payments/sunny-java)

## Best Practices

1. **Authentication**
   - Rotate API keys regularly
   - Use environment-specific keys
   - Never expose keys in client-side code

2. **Error Handling**
   - Implement proper error handling
   - Retry failed requests with exponential backoff
   - Log all API errors for debugging

3. **Security**
   - Use HTTPS for all requests
   - Validate webhook signatures
   - Keep SDKs up to date

4. **Performance**
   - Implement proper caching
   - Use bulk operations when possible
   - Monitor API response times

5. **Compliance**
   - Follow PCI DSS requirements
   - Implement proper data handling for GDPR
   - Regular security audits

## Support

- Email: api-support@sunnypayments.com
- Documentation: https://docs.sunnypayments.com
- Status Page: https://status.sunnypayments.com

## Changelog

### v1.1.0 (2025-06-16)
- Added support for new payment methods
- Improved webhook reliability
- Enhanced error messages

### v1.0.0 (2025-01-01)
- Initial release
