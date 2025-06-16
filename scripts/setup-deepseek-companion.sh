#!/bin/bash

# Verify the DeepSeek Companion files are present
if [ -d "src/ai/deepseek-companion" ]; then
    echo "✅ DeepSeek Companion files found"
else
    echo "❌ DeepSeek Companion files not found. Please ensure the integration is complete."
    exit 1
fi

# Download DeepSeek Companion models locally
MODEL_DIR="src/ai/deepseek-companion/models"
mkdir -p $MODEL_DIR

# Download models
MODELS=(
    "deepseek-ai/deepseek-companion-10b-base"
    "deepseek-ai/deepseek-companion-20b-instruct"
)

for MODEL in "${MODELS[@]}"; do
    echo "📥 Downloading model: $MODEL..."
    python3 -c "
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

print(f'📥 Downloading {MODEL}')
AutoTokenizer.from_pretrained('$MODEL').save_pretrained('$MODEL_DIR/$MODEL')
AutoModelForCausalLM.from_pretrained('$MODEL').save_pretrained('$MODEL_DIR/$MODEL')
"

    if [ $? -eq 0 ]; then
        echo "✅ Model $MODEL downloaded successfully"
    else
        echo "❌ Failed to download model $MODEL"
        exit 1
    fi

done

# Verify models
if [ -d "$MODEL_DIR" ]; then
    echo "✅ All models downloaded and stored in $MODEL_DIR"
else
    echo "❌ Model directory not found. Please check the setup."
    exit 1
fi

# Initialize the DeepSeek Companion service
echo "🔧 Testing DeepSeek Companion integration..."
python3 -c "
import torch
from transformers import AutoTokenizer
print('✅ DeepSeek Companion dependencies verified successfully!')
print(f'🔥 CUDA available: {torch.cuda.is_available()}')
print(f'🔥 Device count: {torch.cuda.device_count() if torch.cuda.is_available() else 0}')
"

if [ $? -eq 0 ]; then
    echo "✅ DeepSeek Companion setup completed successfully"
else
    echo "❌ DeepSeek Companion setup failed"
    exit 1
fi
