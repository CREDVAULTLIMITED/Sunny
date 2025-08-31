/**
 * DeepSeek Coder Integration Service
 * Provides code generation, completion, and analysis capabilities
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs').promises;

class DeepSeekCoderService {
    constructor() {
        this.deepseekPath = path.join(__dirname, '../ai/deepseek-coder');
        this.pythonPath = 'python3'; // Adjust if needed
        this.modelCache = new Map();
        this.initialized = false;
    }

    /**
     * Initialize the DeepSeek Coder service
     */
    async initialize() {
        try {
            // Check if Python and required packages are available
            await this.checkPythonDependencies();
            
            // Verify DeepSeek files exist
            const demoPath = path.join(this.deepseekPath, 'demo', 'app.py');
            await fs.access(demoPath);
            
            this.initialized = true;
            console.log('✅ DeepSeek Coder service initialized successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize DeepSeek Coder service:', error.message);
            return false;
        }
    }

    /**
     * Check if Python dependencies are installed
     */
    async checkPythonDependencies() {
        return new Promise((resolve, reject) => {
            const python = spawn(this.pythonPath, ['-c', 'import torch, transformers; print("Dependencies OK")']);
            
            python.on('close', (code) => {
                if (code === 0) {
                    resolve(true);
                } else {
                    reject(new Error('Missing Python dependencies. Please install: torch, transformers'));
                }
            });
            
            python.on('error', (error) => {
                reject(new Error(`Python not found: ${error.message}`));
            });
        });
    }

    /**
     * Generate code using DeepSeek Coder
     * @param {string} prompt - The code generation prompt
     * @param {object} options - Generation options
     */
    async generateCode(prompt, options = {}) {
        if (!this.initialized) {
            throw new Error('DeepSeek Coder service not initialized');
        }

        const {
            maxTokens = 1024,
            temperature = 0.6,
            topP = 0.9,
            language = 'javascript'
        } = options;

        return new Promise((resolve, reject) => {
            const scriptPath = path.join(this.deepseekPath, 'generate_code.py');
            
            // Create a temporary Python script for code generation
            const pythonScript = `
import sys
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

def generate_code(prompt, max_tokens=${maxTokens}, temperature=${temperature}):
    try:
        model_id = "deepseek-ai/deepseek-coder-6.7b-instruct"
        tokenizer = AutoTokenizer.from_pretrained(model_id)
        model = AutoModelForCausalLM.from_pretrained(
            model_id, 
            torch_dtype=torch.bfloat16, 
            device_map="auto" if torch.cuda.is_available() else "cpu"
        )
        
        # Format prompt for ${language}
        formatted_prompt = f"""Please generate {language} code for the following request:
{prompt}

Code:"""
        
        inputs = tokenizer(formatted_prompt, return_tensors="pt")
        
        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_new_tokens=max_tokens,
                temperature=temperature,
                do_sample=True,
                pad_token_id=tokenizer.eos_token_id
            )
        
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        # Extract only the generated part
        generated = response[len(formatted_prompt):].strip()
        return generated
        
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    prompt = sys.argv[1] if len(sys.argv) > 1 else "Create a hello world function"
    result = generate_code(prompt)
    print(result)
`;

            // Write and execute the Python script
            fs.writeFile(scriptPath, pythonScript)
                .then(() => {
                    const python = spawn(this.pythonPath, [scriptPath, prompt]);
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
                            resolve({
                                success: true,
                                code: output.trim(),
                                language,
                                prompt
                            });
                        } else {
                            reject(new Error(`Code generation failed: ${error}`));
                        }
                    });
                })
                .catch(reject);
        });
    }

    /**
     * Analyze code for potential issues
     * @param {string} code - The code to analyze
     * @param {string} language - Programming language
     */
    async analyzeCode(code, language = 'javascript') {
        if (!this.initialized) {
            throw new Error('DeepSeek Coder service not initialized');
        }

        const prompt = `Analyze the following ${language} code for potential issues, security vulnerabilities, and improvements:\n\n${code}\n\nAnalysis:`;
        
        try {
            const result = await this.generateCode(prompt, { 
                maxTokens: 512, 
                language: 'analysis' 
            });
            
            return {
                success: true,
                analysis: result.code,
                language,
                originalCode: code
            };
        } catch (error) {
            throw new Error(`Code analysis failed: ${error.message}`);
        }
    }

    /**
     * Complete code based on context
     * @param {string} partialCode - Incomplete code
     * @param {string} language - Programming language
     */
    async completeCode(partialCode, language = 'javascript') {
        if (!this.initialized) {
            throw new Error('DeepSeek Coder service not initialized');
        }

        const prompt = `Complete the following ${language} code:\n\n${partialCode}`;
        
        try {
            const result = await this.generateCode(prompt, { 
                maxTokens: 1024, 
                temperature: 0.4,
                language 
            });
            
            return {
                success: true,
                completion: result.code,
                language,
                originalCode: partialCode
            };
        } catch (error) {
            throw new Error(`Code completion failed: ${error.message}`);
        }
    }

    /**
     * Generate unit tests for given code
     * @param {string} code - Code to test
     * @param {string} language - Programming language
     */
    async generateTests(code, language = 'javascript') {
        if (!this.initialized) {
            throw new Error('DeepSeek Coder service not initialized');
        }

        const testFramework = language === 'javascript' ? 'Jest' : 'appropriate testing framework';
        const prompt = `Generate comprehensive unit tests using ${testFramework} for the following ${language} code:\n\n${code}\n\nTests:`;
        
        try {
            const result = await this.generateCode(prompt, { 
                maxTokens: 1024, 
                language 
            });
            
            return {
                success: true,
                tests: result.code,
                language,
                originalCode: code,
                framework: testFramework
            };
        } catch (error) {
            throw new Error(`Test generation failed: ${error.message}`);
        }
    }

    /**
     * Get service status
     */
    getStatus() {
        return {
            initialized: this.initialized,
            deepseekPath: this.deepseekPath,
            pythonPath: this.pythonPath,
            cacheSize: this.modelCache.size
        };
    }
}

module.exports = new DeepSeekCoderService();

