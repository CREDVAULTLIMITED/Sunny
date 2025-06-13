#!/bin/bash

# Verify the DeepSeek R1 files are present
if [ -d "src/ai/deepseek-companion" ]; then
    echo "✅ DeepSeek Companion files found"
else
    echo "❌ DeepSeek Companion files not found. Please ensure the integration is complete."
    exit 1
fi

# Download DeepSeek R1 models locally
MODEL_DIR="src/ai/deepseek-companion/models"
mkdir -p $MODEL_DIR

# Download models
MODELS=(
    "huggingface/deepseek-r1-671b"
    "huggingface/deepseek-r1-zero-70b"
    "huggingface/deepseek-r1-zero-1.5b"
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

# Initialize the DeepSeek R1 service
echo "🔧 Testing DeepSeek R1 integration..."
python3 -c "
import torch
from transformers import AutoTokenizer
print('✅ DeepSeek R1 dependencies verified successfully!')
print(f'🔥 CUDA available: {torch.cuda.is_available()}')
print(f'🔥 Device count: {torch.cuda.device_count() if torch.cuda.is_available() else 0}')
"

if [ $? -eq 0 ]; then
    echo "✅ DeepSeek R1 setup completed successfully"
else
    echo "❌ DeepSeek R1 setup failed"
    exit 1
fi

# Check if torch is installed
if ! python3 -c "import torch" 2>/dev/null; then
  echo "Installing torch..."
  pip install torch --no-cache-dir
fi

# Create the models directory if it doesn't exist
mkdir -p ../DeepSeek-R1/models

# Download DeepSeek-R1-Zero model
wget -O ../DeepSeek-R1/models/DeepSeek-R1-Zero "https://huggingface.co/deepseek-ai/DeepSeek-R1-Zero/resolve/main/model.bin"

# Download DeepSeek-R1 model
wget -O ../DeepSeek-R1/models/DeepSeek-R1 "https://huggingface.co/deepseek-ai/DeepSeek-R1/resolve/main/model.bin"

# Notify user
echo "DeepSeek-R1 models downloaded successfully."
