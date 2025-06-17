from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Optional
import uvicorn
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("sunny-chat-server")

# Initialize FastAPI
app = FastAPI(title="Sunny Chat Server")

class ChatRequest(BaseModel):
    message: str
    context: Optional[Dict[str, Any]] = None
    model: str = "sunny-chat-v1"
    stream: bool = False

class ChatResponse(BaseModel):
    response: str

@app.post("/v1/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # This is a simple response generator
        # In production, this would connect to the actual AI model
        response = f"I understand you're asking about: {request.message}\n\n"
        response += "I'm a local development version of Sunny. For full functionality, "
        response += "please use the production server."
        
        return ChatResponse(response=response)
    except Exception as e:
        logger.error(f"Error processing chat request: {e}")
        raise HTTPException(status_code=500, detail=str(e))

def start_server():
    """Start the chat server"""
    uvicorn.run(app, host="127.0.0.1", port=8000)

if __name__ == "__main__":
    start_server()
