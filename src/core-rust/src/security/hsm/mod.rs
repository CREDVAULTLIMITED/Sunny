//! Hardware Security Module (HSM) integration
//!
//! This module provides integration with Hardware Security Modules for secure
//! cryptographic operations. HSMs provide a secure, tamper-resistant environment
//! for managing cryptographic keys and performing cryptographic operations.

use async_trait::async_trait;
use std::sync::Arc;
use zeroize::Zeroize;

use crate::{
    config::Config,
    error::{Error, Result},
    models::TokenRequest,
};

/// HSM provider type
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum HsmProvider {
    /// AWS CloudHSM
    AwsCloudHsm,
    /// Google Cloud HSM
    GoogleCloudHsm,
    /// Azure Key Vault HSM
    AzureKeyVault,
    /// Thales Luna HSM
    ThalesLuna,
    /// Utimaco HSM
    Utimaco,
    /// Software-based HSM (for development only)
    SoftwareHsm,
}

impl HsmProvider {
    /// Parse HSM provider from string
    pub fn from_str(s: &str) -> Result<Self> {
        match s.to_lowercase().as_str() {
            "aws" | "aws_cloudhsm" => Ok(HsmProvider::AwsCloudHsm),
            "google" | "google_cloudhsm" => Ok(HsmProvider::GoogleCloudHsm),
            "azure" | "azure_keyvault" => Ok(HsmProvider::AzureKeyVault),
            "thales" | "thales_luna" => Ok(HsmProvider::ThalesLuna),
            "utimaco" => Ok(HsmProvider::Utimaco),
            "software" | "software_hsm" => Ok(HsmProvider::SoftwareHsm),
            _ => Err(Error::Configuration(format!("Unknown HSM provider: {}", s))),
        }
    }
}

/// HSM service trait
#[async_trait]
pub trait HsmService: Send + Sync {
    /// Encrypt data using a key stored in the HSM
    async fn encrypt(&self, key_id: &str, data: &[u8]) -> Result<Vec<u8>>;
    
    /// Decrypt data using a key stored in the HSM
    async fn decrypt(&self, key_id: &str, encrypted_data: &[u8]) -> Result<Vec<u8>>;
    
    /// Sign data using a key stored in the HSM
    async fn sign(&self, key_id: &str, data: &[u8]) -> Result<Vec<u8>>;
    
    /// Verify a signature using a key stored in the HSM
    async fn verify(&self, key_id: &str, data: &[u8], signature: &[u8]) -> Result<bool>;
    
    /// Generate a random key in the HSM
    async fn generate_key(&self, key_type: KeyType) -> Result<String>;
    
    /// Import a key into the HSM
    async fn import_key(&self, key_type: KeyType, key_material: &[u8]) -> Result<String>;
    
    /// Get the public part of an asymmetric key
    async fn get_public_key(&self, key_id: &str) -> Result<Vec<u8>>;
    
    /// Derive a key from another key
    async fn derive_key(&self, base_key_id: &str, info: &[u8]) -> Result<String>;
    
    /// Wrap (encrypt) a key for export
    async fn wrap_key(&self, key_id: &str, wrapping_key_id: &str) -> Result<Vec<u8>>;
    
    /// Unwrap (decrypt) a wrapped key and import it
    async fn unwrap_key(&self, wrapped_key: &[u8], wrapping_key_id: &str, key_type: KeyType) -> Result<String>;
}

/// Key types supported by the HSM
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum KeyType {
    /// AES-256 symmetric key
    Aes256,
    /// ECDSA P-256 key pair
    EcdsaP256,
    /// ECDSA P-384 key pair
    EcdsaP384,
    /// RSA-2048 key pair
    Rsa2048,
    /// RSA-4096 key pair
    Rsa4096,
    /// ED25519 key pair
    Ed25519,
}

/// Create an HSM service based on configuration
pub async fn create_hsm_service(config: &Config) -> Result<Arc<dyn HsmService>> {
    let provider = HsmProvider::from_str(&config.hsm_provider)?;
    
    match provider {
        HsmProvider::AwsCloudHsm => {
            #[cfg(feature = "aws_cloudhsm")]
            {
                let service = aws::AwsCloudHsmService::new(config).await?;
                Ok(Arc::new(service))
            }
            #[cfg(not(feature = "aws_cloudhsm"))]
            {
                Err(Error::Configuration("AWS CloudHSM support not enabled".into()))
            }
        }
        HsmProvider::GoogleCloudHsm => {
            #[cfg(feature = "google_cloudhsm")]
            {
                let service = google::GoogleCloudHsmService::new(config).await?;
                Ok(Arc::new(service))
            }
            #[cfg(not(feature = "google_cloudhsm"))]
            {
                Err(Error::Configuration("Google Cloud HSM support not enabled".into()))
            }
        }
        HsmProvider::AzureKeyVault => {
            #[cfg(feature = "azure_keyvault")]
            {
                let service = azure::AzureKeyVaultService::new(config).await?;
                Ok(Arc::new(service))
            }
            #[cfg(not(feature = "azure_keyvault"))]
            {
                Err(Error::Configuration("Azure Key Vault HSM support not enabled".into()))
            }
        }
        HsmProvider::ThalesLuna => {
            #[cfg(feature = "thales_luna")]
            {
                let service = thales::ThalesLunaService::new(config).await?;
                Ok(Arc::new(service))
            }
            #[cfg(not(feature = "thales_luna"))]
            {
                Err(Error::Configuration("Thales Luna HSM support not enabled".into()))
            }
        }
        HsmProvider::Utimaco => {
            #[cfg(feature = "utimaco")]
            {
                let service = utimaco::UtimacoService::new(config).await?;
                Ok(Arc::new(service))
            }
            #[cfg(not(feature = "utimaco"))]
            {
                Err(Error::Configuration("Utimaco HSM support not enabled".into()))
            }
        }
        HsmProvider::SoftwareHsm => {
            // Software HSM is always available but should only be used for development
            if config.environment == "production" {
                Err(Error::Configuration("Software HSM cannot be used in production".into()))
            } else {
                let service = software::SoftwareHsmService::new(config).await?;
                Ok(Arc::new(service))
            }
        }
    }
}

// Import provider-specific modules
pub mod aws;
pub mod google;
pub mod azure;
pub mod thales;
pub mod utimaco;
pub mod software;