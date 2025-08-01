#!/usr/bin/env python3
import os
import sys
import torch
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Optional
import logging
import uvicorn
from pathlib import Path

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("model-server")

# Initialize FastAPI
app = FastAPI(title="Sunny Chat Model Server")

class ChatRequest(BaseModel):
    message: str
    context: Optional[Dict[str, Any]] = None
    model: str = "deepseek-r1"
    stream: bool = False

class ModelManager:
    def __init__(self):
        self.models = {}
        self.model_path = Path(os.getenv("DEEPSEEK_MODEL_PATH", 
                                       os.path.expanduser("~/Downloads/Sunny-main/DeepSeek-R1")))
        self.load_models()

    def load_models(self):
        try:
            # Import DeepSeek model
            sys.path.append(str(self.model_path))
            from deepseek import DeepSeekModel  # This is a placeholder - adjust based on actual DeepSeek import
            
            model = DeepSeekModel.from_pretrained(self.model_path)
            model.eval()
            if torch.cuda.is_available():
                model = model.cuda()
            
            self.models["deepseek-r1"] = model
            logger.info("DeepSeek-R1 model loaded successfully")
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
            raise RuntimeError(f"Failed to load model: {str(e)}")

    async def get_response(self, message: str, context: Dict[str, Any] = None) -> str:
        try:
            model = self.models.get("deepseek-r1")
            if not model:
                raise HTTPException(status_code=500, detail="Model not loaded")

            # Generate response using the model
            with torch.no_grad():
                response = model.generate(message, context)
                return response

        except Exception as e:
            logger.error(f"Error generating response: {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))

model_manager = ModelManager()

@app.post("/v1/chat")
async def chat(request: ChatRequest):
    try:
        response = await model_manager.get_response(
            request.message,
            request.context
        )
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def start_server():
    try:
        uvicorn.run(
            app,
            host="127.0.0.1",  # Only allow local connections
            port=8000,
            log_level="info"
        )
    except Exception as e:
        logger.error(f"Failed to start server: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    start_server()
