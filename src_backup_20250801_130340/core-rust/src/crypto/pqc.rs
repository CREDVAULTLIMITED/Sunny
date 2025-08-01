use std::time::{SystemTime, UNIX_EPOCH};
use pqcrypto_dilithium::dilithium5::{
    keypair, sign, verify, PublicKey, SecretKey, Signature,
};
use pqcrypto_kyber::kyber1024::{
    decapsulate, encapsulate, keypair as kyber_keypair,
    PublicKey as KyberPublicKey, SecretKey as KyberSecretKey,
};
use zeroize::Zeroize;

use crate::error::{Error, Result};

const KEY_ROTATION_INTERVAL: u64 = 7 * 24 * 60 * 60; // 7 days in seconds
const MAX_SIGNATURE_AGE: u64 = 5 * 60; // 5 minutes in seconds

/// Post-Quantum Cryptography module for quantum-resistant operations
pub struct PQCProvider {
    signing_secret: SecretKey,
    signing_public: PublicKey,
    kem_secret: KyberSecretKey,
    kem_public: KyberPublicKey,
    created_at: u64,
    last_rotation: u64,
}

impl PQCProvider {
    pub fn new() -> Result<Self> {
        let now = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map_err(|e| Error::Crypto(format!("Time error: {}", e)))?
            .as_secs();

        // Generate Dilithium5 signing keypair for quantum-resistant signatures
        let (signing_public, signing_secret) = keypair();
        
        // Generate Kyber1024 KEM keypair for quantum-resistant key exchange
        let (kem_public, kem_secret) = kyber_keypair();
        
        Ok(Self {
            signing_secret,
            signing_public,
            kem_secret,
            kem_public,
            created_at: now,
            last_rotation: now,
        })
    }

    pub fn needs_rotation(&self) -> bool {
        let now = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap_or_default()
            .as_secs();
        now - self.last_rotation > KEY_ROTATION_INTERVAL
    }

    pub fn rotate_keys(&mut self) -> Result<()> {
        // Generate new keypairs
        let (new_signing_public, new_signing_secret) = keypair();
        let (new_kem_public, new_kem_secret) = kyber_keypair();

        // Securely store the new keys
        self.signing_secret.zeroize();
        self.kem_secret.zeroize();

        self.signing_secret = new_signing_secret;
        self.signing_public = new_signing_public;
        self.kem_secret = new_kem_secret;
        self.kem_public = new_kem_public;

        let now = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map_err(|e| Error::Crypto(format!("Time error: {}", e)))?
            .as_secs();
        self.last_rotation = now;

        Ok(())
    }
    
    pub fn sign(&self, message: &[u8]) -> Result<Vec<u8>> {
        if self.needs_rotation() {
            return Err(Error::Crypto("Keys need rotation before signing".into()));
        }

        let signature = sign(message, &self.signing_secret);
        Ok(signature.as_bytes().to_vec())
    }
    
    pub fn verify(&self, message: &[u8], signature: &[u8]) -> Result<bool> {
        let sig = Signature::from_bytes(signature)
            .map_err(|_| Error::Crypto("Invalid signature format".into()))?;
            
        // Validate signature freshness
        if let Some(timestamp) = self.extract_timestamp(signature) {
            let now = SystemTime::now()
                .duration_since(UNIX_EPOCH)
                .map_err(|e| Error::Crypto(format!("Time error: {}", e)))?
                .as_secs();
                
            if now - timestamp > MAX_SIGNATURE_AGE {
                return Err(Error::Crypto("Signature has expired".into()));
            }
        }

        Ok(verify(message, &sig, &self.signing_public))
    }
    
    pub fn encapsulate(&self) -> Result<(Vec<u8>, Vec<u8>)> {
        if self.needs_rotation() {
            return Err(Error::Crypto("Keys need rotation before encapsulation".into()));
        }

        let (ciphertext, shared_secret) = encapsulate(&self.kem_public);
        Ok((ciphertext.to_vec(), shared_secret.to_vec()))
    }
    
    pub fn decapsulate(&self, ciphertext: &[u8]) -> Result<Vec<u8>> {
        if self.needs_rotation() {
            return Err(Error::Crypto("Keys need rotation before decapsulation".into()));
        }

        let ct = pqcrypto_kyber::kyber1024::Ciphertext::from_bytes(ciphertext)
            .map_err(|_| Error::Crypto("Invalid KEM ciphertext format".into()))?;
            
        let shared_secret = decapsulate(&ct, &self.kem_secret);
        Ok(shared_secret.to_vec())
    }
    
    fn extract_timestamp(&self, signature: &[u8]) -> Option<u64> {
        if signature.len() < 8 {
            return None;
        }
        let mut timestamp_bytes = [0u8; 8];
        timestamp_bytes.copy_from_slice(&signature[..8]);
        Some(u64::from_le_bytes(timestamp_bytes))
    }

    // Get both signing and KEM public keys
    pub fn get_public_keys(&self) -> (Vec<u8>, Vec<u8>) {
        (
            self.signing_public.to_bytes().to_vec(),
            self.kem_public.to_bytes().to_vec()
        )
    }

    // Get key age in seconds
    pub fn get_key_age(&self) -> u64 {
        SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap_or_default()
            .as_secs()
            - self.created_at
    }
}

impl Drop for PQCProvider {
    fn drop(&mut self) {
        // Securely erase sensitive key material when dropped
        self.signing_secret.zeroize();
        self.kem_secret.zeroize();
    }
}
