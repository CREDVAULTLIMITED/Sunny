# DeepSeek Models Integration

## Available Models

### 1. DeepSeek-Coder-Instruct-33B
- **ID**: `deepseek-ai/deepseek-coder-33b-instruct`
- **Size**: 33B parameters
- **Type**: Instruction-tuned
- **Performance**:
  - HumanEval: 79.3% pass@1
  - MBPP: 74.1% pass@1
- **Best for**: Production-grade code generation, complex problem-solving
- **Requirements**: 
  - GPU Memory: ~45GB
  - NVIDIA A100 or similar recommended

### 2. DeepSeek-Coder-Instruct-6.7B
- **ID**: `deepseek-ai/deepseek-coder-6.7b-instruct`
- **Size**: 6.7B parameters
- **Type**: Instruction-tuned
- **Performance**:
  - HumanEval: 66.1% pass@1
  - MBPP: 72.8% pass@1
- **Best for**: General code generation, good balance of performance and resource usage
- **Requirements**:
  - GPU Memory: ~14GB
  - NVIDIA T4 or better

### 3. DeepSeek-Coder-Base-33B
- **ID**: `deepseek-ai/deepseek-coder-33b-base`
- **Size**: 33B parameters
- **Type**: Base model (for fine-tuning)
- **Performance**:
  - HumanEval: 50.3% pass@1
  - MBPP: 66.0% pass@1
- **Best for**: Custom fine-tuning for specific use cases
- **Requirements**:
  - GPU Memory: ~45GB for inference, ~60GB for training
  - NVIDIA A100 or similar recommended

## Usage

```javascript
// Switch between models
await modelManager.switchModel('base'); // Use base model
await modelManager.switchModel('instruct-small'); // Use 6.7B model
await modelManager.switchModel('instruct-large'); // Use 33B model

// Get model status
const status = modelManager.getStatus();
```

## License
- All models are open source under the Apache 2.0 license
- Generated code belongs to the user
- Attribution required in documentation

## Performance Comparison
- Instruct-33B: Best performance, highest resource requirements
- Instruct-6.7B: Good performance, moderate resources
- Base-33B: For custom training and specific use cases

## Requirements
1. CUDA-capable GPU
2. PyTorch with CUDA support
3. Transformers library
4. Sufficient GPU memory (see individual model requirements)
