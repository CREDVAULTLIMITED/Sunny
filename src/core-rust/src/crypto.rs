//! Cryptographic operations for secure payment processing
//!
//! This module provides cryptographic primitives and operations for
//! securing payment data, including encryption, tokenization, and signing.

use aes_gcm::{
    aead::{Aead, AeadCore, KeyInit, OsRng},
    Aes256Gcm, Key, Nonce,
};
use base64::{engine::general_purpose::STANDARD as BASE64, Engine};
use ed25519_dalek::{Keypair, PublicKey, SecretKey, Signature, Signer, Verifier};
use hmac::{Hmac, Mac};
use rand::{rngs::OsRng as RandOsRng, RngCore};
use sha2::Sha256;
use std::time::{Duration, SystemTime, UNIX_EPOCH};
use zeroize::Zeroize;

use crate::{
    config::Config,
    error::{Error, Result},
    models::{Token, TokenRequest},
};

/// Trait for cryptographic operations
pub trait CryptoProvider: Send + Sync {
    /// Encrypt sensitive data
    fn encrypt(&self, data: &[u8]) -> Result<Vec<u8>>;
    
    /// Decrypt encrypted data
    fn decrypt(&self, encrypted_data: &[u8]) -> Result<Vec<u8>>;
    
    /// Create a token for payment data
    fn create_token(&self, token_request: &TokenRequest) -> Result<Token>;
    
    /// Verify a token
    fn verify_token(&self, token: &str, token_data: &[u8]) -> Result<bool>;
    
    /// Sign data
    fn sign(&self, data: &[u8]) -> Result<Vec<u8>>;
    
    /// Verify a signature
    fn verify_signature(&self, data: &[u8], signature: &[u8]) -> Result<bool>;
    
    /// Generate a secure random string
    fn generate_random_string(&self, length: usize) -> String;
}

/// Create a cryptographic provider based on configuration
pub fn create_provider(config: &Config) -> Result<impl CryptoProvider> {
    match config.crypto_provider.as_str() {
        "default" => Ok(DefaultCryptoProvider::new(config)?),
        "hsm" => {
            #[cfg(feature = "hsm")]
            {
                Ok(HsmCryptoProvider::new(config)?)
            }
            #[cfg(not(feature = "hsm"))]
            {
                Err(Error::Configuration("HSM support not enabled".into()))
            }
        }
        _ => Err(Error::Configuration(format!(
            "Unknown crypto provider: {}",
            config.crypto_provider
        ))),
    }
}

/// Default implementation of the CryptoProvider trait
pub struct DefaultCryptoProvider {
    encryption_key: Key<Aes256Gcm>,
    signing_keypair: Keypair,
    hmac_key: Vec<u8>,
}

impl DefaultCryptoProvider {
    /// Create a new instance with the given configuration
    pub fn new(config: &Config) -> Result<Self> {
        // In a real implementation, these keys would be loaded from a secure source
        // such as a key management service or HSM
        let encryption_key = if let Some(key) = &config.encryption_key {
            let key_bytes = BASE64.decode(key)
                .map_err(|e| Error::Crypto(format!("Failed to decode encryption key: {}", e)))?;
            
            if key_bytes.len() != 32 {
                return Err(Error::Crypto("Encryption key must be 32 bytes".into()));
            }
            
            *Key::<Aes256Gcm>::from_slice(&key_bytes)
        } else {
            let mut key_bytes = [0u8; 32];
            RandOsRng.fill_bytes(&mut key_bytes);
            let key = Key::<Aes256Gcm>::from(key_bytes);
            key_bytes.zeroize();
            key
        };
        
        let signing_keypair = if let (Some(public_key), Some(private_key)) = 
            (&config.signing_public_key, &config.signing_private_key) {
            let public_key_bytes = BASE64.decode(public_key)
                .map_err(|e| Error::Crypto(format!("Failed to decode public key: {}", e)))?;
            
            let private_key_bytes = BASE64.decode(private_key)
                .map_err(|e| Error::Crypto(format!("Failed to decode private key: {}", e)))?;
            
            let secret_key = SecretKey::from_bytes(&private_key_bytes)
                .map_err(|e| Error::Crypto(format!("Invalid private key: {}", e)))?;
            
            let public_key = PublicKey::from_bytes(&public_key_bytes)
                .map_err(|e| Error::Crypto(format!("Invalid public key: {}", e)))?;
            
            Keypair { secret: secret_key, public: public_key }
        } else {
            let mut csprng = RandOsRng;
            Keypair::generate(&mut csprng)
        };
        
        let hmac_key = if let Some(key) = &config.hmac_key {
            BASE64.decode(key)
                .map_err(|e| Error::Crypto(format!("Failed to decode HMAC key: {}", e)))?
        } else {
            let mut key = vec![0u8; 32];
            RandOsRng.fill_bytes(&mut key);
            key
        };
        
        Ok(Self {
            encryption_key,
            signing_keypair,
            hmac_key,
        })
    }
}

impl CryptoProvider for DefaultCryptoProvider {
    fn encrypt(&self, data: &[u8]) -> Result<Vec<u8>> {
        let cipher = Aes256Gcm::new(&self.encryption_key);
        let nonce = Aes256Gcm::generate_nonce(&mut OsRng);
        
        let ciphertext = cipher
            .encrypt(&nonce, data)
            .map_err(|e| Error::Crypto(format!("Encryption failed: {}", e)))?;
        
        // Prepend nonce to ciphertext
        let mut result = nonce.to_vec();
        result.extend_from_slice(&ciphertext);
        
        Ok(result)
    }
    
    fn decrypt(&self, encrypted_data: &[u8]) -> Result<Vec<u8>> {
        if encrypted_data.len() < 12 {
            return Err(Error::Crypto("Invalid encrypted data".into()));
        }
        
        let nonce = Nonce::from_slice(&encrypted_data[..12]);
        let ciphertext = &encrypted_data[12..];
        
        let cipher = Aes256Gcm::new(&self.encryption_key);
        
        cipher
            .decrypt(nonce, ciphertext)
            .map_err(|e| Error::Crypto(format!("Decryption failed: {}", e)))
    }
    
    fn create_token(&self, token_request: &TokenRequest) -> Result<Token> {
        // Serialize the token data
        let token_data = serde_json::to_vec(token_request)
            .map_err(|e| Error::Serialization(format!("Failed to serialize token request: {}", e)))?;
        
        // Encrypt the token data
        let encrypted_data = self.encrypt(&token_data)?;
        let encoded_data = BASE64.encode(&encrypted_data);
        
        // Generate a random token ID
        let token_id = self.generate_random_string(16);
        
        // Calculate expiration time
        let expiration = SystemTime::now()
            .checked_add(Duration::from_secs(token_request.ttl.unwrap_or(3600)))
            .ok_or_else(|| Error::Crypto("Failed to calculate token expiration".into()))?;
        
        let expiration_timestamp = expiration
            .duration_since(UNIX_EPOCH)
            .map_err(|e| Error::Crypto(format!("Failed to calculate expiration timestamp: {}", e)))?
            .as_secs();
        
        Ok(Token {
            id: token_id,
            data: encoded_data,
            expires_at: expiration_timestamp,
            token_type: token_request.token_type.clone(),
            created_at: SystemTime::now()
                .duration_since(UNIX_EPOCH)
                .map_err(|e| Error::Crypto(format!("Failed to get current timestamp: {}", e)))?
                .as_secs(),
        })
    }
    
    fn verify_token(&self, token: &str, token_data: &[u8]) -> Result<bool> {
        // In a real implementation, we would:
        // 1. Look up the token in the database
        // 2. Check if it's expired
        // 3. Decrypt the token data
        // 4. Compare with the provided token data
        
        // This is a simplified implementation
        let token_bytes = BASE64.decode(token)
            .map_err(|e| Error::Crypto(format!("Failed to decode token: {}", e)))?;
        
        if token_bytes.len() < 12 {
            return Ok(false);
        }
        
        let decrypted = self.decrypt(&token_bytes)?;
        
        Ok(decrypted == token_data)
    }
    
    fn sign(&self, data: &[u8]) -> Result<Vec<u8>> {
        let signature = self.signing_keypair.sign(data);
        Ok(signature.to_bytes().to_vec())
    }
    
    fn verify_signature(&self, data: &[u8], signature: &[u8]) -> Result<bool> {
        if signature.len() != ed25519_dalek::SIGNATURE_LENGTH {
            return Ok(false);
        }
        
        let sig = Signature::from_bytes(signature)
            .map_err(|e| Error::Crypto(format!("Invalid signature: {}", e)))?;
        
        Ok(self.signing_keypair.public.verify(data, &sig).is_ok())
    }
    
    fn generate_random_string(&self, length: usize) -> String {
        const CHARSET: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let mut rng = RandOsRng;
        let mut result = String::with_capacity(length);
        
        for _ in 0..length {
            let idx = rng.next_u32() as usize % CHARSET.len();
            result.push(CHARSET[idx] as char);
        }
        
        result
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::config::Config;
    
    #[test]
    fn test_encrypt_decrypt() {
        let config = Config::default();
        let provider = DefaultCryptoProvider::new(&config).unwrap();
        
        let data = b"sensitive payment data";
        let encrypted = provider.encrypt(data).unwrap();
        let decrypted = provider.decrypt(&encrypted).unwrap();
        
        assert_eq!(data.to_vec(), decrypted);
    }
    
    #[test]
    fn test_sign_verify() {
        let config = Config::default();
        let provider = DefaultCryptoProvider::new(&config).unwrap();
        
        let data = b"data to sign";
        let signature = provider.sign(data).unwrap();
        let valid = provider.verify_signature(data, &signature).unwrap();
        
        assert!(valid);
    }
}