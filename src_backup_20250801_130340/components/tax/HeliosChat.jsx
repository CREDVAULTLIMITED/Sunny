import React, { useState } from 'react';
import './HeliosChat.css';

const HeliosChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setInput('');

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, context: 'tax' })
      });
      
      const data = await response.json();
      setMessages(prev => [...prev, { type: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!isOpen) {
    return (
      <button 
        className="helios-chat-button"
        onClick={() => setIsOpen(true)}
        aria-label="Open Helios Chat"
      >
        <img src="/assets/images/sunny-logo.svg" alt="Helios" />
      </button>
    );
  }

  return (
    <div className={`helios-chat-container ${isExpanded ? 'expanded' : ''}`}>
      <div className="helios-chat-header">
        <img src="/assets/images/sunny-logo.svg" alt="Helios" className="helios-logo" />
        <div className="helios-chat-controls">
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? '⊙' : '⤢'}
          </button>
          <button onClick={() => setIsOpen(false)}>✕</button>
        </div>
      </div>
      
      <div className="helios-chat-messages">
        {messages.length === 0 && (
          <div className="helios-welcome">
            <h3>Hello! I'm Helios 👋</h3>
            <p>Ask me anything about tax compliance, rates, or requirements.</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.type}`}>
            {msg.type === 'assistant' && (
              <img src="/assets/images/sunny-logo.svg" alt="Helios" className="message-avatar" />
            )}
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="helios-chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about tax compliance..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default HeliosChat;
