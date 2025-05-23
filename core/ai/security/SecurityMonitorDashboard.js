/**
 * Security Monitor Dashboard
 * 
 * Provides real-time monitoring, visualization, alerting, and incident response
 * for SunnyAI security events. This dashboard tracks security threats,
 * displays analytics, and enables security team response.
 */

const EventEmitter = require('events');

class SecurityMonitorDashboard extends EventEmitter {
  constructor(options = {}) {
    super();
    this.config = {
      port: options.port || 3033,
      refreshInterval: options.refreshInterval || 5000,
      maxEventsStored: options.maxEventsStored || 1000,
      alertThresholds: {
        critical: 1, // Immediate alert
        high: 3,     // Alert after 3 occurrences
        medium: 10,  // Alert after 10 occurrences
        low: 50      // Alert after 50 occurrences
      },
      ...options
    };
    
    // Security event storage
    this.securityEvents = [];
    this.activeAlerts = new Map();
    this.threatStats = {
      totalEvents: 0,
      byType: {},
      byLevel: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
        none: 0
      },
      byTimespan: {
        last24h: 0,
        last7d: 0,
        last30d: 0
      },
      topAttackerIPs: {},
      topAttackedEndpoints: {}
    };
    
    // Incident response tracking
    this.activeIncidents = new Map();
    this.incidentResponses = [];
    
    // Status
    this.isRunning = false;
  }

  /**
   * Start the security dashboard server (simplified for testing)
   */
  async start() {
    this.isRunning = true;
    console.log('Security Monitor Dashboard started in test mode');
    return true;
  }

  /**
   * Stop the security dashboard server
   */
  async stop() {
    this.isRunning = false;
    console.log('Security Monitor Dashboard stopped');
    return true;
  }

  /**
   * Register a security event
   * @param {Object} event - Security event data
   */
  registerSecurityEvent(event) {
    // Ensure event has necessary properties
    const securityEvent = {
      id: event.id || `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: event.timestamp || new Date().toISOString(),
      type: event.type || 'unknown',
      level: event.level || 'medium',
      description: event.description || 'Unknown security event',
      details: event.details || {},
      source: event.source || { ip: 'unknown', user: 'unknown' },
      resolved: false,
      ...event
    };
    
    // Add to events storage
    this.securityEvents.unshift(securityEvent);
    
    // Trim events if exceeding max
    if (this.securityEvents.length > this.config.maxEventsStored) {
      this.securityEvents = this.securityEvents.slice(0, this.config.maxEventsStored);
    }
    
    // Update statistics
    this.updateStats(securityEvent);
    
    // Check if this event should trigger an alert
    this.checkForAlert(securityEvent);
    
    // Emit event
    this.emit('security_event', securityEvent);
    
    // If critical event, immediately broadcast to clients
    if (securityEvent.level === 'critical') {
      this.notifySecurityTeam(securityEvent);
    }
    
    return securityEvent.id;
  }

  /**
   * Update security statistics with a new event
   * @param {Object} event - Security event
   */
  updateStats(event) {
    // Update total count
    this.threatStats.totalEvents++;
    
    // Update by type
    this.threatStats.byType[event.type] = (this.threatStats.byType[event.type] || 0) + 1;
    
    // Update by level
    this.threatStats.byLevel[event.level]++;
    
    // Update by timespan
    const eventTime = new Date(event.timestamp);
    const now = new Date();
    const hoursDiff = (now - eventTime) / (1000 * 60 * 60);
    
    if (hoursDiff <= 24) {
      this.threatStats.byTimespan.last24h++;
    }
    if (hoursDiff <= 24 * 7) {
      this.threatStats.byTimespan.last7d++;
    }
    if (hoursDiff <= 24 * 30) {
      this.threatStats.byTimespan.last30d++;
    }
    
    // Update top attacker IPs
    if (event.source && event.source.ip && event.source.ip !== 'unknown') {
      this.threatStats.topAttackerIPs[event.source.ip] = 
        (this.threatStats.topAttackerIPs[event.source.ip] || 0) + 1;
    }
    
    // Update top attacked endpoints
    if (event.details && event.details.endpoint) {
      this.threatStats.topAttackedEndpoints[event.details.endpoint] = 
        (this.threatStats.topAttackedEndpoints[event.details.endpoint] || 0) + 1;
    }
  }

  /**
   * Check if a security event should trigger an alert
   * @param {Object} event - Security event
   */
  checkForAlert(event) {
    const { alertThresholds } = this.config;
    
    // Check if this event type + level combination has enough occurrences to trigger an alert
    const eventKey = `${event.type}:${event.level}`;
    
    // Get existing alert or create a new one
    let alert = this.activeAlerts.get(eventKey);
    
    if (!alert) {
      alert = {
        id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        eventType: event.type,
        level: event.level,
        firstSeen: event.timestamp,
        lastSeen: event.timestamp,
        count: 1,
        relatedEvents: [event.id],
        description: `${event.level.toUpperCase()} alert: ${event.type} security events detected`,
        acknowledged: false,
        requiredCount: alertThresholds[event.level] || 10
      };
      
      this.activeAlerts.set(eventKey, alert);
    } else {
      // Update existing alert
      alert.count++;
      alert.lastSeen = event.timestamp;
      alert.relatedEvents.push(event.id);
    }
    
    // Check if alert threshold is reached
    if (alert.count >= alert.requiredCount && !alert.triggered) {
      alert.triggered = true;
      alert.triggeredAt = new Date().toISOString();
      
      // Emit alert event
      this.emit('alert', alert);
      
      // Notify security team
      this.notifySecurityTeam(alert);
    }
  }

  /**
   * Notify security team of an alert or critical event
   * @param {Object} eventOrAlert - The event or alert to notify about
   */
  notifySecurityTeam(eventOrAlert) {
    // In a real implementation, this would send notifications
    // via email, SMS, Slack, etc. For testing purposes, just log it.
    console.log(`SECURITY NOTIFICATION: ${eventOrAlert.description || eventOrAlert.type}`);
    
    // Emit notification event
    this.emit('notification_sent', {
      timestamp: new Date().toISOString(),
      target: 'security_team',
      content: eventOrAlert,
    });
  }

  /**
   * Get recent security events
   * @param {number} count - Number of events to return
   * @param {Object} filter - Optional filter criteria
   * @returns {Array} - Recent security events
   */
  getRecentEvents(count = 10, filter = {}) {
    let events = [...this.securityEvents];
    
    // Apply filters if provided
    if (filter.level) {
      events = events.filter(event => event.level === filter.level);
    }
    
    if (filter.type) {
      events = events.filter(event => event.type === filter.type);
    }
    
    if (filter.timeframe) {
      const cutoff = new Date();
      cutoff.setHours(cutoff.getHours() - filter.timeframe);
      events = events.filter(event => new Date(event.timestamp) >= cutoff);
    }
    
    // Return limited number of events
    return events.slice(0, count);
  }

  /**
   * Get current security status summary
   * @returns {Object} - Security status
   */
  getSecurityStatus() {
    const criticalAlerts = Array.from(this.activeAlerts.values())
      .filter(alert => alert.level === 'critical' && alert.triggered && !alert.acknowledged)
      .length;
    
    const highAlerts = Array.from(this.activeAlerts.values())
      .filter(alert => alert.level === 'high' && alert.triggered && !alert.acknowledged)
      .length;
    
    let status = 'normal';
    if (criticalAlerts > 0) {
      status = 'critical';
    } else if (highAlerts > 0) {
      status = 'warning';
    }
    
    return {
      status,
      timestamp: new Date().toISOString(),
      activeAlerts: {
        critical: criticalAlerts,
        high: highAlerts,
        medium: Array.from(this.activeAlerts.values())
          .filter(alert => alert.level === 'medium' && alert.triggered && !alert.acknowledged)
          .length,
        low: Array.from(this.activeAlerts.values())
          .filter(alert => alert.level === 'low' && alert.triggered && !alert.acknowledged)
          .length,
      },
      recentEvents: {
        last24h: this.threatStats.byTimespan.last24h,
        lastHour: this.securityEvents.filter(
          event => new Date(event.timestamp) >= new Date(Date.now() - 3600000)
        ).length,
      },
      topAttackers: Object.entries(this.threatStats.topAttackerIPs)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([ip, count]) => ({ ip, count })),
    };
  }

  /**
   * Create a security incident from related events
   * @param {Array} eventIds - Event IDs related to the incident
   * @param {string} summary - Incident summary
   * @param {string} assignedTo - User assigned to the incident
   * @returns {Object} - Created incident
   */
  createIncident(eventIds, summary, assignedTo) {
    const relatedEvents = this.securityEvents.filter(event => 
      eventIds.includes(event.id)
    );
    
    if (relatedEvents.length === 0) {
      return null;
    }
    
    // Determine highest severity from related events
    const severityLevels = ['critical', 'high', 'medium', 'low', 'none'];
    const highestSeverityEvent = relatedEvents.reduce((highest, event) => {
      const currentIndex = severityLevels.indexOf(event.level);
      const highestIndex = severityLevels.indexOf(highest.level);
      return currentIndex < highestIndex ? event : highest;
    }, { level: 'none' });
    
    // Create incident
    const incident = {
      id: `inc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      summary: summary || `Incident: ${highestSeverityEvent.type}`,
      severity: highestSeverityEvent.level,
      status: 'open',
      relatedEvents: eventIds,
      createdAt: new Date().toISOString(),
      assignedTo: assignedTo || 'unassigned',
      timeline: [
        {
          action: 'created',
          timestamp: new Date().toISOString(),
          details: 'Incident created',
        }
      ]
    };
    
    // Store incident
    this.activeIncidents.set(incident.id, incident);
    
    // Emit event
    this.emit('incident_created', incident);
    
    return incident;
  }

  /**
   * Update an incident
   * @param {string} incidentId - Incident ID
   * @param {Object} updates - Updates to apply
   * @returns {Object} - Updated incident
   */
  updateIncident(incidentId, updates) {
    const incident = this.activeIncidents.get(incidentId);
    
    if (!incident) {
      return null;
    }
    
    // Apply updates
    if (updates.status) {
      incident.status = updates.status;
      incident.timeline.push({
        action: 'status_change',
        timestamp: new Date().toISOString(),
        details: `Status changed to ${updates.status}`,
      });
    }
    
    if (updates.assignedTo) {
      incident.assignedTo = updates.assignedTo;
      incident.timeline.push({
        action: 'reassigned',
        timestamp: new Date().toISOString(),
        details: `Assigned to ${updates.assignedTo}`,
      });
    }
    
    if (updates.notes) {
      incident.timeline.push({
        action: 'note_added',
        timestamp: new Date().toISOString(),
        details: updates.notes,
      });
    }
    
    // If resolving, update related alerts
    if (updates.status === 'resolved') {
      incident.resolvedAt = new Date().toISOString();
      
      // Mark related alerts as acknowledged
      for (const eventId of incident.relatedEvents) {
        const event = this.securityEvents.find(e => e.id === eventId);
        if (event) {
          const alertKey = `${event.type}:${event.level}`;
          const alert = this.activeAlerts.get(alertKey);
          if (alert) {
            alert.acknowledged = true;
            alert.acknowledgedAt = new Date().toISOString();
            alert.acknowledgedBy = updates.resolvedBy || incident.assignedTo;
            this.activeAlerts.set(alertKey, alert);
          }
        }
      }
    }
    
    // Update incident
    this.activeIncidents.set(incidentId, incident);
    
    // Emit event
    this.emit('incident_updated', incident);
    
    return incident;
  }

  /**
   * Broadcast a critical security event
   * @param {Object} event - Security event
   */
  broadcastCriticalEvent(event) {
    console.log(`CRITICAL SECURITY EVENT: ${event.type}`

/**
 * Security Monitor Dashboard
 * 
 * Provides real-time monitoring, visualization, alerting, and incident response
 * for SunnyAI security events. This dashboard tracks security threats,
 * displays analytics, and enables security team response.
 */

const EventEmitter = require('events');
const fs = require('fs').promises;
const path = require('path');
const config = require('../config');
const { createServer } = require('http');
const WebSocket = require('ws');

// Initialize configuration
const ENV = process.env.NODE_ENV || 'development';
const CONFIG = config.initialize(ENV);

class SecurityMonitorDashboard extends EventEmitter {
  constructor(options = {}) {
    super();
    this.config = {
      port: options.port || 3033,
      refreshInterval: options.refreshInterval || 5000,
      maxEventsStored: options.maxEventsStored || 1000,
      alertThresholds: {
        critical: 1, // Immediate alert
        high: 3,     // Alert after 3 occurrences
        medium: 10,  // Alert after 10 occurrences
        low: 50      // Alert after 50 occurrences
      },
      ...options
    };
    
    // Security event storage
    this.securityEvents = [];
    this.activeAlerts = new Map();
    this.threatStats = {
      totalEvents: 0,
      byType: {},
      byLevel: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
        none: 0
      },
      byTimespan: {
        last24h: 0,
        last7d: 0,
        last30d: 0
      },
      topAttackerIPs: {},
      topAttackedEndpoints: {}
    };
    
    // Connections
    this.clients = new Set();
    this.server = null;
    this.wsServer = null;
    this.isRunning = false;
    
    // Incident response tracking
    this.activeIncidents = new Map();
    this.incidentResponses = [];
    
    // Analytics
    this.securityAnalytics = {
      trendAnalysis: {},
      patternRecognition: {},
      anomalyDetection: {},
    };
  }

  /**
   * Start the security dashboard server
   */
  async start() {
    if (this.isRunning) {
      return;
    }
    
    try {
      // Create HTTP server
      this.server = createServer((req, res) => {
        // Basic API endpoints for the dashboard
        if (req.url === '/api/security/status') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(this.getSecurityStatus()));
        } else if (req.url === '/api/security/events') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(this.getRecentEvents()));
        } else if (req.url === '/api/security/stats') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(this.threatStats));
        } else {
          res.writeHead(404);
          res.end('Not found');
        }
      });
      
      // Create WebSocket server for real-time updates
      this.wsServer = new WebSocket.Server({ server: this.server });
      
      this.wsServer.on('connection', (ws) => {
        this.clients.add(ws);
        
        ws.on('message', (message) => {
          try {
            const data = JSON.parse(message);
            this.handleClientMessage(ws, data);
          } catch (error) {
            console.error('Invalid message from client:', error);
          }
        });
        
        ws.on('close', () => {
          this.clients.delete(ws);
        });
        
        // Send initial data
        ws.send(JSON.stringify({
          type: 'initial_data',
          data: {
            status: this.getSecurityStatus(),
            recentEvents: this.getRecentEvents(20),
            stats: this.threatStats
          }
        }));
      });
      
      // Start server
      this.server.listen(this.config.port, () => {
        console.log(`Security Monitor Dashboard running on port ${this.config.port}`);
        this.isRunning = true;
        this.emit('started');
      });
      
      // Start background processing
      this.startBackgroundProcessing();
      
      return true;
    } catch (error) {
      console.error('Failed to start Security Monitor Dashboard:', error);
      this.emit('error', error);
      throw error;
    }
  }

  /**
   * Stop the security dashboard server
   */
  async stop() {
    if (!this.isRunning) {
      return;
    }
    
    // Stop background processing
    if (this.backgroundInterval) {
      clearInterval(this.backgroundInterval);
      this.backgroundInterval = null;
    }
    
    // Close all WebSocket connections
    for (const client of this.clients) {
      client.terminate();
    }
    this.clients.clear();
    
    // Close WebSocket server
    if (this.wsServer) {
      this.wsServer.close();
    }
    
    // Close HTTP server
    if (this.server) {
      this.server.close(() => {
        console.log('Security Monitor Dashboard stopped');
        this.isRunning = false;
        this.emit('stopped');
      });
    }
  }

  /**
   * Start background processing for analytics and alerts
   */
  startBackgroundProcessing() {
    this.backgroundInterval = setInterval(() => {
      // Update analytics
      this.updateSecurityAnalytics();
      
      // Process alerts
      this.processAlerts();
      
      // Broadcast updates to connected clients
      this.broadcastUpdates();
    }, this.config.refreshInterval);
  }

  /**
   * Handle messages from dashboard clients
   * @param {WebSocket} ws - WebSocket client
   * @param {Object} data - Message data
   */
  handleClientMessage(ws, data) {
    switch (data.type) {
      case 'get_events':
        // Send requested events
        ws.send(JSON.stringify({
          type: 'events',
          data: this.getRecentEvents(data.count || 50, data.filter)
        }));
        break;
        
      case 'acknowledge_alert':
        // Acknowledge an alert
        this.acknowledgeAlert(data.alertId, data.userId);
        break;
        
      case 'create_incident':
        // Create a new incident
        this.createIncident(data.eventIds, data.summary, data.assignedTo);
        break;
        
      case 'update_incident':
        // Update an incident
        this.updateIncident(data.incidentId, data.updates);
        break;
        
      case 'test_defenses':
        // Trigger defense testing
        this.triggerDefenseTest(data.testType);
        break;
        
      default:
        console.warn('Unknown message type:', data.type);
    }
  }

  /**
   * Broadcast updates to all connected clients
   */
  broadcastUpdates() {
    if (this.clients.size === 0) {
      return;
    }
    
    const update = {
      type: 'update',
      timestamp: new Date().toISOString(),
      data: {
        stats: this.threatStats,
        activeAlerts: Array.from(this.activeAlerts.values()),
        activeIncidents: Array.from(this.activeIncidents.values()),
        analytics: this.securityAnalytics
      }
    };
    
    const message = JSON.stringify(update);
    
    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  }

  /**
   * Register a security event
   * @param {Object} event - Security event data
   */
  registerSecurityEvent(event) {
    // Ensure event has necessary properties
    const securityEvent = {
      id: event.id || `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: event.timestamp || new Date().toISOString(),
      type: event.type || 'unknown',
      level: event.level || 'medium',
      description: event.description || 'Unknown security event',
      details: event.details || {},
      source: event.source || { ip: 'unknown', user: 'unknown' },
      resolved: false,
      ...event
    };
    
    // Add to events storage
    this.securityEvents.unshift(securityEvent);
    
    // Trim events if exceeding max
    if (this.securityEvents.length > this.config.maxEventsStored) {
      this.securityEvents = this.securityEvents.slice(0, this.config.maxEventsStored);
    }
    
    // Update statistics
    this.updateStats(securityEvent);
    
    // Check if this event should trigger an alert
    this.checkForAlert(securityEvent);
    
    // Emit event
    this.emit('security_event', securityEvent);
    
    // If critical event, immediately broadcast to clients
    if (securityEvent.level === 'critical') {
      this.broadcastCriticalEvent(securityEvent);
    }
    
    return securityEvent.id;
  }

  /**
   * Update security statistics with a new event
   * @param {Object} event - Security event
   */
  updateStats(event) {
    // Update total count
    this.threatStats.totalEvents++;
    
    // Update by type
    this.threatStats.byType[event.type] = (this.threatStats.byType[event.type] || 0) + 1;
    
    // Update by level
    this.threatStats.byLevel[event.level]++;
    
    // Update by timespan
    const eventTime = new Date(event.timestamp);
    const now = new Date();
    const hoursDiff = (now - eventTime) / (1000 * 60 * 60);
    
    if (hoursDiff <= 24) {
      this.threatStats.byTimespan.last24h++;
    }
    if (hoursDiff <= 24 * 7) {
      this.threatStats.byTimespan.last7d++;
    }
    if (hoursDiff <= 24 * 30) {
      this.threatStats.byTimespan.last30d++;
    }
    
    // Update top attacker IPs
    if (event.source && event.source.ip && event.source.ip !== 'unknown') {
      this.threatStats.topAttackerIPs[event.source.ip] = 
        (this.threatStats.topAttackerIPs[event.source.ip] || 0) + 1;
    }
    
    // Update top attacked endpoints
    if (event.details && event.details.endpoint) {
      this.threatStats.topAttackedEndpoints[event.details.endpoint] = 
        (this.threatStats.topAttackedEndpoints[event.details.endpoint] || 0) + 1;
    }
  }

  /**
   * Check if a security event should trigger an alert
   * @param {Object} event - Security event
   */
  checkForAlert(event) {
    const { alertThresholds } = this.config;
    
    // Check if this event type + level combination has enough occurrences to trigger an alert
    const eventKey = `${event.type}:${event.level}`;
    
    // Get existing alert or create a new one
    let alert = this.activeAlerts.get(eventKey);
    
    if (!alert) {
      alert = {
        id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        eventType: event.type,
        level: event.level,
        firstSeen: event.timestamp,
        lastSeen: event.timestamp,
        count: 1,
        relatedEvents: [event.id],
        description: `${event.level.toUpperCase()} alert: ${event.type} security events detected`,
        acknowledged: false,
        requiredCount: alertThresholds[event.level] || 10
      };
      
      this.activeAlerts.set(eventKey, alert);
    } else {
      // Update existing alert
      alert.count++;
      alert.lastSeen = event.timestamp;
      alert.relatedEvents.push(event.id);
    }
    
    // Check if alert threshold is reached
    if (alert.count >= alert.requiredCount && !alert.triggered) {
      alert.triggered = true;
      alert.triggeredAt = new Date().toISOString();
      
      // Emit alert event
      this.emit('alert', alert);
      
      // Send immediate notification for triggered alerts
      this.notifyAlertTriggered(alert);
    }
  }

  /**
   * Notify that an alert has been triggered
   * @param {Object} alert - The triggered alert
   */
  notifyAlertTriggered(alert) {
    // In a real implementation, this would send notifications via email, SMS, Slack, etc.
    console.log(`SECURITY ALERT TRIGGERED: ${alert.description}`);
    
    // For demonstration, just broadcast to WebSocket clients
    if (this.clients.size > 0) {
      const message = JSON.stringify({
        type: 'alert_triggered',
        data: alert
      });
      
      for (const client of this.clients) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      }
    }
  }

  /**
   * Acknowledge an alert
   * @param {string} alertId - Alert ID
   * @param {string} userId - User acknowledging the alert
   */
  acknowledgeAlert(alertId, userId) {
    for (const [key, alert] of this.activeAlerts.entries()) {
      if (alert.id === alertId) {
        alert.acknowledged = true;
        alert.acknowledgedBy = userId;
        alert.acknowledgedAt = new Date().toISOString();
        
        this.activeAlerts.set(key, alert);
        
        // Emit event
        this.emit('alert_acknowledged', alert);
        
        // Broadcast update
        this.broadcastUpdates();
        
        return true;
      }
    }
    
    return false;
  }

  /**
   * Create a security incident from related events
   * @param {Array} eventIds - Event IDs related to the incident
   * @param {string} summary - Incident summary
   * @param {string} assignedTo - User assigned to the incident
   */
  createIncident(eventIds, summary, assignedTo) {
    const relatedEvents = this.securityEvents.filter(event => 
      eventIds.includes(event.id)
    );
    
    if (relatedEvents.length === 0) {
      return null;
    }
    
    // Determine highest severity from related events
    const severityLevels = ['critical', 'high', 'medium', 'low', 'none'];
    const highestSeverityEvent = relatedEvents.reduce((highest, event) =>

