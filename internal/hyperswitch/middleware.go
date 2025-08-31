// Package hyperswitch provides integration middleware for Sunny's API Gateway
// Connects existing Sunny APIs with Hyperswitch payment processing capabilities
package hyperswitch

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-resty/resty/v2"
	"github.com/sirupsen/logrus"
)

// PaymentMiddleware provides integration between Sunny's API and Hyperswitch
type PaymentMiddleware struct {
	hyperswitchClient *Client
	logger            *logrus.Logger
	config            *Config
}

// NewPaymentMiddleware creates a new payment middleware instance
func NewPaymentMiddleware(client *Client, logger *logrus.Logger, config *Config) *PaymentMiddleware {
	return &PaymentMiddleware{
		hyperswitchClient: client,
		logger:            logger,
		config:            config,
	}
}

// PaymentRequest represents Sunny's internal payment request format
type PaymentRequest struct {
	UserID       string                 `json:"user_id" binding:"required"`
	Amount       int64                  `json:"amount" binding:"required"`
	Currency     string                 `json:"currency" binding:"required"`
	Method       string                 `json:"payment_method" binding:"required"`
	Description  string                 `json:"description,omitempty"`
	OrderID      string                 `json:"order_id,omitempty"`
	ReturnURL    string                 `json:"return_url,omitempty"`
	Metadata     map[string]interface{} `json:"metadata,omitempty"`
	CustomerInfo *CustomerInfo          `json:"customer_info,omitempty"`
}

// CustomerInfo represents customer information for payments
type CustomerInfo struct {
	Name    string `json:"name,omitempty"`
	Email   string `json:"email,omitempty"`
	Phone   string `json:"phone,omitempty"`
	Address *struct {
		Line1   string `json:"line1,omitempty"`
		Line2   string `json:"line2,omitempty"`
		City    string `json:"city,omitempty"`
		State   string `json:"state,omitempty"`
		Zip     string `json:"zip,omitempty"`
		Country string `json:"country,omitempty"`
	} `json:"address,omitempty"`
}

// PaymentResponse represents Sunny's payment response format
type PaymentResponse struct {
	PaymentID     string                 `json:"payment_id"`
	Status        string                 `json:"status"`
	Amount        int64                  `json:"amount"`
	Currency      string                 `json:"currency"`
	Method        string                 `json:"payment_method"`
	UserID        string                 `json:"user_id"`
	OrderID       string                 `json:"order_id,omitempty"`
	Description   string                 `json:"description,omitempty"`
	ClientSecret  string                 `json:"client_secret,omitempty"`
	NextAction    *NextAction            `json:"next_action,omitempty"`
	ErrorMessage  string                 `json:"error_message,omitempty"`
	ErrorCode     string                 `json:"error_code,omitempty"`
	CreatedAt     time.Time              `json:"created_at"`
	UpdatedAt     time.Time              `json:"updated_at"`
	Metadata      map[string]interface{} `json:"metadata,omitempty"`
}

// NextAction represents required actions for payment completion
type NextAction struct {
	Type          string      `json:"type"`
	RedirectToURL string      `json:"redirect_to_url,omitempty"`
	Data          interface{} `json:"data,omitempty"`
}

// RefundRequest represents Sunny's refund request format
type RefundRequest struct {
	PaymentID string                 `json:"payment_id" binding:"required"`
	Amount    int64                  `json:"amount,omitempty"`
	Reason    string                 `json:"reason,omitempty"`
	Metadata  map[string]interface{} `json:"metadata,omitempty"`
}

// RefundResponse represents Sunny's refund response format
type RefundResponse struct {
	RefundID  string    `json:"refund_id"`
	PaymentID string    `json:"payment_id"`
	Amount    int64     `json:"amount"`
	Currency  string    `json:"currency"`
	Status    string    `json:"status"`
	Reason    string    `json:"reason,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// CreatePaymentHandler handles payment creation requests from Sunny's frontend
func (pm *PaymentMiddleware) CreatePaymentHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var req PaymentRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			pm.logger.WithError(err).Error("Invalid payment request")
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid payment request",
				"details": err.Error(),
			})
			return
		}

		// Convert Sunny's payment request to Hyperswitch format
		hyperswitchReq := pm.convertToHyperswitchPayment(req)

		// Create payment in Hyperswitch
		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		hyperswitchResp, err := pm.hyperswitchClient.CreatePayment(ctx, hyperswitchReq)
		if err != nil {
			pm.logger.WithError(err).WithField("user_id", req.UserID).Error("Failed to create payment in Hyperswitch")
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Payment creation failed",
				"details": err.Error(),
			})
			return
		}

		// Convert Hyperswitch response to Sunny's format
		sunnyResp := pm.convertFromHyperswitchPayment(hyperswitchResp, req.UserID, req.OrderID)

		// Log successful payment creation
		pm.logger.WithFields(logrus.Fields{
			"payment_id": sunnyResp.PaymentID,
			"user_id":    req.UserID,
			"amount":     req.Amount,
			"currency":   req.Currency,
			"method":     req.Method,
		}).Info("Payment created successfully")

		c.JSON(http.StatusCreated, sunnyResp)
	}
}

// GetPaymentHandler retrieves payment status
func (pm *PaymentMiddleware) GetPaymentHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		paymentID := c.Param("payment_id")
		if paymentID == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Payment ID is required"})
			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
		defer cancel()

		hyperswitchResp, err := pm.hyperswitchClient.GetPayment(ctx, paymentID)
		if err != nil {
			pm.logger.WithError(err).WithField("payment_id", paymentID).Error("Failed to get payment from Hyperswitch")
			
			// Check if it's a 404 error
			if strings.Contains(err.Error(), "404") || strings.Contains(err.Error(), "not found") {
				c.JSON(http.StatusNotFound, gin.H{"error": "Payment not found"})
				return
			}
			
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to retrieve payment",
				"details": err.Error(),
			})
			return
		}

		// Convert to Sunny's response format
		sunnyResp := pm.convertFromHyperswitchPayment(hyperswitchResp, "", "")

		c.JSON(http.StatusOK, sunnyResp)
	}
}

// ConfirmPaymentHandler confirms a payment
func (pm *PaymentMiddleware) ConfirmPaymentHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		paymentID := c.Param("payment_id")
		if paymentID == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Payment ID is required"})
			return
		}

		var confirmData map[string]interface{}
		if err := c.ShouldBindJSON(&confirmData); err != nil {
			pm.logger.WithError(err).Error("Invalid confirm payment request")
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid confirm request",
				"details": err.Error(),
			})
			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		hyperswitchResp, err := pm.hyperswitchClient.ConfirmPayment(ctx, paymentID, confirmData)
		if err != nil {
			pm.logger.WithError(err).WithField("payment_id", paymentID).Error("Failed to confirm payment")
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Payment confirmation failed",
				"details": err.Error(),
			})
			return
		}

		sunnyResp := pm.convertFromHyperswitchPayment(hyperswitchResp, "", "")

		pm.logger.WithField("payment_id", paymentID).Info("Payment confirmed successfully")
		c.JSON(http.StatusOK, sunnyResp)
	}
}

// CreateRefundHandler handles refund creation
func (pm *PaymentMiddleware) CreateRefundHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var req RefundRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			pm.logger.WithError(err).Error("Invalid refund request")
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid refund request",
				"details": err.Error(),
			})
			return
		}

		// Convert to Hyperswitch format
		hyperswitchRefund := map[string]interface{}{
			"payment_id": req.PaymentID,
			"reason":     req.Reason,
			"metadata":   req.Metadata,
		}

		if req.Amount > 0 {
			hyperswitchRefund["amount"] = req.Amount
		}

		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		hyperswitchResp, err := pm.hyperswitchClient.CreateRefund(ctx, hyperswitchRefund)
		if err != nil {
			pm.logger.WithError(err).WithField("payment_id", req.PaymentID).Error("Failed to create refund")
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Refund creation failed",
				"details": err.Error(),
			})
			return
		}

		// Convert response
		sunnyRefund := pm.convertFromHyperswitchRefund(hyperswitchResp)

		pm.logger.WithFields(logrus.Fields{
			"refund_id":  sunnyRefund.RefundID,
			"payment_id": req.PaymentID,
			"amount":     req.Amount,
		}).Info("Refund created successfully")

		c.JSON(http.StatusCreated, sunnyRefund)
	}
}

// GetPaymentMethodsHandler retrieves available payment methods
func (pm *PaymentMiddleware) GetPaymentMethodsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		customerID := c.Query("customer_id")
		currency := c.Query("currency")
		country := c.Query("country")

		if currency == "" {
			currency = "USD" // Default currency
		}
		if country == "" {
			country = "US" // Default country
		}

		ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
		defer cancel()

		methods, err := pm.hyperswitchClient.GetPaymentMethods(ctx, customerID, currency, country)
		if err != nil {
			pm.logger.WithError(err).Error("Failed to get payment methods")
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to retrieve payment methods",
				"details": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, methods)
	}
}

// GetAnalyticsHandler provides analytics data for Sunny's dashboard
func (pm *PaymentMiddleware) GetAnalyticsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Parse query parameters
		startDate := c.Query("start_date")
		endDate := c.Query("end_date")
		granularity := c.DefaultQuery("granularity", "day")
		currency := c.Query("currency")
		paymentMethod := c.Query("payment_method")

		if startDate == "" {
			startDate = time.Now().AddDate(0, 0, -7).Format(time.RFC3339) // Default: 7 days ago
		}
		if endDate == "" {
			endDate = time.Now().Format(time.RFC3339)
		}

		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		analytics, err := pm.hyperswitchClient.GetAnalytics(ctx, startDate, endDate, granularity, currency, paymentMethod)
		if err != nil {
			pm.logger.WithError(err).Error("Failed to get analytics")
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to retrieve analytics",
				"details": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, analytics)
	}
}

// WebhookHandler processes Hyperswitch webhooks
func (pm *PaymentMiddleware) WebhookHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Verify webhook signature if configured
		if pm.config.WebhookSecret != "" {
			signature := c.GetHeader("X-Hyperswitch-Signature")
			if !pm.verifyWebhookSignature(c, signature) {
				pm.logger.Warn("Invalid webhook signature")
				c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid signature"})
				return
			}
		}

		var webhookData map[string]interface{}
		if err := c.ShouldBindJSON(&webhookData); err != nil {
			pm.logger.WithError(err).Error("Invalid webhook payload")
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid payload"})
			return
		}

		// Process the webhook based on event type
		eventType, ok := webhookData["event_type"].(string)
		if !ok {
			pm.logger.Error("Missing event_type in webhook")
			c.JSON(http.StatusBadRequest, gin.H{"error": "Missing event_type"})
			return
		}

		pm.logger.WithFields(logrus.Fields{
			"event_type": eventType,
			"data":       webhookData,
		}).Info("Processing Hyperswitch webhook")

		// Handle different event types
		switch eventType {
		case "payment_succeeded":
			pm.handlePaymentSucceeded(webhookData)
		case "payment_failed":
			pm.handlePaymentFailed(webhookData)
		case "refund_succeeded":
			pm.handleRefundSucceeded(webhookData)
		case "refund_failed":
			pm.handleRefundFailed(webhookData)
		case "dispute_opened":
			pm.handleDisputeOpened(webhookData)
		default:
			pm.logger.WithField("event_type", eventType).Warn("Unknown webhook event type")
		}

		c.JSON(http.StatusOK, gin.H{"status": "received"})
	}
}

// HealthCheckHandler provides system health status
func (pm *PaymentMiddleware) HealthCheckHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		// Test Hyperswitch connectivity
		healthy := pm.hyperswitchClient.HealthCheck(ctx)
		
		status := map[string]interface{}{
			"status":        "healthy",
			"hyperswitch":   healthy,
			"timestamp":     time.Now().Format(time.RFC3339),
			"version":       "1.0.0",
		}

		if !healthy {
			status["status"] = "degraded"
			c.JSON(http.StatusServiceUnavailable, status)
		} else {
			c.JSON(http.StatusOK, status)
		}
	}
}

// RegisterRoutes registers all payment-related routes with Sunny's API Gateway
func (pm *PaymentMiddleware) RegisterRoutes(router *gin.RouterGroup) {
	// Payment routes
	payments := router.Group("/payments")
	{
		payments.POST("", pm.CreatePaymentHandler())
		payments.GET("/:payment_id", pm.GetPaymentHandler())
		payments.POST("/:payment_id/confirm", pm.ConfirmPaymentHandler())
		payments.GET("", pm.ListPaymentsHandler())
	}

	// Refund routes
	refunds := router.Group("/refunds")
	{
		refunds.POST("", pm.CreateRefundHandler())
		refunds.GET("/:refund_id", pm.GetRefundHandler())
	}

	// Customer routes
	customers := router.Group("/customers")
	{
		customers.POST("", pm.CreateCustomerHandler())
		customers.GET("/:customer_id", pm.GetCustomerHandler())
		customers.GET("/:customer_id/payment-methods", pm.GetPaymentMethodsHandler())
	}

	// Analytics routes
	analytics := router.Group("/analytics")
	{
		analytics.GET("/payments", pm.GetAnalyticsHandler())
		analytics.GET("/cost-observability", pm.GetCostAnalyticsHandler())
		analytics.GET("/revenue-recovery", pm.GetRevenueRecoveryHandler())
		analytics.GET("/fraud-check", pm.GetFraudAnalyticsHandler())
		analytics.GET("/connectors", pm.GetConnectorAnalyticsHandler())
	}

	// System routes
	system := router.Group("/system")
	{
		system.GET("/health", pm.HealthCheckHandler())
		system.POST("/webhooks/hyperswitch", pm.WebhookHandler())
		system.GET("/connectors", pm.GetConnectorsHandler())
	}
}

// Helper methods for data conversion
func (pm *PaymentMiddleware) convertToHyperswitchPayment(req PaymentRequest) map[string]interface{} {
	hyperswitchReq := map[string]interface{}{
		"amount":         req.Amount,
		"currency":       strings.ToLower(req.Currency),
		"payment_method": req.Method,
		"description":    req.Description,
		"metadata":       req.Metadata,
		"capture":        "automatic",
		"confirm":        "automatic",
	}

	// Add customer information if provided
	if req.CustomerInfo != nil {
		customer := map[string]interface{}{}
		if req.CustomerInfo.Name != "" {
			customer["name"] = req.CustomerInfo.Name
		}
		if req.CustomerInfo.Email != "" {
			customer["email"] = req.CustomerInfo.Email
		}
		if req.CustomerInfo.Phone != "" {
			customer["phone"] = req.CustomerInfo.Phone
		}
		
		// Use UserID as customer ID for consistency
		customer["id"] = req.UserID
		hyperswitchReq["customer"] = customer

		// Add billing address if provided
		if req.CustomerInfo.Address != nil {
			billing := map[string]interface{}{
				"address": map[string]interface{}{
					"line1":   req.CustomerInfo.Address.Line1,
					"line2":   req.CustomerInfo.Address.Line2,
					"city":    req.CustomerInfo.Address.City,
					"state":   req.CustomerInfo.Address.State,
					"zip":     req.CustomerInfo.Address.Zip,
					"country": req.CustomerInfo.Address.Country,
				},
			}
			hyperswitchReq["billing"] = billing
		}
	} else {
		// Use UserID as customer ID even without full customer info
		hyperswitchReq["customer"] = map[string]interface{}{
			"id": req.UserID,
		}
	}

	// Add return URL if provided
	if req.ReturnURL != "" {
		hyperswitchReq["return_url"] = req.ReturnURL
	}

	// Add webhook URL
	if pm.config.WebhookURL != "" {
		hyperswitchReq["webhook_url"] = pm.config.WebhookURL
	}

	// Add order ID to metadata
	if req.OrderID != "" {
		if hyperswitchReq["metadata"] == nil {
			hyperswitchReq["metadata"] = make(map[string]interface{})
		}
		metadata := hyperswitchReq["metadata"].(map[string]interface{})
		metadata["sunny_order_id"] = req.OrderID
		metadata["sunny_user_id"] = req.UserID
	}

	return hyperswitchReq
}

func (pm *PaymentMiddleware) convertFromHyperswitchPayment(hyperswitchResp map[string]interface{}, userID, orderID string) PaymentResponse {
	resp := PaymentResponse{
		PaymentID: getString(hyperswitchResp, "payment_id"),
		Status:    getString(hyperswitchResp, "status"),
		Amount:    getInt64(hyperswitchResp, "amount"),
		Currency:  strings.ToUpper(getString(hyperswitchResp, "currency")),
		Method:    getString(hyperswitchResp, "payment_method"),
		UserID:    userID,
		OrderID:   orderID,
	}

	// Parse timestamps
	if createdStr := getString(hyperswitchResp, "created"); createdStr != "" {
		if created, err := time.Parse(time.RFC3339, createdStr); err == nil {
			resp.CreatedAt = created
		}
	}
	
	if modifiedStr := getString(hyperswitchResp, "last_modified"); modifiedStr != "" {
		if modified, err := time.Parse(time.RFC3339, modifiedStr); err == nil {
			resp.UpdatedAt = modified
		}
	}

	// Extract metadata
	if metadata, ok := hyperswitchResp["metadata"].(map[string]interface{}); ok {
		resp.Metadata = metadata
		
		// Extract Sunny-specific metadata
		if sunnyUserID, exists := metadata["sunny_user_id"].(string); exists && userID == "" {
			resp.UserID = sunnyUserID
		}
		if sunnyOrderID, exists := metadata["sunny_order_id"].(string); exists && orderID == "" {
			resp.OrderID = sunnyOrderID
		}
	}

	// Extract client secret
	resp.ClientSecret = getString(hyperswitchResp, "client_secret")

	// Extract next action
	if nextActionData, ok := hyperswitchResp["next_action"].(map[string]interface{}); ok {
		resp.NextAction = &NextAction{
			Type:          getString(nextActionData, "type"),
			RedirectToURL: getString(nextActionData, "redirect_to_url"),
			Data:          nextActionData["data"],
		}
	}

	// Extract error information
	resp.ErrorMessage = getString(hyperswitchResp, "error_message")
	resp.ErrorCode = getString(hyperswitchResp, "error_code")
	resp.Description = getString(hyperswitchResp, "description")

	return resp
}

func (pm *PaymentMiddleware) convertFromHyperswitchRefund(hyperswitchResp map[string]interface{}) RefundResponse {
	resp := RefundResponse{
		RefundID:  getString(hyperswitchResp, "refund_id"),
		PaymentID: getString(hyperswitchResp, "payment_id"),
		Amount:    getInt64(hyperswitchResp, "amount"),
		Currency:  strings.ToUpper(getString(hyperswitchResp, "currency")),
		Status:    getString(hyperswitchResp, "status"),
		Reason:    getString(hyperswitchResp, "reason"),
	}

	// Parse timestamps
	if createdStr := getString(hyperswitchResp, "created"); createdStr != "" {
		if created, err := time.Parse(time.RFC3339, createdStr); err == nil {
			resp.CreatedAt = created
		}
	}
	
	if modifiedStr := getString(hyperswitchResp, "last_modified"); modifiedStr != "" {
		if modified, err := time.Parse(time.RFC3339, modifiedStr); err == nil {
			resp.UpdatedAt = modified
		}
	}

	return resp
}

// Webhook event handlers
func (pm *PaymentMiddleware) handlePaymentSucceeded(data map[string]interface{}) {
	paymentID := getString(data, "payment_id")
	pm.logger.WithField("payment_id", paymentID).Info("Payment succeeded webhook received")
	
	// Here you would typically:
	// 1. Update Sunny's internal payment status
	// 2. Trigger any post-payment workflows
	// 3. Send notifications to users
	// 4. Update analytics/metrics
}

func (pm *PaymentMiddleware) handlePaymentFailed(data map[string]interface{}) {
	paymentID := getString(data, "payment_id")
	errorCode := getString(data, "error_code")
	errorMessage := getString(data, "error_message")
	
	pm.logger.WithFields(logrus.Fields{
		"payment_id":    paymentID,
		"error_code":    errorCode,
		"error_message": errorMessage,
	}).Warn("Payment failed webhook received")
	
	// Handle payment failure
	// 1. Update Sunny's internal payment status
	// 2. Trigger retry logic if applicable
	// 3. Send failure notifications
	// 4. Log for analysis
}

func (pm *PaymentMiddleware) handleRefundSucceeded(data map[string]interface{}) {
	refundID := getString(data, "refund_id")
	paymentID := getString(data, "payment_id")
	
	pm.logger.WithFields(logrus.Fields{
		"refund_id":  refundID,
		"payment_id": paymentID,
	}).Info("Refund succeeded webhook received")
}

func (pm *PaymentMiddleware) handleRefundFailed(data map[string]interface{}) {
	refundID := getString(data, "refund_id")
	paymentID := getString(data, "payment_id")
	
	pm.logger.WithFields(logrus.Fields{
		"refund_id":  refundID,
		"payment_id": paymentID,
	}).Warn("Refund failed webhook received")
}

func (pm *PaymentMiddleware) handleDisputeOpened(data map[string]interface{}) {
	disputeID := getString(data, "dispute_id")
	paymentID := getString(data, "payment_id")
	
	pm.logger.WithFields(logrus.Fields{
		"dispute_id": disputeID,
		"payment_id": paymentID,
	}).Warn("Dispute opened webhook received")
}

// Additional handler methods
func (pm *PaymentMiddleware) ListPaymentsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
		offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))
		
		// Parse filters
		filters := make(map[string]string)
		if status := c.Query("status"); status != "" {
			filters["status"] = status
		}
		if currency := c.Query("currency"); currency != "" {
			filters["currency"] = currency
		}
		if method := c.Query("payment_method"); method != "" {
			filters["payment_method"] = method
		}
		if customerID := c.Query("customer_id"); customerID != "" {
			filters["customer_id"] = customerID
		}

		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		payments, err := pm.hyperswitchClient.ListPayments(ctx, limit, offset, filters)
		if err != nil {
			pm.logger.WithError(err).Error("Failed to list payments")
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to retrieve payments",
				"details": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, payments)
	}
}

func (pm *PaymentMiddleware) GetRefundHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		refundID := c.Param("refund_id")
		if refundID == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Refund ID is required"})
			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
		defer cancel()

		refund, err := pm.hyperswitchClient.GetRefund(ctx, refundID)
		if err != nil {
			pm.logger.WithError(err).WithField("refund_id", refundID).Error("Failed to get refund")
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to retrieve refund",
				"details": err.Error(),
			})
			return
		}

		sunnyRefund := pm.convertFromHyperswitchRefund(refund)
		c.JSON(http.StatusOK, sunnyRefund)
	}
}

func (pm *PaymentMiddleware) CreateCustomerHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var customerData map[string]interface{}
		if err := c.ShouldBindJSON(&customerData); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid customer data"})
			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
		defer cancel()

		customer, err := pm.hyperswitchClient.CreateCustomer(ctx, customerData)
		if err != nil {
			pm.logger.WithError(err).Error("Failed to create customer")
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to create customer",
				"details": err.Error(),
			})
			return
		}

		c.JSON(http.StatusCreated, customer)
	}
}

func (pm *PaymentMiddleware) GetCustomerHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		customerID := c.Param("customer_id")
		if customerID == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Customer ID is required"})
			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
		defer cancel()

		customer, err := pm.hyperswitchClient.GetCustomer(ctx, customerID)
		if err != nil {
			pm.logger.WithError(err).WithField("customer_id", customerID).Error("Failed to get customer")
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to retrieve customer",
				"details": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, customer)
	}
}

func (pm *PaymentMiddleware) GetConnectorsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
		defer cancel()

		connectors, err := pm.hyperswitchClient.GetConnectors(ctx)
		if err != nil {
			pm.logger.WithError(err).Error("Failed to get connectors")
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to retrieve connectors",
				"details": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, connectors)
	}
}

// Additional analytics handlers
func (pm *PaymentMiddleware) GetCostAnalyticsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		startDate := c.DefaultQuery("start_date", time.Now().AddDate(0, 0, -7).Format(time.RFC3339))
		endDate := c.DefaultQuery("end_date", time.Now().Format(time.RFC3339))
		granularity := c.DefaultQuery("granularity", "day")

		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		analytics, err := pm.hyperswitchClient.GetCostAnalytics(ctx, startDate, endDate, granularity)
		if err != nil {
			pm.logger.WithError(err).Error("Failed to get cost analytics")
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to retrieve cost analytics",
				"details": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, analytics)
	}
}

func (pm *PaymentMiddleware) GetRevenueRecoveryHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		startDate := c.DefaultQuery("start_date", time.Now().AddDate(0, 0, -7).Format(time.RFC3339))
		endDate := c.DefaultQuery("end_date", time.Now().Format(time.RFC3339))
		granularity := c.DefaultQuery("granularity", "day")

		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		analytics, err := pm.hyperswitchClient.GetRevenueRecoveryAnalytics(ctx, startDate, endDate, granularity)
		if err != nil {
			pm.logger.WithError(err).Error("Failed to get revenue recovery analytics")
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to retrieve revenue recovery analytics",
				"details": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, analytics)
	}
}

func (pm *PaymentMiddleware) GetFraudAnalyticsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		startDate := c.DefaultQuery("start_date", time.Now().AddDate(0, 0, -7).Format(time.RFC3339))
		endDate := c.DefaultQuery("end_date", time.Now().Format(time.RFC3339))
		granularity := c.DefaultQuery("granularity", "day")

		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		analytics, err := pm.hyperswitchClient.GetFraudAnalytics(ctx, startDate, endDate, granularity)
		if err != nil {
			pm.logger.WithError(err).Error("Failed to get fraud analytics")
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to retrieve fraud analytics",
				"details": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, analytics)
	}
}

func (pm *PaymentMiddleware) GetConnectorAnalyticsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		connectorName := c.Query("connector")

		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		analytics, err := pm.hyperswitchClient.GetConnectorPerformance(ctx, connectorName)
		if err != nil {
			pm.logger.WithError(err).Error("Failed to get connector analytics")
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Failed to retrieve connector analytics",
				"details": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, analytics)
	}
}

// Utility functions
func getString(data map[string]interface{}, key string) string {
	if val, ok := data[key]; ok {
		if str, ok := val.(string); ok {
			return str
		}
	}
	return ""
}

func getInt64(data map[string]interface{}, key string) int64 {
	if val, ok := data[key]; ok {
		switch v := val.(type) {
		case int64:
			return v
		case int:
			return int64(v)
		case float64:
			return int64(v)
		case string:
			if i, err := strconv.ParseInt(v, 10, 64); err == nil {
				return i
			}
		}
	}
	return 0
}

func (pm *PaymentMiddleware) verifyWebhookSignature(c *gin.Context, signature string) bool {
	// Implement webhook signature verification based on Hyperswitch's webhook signing method
	// This is a placeholder - you'll need to implement the actual verification logic
	// based on Hyperswitch's documentation
	return true
}
