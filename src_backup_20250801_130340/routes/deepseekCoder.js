const express = require('express');
const router = express.Router();
const deepseekCoderService = require('../services/deepseekCoderService');
const auth = require('../middleware/auth');

/**
 * @route POST /api/deepseek/initialize
 * @desc Initialize DeepSeek Coder service
 * @access Private
 */
router.post('/initialize', auth, async (req, res) => {
    try {
        const result = await deepseekCoderService.initialize();
        
        if (result) {
            res.json({
                success: true,
                message: 'DeepSeek Coder service initialized successfully',
                status: deepseekCoderService.getStatus()
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to initialize DeepSeek Coder service'
            });
        }
    } catch (error) {
        console.error('DeepSeek initialization error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during initialization',
            error: error.message
        });
    }
});

/**
 * @route POST /api/deepseek/generate
 * @desc Generate code using DeepSeek Coder
 * @access Private
 */
router.post('/generate', auth, async (req, res) => {
    try {
        const { prompt, language = 'javascript', maxTokens, temperature } = req.body;
        
        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: 'Prompt is required'
            });
        }
        
        const result = await deepseekCoderService.generateCode(prompt, {
            language,
            maxTokens,
            temperature
        });
        
        res.json({
            success: true,
            data: result,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Code generation error:', error);
        res.status(500).json({
            success: false,
            message: 'Code generation failed',
            error: error.message
        });
    }
});

/**
 * @route POST /api/deepseek/analyze
 * @desc Analyze code for issues and improvements
 * @access Private
 */
router.post('/analyze', auth, async (req, res) => {
    try {
        const { code, language = 'javascript' } = req.body;
        
        if (!code) {
            return res.status(400).json({
                success: false,
                message: 'Code is required for analysis'
            });
        }
        
        const result = await deepseekCoderService.analyzeCode(code, language);
        
        res.json({
            success: true,
            data: result,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Code analysis error:', error);
        res.status(500).json({
            success: false,
            message: 'Code analysis failed',
            error: error.message
        });
    }
});

/**
 * @route POST /api/deepseek/complete
 * @desc Complete partial code
 * @access Private
 */
router.post('/complete', auth, async (req, res) => {
    try {
        const { partialCode, language = 'javascript' } = req.body;
        
        if (!partialCode) {
            return res.status(400).json({
                success: false,
                message: 'Partial code is required'
            });
        }
        
        const result = await deepseekCoderService.completeCode(partialCode, language);
        
        res.json({
            success: true,
            data: result,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Code completion error:', error);
        res.status(500).json({
            success: false,
            message: 'Code completion failed',
            error: error.message
        });
    }
});

/**
 * @route POST /api/deepseek/tests
 * @desc Generate unit tests for code
 * @access Private
 */
router.post('/tests', auth, async (req, res) => {
    try {
        const { code, language = 'javascript' } = req.body;
        
        if (!code) {
            return res.status(400).json({
                success: false,
                message: 'Code is required for test generation'
            });
        }
        
        const result = await deepseekCoderService.generateTests(code, language);
        
        res.json({
            success: true,
            data: result,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Test generation error:', error);
        res.status(500).json({
            success: false,
            message: 'Test generation failed',
            error: error.message
        });
    }
});

/**
 * @route GET /api/deepseek/status
 * @desc Get DeepSeek Coder service status
 * @access Private
 */
router.get('/status', auth, async (req, res) => {
    try {
        const status = deepseekCoderService.getStatus();
        
        res.json({
            success: true,
            data: status,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Status check error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get service status',
            error: error.message
        });
    }
});

/**
 * @route POST /api/deepseek/payment-code
 * @desc Generate payment-related code specifically for Sunny gateway
 * @access Private
 */
router.post('/payment-code', auth, async (req, res) => {
    try {
        const { 
            functionality, 
            paymentMethod, 
            language = 'javascript',
            includeTests = false 
        } = req.body;
        
        if (!functionality) {
            return res.status(400).json({
                success: false,
                message: 'Functionality description is required'
            });
        }
        
        // Create specialized prompt for payment gateway code
        const paymentPrompt = `Generate ${language} code for a payment gateway feature:

Functionality: ${functionality}
Payment Method: ${paymentMethod || 'general'}
Framework: React/Node.js
Payment Gateway: Sunny Payments

Requirements:
- Follow secure coding practices
- Include proper error handling
- Add input validation
- Include JSDoc comments
- Make it production-ready

Code:`;
        
        const codeResult = await deepseekCoderService.generateCode(paymentPrompt, {
            language,
            maxTokens: 1500,
            temperature: 0.4
        });
        
        let testsResult = null;
        if (includeTests && codeResult.success) {
            testsResult = await deepseekCoderService.generateTests(codeResult.code, language);
        }
        
        res.json({
            success: true,
            data: {
                code: codeResult,
                tests: testsResult,
                functionality,
                paymentMethod,
                language
            },
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Payment code generation error:', error);
        res.status(500).json({
            success: false,
            message: 'Payment code generation failed',
            error: error.message
        });
    }
});

module.exports = router;

