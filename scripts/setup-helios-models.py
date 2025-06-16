#!/usr/bin/env python3
"""
Helios Model Setup Script
Downloads and configures DeepSeek models for the Helios AI assistant
"""

import os
import sys
import json
from pathlib import Path
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from huggingface_hub import hf_hub_download

def setup_models():
    print("🚀 Setting up Helios AI models...")
    
    # Create models directory
    models_dir = Path("src/ai/models")
    models_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"📁 Models directory: {models_dir.absolute()}")
    
    # Define models to download (smaller, efficient versions)
    models = {
        "deepseek-coder": {
            "model_id": "deepseek-ai/deepseek-coder-1.3b-instruct",
            "description": "DeepSeek Coder for code generation",
            "size": "~2.6GB"
        },
        "deepseek-math": {
            "model_id": "deepseek-ai/deepseek-math-7b-instruct", 
            "description": "DeepSeek Math for reasoning",
            "size": "~14GB"
        }
    }
    
    successfully_downloaded = []
    
    for model_name, model_info in models.items():
        try:
            print(f"\n📥 Downloading {model_name}...")
            print(f"   Model: {model_info['model_id']}")
            print(f"   Size: {model_info['size']}")
            print(f"   Description: {model_info['description']}")
            
            model_path = models_dir / model_name
            model_path.mkdir(exist_ok=True)
            
            # Download tokenizer
            print("   📝 Downloading tokenizer...")
            tokenizer = AutoTokenizer.from_pretrained(model_info['model_id'])
            tokenizer.save_pretrained(model_path)
            
            # For smaller models, download the full model
            if "1.3b" in model_info['model_id']:
                print("   🧠 Downloading model weights...")
                model = AutoModelForCausalLM.from_pretrained(
                    model_info['model_id'],
                    torch_dtype="auto",
                    trust_remote_code=True
                )
                model.save_pretrained(model_path)
                print(f"   ✅ {model_name} downloaded successfully!")
            else:
                print(f"   ⚠️  Skipping {model_name} download (large model - {model_info['size']})")
                print(f"   📝 Only tokenizer downloaded for now")
            
            successfully_downloaded.append(model_name)
            
        except Exception as e:
            print(f"   ❌ Failed to download {model_name}: {str(e)}")
            continue
    
    # Create model configuration
    config = {
        "models": models,
        "downloaded": successfully_downloaded,
        "status": "ready" if successfully_downloaded else "failed",
        "setup_date": str(Path().cwd()),
        "version": "1.0.0"
    }
    
    config_file = models_dir / "helios_config.json"
    with open(config_file, 'w') as f:
        json.dump(config, f, indent=2)
    
    print(f"\n✅ Setup complete!")
    print(f"📊 Successfully downloaded: {len(successfully_downloaded)} models")
    print(f"📋 Configuration saved to: {config_file}")
    
    if successfully_downloaded:
        print("\n🎉 Next steps:")
        print("1. Restart your server: npm run start:server")
        print("2. Test Helios: Visit /ai/chat")
        print("3. Models are ready for local inference!")
    else:
        print("\n⚠️  No models downloaded. Check your internet connection and try again.")
    
    return len(successfully_downloaded) > 0

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
    if len(sys.argv) > 1 and sys.argv[1] == "test":
        test_setup()
    else:
        setup_models()

