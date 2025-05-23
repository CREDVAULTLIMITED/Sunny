/**
 * Transaction model for database operations
 */

import { query } from '../config/db';
import { v4 as uuidv4 } from 'uuid';

class Transaction {
  /**
   * Create a new transaction record
   * @param {Object} transaction - Transaction data
   * @returns {Promise<Object>} Created transaction
   */
  static async create(transaction) {
    const id = transaction.id || `TXN-${uuidv4()}`;
    const timestamp = transaction.timestamp || new Date();
    
    const result = await query(
      `INSERT INTO transactions (
        id, merchant_id, amount, currency, status, payment_method, 
        customer_id, description, metadata, processor_response
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        id,
        transaction.merchantId,
        transaction.amount,
        transaction.currency,
        transaction.status,
        transaction.paymentMethod,
        transaction.customerId || null,
        transaction.description || null,
        JSON.stringify(transaction.metadata || {}),
        JSON.stringify(transaction.processorResponse || {})
      ]
    );
    
    return result.rows[0];
  }

  /**
   * Get a transaction by ID
   * @param {string} id - Transaction ID
   * @returns {Promise<Object>} Transaction data
   */
  static async getById(id) {
    const result = await query('SELECT * FROM transactions WHERE id = $1', [id]);
    return result.rows[0];
  }

  /**
   * Update a transaction
   * @param {string} id - Transaction ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated transaction
   */
  static async update(id, updates) {
    // Build the SET clause dynamically based on provided updates
    const setValues = [];
    const queryParams = [id];
    let paramIndex = 2;
    
    Object.keys(updates).forEach(key => {
      // Convert camelCase to snake_case for database columns
      const column = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      
      // Handle special cases for JSON fields
      if (key === 'metadata' || key === 'processorResponse') {
        setValues.push(`${column} = $${paramIndex}`);
        queryParams.push(JSON.stringify(updates[key]));
      } else {
        setValues.push(`${column} = $${paramIndex}`);
        queryParams.push(updates[key]);
      }
      
      paramIndex++;
    });
    
    // Add updated_at timestamp
    setValues.push('updated_at = NOW()');
    
    const query = `
      UPDATE transactions 
      SET ${setValues.join(', ')} 
      WHERE id = $1 
      RETURNING *
    `;
    
    const result = await query(query, queryParams);
    return result.rows[0];
  }

  /**
   * Get transactions by merchant ID
   * @param {string} merchantId - Merchant ID
   * @param {Object} options - Query options (limit, offset, status, etc.)
   * @returns {Promise<Array>} Transactions
   */
  static async getByMerchantId(merchantId, options = {}) {
    const limit = options.limit || 100;
    const offset = options.offset || 0;
    
    let query = 'SELECT * FROM transactions WHERE merchant_id = $1';
    const queryParams = [merchantId];
    let paramIndex = 2;
    
    // Add filters if provided
    if (options.status) {
      query += ` AND status = $${paramIndex}`;
      queryParams.push(options.status);
      paramIndex++;
    }
    
    if (options.paymentMethod) {
      query += ` AND payment_method = $${paramIndex}`;
      queryParams.push(options.paymentMethod);
      paramIndex++;
    }
    
    if (options.startDate) {
      query += ` AND created_at >= $${paramIndex}`;
      queryParams.push(options.startDate);
      paramIndex++;
    }
    
    if (options.endDate) {
      query += ` AND created_at <= $${paramIndex}`;
      queryParams.push(options.endDate);
      paramIndex++;
    }
    
    // Add sorting and pagination
    query += ' ORDER BY created_at DESC LIMIT $' + paramIndex + ' OFFSET $' + (paramIndex + 1);
    queryParams.push(limit, offset);
    
    const result = await query(query, queryParams);
    return result.rows;
  }
}

export default Transaction;