#!/bin/bash

# Download DeepSeek R1 distilled model locally
MODEL_DIR="src/ai/deepseek-r1/models"
mkdir -p $MODEL_DIR

# Download only the distilled model
MODEL="deepseek-ai/DeepSeek-R1-Distill-Qwen-7B"

echo "📥 Downloading model: $MODEL..."
python3 -c "
import os
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

model_name = '$MODEL'
model_dir = os.path.join('$MODEL_DIR', model_name.split('/')[-1])
print(f'📥 Downloading {model_name}')

print('Downloading tokenizer...')
AutoTokenizer.from_pretrained(model_name).save_pretrained(model_dir)

print('Downloading model...')
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch.float32,  # Use float32 for CPU
    low_cpu_mem_usage=True
)
model.save_pretrained(model_dir)
print('✅ Model downloaded successfully!')
"
