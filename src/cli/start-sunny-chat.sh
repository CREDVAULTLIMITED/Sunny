#!/bin/bash

# Environment setup
export PYTHONPATH="${PYTHONPATH}:${HOME}/Downloads/Sunny-main/DeepSeek-R1"
export DEEPSEEK_MODEL_PATH="${HOME}/Downloads/Sunny-main/DeepSeek-R1"

# Check if model server is already running
if netstat -tuln | grep -q ":8000 "; then
    echo "Model server is already running on port 8000"
else
    echo "Starting model server..."
    # Start model server in background
    python3 "$(dirname "$0")/model_server.py" &
    SERVER_PID=$!
    
    # Wait for server to start
    for i in {1..30}; do
        if netstat -tuln | grep -q ":8000 "; then
            echo "Model server started successfully"
            break
        fi
        sleep 1
    done
fi

# Start the chat CLI
echo "Starting Sunny Chat..."
python3 "$(dirname "$0")/sunny_chat.py" "$@"

# Cleanup
if [ ! -z "$SERVER_PID" ]; then
    kill $SERVER_PID 2>/dev/null
fi
