import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './HeliosChatPage.css';

const HeliosChatPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m Helios, created by Sunny. I\'m an AI assistant powered by advanced machine learning models, designed to help you with code generation, payment processing insights, and general assistance. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: { from: { pathname: '/ai/chat' } }
      });
    }
  }, [isAuthenticated, navigate]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Simulate API call to DeepSeek models
      const response = await generateHeliosResponse(userMessage.content);
      
      setTimeout(() => {
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const generateHeliosResponse = async (userInput) => {
    try {
      // Call the backend API that uses local DeepSeek models
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('sunnyAuthToken')}`
        },
        body: JSON.stringify({ 
          message: userInput,
          model: 'local-deepseek'
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.response;
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('Error calling local AI API:', error);
      
      // Fallback to local responses if API is unavailable
      return generateFallbackResponse(userInput);
    }
  };
  
  const generateFallbackResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    // Handle specific questions about Sunny/Helios
    if (lowerInput.includes('who created you') || lowerInput.includes('who made you')) {
      return 'I was created by Sunny, a cutting-edge payment processing company. The founder is Samuel Mbugua, who is also an ML engineer. I\'m Helios, an AI assistant designed to help with various tasks including code generation, payment insights, and technical assistance.';
    }
    
    if (lowerInput.includes('founder') || lowerInput.includes('samuel')) {
      return 'The founder of Sunny is Samuel Mbugua, who is also a talented ML engineer. He built Sunny to revolutionize payment processing through AI-powered solutions, and created me (Helios) to assist users with various technical and business needs.';
    }
    
    if (lowerInput.includes('what are you') || lowerInput.includes('who are you')) {
      return 'I\'m Helios, an AI assistant created by Sunny. I\'m powered by locally-hosted DeepSeek models including DeepSeek-Coder for code generation and DeepSeek-R1 for reasoning. I can help you with code development, payment processing insights, technical documentation, and general assistance. My origin is rooted in ML engineering expertise from Sunny\'s founder Samuel Mbugua.';
    }
    
    if (lowerInput.includes('sunny') && (lowerInput.includes('company') || lowerInput.includes('about'))) {
      return 'Sunny is an innovative payment processing company that leverages artificial intelligence to create smarter, faster, and more secure payment solutions. Founded by Samuel Mbugua, an ML engineer, Sunny focuses on democratizing financial services worldwide through AI-powered technology. The company offers comprehensive payment infrastructure, fraud detection, smart routing, and predictive analytics.';
    }
    
    // Code generation requests
    if (lowerInput.includes('code') || lowerInput.includes('function') || lowerInput.includes('programming')) {
      return `I can help you with code generation using our local DeepSeek-Coder model! Based on your request, here's a starting point:

\`\`\`javascript
// Generated by Helios - Sunny's Local AI Assistant
function processPayment(amount, currency) {
  try {
    const payment = {
      amount: parseFloat(amount),
      currency: currency.toUpperCase(),
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    
    console.log('Processing payment:', payment);
    return payment;
  } catch (error) {
    console.error('Payment processing error:', error);
    throw error;
  }
}
\`\`\`

This code runs through our local AI models. Would you like me to generate code for a specific framework or use case?`;
    }
    
    // Payment-related queries
    if (lowerInput.includes('payment') || lowerInput.includes('transaction') || lowerInput.includes('billing')) {
      return 'I can assist you with payment processing insights using our local AI models! Sunny\'s platform offers:\n\n• **Smart Payment Routing** - AI-optimized success rates\n• **Local Fraud Detection** - Private, secure analysis\n• **Multi-currency Support** - 150+ currencies\n• **Real-time Analytics** - Payment insights\n• **Local AI Processing** - Your data stays private\n\nWhat specific payment-related question can I help you with?';
    }
    
    // General AI/ML questions
    if (lowerInput.includes('machine learning') || lowerInput.includes('artificial intelligence') || lowerInput.includes('ml')) {
      return 'As an AI created by ML engineer Samuel Mbugua at Sunny, I\'m powered by locally-hosted DeepSeek models:\n\n• **DeepSeek-Coder** - Local code generation and programming assistance\n• **DeepSeek-R1** - Local reasoning and problem-solving\n• **Privacy-First** - All processing happens on your infrastructure\n• **No Data Sharing** - Your conversations stay completely private\n\nOur local deployment ensures your data never leaves your servers while providing enterprise-grade AI capabilities.';
    }
    
    // Default intelligent response
    const responses = [
      `I understand you're asking about "${userInput}". As Helios, I'm processing this through our local DeepSeek models. Could you provide more context so I can give you the most accurate response?`,
      `That's an interesting question about "${userInput}". Using our local AI infrastructure, I'd be happy to help you explore this topic further. What specific aspect would you like me to focus on?`,
      `Thanks for your question! Our local AI models can assist with code generation, payment processing, and technical guidance. Could you tell me more about what you're trying to achieve?`,
      `I'm ready to help with your inquiry about "${userInput}". As Sunny's local AI assistant, I can provide insights on development, payments, or general assistance. What would be most helpful for you?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isAuthenticated) {
    return (
      <div className="helios-loading">
        <div className="loading-spinner"></div>
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="helios-chat">
      {/* Header */}
      <div className="chat-header">
        <div className="header-left">
          <div className="helios-avatar">
            <div className="avatar-glow"></div>
            <div className="avatar-core">H</div>
          </div>
          <div className="header-info">
            <h1>Helios</h1>
            <p>Created by Sunny • AI Assistant</p>
          </div>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span>Welcome, {user?.email || 'User'}</span>
            <div className="user-avatar">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages">
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              <div className="message-avatar">
                {message.type === 'ai' ? (
                  <div className="ai-avatar">
                    <div className="avatar-glow"></div>
                    <div className="avatar-core">H</div>
                  </div>
                ) : (
                  <div className="user-avatar-small">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              <div className="message-content">
                <div className="message-header">
                  <span className="message-sender">
                    {message.type === 'ai' ? 'Helios' : 'You'}
                  </span>
                  <span className="message-time">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
                <div className="message-text">
                  {message.content.split('\n').map((line, index) => {
                    // Handle code blocks
                    if (line.startsWith('```')) {
                      return <div key={index} className="code-block-marker"></div>;
                    }
                    // Handle bullet points
                    if (line.startsWith('•')) {
                      return (
                        <div key={index} className="bullet-point">
                          {line}
                        </div>
                      );
                    }
                    // Handle code inline
                    if (line.includes('`')) {
                      const parts = line.split('`');
                      return (
                        <div key={index}>
                          {parts.map((part, i) => 
                            i % 2 === 0 ? part : <code key={i} className="inline-code">{part}</code>
                          )}
                        </div>
                      );
                    }
                    return line && <div key={index}>{line}</div>;
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message ai typing">
              <div className="message-avatar">
                <div className="ai-avatar">
                  <div className="avatar-glow"></div>
                  <div className="avatar-core">H</div>
                </div>
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="chat-input">
        <div className="input-container">
          <div className="input-wrapper">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Helios anything... (e.g., 'Generate a React component', 'Explain payment processing', 'Who created you?')"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="send-button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="input-footer">
            <p>Helios can make mistakes. Consider checking important information.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeliosChatPage;

