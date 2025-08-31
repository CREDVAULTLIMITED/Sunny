//! Bare Metal HSM integration
//!
//! This module provides integration with physical Hardware Security Modules
//! for secure cryptographic operations in self-hosted environments.

use async_trait::async_trait;
use std::sync::Arc;
use std::time::{Duration, Instant};
use tokio::net::TcpStream;
use thales::hsm::{ThalesHsm, HsmCommand, KeyType as ThalesKeyType};
use utimaco::cms::{CryptoServerCommand, UtimacoHsm};
use safenet::luna::{LunaConnection, LunaSlot};
use crate::{
    config::Config,
    error::{Error, Result},
};

use super::{HsmService, KeyType};

/// Physical HSM service supporting multiple vendor types
pub struct BareMetalHsmService {
    config: Arc<Config>,
    hsm_type: HsmVendor,
    primary_hsm: Option<Box<dyn HsmClient>>,
    secondary_hsm: Option<Box<dyn HsmClient>>,
    last_failover: Option<Instant>,
    failover_cooldown: Duration,
}

#[derive(Debug, Clone, Copy)]
pub enum HsmVendor {
    Thales,
    Utimaco,
    Safenet,
}

impl BareMetalHsmService {
    /// Create a new Bare Metal HSM service
    pub async fn new(config: &Config) -> Result<Self> {
        let hsm_type = match config.hsm_vendor.as_deref() {
            Some("thales") => HsmVendor::Thales,
            Some("utimaco") => HsmVendor::Utimaco,
            Some("safenet") => HsmVendor::Safenet,
            _ => return Err(Error::Configuration("Invalid HSM vendor specified".into())),
        };

        let primary_hsm = Self::init_hsm(
            hsm_type,
            &config.primary_hsm_ip,
            config.hsm_port,
            &config.hsm_password,
        ).await?;

        let secondary_hsm = if let Some(secondary_ip) = &config.secondary_hsm_ip {
            Some(Self::init_hsm(
                hsm_type,
                secondary_ip,
                config.hsm_port,
                &config.hsm_password,
            ).await?)
        } else {
            None
        };

        Ok(Self {
            config: Arc::new(config.clone()),
            hsm_type,
            primary_hsm: Some(primary_hsm),
            secondary_hsm,
            last_failover: None,
            failover_cooldown: Duration::from_secs(300), // 5 minutes cooldown
        })
    }

    async fn init_hsm(
        vendor: HsmVendor,
        ip: &str,
        port: u16,
        password: &str,
    ) -> Result<Box<dyn HsmClient>> {
        match vendor {
            HsmVendor::Thales => {
                Ok(Box::new(ThalesHsm::connect(ip, port, password).await?) as Box<dyn HsmClient>)
            },
            HsmVendor::Utimaco => {
                Ok(Box::new(UtimacoHsm::new(ip, port, password).await?) as Box<dyn HsmClient>)
            },
            HsmVendor::Safenet => {
                Ok(Box::new(LunaConnection::new(ip, port, "", password).await?) as Box<dyn HsmClient>)
            }
        }
    }

    async fn get_active_hsm(&mut self) -> Result<&Box<dyn HsmClient>> {
        // Try primary HSM first
        if let Some(primary) = &self.primary_hsm {
            if primary.is_healthy().await.is_ok() {
                return Ok(primary);
            }
        }

        // Check failover cooldown
        if let Some(last_failover) = self.last_failover {
            if last_failover.elapsed() < self.failover_cooldown {
                return Err(Error::Unavailable("HSM failover in cooldown".into()));
            }
        }

        // Try failover to secondary
        if let Some(secondary) = &self.secondary_hsm {
            if secondary.is_healthy().await.is_ok() {
                self.last_failover = Some(Instant::now());
                return Ok(secondary);
            }
        }

        Err(Error::Unavailable("No healthy HSM available".into()))
    }
}

#[async_trait]
impl HsmService for BareMetalHsmService {
    async fn encrypt(&mut self, key_id: &str, data: &[u8]) -> Result<Vec<u8>> {
        let hsm = self.get_active_hsm().await?;
        hsm.encrypt(key_id, data).await
    }

    async fn decrypt(&mut self, key_id: &str, data: &[u8]) -> Result<Vec<u8>> {
        let hsm = self.get_active_hsm().await?;
        hsm.decrypt(key_id, data).await
    }

    async fn sign(&mut self, key_id: &str, data: &[u8]) -> Result<Vec<u8>> {
        let hsm = self.get_active_hsm().await?;
        hsm.sign(key_id, data).await
    }

    async fn verify(&mut self, key_id: &str, data: &[u8], signature: &[u8]) -> Result<bool> {
        let hsm = self.get_active_hsm().await?;
        hsm.verify(key_id, data, signature).await
    }

    async fn generate_key(&mut self, key_type: KeyType) -> Result<String> {
        let hsm = self.get_active_hsm().await?;
        hsm.generate_key(key_type).await
    }

    async fn import_key(&mut self, key_type: KeyType, key_material: &[u8]) -> Result<String> {
        let hsm = self.get_active_hsm().await?;
        hsm.import_key(key_type, key_material).await
    }
}

#[async_trait]
pub trait HsmClient: Send + Sync {
    async fn encrypt(&self, key_id: &str, data: &[u8]) -> Result<Vec<u8>>;
    async fn decrypt(&self, key_id: &str, data: &[u8]) -> Result<Vec<u8>>;
    async fn sign(&self, key_id: &str, data: &[u8]) -> Result<Vec<u8>>;
    async fn verify(&self, key_id: &str, data: &[u8], signature: &[u8]) -> Result<bool>;
    async fn generate_key(&self, key_type: KeyType) -> Result<String>;
    async fn import_key(&self, key_type: KeyType, key_material: &[u8]) -> Result<String>;
    async fn is_healthy(&self) -> Result<()>;
}
