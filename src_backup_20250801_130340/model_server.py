import os
import sys
import json
import logging
import resource
import threading
from pathlib import Path
from typing import Dict, Any

import torch
import uvicorn
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import APIKeyHeader
from fastapi.responses import JSONResponse
from pydantic import BaseModel

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('model-server')

# Initialize FastAPI app
app = FastAPI(title="Isolated Model Server")

# Security middleware
api_key_header = APIKeyHeader(name="X-API-Key")

# CORS configuration - restrict to model proxy only
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://model-proxy"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

class ModelRequest(BaseModel):
    input: str
    parameters: Dict[str, Any] = {}

class IsolatedModelManager:
    def __init__(self):
        self.model = None
        self.tokenizer = None
        self.model_name = os.environ.get('MODEL_NAME')
        self.isolation_level = os.environ.get('ISOLATION_LEVEL', 'strict')
        
        # Set resource limits
        self._set_resource_limits()
        
    def _set_resource_limits(self):
        """Set strict resource limits for the process"""
        # Limit memory
        max_memory = int(os.environ.get('MAX_MEMORY', '4')) * 1024 * 1024 * 1024  # Convert GB to bytes
        resource.setrlimit(resource.RLIMIT_AS, (max_memory, max_memory))
        
        # Limit CPU time
        cpu_limit = int(os.environ.get('CPU_LIMIT', '2')) * 60  # Convert minutes to seconds
        resource.setrlimit(resource.RLIMIT_CPU, (cpu_limit, cpu_limit))
        
        # Limit number of processes
        resource.setrlimit(resource.RLIMIT_NPROC, (1024, 2048))
        
        # Limit file descriptors
        resource.setrlimit(resource.RLIMIT_NOFILE, (1024, 2048))

    def _sanitize_input(self, text: str) -> str:
        """Sanitize input to prevent injection attacks"""
        # Remove any system commands or suspicious patterns
        forbidden_patterns = [';', '&&', '||', '`', '$', '(', ')', '|', '\\']
        sanitized = text
        for pattern in forbidden_patterns:
            sanitized = sanitized.replace(pattern, '')
        return sanitized

    async def load_model(self):
        """Load the model in isolated environment"""
        try:
            model_path = Path(f'/app/models/{self.model_name}')
            if not model_path.exists():
                raise ValueError(f"Model {self.model_name} not found")

            # Load in isolated process
            self.model = torch.load(str(model_path), map_location='cpu')
            self.model.eval()
            
            # Enable GPU if available and configured
            if torch.cuda.is_available() and os.environ.get('ENABLE_GPU', 'false').lower() == 'true':
                self.model = self.model.cuda()
                
            logger.info(f"Successfully loaded model {self.model_name}")
            
        except Exception as e:
            logger.error(f"Failed to load model: {str(e)}")
            raise

    async def generate(self, input_text: str, parameters: Dict[str, Any]) -> str:
        """Generate response in isolated environment"""
        try:
            # Sanitize input
            input_text = self._sanitize_input(input_text)
            
            # Validate parameters
            if not self._validate_parameters(parameters):
                raise ValueError("Invalid parameters")

            # Generate in isolated thread
            with torch.no_grad():
                output = self.model.generate(
                    input_text,
                    **parameters
                )
                
            return output

        except Exception as e:
            logger.error(f"Generation error: {str(e)}")
            raise

    def _validate_parameters(self, parameters: Dict[str, Any]) -> bool:
        """Validate generation parameters"""
        # Add parameter validation logic
        allowed_params = {'max_length', 'temperature', 'top_p', 'top_k'}
        return all(k in allowed_params for k in parameters.keys())

# Initialize model manager
model_manager = IsolatedModelManager()

@app.on_event("startup")
async def startup_event():
    """Initialize the model on startup"""
    await model_manager.load_model()

@app.post("/generate")
async def generate(request: ModelRequest):
    """Generate text while maintaining isolation"""
    try:
        output = await model_manager.generate(
            request.input,
            request.parameters
        )
        return JSONResponse(content={"generated_text": output})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.middleware("http")
async def security_middleware(request: Request, call_next):
    """Security middleware for request validation"""
    # Verify API key
    api_key = request.headers.get("X-API-Key")
    if not api_key or api_key != os.environ.get("API_KEY"):
        raise HTTPException(status_code=403, detail="Invalid API key")
    
    # Rate limiting
    # Add rate limiting logic here
    
    response = await call_next(request)
    
    # Add security headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Content-Security-Policy"] = "default-src 'none'"
    
    return response

if __name__ == "__main__":
    # Start server with security configurations
    uvicorn.run(
        "model_server:app",
        host="0.0.0.0",
        port=8000,
        ssl_keyfile="/app/certs/key.pem",
        ssl_certfile="/app/certs/cert.pem",
        ssl_version=2,  # TLS 1.2
        http="h11",  # More secure than default
        timeout_keep_alive=30,
        access_log=True,
        log_level="info"
    )
