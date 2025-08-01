/**
 * TabletPOSProcessor.js
 * Handles tablet-specific POS operations, especially for restaurants
 */

import { EventEmitter } from 'events';
import { PAYMENT_STATUS } from '../constants';

class TabletPOSProcessor extends EventEmitter {
  constructor() {
    super();
    this.tables = new Map();
    this.orders = new Map();
    this.kitchenQueue = [];
  }

  /**
   * Initialize a new table session
   */
  async initializeTable(tableId, server) {
    const session = {
      tableId,
      server,
      status: 'active',
      orders: [],
      startTime: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    this.tables.set(tableId, session);
    return session;
  }

  /**
   * Add items to an order
   */
  async addToOrder(tableId, items) {
    const table = this.tables.get(tableId);
    if (!table) throw new Error('Table not found');

    const orderId = `order_${Date.now()}`;
    const order = {
      id: orderId,
      tableId,
      items,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    this.orders.set(orderId, order);
    table.orders.push(orderId);
    
    // Send to kitchen display system
    this.kitchenQueue.push(order);
    this.emit('new_order', order);

    return order;
  }

  /**
   * Update order status
   */
  async updateOrderStatus(orderId, status) {
    const order = this.orders.get(orderId);
    if (!order) throw new Error('Order not found');

    order.status = status;
    order.lastUpdated = new Date().toISOString();

    this.emit('order_updated', order);
    return order;
  }

  /**
   * Process payment for table
   */
  async processTablePayment(tableId, paymentDetails) {
    const table = this.tables.get(tableId);
    if (!table) throw new Error('Table not found');

    // Calculate total from all orders
    const total = await this.calculateTableTotal(tableId);

    // Process payment through payment orchestrator
    const paymentResult = await paymentOrchestrator.processPayment({
      amount: total,
      ...paymentDetails
    });

    if (paymentResult.status === PAYMENT_STATUS.SUCCESS) {
      await this.closeTable(tableId);
    }

    return paymentResult;
  }

  /**
   * Split bill among multiple payments
   */
  async splitBill(tableId, splits) {
    const table = this.tables.get(tableId);
    if (!table) throw new Error('Table not found');

    const total = await this.calculateTableTotal(tableId);
    let processedAmount = 0;
    const results = [];

    for (const split of splits) {
      const paymentResult = await paymentOrchestrator.processPayment({
        amount: split.amount,
        ...split.paymentDetails
      });
      
      results.push(paymentResult);
      if (paymentResult.status === PAYMENT_STATUS.SUCCESS) {
        processedAmount += split.amount;
      }
    }

    if (processedAmount === total) {
      await this.closeTable(tableId);
    }

    return results;
  }

  /**
   * Close table and archive orders
   */
  async closeTable(tableId) {
    const table = this.tables.get(tableId);
    if (!table) throw new Error('Table not found');

    table.status = 'closed';
    table.closedAt = new Date().toISOString();
    
    this.emit('table_closed', table);
    return table;
  }

  /**
   * Calculate total for table
   */
  async calculateTableTotal(tableId) {
    const table = this.tables.get(tableId);
    if (!table) throw new Error('Table not found');

    let total = 0;
    for (const orderId of table.orders) {
      const order = this.orders.get(orderId);
      if (order) {
        total += order.items.reduce((sum, item) => sum + item.price, 0);
      }
    }

    return total;
  }
}

export default new TabletPOSProcessor();
