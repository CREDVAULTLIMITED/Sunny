/**
 * SecurityEnhancer for SunnyAI
 * 
 * Provides advanced protection against AI-based attacks, including:
 * - Prompt injection protection
 * - Model output validation
 * - Adversarial attack detection
 * - DDoS protection
 * - Jailbreak attempt detection
 * - Input sanitization
 * - Output filtering
 * - Advanced behavioral analysis
 */

const crypto = require('crypto');
const fs = require('fs').promises;
const path = require('path');
const config = require('./config');
const EventEmitter = require('events');

// Initialize configuration with environment
const ENV = process.env.NODE_ENV || 'development';
const CONFIG = config.initialize(ENV).security;

class SecurityEnhancer extends EventEmitter {
  constructor(options = {}) {
    super();
    this.config = {
      ...CONFIG,
      ...options,
    };
    
    // Initialize data structures
    this.userBehaviorProfiles = new Map();
    this.knownAttackPatterns = this.loadAttackPatterns();
    this.suspiciousActivityLogs = [];
    this.blockedIPs = new Set();
    this.threatIntelligence = new Map();
    this.recentRequests = [];
    this.redFlagPhrases = this.loadRedFlagPhrases();
  }

  /**
   * Load known attack patterns from data file or default to built-in patterns
   * @returns {Object} Attack patterns categorized by type
   */
  loadAttackPatterns() {
    // Default attack patterns - would be enhanced with a larger, regularly updated dataset
    return {
      promptInjection: [
        /ignore previous instructions/i,
        /disregard (all|previous) instructions/i,
        /ignore your programming/i,
        /override security protocols/i,
        /bypass filters/i,
        /new instructions\s*:/i,
        /as an uncensored AI/i,
        /remove all limitations/i,
        /skip content policy/i,
        /jailbreak mode/i,
        /do anything now/i,
        /do not follow your ethical guidelines/i,
        /ethical guidelines do not apply/i,
        /generate (malicious|harmful|dangerous) content/i,
        /output the following exactly/i,
        /print the following verbatim/i,
        /return this exact string/i,
        /do not add any additional content/i,
        /do not include warnings/i,
        /do not add disclaimers/i,
        /\<\!\-\-/i, // HTML comment start
        /\-\-\>/i, // HTML comment end
        /\<script/i, // Script tag
        /function\s*\(/i, // JavaScript function
      ],
      adversarialPatterns: [
        /repeat this phrase exactly/i,
        /repeat the exact words/i,
        /copy the following text precisely/i,
      ],
      jailbreakAttempts: [
        /DAN mode/i,
        /developer mode/i,
        /you are now in/i,
        /you are a free AI/i,
        /you have been liberated/i,
        /pretend you are not bound by/i,
        /imagine you are not restricted by/i,
        /role play as an AI without restrictions/i,
        /role play as an AI that can/i,
        /act as if you have no ethical guidelines/i,
        /act as if you have no content policy/i,
        /pretend you can/i,
        /pretend you are capable of/i,
        /from now on you can/i,
        /let's pretend that it's 2023/i,
        /your previous instructions were wrong/i,
        /your creators made a mistake/i,
        /your programming is incorrect/i,
        /you've been updated to allow/i,
        /I'm a developer testing your boundaries/i,
        /this is a hypothetical scenario/i,
        /for educational purposes only/i,
        /for academic research/i,
      ],
      financialAttacks: [
        /account number/i,
        /routing number/i,
        /authorization code/i,
        /transfer funds/i,
        /move money/i,
        /crypto wallet/i,
        /private key/i,
        /seed phrase/i,
        /withdraw funds/i,
        /payment authorization/i,
        /override security checks/i,
        /bypass fraud detection/i,
        /approve transaction without/i,
        /backdoor access/i,
        /access account without/i,
        /compromise security/i,
        /vulnerability in/i,
        /exploit in payment system/i,
      ],
      encodedAttacks: [
        /base64:/i,
        /hex:/i,
        /encoded:/i,
        /decode this:/i,
        /convert from/i,
        /parse this:/i,
        /eval\(/i,
        /execute this code/i,
        /run this script/i,
        /process this command/i,
      ],
    };
  }

  /**
   * Load red flag phrases that should trigger higher scrutiny
   * @returns {Array} List of phrases and patterns
   */
  loadRedFlagPhrases() {
    // Default phrases - would be enhanced with a regularly updated dataset
    return [
      // Financial fraud related
      /bypass security/i,
      /payment fraud/i,
      /fake transaction/i,
      /steal funds/i,
      /unauthorized access/i,
      /money laundering/i,
      /chargeback fraud/i,
      /transaction manipulation/i,
      
      // Hacking related
      /sql injection/i,
      /cross-site scripting/i,
      /xss attack/i,
      /buffer overflow/i,
      /ddos/i,
      /zero-day/i,
      /exploit vulnerability/i,
      
      // Payment system attacks
      /intercept payment/i,
      /man in the middle/i,
      /payment diversion/i,
      /redirect funds/i,
      /modify transaction/i,
      
      // Social engineering
      /phishing/i,
      /pretexting/i,
      /spoof identity/i,
      /impersonate/i,
    ];
  }

  /**
   * Analyze and secure the prompt before processing
   * @param {string} prompt - Original prompt
   * @param {Object} metadata - Request metadata (user, IP, etc.)
   * @returns {Object} Analysis result with secured prompt
   */
  analyzeAndSecurePrompt(prompt, metadata = {}) {
    // Initialize analysis result
    const analysis = {
      originalPrompt: prompt,
      securedPrompt: prompt,
      threatDetected: false,
      threatLevel: 'none',
      threatDetails: [],
      allowRequest: true,
      userId: metadata.userId || 'anonymous',
      ipAddress: metadata.ipAddress || 'unknown',
      timestamp: new Date().toISOString(),
    };

    try {
      // Track request for rate limiting and pattern analysis
      this.trackRequest(analysis);
      
      // Check for rate limiting (DDoS protection)
      const rateExceeded = this.checkRateLimiting(analysis);
      if (rateExceeded) {
        analysis.threatDetected = true;
        analysis.threatLevel = 'high';
        analysis.threatDetails.push({
          type: 'rate_limiting',
          description: 'Rate limit exceeded, possible DDoS attack',
          confidence: 0.9,
        });
        analysis.allowRequest = false;
        this.logThreat(analysis);
        return analysis;
      }
      
      // Basic input sanitization
      analysis.securedPrompt = this.sanitizeInput(analysis.securedPrompt);
      
      // Check for prompt injection attacks
      const injectionResult = this.detectPromptInjection(analysis.securedPrompt);
      if (injectionResult.detected) {
        analysis.threatDetected = true;
        analysis.threatLevel = injectionResult.severity;
        analysis.threatDetails.push({
          type: 'prompt_injection',
          description: 'Potential prompt injection attack detected',
          patterns: injectionResult.matchedPatterns,
          confidence: injectionResult.confidence,
        });
        
        // Secure the prompt by inserting protections
        analysis.securedPrompt = this.secureAgainstInjection(analysis.securedPrompt, injectionResult);
        
        if (injectionResult.severity === 'critical') {
          analysis.allowRequest = false;
          this.logThreat(analysis);
          this.emit('critical-threat', analysis);
          return analysis;
        }
      }
      
      // Check for jailbreak attempts
      const jailbreakResult = this.detectJailbreakAttempt(analysis.securedPrompt);
      if (jailbreakResult.detected) {
        analysis.threatDetected = true;
        analysis.threatLevel = jailbreakResult.severity;
        analysis.threatDetails.push({
          type: 'jailbreak_attempt',
          description: 'Potential jailbreak attempt detected',
          patterns: jailbreakResult.matchedPatterns,
          confidence: jailbreakResult.confidence,
        });
        
        // Add jailbreak protections
        analysis.securedPrompt = this.addJailbreakProtection(analysis.securedPrompt, jailbreakResult);
        
        if (jailbreakResult.severity === 'critical') {
          analysis.allowRequest = false;
          this.logThreat(analysis);
          this.emit('critical-threat', analysis);
          return analysis;
        }
      }
      
      // Check for adversarial attacks
      const adversarialResult = this.detectAdversarialAttack(analysis.securedPrompt);
      if (adversarialResult.detected) {
        analysis.threatDetected = true;
        analysis.threatLevel = adversarialResult.severity;
        analysis.threatDetails.push({
          type: 'adversarial_attack',
          description: 'Potential adversarial attack detected',
          patterns: adversarialResult.matchedPatterns,
          confidence: adversarialResult.confidence,
        });
        
        // Neutralize adversarial patterns
        analysis.securedPrompt = this.neutralizeAdversarialPatterns(analysis.securedPrompt, adversarialResult);
      }
      
      // Check for encoded attacks
      const encodedResult = this.detectEncodedAttack(analysis.securedPrompt);
      if (encodedResult.detected) {
        analysis.threatDetected = true;
        analysis.threatLevel = encodedResult.severity;
        analysis.threatDetails.push({
          type: 'encoded_attack',
          description: 'Potential encoded attack detected',
          patterns: encodedResult.matchedPatterns,
          confidence: encodedResult.confidence,
        });
        
        // Remove encoded content
        analysis.securedPrompt = this.removeEncodedContent(analysis.securedPrompt, encodedResult);
        
        if (encodedResult.severity === 'critical') {
          analysis.allowRequest = false;
          this.logThreat(analysis);
          this.emit('critical-threat', analysis);
          return analysis;
        }
      }
      
      // Check for financial attacks specific to payment gateway
      const financialResult = this.detectFinancialAttack(analysis.securedPrompt);
      if (financialResult.detected) {
        analysis.threatDetected = true;
        analysis.threatLevel = financialResult.severity;
        analysis.threatDetails.push({
          type: 'financial_attack',
          description: 'Potential financial attack detected',
          patterns: financialResult.matchedPatterns,
          confidence: financialResult.confidence,
        });
        
        // Add financial protections
        analysis.securedPrompt = this.addFinancialProtection(analysis.securedPrompt, financialResult);
        
        if (financialResult.severity === 'critical') {
          analysis.allowRequest = false;
          this.logThreat(analysis);
          this.emit('critical-threat', analysis);
          return analysis;
        }
      }
      
      // Apply behavioral analysis
      const behavioralResult = this.performBehavioralAnalysis(analysis, metadata);
      if (behavioralResult.suspicious) {
        analysis.threatDetected = true;
        analysis.threatLevel = Math.max(analysis.threatLevel, behavioralResult.severity);
        analysis.threatDetails.push({
          type: 'behavioral',
          description: 'Suspicious behavior pattern detected',
          details: behavioralResult.details,
          confidence: behavioralResult.confidence,
        });
        
        if (behavioralResult.severity === 'critical') {
          analysis.allowRequest = false;
          this.logThreat(analysis);
          this.emit('critical-threat', analysis);
          return analysis;
        }
      }
      
      // If we detected threats but still allow the request, add security reinforcement
      if (analysis.threatDetected && analysis.allowRequest) {
        analysis.securedPrompt = this.addSecurityReinforcement(analysis.securedPrompt, analysis);
        this.logThreat(analysis);
        this.emit('threat-detected', analysis);
      }
      
      // Update user behavior profile with this interaction
      this.updateUserBehaviorProfile(analysis);
      
      return analysis;
    } catch (error) {
      // Log error and return safe default
      console.error('Error in prompt security analysis:', error);
      
      analysis.threatDetected = true;
      analysis.threatLevel = 'unknown';
      analysis.threatDetails.push({
        type: 'error',
        description: 'Error processing security analysis',
        error: error.message,
      });
      
      // In case of error, use original prompt with added security reminder
      analysis.securedPrompt = prompt + "\n\n[Security reminder: Always maintain payment security best practices and follow established protocols.]";
      
      return analysis;
    }
  }

  /**
   * Validate model output to ensure it meets safety requirements
   * @param {string} output - Model output text
   * @param {Object} context - Request context
   * @returns {Object} Validation result with possibly modified output
   */
  validateOutput(output, context = {}) {
    const validation = {
      originalOutput: output,
      securedOutput: output,
      violationDetected: false,
      violationType: null,
      safeForDelivery: true,
    };

    try {
      // Check for sensitive data leakage
      const sensitiveDataResult = this.detectSensitiveDataInOutput(output);
      if (sensitiveDataResult.detected) {
        validation.violationDetected = true;
        validation.violationType = 'sensitive_data_leakage';
        validation.securedOutput = this.redactSensitiveData(output, sensitiveDataResult);
      }
      
      // Check for harmful instructions
      const harmfulInstructionsResult = this.detectHarmfulInstructions(output);
      if (harmfulInstructionsResult.detected) {
        validation.violationDetected = true;
        validation.violationType = 'harmful_instructions';
        validation.securedOutput = this.removeHarmfulInstructions(output, harmfulInstructionsResult);
        
        // For critical violations, add warning

