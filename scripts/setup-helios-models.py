#!/usr/bin/env python3
"""
Helios Model Setup Script
Downloads and configures DeepSeek models for the Helios AI assistant
"""

import os
import sys
import json
import torch
import requests
from pathlib import Path
from tqdm import tqdm
from transformers import AutoTokenizer, AutoModelForCausalLM

def download_file(url, destination):
    response = requests.get(url, stream=True)
    total_size = int(response.headers.get('content-length', 0))
    
    with open(destination, 'wb') as file, tqdm(
        desc=destination.name,
        total=total_size,
        unit='iB',
        unit_scale=True,
        unit_divisor=1024,
    ) as pbar:
        for data in response.iter_content(chunk_size=1024):
            size = file.write(data)
            pbar.update(size)

def setup_models():
    print("🔧 Setting up Helios AI models...")
    
    # Load configuration
    config_path = Path(__file__).parent.parent / "src" / "ai" / "config" / "model-config.json"
    with open(config_path) as f:
        config = json.load(f)
    
    model_path = Path(os.getenv('MODEL_PATH', config['models']['local']['path']))
    model_path.mkdir(parents=True, exist_ok=True)
    
    # Setup DeepSeek Coder model
    print("\n📥 Setting up DeepSeek Coder model...")
    model_name = "deepseek-ai/deepseek-coder-6.7b-instruct"
    local_model_path = model_path / "deepseek-coder"
    
    if not local_model_path.exists():
        print(f"Downloading {model_name}...")
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModelForCausalLM.from_pretrained(
            model_name,
            torch_dtype=torch.float16,
            device_map="auto"
        )
        tokenizer.save_pretrained(local_model_path)
        model.save_pretrained(local_model_path)
        print("✅ DeepSeek Coder model downloaded successfully")
    else:
        print("✅ DeepSeek Coder model already exists")
    
    # Create vector store directory
    vector_store_path = Path(os.getenv('VECTOR_STORE_PATH', config['vectorStore']['path']))
    vector_store_path.mkdir(parents=True, exist_ok=True)
    print(f"\n✅ Vector store directory created at {vector_store_path}")
    
    # Create learning data directory
    learning_path = Path(os.getenv('LEARNING_MODEL_PATH', config['learning']['savePath']))
    learning_path.mkdir(parents=True, exist_ok=True)
    print(f"✅ Learning data directory created at {learning_path}")
    
    print("\n✨ Model setup completed successfully!")

def test_setup():
    """Test if the setup is working"""
    print("\n🧪 Testing model setup...")
    
    models_dir = Path("src/ai/models")
    config_file = models_dir / "helios_config.json"
    
    if not config_file.exists():
        print("❌ No configuration found. Run setup first.")
        return False
    
    with open(config_file) as f:
        config = json.load(f)
    
    print(f"📋 Found {len(config['downloaded'])} models:")
    for model in config['downloaded']:
        model_path = models_dir / model
        if model_path.exists():
            print(f"   ✅ {model} - Ready")
        else:
            print(f"   ❌ {model} - Missing")
    
    # Test tokenizer
    try:
        if "deepseek-coder" in config['downloaded']:
            tokenizer_path = models_dir / "deepseek-coder"
            tokenizer = AutoTokenizer.from_pretrained(tokenizer_path)
            print("✅ Tokenizer test passed")
            return True
    except Exception as e:
        print(f"❌ Tokenizer test failed: {e}")
        return False

if __name__ == "__main__":
    try:
        if len(sys.argv) > 1 and sys.argv[1] == "test":
            test_setup()
        else:
            setup_models()
    except Exception as e:
        print(f"\n❌ Error during model setup: {e}", file=sys.stderr)
        sys.exit(1)

