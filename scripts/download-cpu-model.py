#!/usr/bin/env python3
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

def download_model():
    print("Downloading DeepSeek Chat model (CPU version)...")
    model_name = "deepseek-ai/deepseek-coder-1.3b-base"  # Smaller, CPU-compatible model
    
    try:
        # Download tokenizer
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        tokenizer.save_pretrained("DeepSeek-R1/models")
        
        # Download model with CPU configuration
        model = AutoModelForCausalLM.from_pretrained(
            model_name,
            torch_dtype=torch.float32,  # Use float32 for CPU
            device_map="cpu",
            low_cpu_mem_usage=True
        )
        model.save_pretrained("DeepSeek-R1/models")
        
        print("✅ Model downloaded successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Error downloading model: {str(e)}")
        return False

if __name__ == "__main__":
    download_model()
