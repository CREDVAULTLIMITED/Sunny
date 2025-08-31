package handlers

import (
	"net/http"
	"time"

	"github.com/creditboost/sunny/api-gateway/models"
	"github.com/creditboost/sunny/api-gateway/services"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"go.uber.org/zap"
)

// PaymentHandler handles payment-related API endpoints
type PaymentHandler struct {
	paymentService services.PaymentService
	logger         *zap.Logger
}

// NewPaymentHandler creates a new payment handler
func NewPaymentHandler(paymentService services.PaymentService, logger *zap.Logger) *PaymentHandler {
	return &PaymentHandler{
		paymentService: paymentService,
		logger:         logger.With(zap.String("handler", "payment")),
	}
}

// CreatePayment godoc
// @Summary Create a new payment
// @Description Process a new payment transaction
// @Tags payments
// @Accept json
// @Produce json
// @Param payment body models.PaymentRequest true "Payment information"
// @Success 201 {object} models.PaymentResponse
// @Failure 400 {object} models.ErrorResponse
// @Failure 401 {object} models.ErrorResponse
// @Failure 422 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /payments [post]
// @Security BearerAuth
func (h *PaymentHandler) CreatePayment(c *gin.Context) {
	var req models.PaymentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		h.logger.Error("Invalid payment request", zap.Error(err))
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "invalid_request",
			Message: "Invalid payment request",
			Details: err.Error(),
		})
		return
	}

	// Generate idempotency key if not provided
	if req.IdempotencyKey == "" {
		req.IdempotencyKey = uuid.New().String()
	}

	// Get merchant ID from context (set by auth middleware)
	merchantID, exists := c.Get("merchant_id")
	if !exists {
		h.logger.Error("Merchant ID not found in context")
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{
			Error:   "unauthorized",
			Message: "Unauthorized request",
		})
		return
	}

	// Add request metadata
	req.Metadata["request_id"] = c.GetString("request_id")
	req.Metadata["ip_address"] = c.ClientIP()
	req.Metadata["user_agent"] = c.GetHeader("User-Agent")

	// Process payment
	ctx := c.Request.Context()
	response, err := h.paymentService.ProcessPayment(ctx, merchantID.(string), req)
	if err != nil {
		h.logger.Error("Failed to process payment", 
			zap.Error(err),
			zap.String("merchant_id", merchantID.(string)),
			zap.String("idempotency_key", req.IdempotencyKey),
		)
		
		// Handle different error types
		switch err.(type) {
		case *services.ValidationError:
			c.JSON(http.StatusUnprocessableEntity, models.ErrorResponse{
				Error:   "validation_error",
				Message: "Validation failed",
				Details: err.Error(),
			})
		case *services.AuthorizationError:
			c.JSON(http.StatusUnauthorized, models.ErrorResponse{
				Error:   "unauthorized",
				Message: "Unauthorized request",
				Details: err.Error(),
			})
		default:
			c.JSON(http.StatusInternalServerError, models.ErrorResponse{
				Error:   "processing_error",
				Message: "Payment processing failed",
				Details: err.Error(),
			})
		}
		return
	}

	c.JSON(http.StatusCreated, response)
}

// GetPayment godoc
// @Summary Get payment details
// @Description Retrieve details of a specific payment
// @Tags payments
// @Accept json
// @Produce json
// @Param id path string true "Payment ID"
// @Success 200 {object} models.PaymentResponse
// @Failure 400 {object} models.ErrorResponse
// @Failure 401 {object} models.ErrorResponse
// @Failure 404 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /payments/{id} [get]
// @Security BearerAuth
func (h *PaymentHandler) GetPayment(c *gin.Context) {
	paymentID := c.Param("id")
	if paymentID == "" {
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "invalid_request",
			Message: "Payment ID is required",
		})
		return
	}

	// Get merchant ID from context (set by auth middleware)
	merchantID, exists := c.Get("merchant_id")
	if !exists {
		h.logger.Error("Merchant ID not found in context")
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{
			Error:   "unauthorized",
			Message: "Unauthorized request",
		})
		return
	}

	// Get payment
	ctx := c.Request.Context()
	payment, err := h.paymentService.GetPayment(ctx, merchantID.(string), paymentID)
	if err != nil {
		h.logger.Error("Failed to get payment", 
			zap.Error(err),
			zap.String("payment_id", paymentID),
			zap.String("merchant_id", merchantID.(string)),
		)
		
		// Handle different error types
		switch err.(type) {
		case *services.NotFoundError:
			c.JSON(http.StatusNotFound, models.ErrorResponse{
				Error:   "not_found",
				Message: "Payment not found",
				Details: err.Error(),
			})
		case *services.AuthorizationError:
			c.JSON(http.StatusUnauthorized, models.ErrorResponse{
				Error:   "unauthorized",
				Message: "Unauthorized request",
				Details: err.Error(),
			})
		default:
			c.JSON(http.StatusInternalServerError, models.ErrorResponse{
				Error:   "internal_error",
				Message: "Internal server error",
				Details: err.Error(),
			})
		}
		return
	}

	c.JSON(http.StatusOK, payment)
}

// ListPayments godoc
// @Summary List payments
// @Description List all payments with optional filtering
// @Tags payments
// @Accept json
// @Produce json
// @Param limit query int false "Number of payments to return (default 10, max 100)"
// @Param starting_after query string false "Cursor for pagination (payment ID)"
// @Param ending_before query string false "Cursor for pagination (payment ID)"
// @Param created query string false "Filter by creation date (e.g., gte:2023-01-01,lte:2023-12-31)"
// @Param status query string false "Filter by status (e.g., succeeded,failed)"
// @Success 200 {object} models.PaymentListResponse
// @Failure 400 {object} models.ErrorResponse
// @Failure 401 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /payments [get]
// @Security BearerAuth
func (h *PaymentHandler) ListPayments(c *gin.Context) {
	// Get merchant ID from context (set by auth middleware)
	merchantID, exists := c.Get("merchant_id")
	if !exists {
		h.logger.Error("Merchant ID not found in context")
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{
			Error:   "unauthorized",
			Message: "Unauthorized request",
		})
		return
	}

	// Parse query parameters
	limit := 10
	if limitParam := c.Query("limit"); limitParam != "" {
		if _, err := c.GetQuery("limit"); err {
			if limitInt, err := c.GetInt("limit"); err == nil {
				if limitInt > 0 && limitInt <= 100 {
					limit = limitInt
				}
			}
		}
	}

	// Create filter
	filter := models.PaymentFilter{
		MerchantID:    merchantID.(string),
		Limit:         limit,
		StartingAfter: c.Query("starting_after"),
		EndingBefore:  c.Query("ending_before"),
		Status:        c.Query("status"),
	}

	// Parse created date filter
	if createdParam := c.Query("created"); createdParam != "" {
		// Parse date range (simplified for example)
		// In a real implementation, this would parse complex date filters
		filter.CreatedAfter = time.Now().AddDate(0, -1, 0) // Default to 1 month ago
	}

	// Get payments
	ctx := c.Request.Context()
	payments, err := h.paymentService.ListPayments(ctx, filter)
	if err != nil {
		h.logger.Error("Failed to list payments", 
			zap.Error(err),
			zap.String("merchant_id", merchantID.(string)),
		)
		
		c.JSON(http.StatusInternalServerError, models.ErrorResponse{
			Error:   "internal_error",
			Message: "Failed to list payments",
			Details: err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, payments)
}

// CreateRefund godoc
// @Summary Refund a payment
// @Description Process a refund for a payment
// @Tags refunds
// @Accept json
// @Produce json
// @Param refund body models.RefundRequest true "Refund information"
// @Success 201 {object} models.RefundResponse
// @Failure 400 {object} models.ErrorResponse
// @Failure 401 {object} models.ErrorResponse
// @Failure 422 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /refunds [post]
// @Security BearerAuth
func (h *PaymentHandler) CreateRefund(c *gin.Context) {
	var req models.RefundRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		h.logger.Error("Invalid refund request", zap.Error(err))
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "invalid_request",
			Message: "Invalid refund request",
			Details: err.Error(),
		})
		return
	}

	// Generate idempotency key if not provided
	if req.IdempotencyKey == "" {
		req.IdempotencyKey = uuid.New().String()
	}

	// Get merchant ID from context (set by auth middleware)
	merchantID, exists := c.Get("merchant_id")
	if !exists {
		h.logger.Error("Merchant ID not found in context")
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{
			Error:   "unauthorized",
			Message: "Unauthorized request",
		})
		return
	}

	// Process refund
	ctx := c.Request.Context()
	response, err := h.paymentService.ProcessRefund(ctx, merchantID.(string), req)
	if err != nil {
		h.logger.Error("Failed to process refund", 
			zap.Error(err),
			zap.String("payment_id", req.PaymentID),
			zap.String("merchant_id", merchantID.(string)),
		)
		
		// Handle different error types
		switch err.(type) {
		case *services.ValidationError:
			c.JSON(http.StatusUnprocessableEntity, models.ErrorResponse{
				Error:   "validation_error",
				Message: "Validation failed",
				Details: err.Error(),
			})
		case *services.NotFoundError:
			c.JSON(http.StatusNotFound, models.ErrorResponse{
				Error:   "not_found",
				Message: "Payment not found",
				Details: err.Error(),
			})
		case *services.AuthorizationError:
			c.JSON(http.StatusUnauthorized, models.ErrorResponse{
				Error:   "unauthorized",
				Message: "Unauthorized request",
				Details: err.Error(),
			})
		default:
			c.JSON(http.StatusInternalServerError, models.ErrorResponse{
				Error:   "processing_error",
				Message: "Refund processing failed",
				Details: err.Error(),
			})
		}
		return
	}

	c.JSON(http.StatusCreated, response)
}

// CreateMarketplacePayment godoc
// @Summary Create a marketplace payment
// @Description Process a payment with splits between multiple recipients
// @Tags marketplace
// @Accept json
// @Produce json
// @Param payment body models.MarketplacePaymentRequest true "Marketplace payment information"
// @Success 201 {object} models.MarketplacePaymentResponse
// @Failure 400 {object} models.ErrorResponse
// @Failure 401 {object} models.ErrorResponse
// @Failure 422 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /marketplace/payments [post]
// @Security BearerAuth
func (h *PaymentHandler) CreateMarketplacePayment(c *gin.Context) {
	var req models.MarketplacePaymentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		h.logger.Error("Invalid marketplace payment request", zap.Error(err))
		c.JSON(http.StatusBadRequest, models.ErrorResponse{
			Error:   "invalid_request",
			Message: "Invalid marketplace payment request",
			Details: err.Error(),
		})
		return
	}

	// Generate idempotency key if not provided
	if req.IdempotencyKey == "" {
		req.IdempotencyKey = uuid.New().String()
	}

	// Get merchant ID from context (set by auth middleware)
	merchantID, exists := c.Get("merchant_id")
	if !exists {
		h.logger.Error("Merchant ID not found in context")
		c.JSON(http.StatusUnauthorized, models.ErrorResponse{
			Error:   "unauthorized",
			Message: "Unauthorized request",
		})
		return
	}

	// Process marketplace payment
	ctx := c.Request.Context()
	response, err := h.paymentService.ProcessMarketplacePayment(ctx, merchantID.(string), req)
	if err != nil {
		h.logger.Error("Failed to process marketplace payment", 
			zap.Error(err),
			zap.String("merchant_id", merchantID.(string)),
			zap.String("idempotency_key", req.IdempotencyKey),
		)
		
		// Handle different error types
		switch err.(type) {
		case *services.ValidationError:
			c.JSON(http.StatusUnprocessableEntity, models.ErrorResponse{
				Error:   "validation_error",
				Message: "Validation failed",
				Details: err.Error(),
			})
		case *services.AuthorizationError:
			c.JSON(http.StatusUnauthorized, models.ErrorResponse{
				Error:   "unauthorized",
				Message: "Unauthorized request",
				Details: err.Error(),
			})
		default:
			c.JSON(http.StatusInternalServerError, models.ErrorResponse{
				Error:   "processing_error",
				Message: "Marketplace payment processing failed",
				Details: err.Error(),
			})
		}
		return
	}

	c.JSON(http.StatusCreated, response)
}