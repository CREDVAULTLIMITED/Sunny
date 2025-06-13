/**
 * AI Model Manager - Core system for managing DeepSeek Coder models
 * Handles local deployment, fine-tuning, and inference
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs').promises;
const EventEmitter = require('events');

class ModelManager extends EventEmitter {
    constructor() {
        super();
        this.deepseekPath = '/home/sam/DeepSeek-Coder';
        this.modelsPath = path.join(__dirname, '../models');
        this.dataPath = path.join(__dirname, '../training_data');
        this.configPath = path.join(__dirname, '../config');
        
        this.models = {
            base: 'deepseek-ai/deepseek-coder-33b-base',
            instruct: {
                small: 'deepseek-ai/deepseek-coder-6.7b-instruct',
                large: 'deepseek-ai/deepseek-coder-33b-instruct'
            },
            custom: null, // Will be set after training
            active: null
        };
        
        this.trainingStatus = {
            isTraining: false,
            progress: 0,
            currentEpoch: 0,
            totalEpochs: 0
        };
        
        this.initialized = false;
    }

    /**
     * Initialize the AI platform
     */
    async initialize() {
        try {
            console.log('🚀 Initializing AI Platform...');
            
            // Create necessary directories
            await this.ensureDirectories();
            
            // Check dependencies
            await this.checkDependencies();
            
            // Load base model
            await this.loadBaseModel();
            
            // Setup training environment
            await this.setupTrainingEnvironment();
            
            this.initialized = true;
            this.emit('initialized');
            
            console.log('✅ AI Platform initialized successfully');
            return true;
        } catch (error) {
            console.error('❌ AI Platform initialization failed:', error);
            throw error;
        }
    }

    /**
     * Ensure all necessary directories exist
     */
    async ensureDirectories() {
        const dirs = [this.modelsPath, this.dataPath, this.configPath];
        
        for (const dir of dirs) {
            try {
                await fs.access(dir);
            } catch {
                await fs.mkdir(dir, { recursive: true });
                console.log(`📁 Created directory: ${dir}`);
            }
        }
    }

    /**
     * Check if all dependencies are installed
     */
    async checkDependencies() {
        return new Promise((resolve, reject) => {
            const python = spawn('python3', ['-c', `
import torch
import transformers
from transformers import AutoTokenizer, AutoModelForCausalLM
from transformers import Trainer, TrainingArguments
import datasets
print('✅ All dependencies available')
print(f'🔥 CUDA available: {torch.cuda.is_available()}')
print(f'🔥 GPU count: {torch.cuda.device_count()}')
`]);

            let output = '';
            let error = '';

            python.stdout.on('data', (data) => {
                output += data.toString();
            });

            python.stderr.on('data', (data) => {
                error += data.toString();
            });

            python.on('close', (code) => {
                if (code === 0) {
                    console.log(output);
                    resolve(true);
                } else {
                    reject(new Error(`Dependencies check failed: ${error}`));
                }
            });
        });
    }

    /**
     * Load the base DeepSeek model
     */
    async loadBaseModel() {
        const scriptPath = path.join(this.configPath, 'load_model.py');
        
        const loadScript = `
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
import json
import os

def load_base_model():
    model_name = "${this.models.base}"
    
    print(f"📥 Loading model: ${model_name}")
    
    # Load tokenizer
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    
    # Load model with appropriate settings
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
        device_map="auto",
        trust_remote_code=True
    )
    
    # Save model info
    model_info = {
        "model_name": model_name,
        "loaded_at": str(torch.datetime.datetime.now()),
        "device": str(model.device),
        "dtype": str(model.dtype),
        "parameters": sum(p.numel() for p in model.parameters()),
        "cuda_available": torch.cuda.is_available()
    }
    
    with open("${path.join(this.configPath, 'model_info.json')}", "w") as f:
        json.dump(model_info, f, indent=2, default=str)
    
    print("✅ Base model loaded successfully")
    return True

if __name__ == "__main__":
    load_base_model()
`;

        await fs.writeFile(scriptPath, loadScript);
        
        return new Promise((resolve, reject) => {
            const python = spawn('python3', [scriptPath]);
            
            python.stdout.on('data', (data) => {
                console.log(data.toString());
            });
            
            python.stderr.on('data', (data) => {
                console.error(data.toString());
            });
            
            python.on('close', (code) => {
                if (code === 0) {
                    this.models.active = this.models.base;
                    resolve(true);
                } else {
                    reject(new Error('Failed to load base model'));
                }
            });
        });
    }

    /**
     * Setup training environment for custom fine-tuning
     */
    async setupTrainingEnvironment() {
        const trainerScript = path.join(this.configPath, 'custom_trainer.py');
        
        const trainingCode = `
import torch
from transformers import (
    AutoTokenizer, AutoModelForCausalLM,
    Trainer, TrainingArguments,
    DataCollatorForLanguageModeling
)
from datasets import Dataset
import json
import os
from datetime import datetime

class SunnyAITrainer:
    def __init__(self, base_model="${this.models.base}"):
        self.base_model = base_model
        self.tokenizer = AutoTokenizer.from_pretrained(base_model)
        self.model = None
        self.training_data = None
        
        # Add padding token if it doesn't exist
        if self.tokenizer.pad_token is None:
            self.tokenizer.pad_token = self.tokenizer.eos_token
    
    def prepare_training_data(self, data_file):
        """Prepare training data from company-specific code samples"""
        print(f"📊 Preparing training data from {data_file}")
        
        with open(data_file, 'r') as f:
            raw_data = json.load(f)
        
        # Format data for code generation training
        formatted_data = []
        for item in raw_data:
            if 'prompt' in item and 'code' in item:
                text = f"Prompt: {item['prompt']}\nCode:\n{item['code']}<|endoftext|>"
                formatted_data.append({"text": text})
        
        # Create dataset
        dataset = Dataset.from_list(formatted_data)
        
        # Tokenize
        def tokenize_function(examples):
            return self.tokenizer(
                examples["text"],
                truncation=True,
                padding=True,
                max_length=1024
            )
        
        tokenized_dataset = dataset.map(tokenize_function, batched=True);
        self.training_data = tokenized_dataset;
        
        print(f"✅ Prepared {len(formatted_data)} training samples");
        return tokenized_dataset;
    
    def start_training(self, output_dir, epochs=3, learning_rate=2e-5):
        """Start fine-tuning with company data"""
        print(f"🎯 Starting training for {epochs} epochs...")
        
        # Load model for training
        self.model = AutoModelForCausalLM.from_pretrained(
            self.base_model,
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32
        )
        
        # Training arguments
        training_args = TrainingArguments(
            output_dir=output_dir,
            overwrite_output_dir=True,
            num_train_epochs=epochs,
            per_device_train_batch_size=1,
            gradient_accumulation_steps=4,
            learning_rate=learning_rate,
            warmup_steps=100,
            logging_steps=10,
            save_steps=500,
            evaluation_strategy="no",
            save_total_limit=2,
            prediction_loss_only=True,
            remove_unused_columns=False,
            dataloader_pin_memory=False,
            fp16=torch.cuda.is_available(),
            report_to=None
        );
        
        # Data collator
        data_collator = DataCollatorForLanguageModeling(
            tokenizer=self.tokenizer,
            mlm=False
        );
        
        # Create trainer
        trainer = Trainer(
            model=self.model,
            args=training_args,
            train_dataset=self.training_data,
            data_collator=data_collator,
        );
        
        # Start training
        trainer.train();
        
        # Save the custom model
        trainer.save_model();
        self.tokenizer.save_pretrained(output_dir);
        
        # Save training info
        training_info = {
            "base_model": self.base_model,
            "training_completed": str(datetime.now()),
            "epochs": epochs,
            "learning_rate": learning_rate,
            "output_dir": output_dir,
            "training_samples": len(self.training_data)
        }
        
        with open(f"${output_dir}/training_info.json", "w") as f:
            json.dump(training_info, f, indent=2, default=str);
        
        print("✅ Training completed successfully!");
        return output_dir;

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        command = sys.argv[1]
        trainer = SunnyAITrainer();
        
        if command == "prepare_data" and len(sys.argv) > 2:
            trainer.prepare_training_data(sys.argv[2]);
        elif command == "train" and len(sys.argv) > 3:
            data_file = sys.argv[2]
            output_dir = sys.argv[3]
            trainer.prepare_training_data(data_file);
            trainer.start_training(output_dir);
`;

        await fs.writeFile(trainerScript, trainingCode);
        console.log('🔧 Training environment setup complete');
    }

    /**
     * Add training data from your company's codebase
     */
    async addTrainingData(data) {
        const dataFile = path.join(this.dataPath, `training_data_${Date.now()}.json`);
        await fs.writeFile(dataFile, JSON.stringify(data, null, 2));
        
        console.log(`📊 Added ${data.length} training samples to ${dataFile}`);
        return dataFile;
    }

    /**
     * Start custom training with company data
     */
    async startCustomTraining(trainingData, options = {}) {
        if (this.trainingStatus.isTraining) {
            throw new Error('Training already in progress');
        }

        const {
            epochs = 3,
            learningRate = 2e-5,
            outputName = `sunny-coder-${Date.now()}`
        } = options;

        const outputDir = path.join(this.modelsPath, outputName);
        const dataFile = await this.addTrainingData(trainingData);
        
        this.trainingStatus.isTraining = true;
        this.trainingStatus.totalEpochs = epochs;
        this.emit('training_started', { dataFile, outputDir, epochs });

        try {
            const trainerScript = path.join(this.configPath, 'custom_trainer.py');
            
            return new Promise((resolve, reject) => {
                const python = spawn('python3', [trainerScript, 'train', dataFile, outputDir]);
                
                python.stdout.on('data', (data) => {
                    const output = data.toString();
                    console.log(output);
                    
                    // Parse training progress
                    if (output.includes('Epoch')) {
                        const match = output.match(/Epoch (\d+)/);
                        if (match) {
                            this.trainingStatus.currentEpoch = parseInt(match[1]);
                            this.trainingStatus.progress = (this.trainingStatus.currentEpoch / this.trainingStatus.totalEpochs) * 100;
                            this.emit('training_progress', this.trainingStatus);
                        }
                    }
                });
                
                python.stderr.on('data', (data) => {
                    console.error(data.toString());
                });
                
                python.on('close', (code) => {
                    this.trainingStatus.isTraining = false;
                    
                    if (code === 0) {
                        this.models.custom = outputDir;
                        this.emit('training_completed', { outputDir });
                        resolve(outputDir);
                    } else {
                        this.emit('training_failed');
                        reject(new Error('Training failed'));
                    }
                });
            });
        } catch (error) {
            this.trainingStatus.isTraining = false;
            throw error;
        }
    }

    /**
     * Switch to a specific DeepSeek model
     * @param {string} modelType - 'base', 'instruct-small', or 'instruct-large'
     */
    async switchModel(modelType) {
        let modelPath;
        switch(modelType) {
            case 'base':
                modelPath = this.models.base;
                break;
            case 'instruct-small':
                modelPath = this.models.instruct.small;
                break;
            case 'instruct-large':
                modelPath = this.models.instruct.large;
                break;
            default:
                throw new Error('Invalid model type');
        }

        await this.loadModel(modelPath);
        console.log(`🔄 Switched to ${modelType} model`);
        return true;
    }

    /**
     * Load a specific model
     * @private
     */
    async loadModel(modelPath) {
        const scriptPath = path.join(this.configPath, 'load_model.py');
        await this.createModelLoadingScript(modelPath, scriptPath);
        
        return new Promise((resolve, reject) => {
            const python = spawn('python3', [scriptPath]);
            
            python.stdout.on('data', (data) => {
                console.log(data.toString());
            });
            
            python.stderr.on('data', (data) => {
                console.error(data.toString());
            });
            
            python.on('close', (code) => {
                if (code === 0) {
                    this.models.active = modelPath;
                    resolve(true);
                } else {
                    reject(new Error(`Failed to load model: ${modelPath}`));
                }
            });
        });
    }

    /**
     * Create the Python script for loading a specific model
     * @private
     */
    async createModelLoadingScript(modelPath, scriptPath) {
        const loadScript = `
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
import json
import os
from datetime import datetime

def load_model():
    model_name = "${modelPath}"
    print(f"📥 Loading model: {model_name}")
    
    # Load tokenizer
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    
    # Load model with appropriate settings
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
        device_map="auto",
        trust_remote_code=True
    )
    
    # Save model info
    model_info = {
        "model_name": model_name,
        "loaded_at": str(datetime.now()),
        "device": str(model.device),
        "dtype": str(model.dtype),
        "parameters": sum(p.numel() for p in model.parameters()),
        "cuda_available": torch.cuda.is_available(),
        "gpu_memory": torch.cuda.get_device_properties(0).total_memory if torch.cuda.is_available() else None
    }
    
    with open("${path.join(this.configPath, 'model_info.json')}", "w") as f:
        json.dump(model_info, f, indent=2, default=str)
    
    print("✅ Model loaded successfully")
    return True

if __name__ == "__main__":
    load_model()
`;
        await fs.writeFile(scriptPath, loadScript);
    }

    /**
     * Load a specific model from the local directory
     * @param {string} modelName - Name of the model to load
     */
    async loadLocalModel(modelName) {
        const modelPath = path.join(this.deepseekPath, 'models', modelName);
        console.log(`📥 Loading local model: ${modelName} from ${modelPath}`);

        const scriptPath = path.join(this.configPath, 'load_model.py');
        await this.createModelLoadingScript(modelPath, scriptPath);

        return new Promise((resolve, reject) => {
            const python = spawn('python3', [scriptPath]);

            python.stdout.on('data', (data) => {
                console.log(data.toString());
            });

            python.stderr.on('data', (data) => {
                console.error(data.toString());
            });

            python.on('close', (code) => {
                if (code === 0) {
                    this.models.active = modelPath;
                    resolve(true);
                } else {
                    reject(new Error(`Failed to load model: ${modelName}`));
                }
            });
        });
    }

    /**
     * Get current model and training status
     */
    getStatus() {
        return {
            initialized: this.initialized,
            activeModel: this.models.active,
            customModel: this.models.custom,
            trainingStatus: this.trainingStatus,
            paths: {
                deepseek: this.deepseekPath,
                models: this.modelsPath,
                data: this.dataPath,
                config: this.configPath
            }
        };
    }
}

module.exports = ModelManager;

