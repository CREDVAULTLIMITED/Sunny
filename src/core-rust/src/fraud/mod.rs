//! Advanced fraud detection system
//!
//! This module provides comprehensive fraud detection capabilities using
//! machine learning, behavioral analysis, and rule-based systems.

use std::sync::Arc;
use async_trait::async_trait;

use crate::{
    config::Config,
    error::{Error, Result},
    models::{Payment, Transaction},
};

/// Fraud detection service trait
#[async_trait]
pub trait FraudDetectionService: Send + Sync {
    /// Analyze a payment for potential fraud
    async fn analyze_payment(&self, payment: &Payment) -> Result<FraudAnalysisResult>;
    
    /// Report a confirmed fraudulent transaction
    async fn report_fraud(&self, transaction_id: &str, fraud_type: FraudType) -> Result<()>;
    
    /// Report a false positive (transaction incorrectly flagged as fraud)
    async fn report_false_positive(&self, transaction_id: &str) -> Result<()>;
}

/// Fraud analysis result
#[derive(Debug, Clone)]
pub struct FraudAnalysisResult {
    /// Whether the transaction is potentially fraudulent
    pub is_fraudulent: bool,
    
    /// Risk score (0-100, higher means more risky)
    pub risk_score: u8,
    
    /// Reason for flagging as fraudulent, if applicable
    pub reason: Option<String>,
    
    /// Fraud type, if detected
    pub fraud_type: Option<FraudType>,
    
    /// Recommended action
    pub recommended_action: RecommendedAction,
    
    /// Additional verification steps that could be taken
    pub verification_options: Vec<VerificationOption>,
}

/// Types of fraud
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum FraudType {
    /// Stolen payment credentials
    StolenCredentials,
    
    /// Account takeover
    AccountTakeover,
    
    /// Identity theft
    IdentityTheft,
    
    /// Friendly fraud (chargeback fraud)
    FriendlyFraud,
    
    /// Card testing
    CardTesting,
    
    /// Money laundering
    MoneyLaundering,
    
    /// Triangulation fraud
    TriangulationFraud,
    
    /// Refund fraud
    RefundFraud,
    
    /// Promotion abuse
    PromotionAbuse,
    
    /// Other fraud type
    Other(String),
}

/// Recommended actions for potentially fraudulent transactions
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum RecommendedAction {
    /// Allow the transaction
    Allow,
    
    /// Review the transaction manually
    Review,
    
    /// Request additional verification
    RequestVerification,
    
    /// Decline the transaction
    Decline,
}

/// Verification options for suspicious transactions
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum VerificationOption {
    /// 3D Secure authentication
    ThreeDSecure,
    
    /// One-time password
    Otp,
    
    /// Address verification
    AddressVerification,
    
    /// Phone verification
    PhoneVerification,
    
    /// Email verification
    EmailVerification,
    
    /// Document verification
    DocumentVerification,
    
    /// Biometric verification
    BiometricVerification,
}

/// Create a fraud detection service based on configuration
pub fn create_fraud_detection_service(config: &Config) -> Result<Arc<dyn FraudDetectionService>> {
    match config.fraud_detection_provider.as_str() {
        "ml" => {
            #[cfg(feature = "ml_fraud_detection")]
            {
                let service = ml::MachineLearningFraudDetection::new(config)?;
                Ok(Arc::new(service))
            }
            #[cfg(not(feature = "ml_fraud_detection"))]
            {
                Err(Error::Configuration("ML fraud detection not enabled".into()))
            }
        }
        "rules" => {
            let service = rules::RuleBasedFraudDetection::new(config)?;
            Ok(Arc::new(service))
        }
        "hybrid" => {
            #[cfg(feature = "ml_fraud_detection")]
            {
                let service = hybrid::HybridFraudDetection::new(config)?;
                Ok(Arc::new(service))
            }
            #[cfg(not(feature = "ml_fraud_detection"))]
            {
                Err(Error::Configuration("Hybrid fraud detection requires ML feature".into()))
            }
        }
        _ => Err(Error::Configuration(format!(
            "Unknown fraud detection provider: {}",
            config.fraud_detection_provider
        ))),
    }
}

// Import provider-specific modules
pub mod rules;
pub mod ml;
pub mod hybrid;
pub mod behavioral;
pub mod network;