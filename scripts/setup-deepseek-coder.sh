#!/bin/bash

# DeepSeek Coder Integration Setup Script
# This script sets up DeepSeek Coder integration for the Sunny Payment Gateway

echo "🚀 Setting up DeepSeek Coder integration..."

# Check if Python3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 is required but not installed. Please install Python3 first."
    exit 1
fi

echo "✅ Python3 found"

# Check if pip3 is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is required but not installed. Please install pip3 first."
    exit 1
fi

echo "✅ pip3 found"

# Install Python dependencies for DeepSeek Coder
echo "📦 Installing Python dependencies..."
pip3 install torch>=2.0.0 transformers==4.35.0 accelerate

if [ $? -eq 0 ]; then
    echo "✅ Python dependencies installed successfully"
else
    echo "❌ Failed to install Python dependencies"
    exit 1
fi

# Verify the DeepSeek Coder files are present
if [ -d "src/ai/deepseek-coder" ]; then
    echo "✅ DeepSeek Coder files found"
else
    echo "❌ DeepSeek Coder files not found. Please ensure the integration is complete."
    exit 1
fi

# Download DeepSeek models locally
MODEL_DIR="src/ai/deepseek-coder/models"
mkdir -p $MODEL_DIR

# Download models
MODELS=(
    "deepseek-ai/deepseek-coder-33b-instruct"
    "deepseek-ai/deepseek-coder-6.7b-instruct"
    "deepseek-ai/deepseek-coder-33b-base"
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

# Initialize the DeepSeek service
echo "🔧 Testing DeepSeek Coder integration..."
python3 -c "
import torch
from transformers import AutoTokenizer
print('✅ DeepSeek Coder dependencies verified successfully!')
print(f'🔥 CUDA available: {torch.cuda.is_available()}')
print(f'🔥 Device count: {torch.cuda.device_count() if torch.cuda.is_available() else 0}')
"

if [ $? -eq 0 ]; then
    echo "✅ DeepSeek Coder integration setup completed successfully!"
    echo ""
    echo "🎉 Next steps:"
    echo "1. Start your server: npm run start:server"
    echo "2. Initialize DeepSeek: POST /api/deepseek/initialize"
    echo "3. Generate code: POST /api/deepseek/generate"
    echo ""
    echo "📚 API Documentation:"
    echo "• POST /api/deepseek/initialize - Initialize the service"
    echo "• POST /api/deepseek/generate - Generate code"
    echo "• POST /api/deepseek/analyze - Analyze code"
    echo "• POST /api/deepseek/complete - Complete partial code"
    echo "• POST /api/deepseek/tests - Generate unit tests"
    echo "• POST /api/deepseek/payment-code - Generate payment-specific code"
    echo "• GET /api/deepseek/status - Check service status"
else
    echo "❌ DeepSeek Coder integration setup failed"
    exit 1
fi

