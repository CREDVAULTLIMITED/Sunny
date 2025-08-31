/**
 * TransactionManager.js
 * Manages payment transaction state and history
 */

class TransactionManager {
  constructor() {
    this.transactions = new Map();
    this.startCleanup();
  }

  /**
   * Create new transaction record
   */
  async createTransaction(transactionData) {
    const transaction = {
      ...transactionData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'pending'
    };

    this.transactions.set(transaction.transactionId, transaction);
    return transaction;
  }

  /**
   * Update transaction status
   */
  async updateTransaction(transactionId, updates) {
    const transaction = this.transactions.get(transactionId);
    if (!transaction) {
      throw new Error(`Transaction not found: ${transactionId}`);
    }

    const updatedTransaction = {
      ...transaction,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.transactions.set(transactionId, updatedTransaction);
    return updatedTransaction;
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(transactionId) {
    const transaction = this.transactions.get(transactionId);
    if (!transaction) {
      throw new Error(`Transaction not found: ${transactionId}`);
    }
    return transaction;
  }

  /**
   * Get all transactions matching filters
   */
  async getTransactions(filters = {}) {
    const transactions = Array.from(this.transactions.values());
    return this.applyFilters(transactions, filters);
  }

  /**
   * Apply filters to transaction list
   */
  applyFilters(transactions, filters) {
    return transactions.filter(transaction => {
      for (const [key, value] of Object.entries(filters)) {
        if (transaction[key] !== value) {
          return false;
        }
      }
      return true;
    });
  }

  /**
   * Delete transaction
   */
  async deleteTransaction(transactionId) {
    const exists = this.transactions.delete(transactionId);
    if (!exists) {
      throw new Error(`Transaction not found: ${transactionId}`);
    }
    return true;
  }

  /**
   * Clean up old transactions
   */
  cleanup() {
    const now = Date.now();
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

    this.transactions.forEach((transaction, id) => {
      const createdAt = new Date(transaction.createdAt).getTime();
      if (now - createdAt > maxAge) {
        this.transactions.delete(id);
      }
    });
  }

  /**
   * Start cleanup interval
   */
  startCleanup() {
    setInterval(() => this.cleanup(), 24 * 60 * 60 * 1000); // Run daily
  }
}

// Create singleton instance
const transactionManager = new TransactionManager();
export default transactionManager;
