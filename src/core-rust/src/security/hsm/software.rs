//! Software HSM implementation
//!
//! This module provides a software-based HSM implementation for development and testing.
//! It should NEVER be used in production environments.

use async_trait::async_trait;
use aes_gcm::{
    aead::{Aead, AeadCore, KeyInit, OsRng},
    Aes256Gcm, Key, Nonce,
};
use ed25519_dalek::{Keypair, PublicKey, SecretKey, Signature, Signer, Verifier};
use rand::{rngs::OsRng as RandOsRng, RngCore};
use sha2::{Sha256, Digest};
use std::{
    collections::HashMap,
    sync::{Arc, RwLock},
};
use uuid::Uuid;
use zeroize::Zeroize;

use crate::{
    config::Config,
    error::{Error, Result},
};

use super::{HsmService, KeyType};

/// Software HSM service for development and testing
pub struct SoftwareHsmService {
    keys: Arc<RwLock<HashMap<String, KeyEntry>>>,
}

/// Key entry in the software HSM
enum KeyEntry {
    /// AES-256 symmetric key
    Aes256(Vec<u8>),
    /// ED25519 key pair
    Ed25519(Keypair),
    /// RSA key pair (mock implementation)
    Rsa { private_key: Vec<u8>, public_key: Vec<u8> },
}

impl SoftwareHsmService {
    /// Create a new software HSM service
    pub async fn new(_config: &Config) -> Result<Self> {
        Ok(Self {
            keys: Arc::new(RwLock::new(HashMap::new())),
        })
    }
    
    /// Get an AES-256 key by ID
    fn get_aes_key(&self, key_id: &str) -> Result<Key<Aes256Gcm>> {
        let keys = self.keys.read().map_err(|e| {
            Error::Crypto(format!("Failed to read keys: {}", e))
        })?;
        
        let key_entry = keys.get(key_id).ok_or_else(|| {
            Error::Crypto(format!("Key not found: {}", key_id))
        })?;
        
        match key_entry {
            KeyEntry::Aes256(key_bytes) => {
                if key_bytes.len() != 32 {
                    return Err(Error::Crypto("Invalid AES-256 key length".into()));
                }
                
                let key = Key::<Aes256Gcm>::from_slice(key_bytes);
                Ok(*key)
            }
            _ => Err(Error::Crypto(format!("Key {} is not an AES-256 key", key_id))),
        }
    }
    
    /// Get an ED25519 key pair by ID
    fn get_ed25519_keypair(&self, key_id: &str) -> Result<Keypair> {
        let keys = self.keys.read().map_err(|e| {
            Error::Crypto(format!("Failed to read keys: {}", e))
        })?;
        
        let key_entry = keys.get(key_id).ok_or_else(|| {
            Error::Crypto(format!("Key not found: {}", key_id))
        })?;
        
        match key_entry {
            KeyEntry::Ed25519(keypair) => Ok(keypair.clone()),
            _ => Err(Error::Crypto(format!("Key {} is not an ED25519 key pair", key_id))),
        }
    }
}

#[async_trait]
impl HsmService for SoftwareHsmService {
    async fn encrypt(&self, key_id: &str, data: &[u8]) -> Result<Vec<u8>> {
        let key = self.get_aes_key(key_id)?;
        let cipher = Aes256Gcm::new(&key);
        let nonce = Aes256Gcm::generate_nonce(&mut OsRng);
        
        let ciphertext = cipher
            .encrypt(&nonce, data)
            .map_err(|e| Error::Crypto(format!("Encryption failed: {}", e)))?;
        
        // Prepend nonce to ciphertext
        let mut result = nonce.to_vec();
        result.extend_from_slice(&ciphertext);
        
        Ok(result)
    }
    
    async fn decrypt(&self, key_id: &str, encrypted_data: &[u8]) -> Result<Vec<u8>> {
        if encrypted_data.len() < 12 {
            return Err(Error::Crypto("Invalid encrypted data".into()));
        }
        
        let key = self.get_aes_key(key_id)?;
        let cipher = Aes256Gcm::new(&key);
        
        let nonce = Nonce::from_slice(&encrypted_data[..12]);
        let ciphertext = &encrypted_data[12..];
        
        cipher
            .decrypt(nonce, ciphertext)
            .map_err(|e| Error::Crypto(format!("Decryption failed: {}", e)))
    }
    
    async fn sign(&self, key_id: &str, data: &[u8]) -> Result<Vec<u8>> {
        let keypair = self.get_ed25519_keypair(key_id)?;
        let signature = keypair.sign(data);
        Ok(signature.to_bytes().to_vec())
    }
    
    async fn verify(&self, key_id: &str, data: &[u8], signature: &[u8]) -> Result<bool> {
        if signature.len() != ed25519_dalek::SIGNATURE_LENGTH {
            return Ok(false);
        }
        
        let keypair = self.get_ed25519_keypair(key_id)?;
        let sig = Signature::from_bytes(signature)
            .map_err(|e| Error::Crypto(format!("Invalid signature: {}", e)))?;
        
        Ok(keypair.verify(data, &sig).is_ok())
    }
    
    async fn generate_key(&self, key_type: KeyType) -> Result<String> {
        let key_id = format!("key-{}", Uuid::new_v4());
        
        let key_entry = match key_type {
            KeyType::Aes256 => {
                let mut key_bytes = vec![0u8; 32];
                RandOsRng.fill_bytes(&mut key_bytes);
                KeyEntry::Aes256(key_bytes)
            }
            KeyType::Ed25519 => {
                let mut csprng = RandOsRng;
                let keypair = Keypair::generate(&mut csprng);
                KeyEntry::Ed25519(keypair)
            }
            KeyType::EcdsaP256 | KeyType::EcdsaP384 | KeyType::Rsa2048 | KeyType::Rsa4096 => {
                // Mock implementation for other key types
                let mut private_key = vec![0u8; 32];
                let mut public_key = vec![0u8; 64];
                RandOsRng.fill_bytes(&mut private_key);
                RandOsRng.fill_bytes(&mut public_key);
                KeyEntry::Rsa { private_key, public_key }
            }
        };
        
        let mut keys = self.keys.write().map_err(|e| {
            Error::Crypto(format!("Failed to write keys: {}", e))
        })?;
        
        keys.insert(key_id.clone(), key_entry);
        
        Ok(key_id)
    }
    
    async fn import_key(&self, key_type: KeyType, key_material: &[u8]) -> Result<String> {
        let key_id = format!("key-{}", Uuid::new_v4());
        
        let key_entry = match key_type {
            KeyType::Aes256 => {
                if key_material.len() != 32 {
                    return Err(Error::Crypto("Invalid AES-256 key length".into()));
                }
                KeyEntry::Aes256(key_material.to_vec())
            }
            KeyType::Ed25519 => {
                if key_material.len() != 64 {
                    return Err(Error::Crypto("Invalid ED25519 key length".into()));
                }
                
                let secret = SecretKey::from_bytes(&key_material[..32])
                    .map_err(|e| Error::Crypto(format!("Invalid ED25519 secret key: {}", e)))?;
                
                let public = PublicKey::from_bytes(&key_material[32..])
                    .map_err(|e| Error::Crypto(format!("Invalid ED25519 public key: {}", e)))?;
                
                KeyEntry::Ed25519(Keypair { secret, public })
            }
            KeyType::EcdsaP256 | KeyType::EcdsaP384 | KeyType::Rsa2048 | KeyType::Rsa4096 => {
                // Mock implementation for other key types
                let private_key = key_material.to_vec();
                let public_key = vec![0u8; 64]; // Mock public key
                KeyEntry::Rsa { private_key, public_key }
            }
        };
        
        let mut keys = self.keys.write().map_err(|e| {
            Error::Crypto(format!("Failed to write keys: {}", e))
        })?;
        
        keys.insert(key_id.clone(), key_entry);
        
        Ok(key_id)
    }
    
    async fn get_public_key(&self, key_id: &str) -> Result<Vec<u8>> {
        let keys = self.keys.read().map_err(|e| {
            Error::Crypto(format!("Failed to read keys: {}", e))
        })?;
        
        let key_entry = keys.get(key_id).ok_or_else(|| {
            Error::Crypto(format!("Key not found: {}", key_id))
        })?;
        
        match key_entry {
            KeyEntry::Ed25519(keypair) => Ok(keypair.public.to_bytes().to_vec()),
            KeyEntry::Rsa { public_key, .. } => Ok(public_key.clone()),
            _ => Err(Error::Crypto(format!("Key {} does not have a public key", key_id))),
        }
    }
    
    async fn derive_key(&self, base_key_id: &str, info: &[u8]) -> Result<String> {
        let keys = self.keys.read().map_err(|e| {
            Error::Crypto(format!("Failed to read keys: {}", e))
        })?;
        
        let base_key_entry = keys.get(base_key_id).ok_or_else(|| {
            Error::Crypto(format!("Key not found: {}", base_key_id))
        })?;
        
        let key_material = match base_key_entry {
            KeyEntry::Aes256(key_bytes) => {
                // Simple key derivation using HKDF-like approach
                let mut hasher = Sha256::new();
                hasher.update(key_bytes);
                hasher.update(info);
                hasher.finalize().to_vec()
            }
            _ => return Err(Error::Crypto("Key derivation only supported for AES-256 keys".into())),
        };
        
        // Import the derived key
        self.import_key(KeyType::Aes256, &key_material).await
    }
    
    async fn wrap_key(&self, key_id: &str, wrapping_key_id: &str) -> Result<Vec<u8>> {
        let keys = self.keys.read().map_err(|e| {
            Error::Crypto(format!("Failed to read keys: {}", e))
        })?;
        
        let key_to_wrap = keys.get(key_id).ok_or_else(|| {
            Error::Crypto(format!("Key not found: {}", key_id))
        })?;
        
        // Serialize the key to wrap
        let key_bytes = match key_to_wrap {
            KeyEntry::Aes256(key_bytes) => key_bytes.clone(),
            KeyEntry::Ed25519(keypair) => {
                let mut bytes = Vec::with_capacity(64);
                bytes.extend_from_slice(&keypair.secret.to_bytes());
                bytes.extend_from_slice(&keypair.public.to_bytes());
                bytes
            }
            KeyEntry::Rsa { private_key, .. } => private_key.clone(),
        };
        
        // Encrypt the key using the wrapping key
        drop(keys); // Release the read lock before calling encrypt
        self.encrypt(wrapping_key_id, &key_bytes).await
    }
    
    async fn unwrap_key(&self, wrapped_key: &[u8], wrapping_key_id: &str, key_type: KeyType) -> Result<String> {
        // Decrypt the wrapped key
        let key_bytes = self.decrypt(wrapping_key_id, wrapped_key).await?;
        
        // Import the unwrapped key
        self.import_key(key_type, &key_bytes).await
    }
}