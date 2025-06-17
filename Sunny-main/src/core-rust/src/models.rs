//! Data models for the payment processing system
//!
//! This module defines the core data structures used throughout the system.

use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

/// Payment request
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Payment {
    /// Unique identifier for the payment
    #[serde(default = "generate_id")]
    pub id: String,
    
    /// Amount to charge in the smallest currency unit (e.g., cents)
    pub amount: Decimal,
    
    /// Currency code (ISO 4217)
    pub currency: String,
    
    /// Payment method to use
    pub payment_method: String,
    
    /// Payment method details
    pub payment_method_details: PaymentMethodDetails,
    
    /// Customer information
    pub customer: Option<Customer>,
    
    /// Billing information
    pub billing: Option<Address>,
    
    /// Shipping information
    pub shipping: Option<Address>,
    
    /// Description of the payment
    pub description: Option<String>,
    
    /// Whether to capture the payment immediately
    #[serde(default = "default_capture")]
    pub capture: bool,
    
    /// Whether to process instant settlement
    #[serde(default)]
    pub instant_settlement: bool,
    
    /// Idempotency key to prevent duplicate processing
    pub idempotency_key: Option<String>,
    
    /// Additional metadata
    #[serde(default)]
    pub metadata: HashMap<String, String>,
}

/// Payment method details
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type")]
pub enum PaymentMethodDetails {
    /// Credit or debit card
    #[serde(rename = "card")]
    Card {
        /// Card number
        number: String,
        
        /// Expiration month (1-12)
        exp_month: u8,
        
        /// Expiration year (e.g., 2025)
        exp_year: u16,
        
        /// Card verification code
        cvc: String,
    },
    
    /// Bank transfer
    #[serde(rename = "bank_transfer")]
    BankTransfer {
        /// Account number
        account_number: String,
        
        /// Routing number
        routing_number: String,
        
        /// Account type
        account_type: String,
        
        /// Bank name
        bank_name: Option<String>,
    },
    
    /// Mobile money
    #[serde(rename = "mobile_money")]
    MobileMoney {
        /// Phone number
        phone_number: String,
        
        /// Provider (e.g., M-Pesa, MTN)
        provider: String,
        
        /// Country code
        country: String,
    },
    
    /// Cryptocurrency
    #[serde(rename = "crypto")]
    Crypto {
        /// Cryptocurrency code (e.g., BTC, ETH)
        currency: String,
        
        /// Wallet address
        address: Option<String>,
    },
    
    /// Payment token
    #[serde(rename = "token")]
    Token {
        /// Token ID
        token: String,
    },
}

/// Customer information
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Customer {
    /// Unique identifier for the customer
    pub id: Option<String>,
    
    /// Customer's name
    pub name: Option<String>,
    
    /// Customer's email
    pub email: Option<String>,
    
    /// Customer's phone number
    pub phone: Option<String>,
}

/// Address information
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Address {
    /// First line of the address
    pub line1: String,
    
    /// Second line of the address
    pub line2: Option<String>,
    
    /// City
    pub city: String,
    
    /// State or province
    pub state: Option<String>,
    
    /// Postal code
    pub postal_code: String,
    
    /// Country code (ISO 3166-1 alpha-2)
    pub country: String,
}

/// Transaction status
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum TransactionStatus {
    /// Transaction is pending
    Pending,
    
    /// Transaction is being processed
    Processing,
    
    /// Transaction was successful
    Succeeded,
    
    /// Transaction failed
    Failed,
    
    /// Transaction was canceled
    Canceled,
    
    /// Transaction was refunded
    Refunded,
    
    /// Transaction was partially refunded
    PartiallyRefunded,
}

/// Transaction
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Transaction {
    /// Unique identifier for the transaction
    pub id: String,
    
    /// Amount charged in the smallest currency unit
    pub amount: Decimal,
    
    /// Currency code
    pub currency: String,
    
    /// Payment method used
    pub payment_method: String,
    
    /// Transaction status
    pub status: TransactionStatus,
    
    /// Error code if the transaction failed
    pub error_code: Option<String>,
    
    /// Error message if the transaction failed
    pub error_message: Option<String>,
    
    /// Customer information
    pub customer: Option<Customer>,
    
    /// Description of the transaction
    pub description: Option<String>,
    
    /// Fee charged for the transaction
    pub fee: Option<Decimal>,
    
    /// Fee details
    pub fee_details: Option<FeeDetails>,
    
    /// Whether the transaction was settled instantly
    pub instant_settlement: bool,
    
    /// Settlement status
    pub settlement_status: Option<SettlementStatus>,
    
    /// Processor-specific details
    pub processor_details: Option<HashMap<String, String>>,
    
    /// Additional metadata
    pub metadata: HashMap<String, String>,
    
    /// When the transaction was created
    pub created_at: chrono::DateTime<chrono::Utc>,
    
    /// When the transaction was last updated
    pub updated_at: chrono::DateTime<chrono::Utc>,
}

/// Fee details
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FeeDetails {
    /// Base fee amount
    pub base: Decimal,
    
    /// Percentage fee amount
    pub percentage: Decimal,
    
    /// Additional fees
    pub additional: HashMap<String, Decimal>,
    
    /// Total fee amount
    pub total: Decimal,
}

/// Settlement status
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum SettlementStatus {
    /// Settlement is pending
    Pending,
    
    /// Settlement is in progress
    InProgress,
    
    /// Settlement is complete
    Completed,
    
    /// Settlement failed
    Failed,
}

/// Refund request
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Refund {
    /// Unique identifier for the refund
    #[serde(default = "generate_id")]
    pub id: String,
    
    /// ID of the transaction to refund
    pub transaction_id: String,
    
    /// Amount to refund (defaults to full amount if not specified)
    pub amount: Option<Decimal>,
    
    /// Reason for the refund
    pub reason: Option<String>,
    
    /// Additional metadata
    #[serde(default)]
    pub metadata: HashMap<String, String>,
}

/// Token request
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TokenRequest {
    /// Type of token to create
    pub token_type: String,
    
    /// Data to tokenize
    pub data: HashMap<String, String>,
    
    /// Time-to-live in seconds
    pub ttl: Option<u64>,
    
    /// Additional metadata
    #[serde(default)]
    pub metadata: HashMap<String, String>,
}

/// Token
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Token {
    /// Unique identifier for the token
    pub id: String,
    
    /// Encrypted token data
    pub data: String,
    
    /// When the token expires (Unix timestamp)
    pub expires_at: u64,
    
    /// Type of token
    pub token_type: String,
    
    /// When the token was created (Unix timestamp)
    pub created_at: u64,
}

/// Marketplace payment
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MarketplacePayment {
    /// Main payment
    pub payment: Payment,
    
    /// Payment splits
    pub splits: Vec<Split>,
}

/// Payment split
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Split {
    /// Destination account ID
    pub destination: String,
    
    /// Amount to transfer
    pub amount: Decimal,
    
    /// Currency code
    pub currency: String,
    
    /// Additional metadata
    #[serde(default)]
    pub metadata: HashMap<String, String>,
}

/// Split transaction
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SplitTransaction {
    /// Unique identifier for the split transaction
    pub id: String,
    
    /// ID of the main transaction
    pub main_transaction_id: String,
    
    /// Destination account ID
    pub destination: String,
    
    /// Amount transferred
    pub amount: Decimal,
    
    /// Currency code
    pub currency: String,
    
    /// Transaction status
    pub status: TransactionStatus,
    
    /// When the split transaction was created
    pub created_at: chrono::DateTime<chrono::Utc>,
    
    /// When the split transaction was last updated
    pub updated_at: chrono::DateTime<chrono::Utc>,
}

/// Marketplace transaction
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MarketplaceTransaction {
    /// Unique identifier for the marketplace transaction
    pub id: String,
    
    /// Main transaction
    pub main_transaction: Transaction,
    
    /// Split transactions
    pub split_transactions: Vec<SplitTransaction>,
    
    /// When the marketplace transaction was created
    pub created_at: chrono::DateTime<chrono::Utc>,
}

/// Generate a unique ID
fn generate_id() -> String {
    uuid::Uuid::new_v4().to_string()
}

/// Default value for capture flag
fn default_capture() -> bool {
    true
}