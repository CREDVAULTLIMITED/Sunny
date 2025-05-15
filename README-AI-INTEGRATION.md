# Sunny Payment Gateway - TinyLlama AI Integration

This document explains how the TinyLlama AI model has been integrated into the Sunny Payment Gateway platform to enhance its capabilities.

## Overview

The Sunny Payment Gateway now includes AI capabilities powered by TinyLlama, an open-source large language model that runs locally through Ollama. This integration enables:

1. **Smart Payment Routing**: AI-driven decisions on optimal payment methods
2. **Enhanced Fraud Detection**: Advanced fraud analysis using AI
3. **Sunny AI Assistant**: A conversational assistant for users and developers
4. **Internet Learning**: Ability to learn from web sources to stay updated

## Setup Instructions

### Prerequisites

1. Install Ollama:
   ```bash
   curl -fsSL https://ollama.com/install.sh | sh
   ```

2. Pull the TinyLlama model:
   ```bash
   ollama pull tinyllama
   ```

3. Ensure Ollama is running:
   ```bash
   # Check if Ollama is running
   curl http://localhost:11434/api/tags
   ```

### Configuration

The AI integration is configured to work with minimal setup. By default, it:

- Uses the TinyLlama model
- Connects to Ollama at http://localhost:11434
- Enables web learning when internet is available
- Runs periodic learning to stay updated

## Key Components

### 1. OllamaService

The core service that interfaces with the Ollama API to run the TinyLlama model.

```javascript
import { ollamaService } from './core/ai';

// Generate a completion
const response = await ollamaService.generateCompletion("Analyze this payment");
```

### 2. EnhancedPaymentRoutingAI

An upgraded version of the original PaymentRoutingAI that uses TinyLlama for smarter routing decisions.

```javascript
import { enhancedPaymentRoutingAI } from './core/ai';

// Get optimal payment method
const result = await enhancedPaymentRoutingAI.predictOptimalMethod(transactionData);
```

### 3. Enhanced Fraud Detection

AI-powered fraud detection that combines rule-based and AI approaches.

```javascript
import { enhancedDetectFraud } from './security/enhancedFraudDetection';

// Detect fraud
const fraudResult = await enhancedDetectFraud(transactionData);
```

### 4. Sunny AI Assistant

A conversational assistant that can answer questions and provide help.

```javascript
import { sunnyAssistant } from './core/ai';

// Ask a question
const answer = await sunnyAssistant.ask("How do I process a refund?");
```

### 5. Web Learning Service

Enables the AI to learn from internet sources to stay updated.

```javascript
import { webLearningService } from './core/ai';

// Learn about a specific topic
const result = await webLearningService.learnAboutTopic("payment security");
```

## Internet Learning Capabilities

The AI system can learn from the internet in several ways:

1. **On-demand learning**: When asked a question it doesn't know, it can search the web
2. **Scheduled learning**: Periodically updates its knowledge on key topics
3. **Country-specific learning**: Learns about payment methods in different countries
4. **Security threat monitoring**: Stays updated on new security threats

This learning happens through the WebLearningService, which caches information to avoid excessive web requests.

## System Requirements

- **CPU**: Intel i5 or equivalent (4+ cores recommended)
- **RAM**: 4GB minimum, 8GB+ recommended
- **Storage**: 2GB for the TinyLlama model
- **Network**: Internet connection for web learning (optional)

## Limitations

- The TinyLlama model has knowledge cutoff and may not know very recent events
- Processing speed depends on your hardware capabilities
- Web learning requires internet connectivity
- The model doesn't permanently learn from interactions without periodic updates

## Future Improvements

- Fine-tuning the model on payment-specific data
- Adding more specialized models for specific tasks
- Implementing a feedback loop for continuous improvement
- Expanding the assistant's capabilities with more tools