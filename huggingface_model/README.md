# CREDVAULTLIMITED - DeepSeek R1 Model

This repository contains the tokenizer and configuration files for the CREDVAULTLIMITED AI model based on DeepSeek R1.

## Model Description

This model is part of the CreditBoost360 Sunny project, designed for financial AI applications.

## Files Included

- `tokenizer.json`: Main tokenizer file
- `tokenizer_config.json`: Tokenizer configuration
- `special_tokens_map.json`: Special tokens mapping

## Usage

```python
from transformers import AutoTokenizer

# Load the tokenizer
tokenizer = AutoTokenizer.from_pretrained("SamuelMbugua/CREDVAULTLIMITED")

# Example usage
text = "Your input text here"
tokens = tokenizer.encode(text)
decoded = tokenizer.decode(tokens)
```

## Model Details

- **Model Type:** Language Model Tokenizer
- **Base Model:** DeepSeek R1
- **Use Case:** Financial AI Applications
- **Organization:** CreditBoost360

## License

Please refer to the original DeepSeek R1 license for usage terms.

## Contact

For questions about this model, please contact the CreditBoost360 team.
