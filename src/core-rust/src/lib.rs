//! Sunny Payment Gateway Core
//! 
//! High-performance, secure payment processing core written in Rust.
//! This library provides the core functionality for processing payments,
//! with a focus on security, performance, and reliability.

#![forbid(unsafe_code)]
#![warn(missing_docs)]
#![warn(clippy::all)]

use std::sync::Arc;

pub mod config;
pub mod crypto;
pub mod error;
pub mod models;
pub mod processing;
pub mod storage;
pub mod validation;

/// Re-export common types
pub use error::{Error, Result};

/// Core payment processor
#[derive(Clone)]
pub struct SunnyCore {
    config: Arc<config::Config>,
    storage: Arc<dyn storage::Storage>,
    crypto_provider: Arc<dyn crypto::CryptoProvider>,
}

impl SunnyCore {
    /// Create a new instance of the payment processor
    pub async fn new(config: config::Config) -> Result<Self> {
        let storage = storage::create_storage(&config).await?;
        let crypto_provider = crypto::create_provider(&config)?;
        
        Ok(Self {
            config: Arc::new(config),
            storage: Arc::new(storage),
            crypto_provider: Arc::new(crypto_provider),
        })
    }
    
    /// Process a payment
    pub async fn process_payment(&self, payment: models::Payment) -> Result<models::Transaction> {
        // Validate the payment
        validation::validate_payment(&payment)?;
        
        // Process the payment
        let processor = processing::get_processor(&payment.payment_method)?;
        let transaction = processor.process(payment, &self.config, &self.crypto_provider).await?;
        
        // Store the transaction
        self.storage.store_transaction(&transaction).await?;
        
        Ok(transaction)
    }
    
    /// Verify a payment
    pub async fn verify_payment(&self, transaction_id: &str) -> Result<models::TransactionStatus> {
        let transaction = self.storage.get_transaction(transaction_id).await?;
        let processor = processing::get_processor(&transaction.payment_method)?;
        
        processor.verify(transaction_id, &self.config).await
    }
    
    /// Refund a payment
    pub async fn refund_payment(&self, refund: models::Refund) -> Result<models::Transaction> {
        // Validate the refund
        validation::validate_refund(&refund)?;
        
        // Get the original transaction
        let transaction = self.storage.get_transaction(&refund.transaction_id).await?;
        
        // Process the refund
        let processor = processing::get_processor(&transaction.payment_method)?;
        let refund_transaction = processor.refund(refund, transaction, &self.config).await?;
        
        // Store the refund transaction
        self.storage.store_transaction(&refund_transaction).await?;
        
        Ok(refund_transaction)
    }
    
    /// Create a payment token
    pub async fn create_token(&self, token_request: models::TokenRequest) -> Result<models::Token> {
        // Validate the token request
        validation::validate_token_request(&token_request)?;
        
        // Create the token
        let token = self.crypto_provider.create_token(&token_request)?;
        
        // Store the token
        self.storage.store_token(&token).await?;
        
        Ok(token)
    }
    
    /// Process a marketplace payment with splits
    pub async fn process_marketplace_payment(
        &self,
        payment: models::MarketplacePayment,
    ) -> Result<models::MarketplaceTransaction> {
        // Validate the marketplace payment
        validation::validate_marketplace_payment(&payment)?;
        
        // Process the main payment
        let main_transaction = self.process_payment(payment.payment.clone()).await?;
        
        // Process the splits
        let mut split_transactions = Vec::new();
        for split in payment.splits {
            let split_transaction = self.process_split(split, &main_transaction).await?;
            split_transactions.push(split_transaction);
        }
        
        // Create the marketplace transaction
        let marketplace_transaction = models::MarketplaceTransaction {
            id: main_transaction.id.clone(),
            main_transaction,
            split_transactions,
            created_at: chrono::Utc::now(),
        };
        
        // Store the marketplace transaction
        self.storage.store_marketplace_transaction(&marketplace_transaction).await?;
        
        Ok(marketplace_transaction)
    }
    
    async fn process_split(
        &self,
        split: models::Split,
        main_transaction: &models::Transaction,
    ) -> Result<models::SplitTransaction> {
        // Create the split transaction
        let split_transaction = models::SplitTransaction {
            id: uuid::Uuid::new_v4().to_string(),
            main_transaction_id: main_transaction.id.clone(),
            destination: split.destination,
            amount: split.amount,
            currency: split.currency,
            status: models::TransactionStatus::Pending,
            created_at: chrono::Utc::now(),
            updated_at: chrono::Utc::now(),
        };
        
        // Process the split transfer
        let processor = processing::get_processor("internal_transfer")?;
        let updated_split = processor.process_split(split_transaction.clone(), &self.config).await?;
        
        // Store the split transaction
        self.storage.store_split_transaction(&updated_split).await?;
        
        Ok(updated_split)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[tokio::test]
    async fn test_process_payment() {
        // This is just a placeholder for actual tests
        // In a real implementation, we would use mocks and test various scenarios
    }
}