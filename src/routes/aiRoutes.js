/**
 * AI Routes for Helios Chat Interface
 * Handles local DeepSeek model integration
 */

const express = require('express');
const router = express.Router();
const localDeepSeekService = require('../services/localDeepSeekService');

// Initialize the service
localDeepSeekService.initialize();

/**
 * POST /api/ai/chat
 * Chat with Helios using local DeepSeek models
 */
router.post('/chat', async (req, res) => {
  try {
    const { message, model = 'local-deepseek' } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Message is required and must be a string'
      });
    }
    
    // Determine the type of request
    const lowerMessage = message.toLowerCase();
    const requestType = (lowerMessage.includes('code') || 
                        lowerMessage.includes('function') || 
                        lowerMessage.includes('programming')) ? 'code' : 'reasoning';
    
    // Generate response using local DeepSeek service
    const response = await localDeepSeekService.generateResponse(message, requestType);
    
    res.json({
      success: true,
      response: response,
      model: 'local-deepseek',
      type: requestType,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * GET /api/ai/status
 * Get AI service status
 */
router.get('/status', async (req, res) => {
  try {
    const status = localDeepSeekService.getStatus();
    res.json({
      success: true,
      status: status,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('AI Status Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get AI service status',
      message: error.message
    });
  }
});

/**
 * POST /api/ai/setup
 * Get instructions for setting up local models
 */
router.post('/setup', async (req, res) => {
  try {
    await localDeepSeekService.setupLocalModels();
    res.json({
      success: true,
      message: 'Check console for setup instructions',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('AI Setup Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get setup instructions',
      message: error.message
    });
  }
});

module.exports = router;

