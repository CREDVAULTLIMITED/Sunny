#!/bin/bash

# Script to download local DeepSeek models for Helios
# This script helps you set up truly local AI models

echo "🚀 Sunny Helios - Local DeepSeek Model Setup"
echo "==========================================="
echo ""
echo "This script will help you download DeepSeek models for local usage."
echo "Your data will stay completely private on your infrastructure."
echo ""

# Check if git-lfs is installed
if ! command -v git-lfs &> /dev/null; then
    echo "❌ git-lfs is not installed. Installing..."
    sudo apt update
    sudo apt install -y git-lfs
    git lfs install
else
    echo "✅ git-lfs is already installed"
fi

# Create models directory
MODELS_DIR="$PWD/src/ai/models"
mkdir -p "$MODELS_DIR"
cd "$MODELS_DIR"

echo ""
echo "📁 Models will be downloaded to: $MODELS_DIR"
echo ""

# Function to download model
download_model() {
    local model_name=$1
    local model_url=$2
    local model_size=$3
    
    echo "📦 Downloading $model_name (Size: ~$model_size)"
    echo "URL: $model_url"
    echo ""
    
    if [ -d "$model_name" ]; then
        echo "⚠️  Model $model_name already exists. Skipping..."
        return
    fi
    
    echo "🔄 Cloning $model_name..."
    git lfs clone "$model_url" "$model_name"
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully downloaded $model_name"
    else
        echo "❌ Failed to download $model_name"
    fi
    echo ""
}

echo "Select which models to download:"
echo "1. DeepSeek-Coder 1.3B (Recommended for code generation - ~2.6GB)"
echo "2. DeepSeek-R1 Distill 7B (Better reasoning - ~14GB)"
echo "3. Both models (Recommended for full Helios experience)"
echo "4. Show current status"
echo "5. Exit"
echo ""
read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo "Downloading DeepSeek-Coder 1.3B..."
        download_model "deepseek-coder-1.3b-instruct" "https://huggingface.co/deepseek-ai/deepseek-coder-1.3b-instruct" "2.6GB"
        ;;
    2)
        echo "Downloading DeepSeek-R1 Distill 7B..."
        download_model "DeepSeek-R1-Distill-Qwen-7B" "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B" "14GB"
        ;;
    3)
        echo "Downloading both models..."
        download_model "deepseek-coder-1.3b-instruct" "https://huggingface.co/deepseek-ai/deepseek-coder-1.3b-instruct" "2.6GB"
        download_model "DeepSeek-R1-Distill-Qwen-7B" "https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B" "14GB"
        ;;
    4)
        echo "📊 Current model status:"
        ls -la "$MODELS_DIR"
        echo ""
        if [ -d "$MODELS_DIR/deepseek-coder-1.3b-instruct" ]; then
            echo "✅ DeepSeek-Coder 1.3B: Available"
        else
            echo "❌ DeepSeek-Coder 1.3B: Not downloaded"
        fi
        
        if [ -d "$MODELS_DIR/DeepSeek-R1-Distill-Qwen-7B" ]; then
            echo "✅ DeepSeek-R1 Distill 7B: Available"
        else
            echo "❌ DeepSeek-R1 Distill 7B: Not downloaded"
        fi
        ;;
    5)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Model download process completed!"
echo ""
echo "Next steps:"
echo "1. Install Python dependencies in your virtual environment:"
echo "   source venv/bin/activate"
echo "   pip install torch transformers accelerate"
echo ""
echo "2. Update the localDeepSeekService.js to use downloaded models"
echo ""
echo "3. Restart your Sunny application to use local models"
echo ""
echo "💡 Your AI models are now running locally - your data stays private!"
echo "🤖 Helios is ready to assist you with local AI capabilities."
echo ""
echo "For support, contact: Samuel Mbugua (Sunny Founder & ML Engineer)"
echo "==========================================="

