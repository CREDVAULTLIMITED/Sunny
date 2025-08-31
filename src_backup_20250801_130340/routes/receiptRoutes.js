/**
 * receiptRoutes.js
 * API routes for receipt access
 */

import express from 'express';
import { authenticateUser, authorizeAccess } from '../middleware/auth';
import ReceiptService from '../services/ReceiptService';

const router = express.Router();

/**
 * Get PDF receipt
 */
router.get('/:transactionId/pdf', authenticateUser, authorizeAccess, async (req, res) => {
  try {
    const { transactionId } = req.params;
    
    // Get payment details
    const payment = await PaymentService.getPaymentById(transactionId);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    // Check access permission
    if (payment.merchantId !== req.user.merchantId && payment.customerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Generate PDF receipt
    const doc = await ReceiptService.generatePDFReceipt(payment);
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="receipt-${transactionId}.pdf"`);
    
    // Stream PDF to response
    doc.pipe(res);
    doc.end();
  } catch (error) {
    console.error('Error generating PDF receipt:', error);
    res.status(500).json({ error: 'Failed to generate receipt' });
  }
});

/**
 * Get HTML receipt
 */
router.get('/:transactionId/html', authenticateUser, authorizeAccess, async (req, res) => {
  try {
    const { transactionId } = req.params;
    
    // Get payment details
    const payment = await PaymentService.getPaymentById(transactionId);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    // Check access permission
    if (payment.merchantId !== req.user.merchantId && payment.customerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Generate HTML receipt
    const html = await ReceiptService.generateHTMLReceipt(payment, 'web');
    
    // Send HTML response
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('Error generating HTML receipt:', error);
    res.status(500).json({ error: 'Failed to generate receipt' });
  }
});

/**
 * Get receipt download URLs
 */
router.get('/:transactionId/urls', authenticateUser, authorizeAccess, async (req, res) => {
  try {
    const { transactionId } = req.params;
    
    // Get payment details
    const payment = await PaymentService.getPaymentById(transactionId);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    // Check access permission
    if (payment.merchantId !== req.user.merchantId && payment.customerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Return receipt URLs
    res.json({
      pdf: `/api/receipts/${transactionId}/pdf`,
      html: `/api/receipts/${transactionId}/html`
    });
  } catch (error) {
    console.error('Error getting receipt URLs:', error);
    res.status(500).json({ error: 'Failed to get receipt URLs' });
  }
});

export default router;
