//! Rule-based fraud detection
//!
//! This module provides a rule-based approach to fraud detection,
//! using configurable rules to identify potentially fraudulent transactions.

use std::collections::HashMap;
use async_trait::async_trait;

use crate::{
    config::Config,
    error::{Error, Result},
    models::Payment,
};

use super::{FraudDetectionService, FraudAnalysisResult, FraudType, RecommendedAction, VerificationOption};

/// Rule-based fraud detection service
pub struct RuleBasedFraudDetection {
    rules: Vec<Box<dyn Rule>>,
    config: Config,
}

impl RuleBasedFraudDetection {
    /// Create a new rule-based fraud detection service
    pub fn new(config: &Config) -> Result<Self> {
        let mut rules: Vec<Box<dyn Rule>> = Vec::new();
        
        // Add standard rules
        rules.push(Box::new(VelocityRule::new(config)?));
        rules.push(Box::new(AmountRule::new(config)?));
        rules.push(Box::new(GeoLocationRule::new(config)?));
        rules.push(Box::new(BinCheckRule::new(config)?));
        rules.push(Box::new(DeviceFingerprintRule::new(config)?));
        rules.push(Box::new(TimeOfDayRule::new(config)?));
        
        // Add custom rules if configured
        if let Some(custom_rules) = &config.custom_fraud_rules {
            for rule_config in custom_rules {
                let rule = CustomRule::new(rule_config)?;
                rules.push(Box::new(rule));
            }
        }
        
        Ok(Self {
            rules,
            config: config.clone(),
        })
    }
}

#[async_trait]
impl FraudDetectionService for RuleBasedFraudDetection {
    async fn analyze_payment(&self, payment: &Payment) -> Result<FraudAnalysisResult> {
        let mut is_fraudulent = false;
        let mut risk_score = 0;
        let mut reason = None;
        let mut fraud_type = None;
        let mut verification_options = Vec::new();
        
        // Create context for rule evaluation
        let context = RuleContext {
            payment,
            merchant_id: &payment.merchant_id,
            ip_address: payment.metadata.get("ip_address"),
            user_agent: payment.metadata.get("user_agent"),
            device_id: payment.metadata.get("device_id"),
        };
        
        // Evaluate all rules
        for rule in &self.rules {
            let result = rule.evaluate(&context).await?;
            
            // Update risk score (take the maximum)
            if result.risk_score > risk_score {
                risk_score = result.risk_score;
            }
            
            // If any rule flags as fraudulent, the transaction is considered fraudulent
            if result.is_fraudulent {
                is_fraudulent = true;
                reason = result.reason.clone();
                fraud_type = result.fraud_type.clone();
            }
            
            // Collect all verification options
            verification_options.extend(result.verification_options.clone());
        }
        
        // Determine recommended action based on risk score
        let recommended_action = if is_fraudulent {
            RecommendedAction::Decline
        } else if risk_score >= 80 {
            RecommendedAction::Review
        } else if risk_score >= 50 {
            RecommendedAction::RequestVerification
        } else {
            RecommendedAction::Allow
        };
        
        Ok(FraudAnalysisResult {
            is_fraudulent,
            risk_score,
            reason,
            fraud_type,
            recommended_action,
            verification_options,
        })
    }
    
    async fn report_fraud(&self, transaction_id: &str, fraud_type: FraudType) -> Result<()> {
        // In a real implementation, this would store the fraud report in a database
        // and potentially update the rules or ML models
        println!("Fraud reported for transaction {}: {:?}", transaction_id, fraud_type);
        Ok(())
    }
    
    async fn report_false_positive(&self, transaction_id: &str) -> Result<()> {
        // In a real implementation, this would store the false positive report in a database
        // and potentially update the rules or ML models
        println!("False positive reported for transaction {}", transaction_id);
        Ok(())
    }
}

/// Rule trait for fraud detection rules
#[async_trait]
trait Rule: Send + Sync {
    /// Evaluate the rule against a payment
    async fn evaluate(&self, context: &RuleContext<'_>) -> Result<RuleResult>;
}

/// Context for rule evaluation
struct RuleContext<'a> {
    /// Payment being evaluated
    payment: &'a Payment,
    
    /// Merchant ID
    merchant_id: &'a str,
    
    /// IP address of the customer
    ip_address: Option<&'a String>,
    
    /// User agent of the customer
    user_agent: Option<&'a String>,
    
    /// Device ID of the customer
    device_id: Option<&'a String>,
}

/// Result of rule evaluation
#[derive(Debug, Clone)]
struct RuleResult {
    /// Whether the rule flagged the transaction as fraudulent
    is_fraudulent: bool,
    
    /// Risk score (0-100, higher means more risky)
    risk_score: u8,
    
    /// Reason for flagging as fraudulent, if applicable
    reason: Option<String>,
    
    /// Fraud type, if detected
    fraud_type: Option<FraudType>,
    
    /// Additional verification steps that could be taken
    verification_options: Vec<VerificationOption>,
}

/// Velocity rule to detect rapid succession of transactions
struct VelocityRule {
    max_transactions_per_hour: u32,
    max_amount_per_hour: u64,
}

impl VelocityRule {
    fn new(config: &Config) -> Result<Self> {
        Ok(Self {
            max_transactions_per_hour: config.max_transactions_per_hour.unwrap_or(10),
            max_amount_per_hour: config.max_amount_per_hour.unwrap_or(10000),
        })
    }
}

#[async_trait]
impl Rule for VelocityRule {
    async fn evaluate(&self, context: &RuleContext<'_>) -> Result<RuleResult> {
        // In a real implementation, this would query a database to check
        // the number and amount of transactions in the last hour
        
        // For this example, we'll just return a non-fraudulent result
        Ok(RuleResult {
            is_fraudulent: false,
            risk_score: 0,
            reason: None,
            fraud_type: None,
            verification_options: vec![],
        })
    }
}

/// Amount rule to detect unusually large transactions
struct AmountRule {
    high_amount_threshold: u64,
    very_high_amount_threshold: u64,
}

impl AmountRule {
    fn new(config: &Config) -> Result<Self> {
        Ok(Self {
            high_amount_threshold: config.high_amount_threshold.unwrap_or(1000),
            very_high_amount_threshold: config.very_high_amount_threshold.unwrap_or(10000),
        })
    }
}

#[async_trait]
impl Rule for AmountRule {
    async fn evaluate(&self, context: &RuleContext<'_>) -> Result<RuleResult> {
        let amount = context.payment.amount.to_u64().unwrap_or(0);
        
        if amount >= self.very_high_amount_threshold {
            Ok(RuleResult {
                is_fraudulent: false, // Not automatically fraudulent, but high risk
                risk_score: 80,
                reason: Some("Very high transaction amount".to_string()),
                fraud_type: None,
                verification_options: vec![
                    VerificationOption::ThreeDSecure,
                    VerificationOption::PhoneVerification,
                ],
            })
        } else if amount >= self.high_amount_threshold {
            Ok(RuleResult {
                is_fraudulent: false,
                risk_score: 50,
                reason: Some("High transaction amount".to_string()),
                fraud_type: None,
                verification_options: vec![VerificationOption::ThreeDSecure],
            })
        } else {
            Ok(RuleResult {
                is_fraudulent: false,
                risk_score: 0,
                reason: None,
                fraud_type: None,
                verification_options: vec![],
            })
        }
    }
}

/// Geo-location rule to detect transactions from high-risk locations
struct GeoLocationRule {
    high_risk_countries: Vec<String>,
}

impl GeoLocationRule {
    fn new(config: &Config) -> Result<Self> {
        Ok(Self {
            high_risk_countries: config.high_risk_countries.clone().unwrap_or_default(),
        })
    }
}

#[async_trait]
impl Rule for GeoLocationRule {
    async fn evaluate(&self, context: &RuleContext<'_>) -> Result<RuleResult> {
        // In a real implementation, this would use the IP address to determine
        // the country of origin and check against the high-risk countries list
        
        // For this example, we'll just return a non-fraudulent result
        Ok(RuleResult {
            is_fraudulent: false,
            risk_score: 0,
            reason: None,
            fraud_type: None,
            verification_options: vec![],
        })
    }
}

/// BIN check rule to detect cards from high-risk banks or regions
struct BinCheckRule {
    high_risk_bins: Vec<String>,
}

impl BinCheckRule {
    fn new(config: &Config) -> Result<Self> {
        Ok(Self {
            high_risk_bins: config.high_risk_bins.clone().unwrap_or_default(),
        })
    }
}

#[async_trait]
impl Rule for BinCheckRule {
    async fn evaluate(&self, context: &RuleContext<'_>) -> Result<RuleResult> {
        // In a real implementation, this would extract the BIN (first 6 digits)
        // from the card number and check against the high-risk BINs list
        
        // For this example, we'll just return a non-fraudulent result
        Ok(RuleResult {
            is_fraudulent: false,
            risk_score: 0,
            reason: None,
            fraud_type: None,
            verification_options: vec![],
        })
    }
}

/// Device fingerprint rule to detect suspicious devices
struct DeviceFingerprintRule {
    // Configuration options
}

impl DeviceFingerprintRule {
    fn new(_config: &Config) -> Result<Self> {
        Ok(Self {})
    }
}

#[async_trait]
impl Rule for DeviceFingerprintRule {
    async fn evaluate(&self, context: &RuleContext<'_>) -> Result<RuleResult> {
        // In a real implementation, this would analyze the device fingerprint
        // to detect suspicious devices or emulators
        
        // For this example, we'll just return a non-fraudulent result
        Ok(RuleResult {
            is_fraudulent: false,
            risk_score: 0,
            reason: None,
            fraud_type: None,
            verification_options: vec![],
        })
    }
}

/// Time of day rule to detect transactions at unusual hours
struct TimeOfDayRule {
    // Configuration options
}

impl TimeOfDayRule {
    fn new(_config: &Config) -> Result<Self> {
        Ok(Self {})
    }
}

#[async_trait]
impl Rule for TimeOfDayRule {
    async fn evaluate(&self, _context: &RuleContext<'_>) -> Result<RuleResult> {
        // In a real implementation, this would check if the transaction is
        // occurring at an unusual time for the customer
        
        // For this example, we'll just return a non-fraudulent result
        Ok(RuleResult {
            is_fraudulent: false,
            risk_score: 0,
            reason: None,
            fraud_type: None,
            verification_options: vec![],
        })
    }
}

/// Custom rule defined by configuration
struct CustomRule {
    name: String,
    condition: String,
    risk_score: u8,
    is_fraudulent: bool,
    reason: Option<String>,
    fraud_type: Option<FraudType>,
    verification_options: Vec<VerificationOption>,
}

impl CustomRule {
    fn new(rule_config: &HashMap<String, String>) -> Result<Self> {
        let name = rule_config.get("name")
            .ok_or_else(|| Error::Configuration("Custom rule must have a name".into()))?
            .clone();
        
        let condition = rule_config.get("condition")
            .ok_or_else(|| Error::Configuration("Custom rule must have a condition".into()))?
            .clone();
        
        let risk_score = rule_config.get("risk_score")
            .map(|s| s.parse::<u8>().unwrap_or(50))
            .unwrap_or(50);
        
        let is_fraudulent = rule_config.get("is_fraudulent")
            .map(|s| s.to_lowercase() == "true")
            .unwrap_or(false);
        
        let reason = rule_config.get("reason").cloned();
        
        let fraud_type = rule_config.get("fraud_type").map(|s| {
            match s.as_str() {
                "stolen_credentials" => FraudType::StolenCredentials,
                "account_takeover" => FraudType::AccountTakeover,
                "identity_theft" => FraudType::IdentityTheft,
                "friendly_fraud" => FraudType::FriendlyFraud,
                "card_testing" => FraudType::CardTesting,
                "money_laundering" => FraudType::MoneyLaundering,
                "triangulation_fraud" => FraudType::TriangulationFraud,
                "refund_fraud" => FraudType::RefundFraud,
                "promotion_abuse" => FraudType::PromotionAbuse,
                _ => FraudType::Other(s.clone()),
            }
        });
        
        let verification_options = rule_config.get("verification_options")
            .map(|s| {
                s.split(',')
                    .map(|option| match option.trim() {
                        "3ds" => VerificationOption::ThreeDSecure,
                        "otp" => VerificationOption::Otp,
                        "avs" => VerificationOption::AddressVerification,
                        "phone" => VerificationOption::PhoneVerification,
                        "email" => VerificationOption::EmailVerification,
                        "document" => VerificationOption::DocumentVerification,
                        "biometric" => VerificationOption::BiometricVerification,
                        _ => VerificationOption::Otp, // Default to OTP
                    })
                    .collect()
            })
            .unwrap_or_default();
        
        Ok(Self {
            name,
            condition,
            risk_score,
            is_fraudulent,
            reason,
            fraud_type,
            verification_options,
        })
    }
}

#[async_trait]
impl Rule for CustomRule {
    async fn evaluate(&self, context: &RuleContext<'_>) -> Result<RuleResult> {
        // In a real implementation, this would evaluate the condition expression
        // against the payment data
        
        // For this example, we'll just return a non-fraudulent result
        Ok(RuleResult {
            is_fraudulent: false,
            risk_score: 0,
            reason: None,
            fraud_type: None,
            verification_options: vec![],
        })
    }
}