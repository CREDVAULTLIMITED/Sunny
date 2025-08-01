
import sys
import json
import torch
from pathlib import Path
from transformers import AutoTokenizer, AutoModelForCausalLM

def generate_response(prompt, model_type):
    models_dir = Path("/mnt/storage/Downloads/Sunny-main/src/ai/models")
    
    if model_type == "code":
        model_path = models_dir / "deepseek-coder"
    else:
        model_path = models_dir / "deepseek-coder"  # Use coder for now since it's downloaded
    
    try:
        # Load tokenizer and model with optimizations
        tokenizer = AutoTokenizer.from_pretrained(model_path)
        model = AutoModelForCausalLM.from_pretrained(
            model_path, 
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            device_map="auto" if torch.cuda.is_available() else None,
            low_cpu_mem_usage=True
        )
        
        # Tokenize input
        inputs = tokenizer.encode(prompt, return_tensors="pt", truncation=True, max_length=256)
        
        # Generate with optimized settings
        with torch.no_grad():
            outputs = model.generate(
                inputs,
                max_new_tokens=200,  # Reduced for faster generation
                temperature=0.7,
                do_sample=True,
                pad_token_id=tokenizer.eos_token_id,
                attention_mask=torch.ones_like(inputs)
            )
        
        # Decode response (only new tokens)
        response = tokenizer.decode(outputs[0][inputs.shape[1]:], skip_special_tokens=True)
        return response.strip()
        
    except Exception as e:
        return f"Error using local model: {str(e)}"

if __name__ == "__main__":
    prompt = sys.argv[1] if len(sys.argv) > 1 else "Hello"
    model_type = sys.argv[2] if len(sys.argv) > 2 else "reasoning"
    
    result = generate_response(prompt, model_type)
    print(result)
