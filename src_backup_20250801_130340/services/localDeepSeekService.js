/**
 * Local DeepSeek Model Service
 * Integrates with locally hosted DeepSeek models
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs').promises;
const ModelManager = require('../ai/modelManager');
const SecureHttpClient = require('./secureHttpClient');
const LearningManager = require('./learningManager');

class LocalDeepSeekService {
    constructor() {
        this.venvPath = path.join(__dirname, '../../venv');
        this.pythonPath = path.join(this.venvPath, 'bin', 'python');
        this.modelsPath = path.join(__dirname, '../ai/models');
        this.configPath = path.join(__dirname, '../ai/config/model-config.json');
        this.isInitialized = false;
        this.modelManager = new ModelManager();
        this.httpClient = null;
        this.learningManager = null;
    }

    /**
     * Initialize the local DeepSeek service
     */
    async initialize() {
        try {
            // Initialize virtual environment
            await this.ensureVirtualEnvironment();
            
            // Initialize model manager
            await this.modelManager.initialize();
            
            // Enable advanced features
            this.modelManager.enableStreaming();
            await this.modelManager.enableInternet({
                allowedDomains: [
                    'wikipedia.org',
                    'github.com',
                    'stackoverflow.com',
                    'docs.python.org',
                    'developer.mozilla.org'
                ],
                maxRequestsPerMinute: 30,
                maxTokensPerRequest: 2000,
                requireSigning: true
            });
            
            // Initialize secure HTTP client
            this.httpClient = new SecureHttpClient({
                allowedDomains: [
                    'wikipedia.org',
                    'github.com',
                    'stackoverflow.com',
                    'docs.python.org',
                    'developer.mozilla.org'
                ],
                maxRequestsPerMinute: 30
            });

            // Initialize learning manager
            this.learningManager = new LearningManager();
            await this.learningManager.initialize();

            this.isInitialized = true;
            console.log('✅ Local DeepSeek service initialized with enhanced capabilities');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize Local DeepSeek service:', error.message);
            return false;
        }
    }

    /**
     * Ensure virtual environment is set up
     */
    async ensureVirtualEnvironment() {
        try {
            // Check if venv exists
            await fs.access(this.pythonPath);
            console.log('✅ Virtual environment found');
        } catch (error) {
            throw new Error('Virtual environment not found. Please set up Python virtual environment.');
        }
    }

    /**
     * Generate response using local DeepSeek models
     * @param {string} prompt - User input
     * @param {string} type - 'code' or 'reasoning'
     */
    async generateResponse(prompt, type = 'reasoning') {
        if (!this.isInitialized) {
            throw new Error('Service not initialized');
        }

        try {
            // Get relevant knowledge
            const relevantKnowledge = await this.learningManager.getRelevantKnowledge(prompt);
            
            // Add system context and knowledge
            const systemContext = this.getSystemContext();
            const knowledgeContext = relevantKnowledge
                .map(k => k.content)
                .join('\n\n');
            
            const enhancedPrompt = `${systemContext}\n\nRelevant Knowledge:\n${knowledgeContext}\n\nUser: ${prompt}`;

            // Generate response
            const response = await this.modelManager.generateResponse(
                enhancedPrompt,
                type
            );

            // Learn from this interaction
            await this.learningManager.learnFromConversation(prompt, response, {
                type,
                modelUsed: this.modelManager.getCurrentModel()?.name
            });

            return response;
        } catch (error) {
            console.error('Error generating response:', error);
            throw error;
        }
    }

    /**
     * Get system context for the AI
     */
    getSystemContext() {
        return `I am Helios, an AI assistant created by Samuel Mbugua at Sunny. I'm capable of code generation, technical problem-solving, and general reasoning. I process all requests locally using DeepSeek models to ensure privacy and security. I aim to be helpful while adhering to safe computing practices and ethical guidelines.`;
    }

    /**
     * Stream response for real-time interaction
     * @param {string} prompt - User input
     * @param {string} type - 'code' or 'reasoning'
     */
    async streamResponse(prompt, type = 'reasoning') {
        if (!this.isInitialized) {
            throw new Error('Service not initialized');
        }

        // Enable streaming for this request
        this.modelManager.enableStreaming(50); // 50 tokens per chunk

        try {
            const systemContext = this.getSystemContext();
            const enhancedPrompt = `${systemContext}\n\nUser: ${prompt}`;

            // Generate streaming response
            return await this.modelManager.generateResponse(
                enhancedPrompt,
                type
            );
        } catch (error) {
            console.error('Error streaming response:', error);
            throw error;
        }
    }

    /**
     * Download and set up actual DeepSeek models
     * This function helps users set up real local models
     */
    async setupLocalModels() {
        console.log('\n🚀 Setting up local DeepSeek models...');
        console.log('\nTo get truly local models, you need to download them from HuggingFace:');
        console.log('\n1. For DeepSeek-Coder (smaller, good for code generation):');
        console.log('   git lfs clone https://huggingface.co/deepseek-ai/deepseek-coder-1.3b-instruct');
        console.log('\n2. For DeepSeek-R1 (larger, better reasoning):');
        console.log('   git lfs clone https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B');
        console.log('\n3. Install git-lfs if you haven\'t already:');
        console.log('   sudo apt install git-lfs');
        console.log('\nNote: These models require significant disk space (1.3B model ~2.6GB, 7B model ~14GB)');
        console.log('\n✨ Currently using intelligent simulation until models are downloaded.');
    }

    /**
     * Check if actual local models are available
     */
    async checkLocalModels() {
        try {
            const configPath = path.join(this.modelsPath, 'helios_config.json');
            await fs.access(configPath);
            
            const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
            return config.downloaded && config.downloaded.length > 0;
        } catch (error) {
            return false;
        }
    }

    /**
     * Generate response using actual downloaded models
     */
    async generateWithLocalModels(prompt, type) {
        try {
            console.log(`🧠 Using local ${type} model for: ${prompt.substring(0, 50)}...`);
            
            // Create a Python script to run the model
            const scriptContent = `
import sys
import json
import torch
from pathlib import Path
from transformers import AutoTokenizer, AutoModelForCausalLM

def generate_response(prompt, model_type):
    models_dir = Path("${this.modelsPath}")
    
    if model_type == "code":
        model_path = models_dir / "deepseek-coder"
    else:
        model_path = models_dir / "deepseek-coder"  # Use coder for now since it's downloaded
    
    try:
        # Load tokenizer and model with optimizations
        tokenizer = AutoTokenizer.from_pretrained(model_path)
        model = AutoModelForCausalLM.from_pretrained(
            model_path, 
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            device_map="auto" if torch.cuda.is_available() else None,
            low_cpu_mem_usage=True
        )
        
        # Tokenize input
        inputs = tokenizer.encode(prompt, return_tensors="pt", truncation=True, max_length=256);
        
        # Generate with optimized settings
        with torch.no_grad():
            outputs = model.generate(
                inputs,
                max_new_tokens=200,  # Reduced for faster generation
                temperature=0.7,
                do_sample=True,
                pad_token_id=tokenizer.eos_token_id,
                attention_mask=torch.ones_like(inputs)
            )
        
        # Decode response (only new tokens)
        response = tokenizer.decode(outputs[0][inputs.shape[1]:], skip_special_tokens=True)
        return response.strip()
        
    except Exception as e:
        return f"Error using local model: {str(e)}"

if __name__ == "__main__":
    prompt = sys.argv[1] if len(sys.argv) > 1 else "Hello"
    model_type = sys.argv[2] if len(sys.argv) > 2 else "reasoning"
    
    result = generate_response(prompt, model_type)
    print(result)
`;
            
            // Write temporary script
            const tempScript = path.join(__dirname, 'temp_generation.py');
            await fs.writeFile(tempScript, scriptContent);
            
            // Run the script
            const result = await this.runPythonScript(tempScript, [prompt, type]);
            
            // Clean up
            await fs.unlink(tempScript).catch(() => {});
            
            return result || this.simulateLocalModel(prompt, type);
            
        } catch (error) {
            console.error('Error with local model:', error);
            return this.simulateLocalModel(prompt, type);
        }
    }

    /**
     * Run Python script with arguments
     */
    async runPythonScript(scriptPath, args = []) {
        return new Promise((resolve, reject) => {
            const python = spawn(this.pythonPath, [scriptPath, ...args]);
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
                    resolve(output.trim());
                } else {
                    console.error('Python script error:', error);
                    reject(new Error(error || 'Python script failed'));
                }
            });

            // Set timeout
            setTimeout(() => {
                python.kill();
                reject(new Error('Python script timeout'));
            }, 30000); // 30 second timeout
        });
    }

    /**
     * Search the internet for a query
     * @param {string} query - Search query
     */
    async searchInternet(query) {
        if (!this.httpClient) {
            throw new Error('HTTP client not initialized');
        }

        try {
            // Format the search URL (example using Wikipedia API)
            const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json`;
            
            const response = await this.httpClient.fetch(url);
            return response.data;
        } catch (error) {
            console.error('Error searching internet:', error);
            throw error;
        }
    }

    /**
     * Get service status
     */
    async getStatus() {
        const modelsAvailable = await this.checkLocalModels();
        
        return {
            initialized: this.isInitialized,
            venvPath: this.venvPath,
            modelsPath: this.modelsPath,
            pythonPath: this.pythonPath,
            modelsDownloaded: modelsAvailable,
            models: {
                coder: modelsAvailable ? 'local model ready' : 'simulated (download available)',
                reasoner: modelsAvailable ? 'local model ready' : 'simulated (download available)'
            },
            message: modelsAvailable ? 
                'Using actual local DeepSeek models! 🚀' : 
                'Service ready - using intelligent simulation until local models are downloaded'
        };
    }
}

module.exports = new LocalDeepSeekService();

