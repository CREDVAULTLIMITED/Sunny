use aes_gcm::{
    aead::{Aead, AeadCore, KeyInit, OsRng},
    Aes256Gcm, Key, Nonce,
};
use blake3::Hasher;
use chacha20poly1305::{
    aead::{Aead as ChachaAead, NewAead},
    ChaCha20Poly1305, Key as ChachaKey, Nonce,
};
use x25519_dalek::{PublicKey as ClassicPublicKey, StaticSecret};
use zeroize::Zeroize;

use super::pqc::PQCProvider;
use crate::error::{Error, Result};

/// HybridCrypto combines traditional and post-quantum cryptography
/// for defense-in-depth against both classical and quantum attacks
pub struct HybridCrypto {
    pqc: PQCProvider,
    classic_secret: StaticSecret,
    classic_public: ClassicPublicKey,
}

impl HybridCrypto {
    pub fn new() -> Result<Self> {
        let pqc = PQCProvider::new()?;
        let classic_secret = StaticSecret::random_from_rng(rand::thread_rng());
        let classic_public = PublicKey::from(&classic_secret);

        Ok(Self {
            pqc,
            classic_secret,
            classic_public,
        })
    }

    pub fn hybrid_key_exchange(&self, peer_classic: &ClassicPublicKey, peer_quantum: &[u8]) -> Result<Vec<u8>> {
        // Validate PQC key freshness
        if self.pqc.needs_rotation() {
            return Err(Error::Crypto("PQC keys need rotation".into()));
        }

        // Classical X25519 exchange
        let classic_shared = self.classic_secret.diffie_hellman(peer_classic);
        
        // Quantum-resistant KEM
        let quantum_ct = self.pqc.encapsulate(peer_quantum)?;
        
        // Combine both shared secrets using BLAKE3
        let mut hasher = Hasher::new();
        hasher.update(classic_shared.as_bytes());
        hasher.update(&quantum_ct);
        
        let hybrid_key = hasher.finalize();
        Ok(hybrid_key.as_bytes().to_vec())
    }

    pub fn hybrid_encrypt(&self, message: &[u8], shared_secret: &[u8]) -> Result<Vec<u8>> {
        // Derive encryption key using BLAKE3
        let mut hasher = Hasher::new();
        hasher.update(shared_secret);
        hasher.update(b"encryption");
        let key_bytes = hasher.finalize();
        
        // Create ChaCha20-Poly1305 cipher
        let key = Key::from_slice(key_bytes.as_bytes());
        let cipher = ChaCha20Poly1305::new(key);
        
        // Generate random nonce
        let nonce_bytes = rand::random::<[u8; 12]>();
        let nonce = Nonce::from_slice(&nonce_bytes);
        
        // Encrypt
        let ciphertext = cipher
            .encrypt(nonce, message)
            .map_err(|e| Error::Crypto(format!("Encryption failed: {}", e)))?;
            
        // Combine nonce and ciphertext
        let mut output = Vec::with_capacity(nonce_bytes.len() + ciphertext.len());
        output.extend_from_slice(&nonce_bytes);
        output.extend_from_slice(&ciphertext);
        
        Ok(output)
    }

    pub fn hybrid_decrypt(&self, ciphertext: &[u8], shared_secret: &[u8]) -> Result<Vec<u8>> {
        if ciphertext.len() < 12 {
            return Err(Error::Crypto("Invalid ciphertext length".into()));
        }
        
        // Extract nonce and ciphertext
        let (nonce_bytes, encrypted) = ciphertext.split_at(12);
        
        // Derive decryption key
        let mut hasher = Hasher::new();
        hasher.update(shared_secret);
        hasher.update(b"encryption");
        let key_bytes = hasher.finalize();
        
        // Create cipher
        let key = Key::from_slice(key_bytes.as_bytes());
        let cipher = ChaCha20Poly1305::new(key);
        let nonce = Nonce::from_slice(nonce_bytes);
        
        // Decrypt
        cipher
            .decrypt(nonce, encrypted)
            .map_err(|e| Error::Crypto(format!("Decryption failed: {}", e)))
    }

    pub fn rotate_keys(&mut self) -> Result<()> {
        // Rotate PQC keys
        self.pqc.rotate_keys()?;
        
        // Generate new classic keys
        let new_classic_secret = StaticSecret::random_from_rng(rand::thread_rng());
        let new_classic_public = PublicKey::from(&new_classic_secret);
        
        // Securely replace keys
        self.classic_secret.zeroize();
        self.classic_secret = new_classic_secret;
        self.classic_public = new_classic_public;
        
        Ok(())
    }

    pub fn get_public_keys(&self) -> (Vec<u8>, Vec<u8>, Vec<u8>) {
        let (pqc_sign, pqc_kem) = self.pqc.get_public_keys();
        (
            self.classic_public.to_bytes().to_vec(),
            pqc_sign,
            pqc_kem
        )
    }
}
