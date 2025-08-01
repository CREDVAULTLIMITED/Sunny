import os
import json
import requests
from typing import Dict, Any
import logging

class ModelConnector:
    def __init__(self, model_name: str = "sunny-chat-v1"):
        self.model_name = model_name
        self.api_endpoint = os.getenv("SUNNY_MODEL_ENDPOINT", "http://localhost:8000")
        self.session = requests.Session()
        
        # Set up logging
        self.logger = logging.getLogger("sunny-chat-model")
        self.logger.setLevel(logging.INFO)

    async def get_response(self, message: str, context: Dict[str, Any] = None) -> str:
        """
        Get a response from the model while ensuring isolation from the main system.
        This only connects to the chat model, not the payment system.
        """
        try:
            payload = {
                "message": message,
                "context": context or {},
                "model": self.model_name,
                "stream": False
            }
            
            response = self.session.post(
                f"{self.api_endpoint}/v1/chat",
                json=payload,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                return response.json()["response"]
            else:
                self.logger.error(f"Error from model API: {response.status_code}")
                return "I apologize, but I'm having trouble processing your request right now."
                
        except Exception as e:
            self.logger.error(f"Error connecting to model: {str(e)}")
            return "I apologize, but I'm unable to respond right now due to a connection issue."

    def validate_message(self, message: str) -> bool:
        """
        Validate the message to ensure it doesn't contain sensitive commands or requests.
        """
        # List of blocked keywords related to system access or sensitive operations
        blocked_keywords = [
            "system", "exec", "eval", "sudo", "password", "token",
            "api key", "secret", "credential", "payment", "database"
        ]
        
        message_lower = message.lower()
        return not any(keyword in message_lower for keyword in blocked_keywords)
