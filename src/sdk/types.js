/**
 * types.js
 * 
 * Type definitions for the Sunny Payment Gateway SDK
 */

/**
 * @typedef {Object} SunnySDKConfig
 * @property {string} apiKey - API key
 * @property {string} [environment] - Environment (sandbox or production)
 * @property {string} [merchantId] - Merchant ID
 * @property {Object} [options] - Additional options
 */

/**
 * @typedef {Object} PaymentDetails
 * @property {string} amount - Payment amount
 * @property {string} currency - Payment currency
 * @property {string} paymentMethod - Payment method
 * @property {string} [merchantId] - Merchant ID
 * @property {string} [recipientId] - Recipient ID
 * @property {Object} [metadata] - Additional metadata
 * @property {CardDetails} [cardDetails] - Card payment details
 * @property {MobileMoneyDetails} [mobileMoneyDetails] - Mobile money payment details
 * @property {BankDetails} [bankDetails] - Bank transfer details
 * @property {CryptoDetails} [cryptoDetails] - Cryptocurrency payment details
 */

/**
 * @typedef {Object} CardDetails
 * @property {string} cardNumber - Card number
 * @property {string} expiryMonth - Expiry month
 * @property {string} expiryYear - Expiry year
 * @property {string} cvv - CVV
 * @property {string} cardholderName - Cardholder name
 */

/**
 * @typedef {Object} MobileMoneyDetails
 * @property {string} provider - Mobile money provider
 * @property {string} phoneNumber - Phone number
 */

/**
 * @typedef {Object} BankDetails
 * @property {string} [accountNumber] - Account number
 * @property {string} [routingNumber] - Routing number
 * @property {string} [iban] - IBAN
 * @property {string} [bic] - BIC
 * @property {string} [swiftCode] - SWIFT code
 * @property {string} [upiId] - UPI ID
 * @property {string} [accountHolderName] - Account holder name
 */

/**
 * @typedef {Object} CryptoDetails
 * @property {string} cryptoType - Cryptocurrency type
 * @property {string} destinationAddress - Destination address
 * @property {string} [destinationTag] - Destination tag (for XRP)
 * @property {string} [cryptoAmount] - Cryptocurrency amount
 */

/**
 * @typedef {Object} PaymentResult
 * @property {boolean} success - Whether the payment was successful
 * @property {string} message - Result message
 * @property {string} transactionId - Transaction ID
 * @property {string} [status] - Transaction status
 * @property {string} [amount] - Payment amount
 * @property {string} [currency] - Payment currency
 * @property {string} [paymentMethod] - Payment method
 * @property {string} [timestamp] - Transaction timestamp
 * @property {string} [errorCode] - Error code
 */

/**
 * @typedef {Object} TransactionStatus
 * @property {boolean} success - Whether the request was successful
 * @property {string} status - Transaction status
 * @property {string} transactionId - Transaction ID
 * @property {string} [amount] - Payment amount
 * @property {string} [currency] - Payment currency
 * @property {string} [timestamp] - Transaction timestamp
 * @property {string} [lastUpdated] - Last updated timestamp
 * @property {string} [paymentMethod] - Payment method
 */

/**
 * @typedef {Object} PaymentLinkResult
 * @property {boolean} success - Whether the request was successful
 * @property {string} paymentLink - Payment link URL
 * @property {string} [qrCode] - QR code data
 * @property {string} [expiresAt] - Expiry timestamp
 */

/**
 * @typedef {Object} TokenizationResult
 * @property {boolean} success - Whether the request was successful
 * @property {string} token - Payment method token
 * @property {string} [last4] - Last 4 digits of card number
 * @property {string} [expiryMonth] - Card expiry month
 * @property {string} [expiryYear] - Card expiry year
 * @property {string} [cardType] - Card type
 */

/**
 * @typedef {Object} CustomerResult
 * @property {boolean} success - Whether the request was successful
 * @property {string} customerId - Customer ID
 * @property {string} [email] - Customer email
 * @property {string} [name] - Customer name
 * @property {string} [createdAt] - Creation timestamp
 */

/**
 * @typedef {Object} P2PTransferResult
 * @property {boolean} success - Whether the request was successful
 * @property {string} transactionId - Transaction ID
 * @property {string} senderId - Sender ID
 * @property {string} recipientId - Recipient ID
 * @property {string} amount - Transfer amount
 * @property {string} currency - Transfer currency
 * @property {string} [status] - Transaction status
 * @property {string} [timestamp] - Transaction timestamp
 */

/**
 * @typedef {Object} MoneyRequestResult
 * @property {boolean} success - Whether the request was successful
 * @property {string} requestId - Request ID
 * @property {string} requesterId - Requester ID
 * @property {string} requesteeId - Requestee ID
 * @property {string} amount - Request amount
 * @property {string} currency - Request currency
 * @property {string} status - Request status
 * @property {string} [createdAt] - Creation timestamp
 * @property {string} [expiresAt] - Expiry timestamp
 */

/**
 * @typedef {Object} QRCodeResult
 * @property {boolean} success - Whether the request was successful
 * @property {string} qrId - QR code ID
 * @property {string} qrContent - QR code content
 * @property {string} [qrImage] - QR code image data
 * @property {string} [expiresAt] - Expiry timestamp
 */

export default {};