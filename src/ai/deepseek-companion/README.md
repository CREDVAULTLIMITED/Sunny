# DeepSeek Companion

## Overview
This repository serves as a companion to DeepSeek Coder, enabling collaborative learning and data sharing between the two models.

## Setup
1. Run the setup script to download models locally:
   ```bash
   bash scripts/setup-deepseek-companion.sh
   ```

2. Verify the models are stored in `src/ai/deepseek-companion/models`.

## Usage
To load a model locally:
```javascript
await companionModelManager.loadLocalModel('deepseek-companion-10b-base');
await companionModelManager.loadLocalModel('deepseek-companion-20b-instruct');
```

## Notes
- Models are stored locally for full control.
- Ensure sufficient GPU memory for larger models.
- Fine-tuning can be performed using the `setupTrainingEnvironment` method in `CompanionModelManager.js`.

## Reasoning Models

### DeepSeek‑R1 and R1‑Zero
- Released January 2025 under MIT license.
- Available in huge models (671 B) and distilled versions (1.5B up to 70B).
- Hosted on Hugging Face and GitHub.

### Integration
This repository integrates DeepSeek‑R1 and R1‑Zero as reasoning models to complement DeepSeek Coder.
