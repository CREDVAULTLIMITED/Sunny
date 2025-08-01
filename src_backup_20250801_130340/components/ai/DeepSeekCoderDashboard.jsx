import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeepSeekCoderDashboard = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const languages = [
    'javascript', 'python', 'java', 'typescript', 'react', 'node.js',
    'html', 'css', 'sql', 'bash', 'php', 'go', 'rust', 'cpp', 'c'
  ];

  // Check service status on component mount
  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const response = await axios.get('/api/deepseek/status');
      setStatus(response.data.data);
      setIsInitialized(response.data.data.initialized);
    } catch (err) {
      console.error('Status check failed:', err);
    }
  };

  const initializeService = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/deepseek/initialize');
      if (response.data.success) {
        setIsInitialized(true);
        setStatus(response.data.status);
        setError('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to initialize DeepSeek Coder');
    } finally {
      setLoading(false);
    }
  };

  const generateCode = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');
    setOutput('');

    try {
      const response = await axios.post('/api/deepseek/generate', {
        prompt: prompt.trim(),
        language,
        maxTokens: 1024,
        temperature: 0.6
      });

      if (response.data.success) {
        setOutput(response.data.data.code);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate code');
    } finally {
      setLoading(false);
    }
  };

  const analyzeCode = async () => {
    if (!prompt.trim()) {
      setError('Please enter code to analyze');
      return;
    }

    setLoading(true);
    setError('');
    setOutput('');

    try {
      const response = await axios.post('/api/deepseek/analyze', {
        code: prompt.trim(),
        language
      });

      if (response.data.success) {
        setOutput(response.data.data.analysis);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze code');
    } finally {
      setLoading(false);
    }
  };

  const generatePaymentCode = async () => {
    if (!prompt.trim()) {
      setError('Please describe the payment functionality you want to generate');
      return;
    }

    setLoading(true);
    setError('');
    setOutput('');

    try {
      const response = await axios.post('/api/deepseek/payment-code', {
        functionality: prompt.trim(),
        paymentMethod: 'general',
        language,
        includeTests: true
      });

      if (response.data.success) {
        const { code, tests } = response.data.data;
        let result = `// Generated Payment Code\n${code.code}`;
        if (tests && tests.success) {
          result += `\n\n// Generated Tests\n${tests.tests}`;
        }
        setOutput(result);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate payment code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🤖 DeepSeek Coder Integration
        </h1>
        <p className="text-gray-600">
          AI-powered code generation for your Sunny Payment Gateway
        </p>
      </div>

      {/* Status Section */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Service Status</h2>
        <div className="flex items-center gap-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            isInitialized 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {isInitialized ? '✅ Initialized' : '❌ Not Initialized'}
          </div>
          
          {!isInitialized && (
            <button
              onClick={initializeService}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Initializing...' : 'Initialize DeepSeek Coder'}
            </button>
          )}
          
          <button
            onClick={checkStatus}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Refresh Status
          </button>
        </div>
        
        {status && (
          <div className="mt-2 text-sm text-gray-600">
            <p>Path: {status.deepseekPath}</p>
            <p>Python: {status.pythonPath}</p>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">❌ {error}</p>
        </div>
      )}

      {/* Main Interface */}
      {isInitialized && (
        <div className="space-y-6">
          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Programming Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Input Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prompt / Code Input
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here... (e.g., 'Create a payment form validation function' or paste code to analyze)"
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={generateCode}
              disabled={loading || !prompt.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? '⏳ Generating...' : '🚀 Generate Code'}
            </button>
            
            <button
              onClick={analyzeCode}
              disabled={loading || !prompt.trim()}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? '⏳ Analyzing...' : '🔍 Analyze Code'}
            </button>
            
            <button
              onClick={generatePaymentCode}
              disabled={loading || !prompt.trim()}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? '⏳ Generating...' : '💳 Generate Payment Code'}
            </button>
          </div>

          {/* Output Area */}
          {output && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Generated Output
              </label>
              <div className="relative">
                <pre className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 overflow-auto text-sm font-mono">
                  {output}
                </pre>
                <button
                  onClick={() => navigator.clipboard.writeText(output)}
                  className="absolute top-2 right-2 px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                >
                  📋 Copy
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Examples */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">💡 Quick Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium mb-2">Code Generation:</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• "Create a payment validation function"</li>
              <li>• "Generate a React component for credit card input"</li>
              <li>• "Build a webhook handler for payment notifications"</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Payment-Specific:</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• "Stripe payment integration"</li>
              <li>• "PayPal checkout flow"</li>
              <li>• "Recurring billing system"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeepSeekCoderDashboard;

