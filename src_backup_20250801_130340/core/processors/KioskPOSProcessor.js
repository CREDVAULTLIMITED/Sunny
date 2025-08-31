/**
 * KioskPOSProcessor.js
 * Handles self-service kiosk operations
 */

import { EventEmitter } from 'events';
import { PAYMENT_STATUS } from '../constants';

class KioskPOSProcessor extends EventEmitter {
  constructor() {
    super();
    this.sessions = new Map();
    this.queueSystem = new Map();
    this.menuBoards = new Map();
  }

  /**
   * Initialize a new kiosk session
   */
  async initializeSession(kioskId) {
    const session = {
      id: `session_${Date.now()}`,
      kioskId,
      status: 'active',
      startTime: new Date().toISOString(),
      cart: [],
      customizations: []
    };

    this.sessions.set(session.id, session);
    return session;
  }

  /**
   * Add item to cart with customizations
   */
  async addToCart(sessionId, item, customizations = []) {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found');

    const cartItem = {
      ...item,
      customizations,
      itemTotal: this.calculateItemTotal(item, customizations)
    };

    session.cart.push(cartItem);
    session.lastUpdated = new Date().toISOString();

    this.emit('cart_updated', session);
    return session;
  }

  /**
   * Update digital menu board
   */
  async updateMenuBoard(boardId, content) {
    this.menuBoards.set(boardId, {
      content,
      lastUpdated: new Date().toISOString()
    });

    this.emit('menu_updated', { boardId, content });
    return this.menuBoards.get(boardId);
  }

  /**
   * Process payment and add to queue
   */
  async processOrder(sessionId, paymentDetails) {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found');

    const total = this.calculateSessionTotal(session);

    // Process payment
    const paymentResult = await paymentOrchestrator.processPayment({
      amount: total,
      ...paymentDetails
    });

    if (paymentResult.status === PAYMENT_STATUS.SUCCESS) {
      // Add to queue system
      const queueNumber = await this.addToQueue(session);
      
      // Close session
      await this.closeSession(sessionId, {
        queueNumber,
        paymentId: paymentResult.transactionId
      });

      return {
        success: true,
        queueNumber,
        estimatedWaitTime: await this.calculateWaitTime(queueNumber),
        paymentResult
      };
    }

    return {
      success: false,
      paymentResult
    };
  }

  /**
   * Add order to queue system
   */
  async addToQueue(session) {
    const queueNumber = this.generateQueueNumber();
    
    this.queueSystem.set(queueNumber, {
      sessionId: session.id,
      status: 'preparing',
      createdAt: new Date().toISOString(),
      items: session.cart
    });

    this.emit('queue_updated', {
      queueNumber,
      status: 'preparing'
    });

    return queueNumber;
  }

  /**
   * Calculate estimated wait time
   */
  async calculateWaitTime(queueNumber) {
    const queuePosition = Array.from(this.queueSystem.keys()).indexOf(queueNumber);
    const averageItemTime = 3; // minutes per item
    const queueEntry = this.queueSystem.get(queueNumber);
    
    return queuePosition * averageItemTime + 
           (queueEntry.items.length * averageItemTime);
  }

  /**
   * Update order status in queue
   */
  async updateQueueStatus(queueNumber, status) {
    const entry = this.queueSystem.get(queueNumber);
    if (!entry) throw new Error('Queue entry not found');

    entry.status = status;
    entry.lastUpdated = new Date().toISOString();

    this.emit('queue_updated', {
      queueNumber,
      status
    });

    return entry;
  }

  /**
   * Close kiosk session
   */
  async closeSession(sessionId, metadata = {}) {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found');

    session.status = 'completed';
    session.completedAt = new Date().toISOString();
    session.metadata = metadata;

    this.emit('session_closed', session);
    return session;
  }

  /**
   * Calculate total for session
   */
  calculateSessionTotal(session) {
    return session.cart.reduce((total, item) => total + item.itemTotal, 0);
  }

  /**
   * Calculate item total with customizations
   */
  calculateItemTotal(item, customizations) {
    const basePrice = item.price;
    const customizationTotal = customizations.reduce(
      (total, custom) => total + (custom.price || 0),
      0
    );
    return basePrice + customizationTotal;
  }

  /**
   * Generate unique queue number
   */
  generateQueueNumber() {
    const prefix = new Date().toISOString().slice(11,13); // Hour
    const suffix = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `${prefix}${suffix}`;
  }
}

export default new KioskPOSProcessor();
