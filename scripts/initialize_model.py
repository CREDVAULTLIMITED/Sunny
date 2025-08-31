#!/usr/bin/env python3
import os
import sys
import json
import shutil
import hashlib
from pathlib import Path
import torch
import logging
from cryptography.fernet import Fernet

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('model-init')

class SecureModelInitializer:
    def __init__(self, model_name: str):
        self.model_name = model_name
        self.model_dir = Path(f'/app/models/{model_name}')
        self.data_dir = Path(f'/app/data/{model_name}')
        self.key_path = Path('/app/keys/encryption.key')
        
        # Ensure directories exist
        self.model_dir.mkdir(parents=True, exist_ok=True)
        self.data_dir.mkdir(parents=True, exist_ok=True)
        
    def _verify_checksum(self, file_path: Path, expected_hash: str) -> bool:
        """Verify file integrity using SHA-256"""
        sha256_hash = hashlib.sha256()
        with open(file_path, "rb") as f:
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256_hash.update(byte_block)
        return sha256_hash.hexdigest() == expected_hash
    
    def _encrypt_file(self, file_path: Path) -> None:
        """Encrypt sensitive files"""
        if not self.key_path.exists():
            key = Fernet.generate_key()
            with open(self.key_path, 'wb') as f:
                f.write(key)
        
        with open(self.key_path, 'rb') as f:
            key = f.read()
        
        fernet = Fernet(key)
        with open(file_path, 'rb') as f:
            data = f.read()
        
        encrypted_data = fernet.encrypt(data)
        with open(str(file_path) + '.encrypted', 'wb') as f:
            f.write(encrypted_data)
            
        # Securely delete original file
        with open(file_path, 'wb') as f:
            f.write(os.urandom(os.path.getsize(file_path)))
        os.remove(file_path)

    def _set_secure_permissions(self, path: Path) -> None:
        """Set secure file permissions"""
        if path.is_file():
            os.chmod(path, 0o400)  # Read-only for owner
        else:
            os.chmod(path, 0o500)  # Read-execute for owner
            for item in path.glob('**/*'):
                if item.is_file():
                    os.chmod(item, 0o400)
                else:
                    os.chmod(item, 0o500)

    def initialize(self, model_path: str, checksum: str = None) -> None:
        """Initialize model in secure environment"""
        try:
            # Verify model file integrity
            if checksum and not self._verify_checksum(Path(model_path), checksum):
                raise ValueError("Model checksum verification failed")
            
            # Load and verify model
            model = torch.load(model_path, map_location='cpu')
            
            # Save model in secure location
            torch.save(model, self.model_dir / 'model.pt')
            
            # Encrypt sensitive files
            self._encrypt_file(self.model_dir / 'model.pt')
            
            # Set secure permissions
            self._set_secure_permissions(self.model_dir)
            self._set_secure_permissions(self.data_dir)
            
            logger.info(f"Successfully initialized {self.model_name} in secure environment")
            
        except Exception as e:
            logger.error(f"Failed to initialize model: {str(e)}")
            raise

def main():
    if len(sys.argv) < 3:
        print("Usage: initialize_model.py <model_name> <model_path> [checksum]")
        sys.exit(1)
    
    model_name = sys.argv[1]
    model_path = sys.argv[2]
    checksum = sys.argv[3] if len(sys.argv) > 3 else None
    
    initializer = SecureModelInitializer(model_name)
    initializer.initialize(model_path, checksum)

if __name__ == "__main__":
    main()
