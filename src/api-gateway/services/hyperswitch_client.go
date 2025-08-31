package services

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/go-resty/resty/v2"
	"go.uber.org/zap"
)

// HyperswitchClient handles communication with the Hyperswitch payment engine
type HyperswitchClient struct {
	client      *resty.Client
	baseURL     string
	apiKey      string
	logger      *zap.Logger
}

// HyperswitchConfig represents the configuration for Hyperswitch client
type HyperswitchConfig struct {
	BaseURL    string
	APIKey     string
	Timeout    time.Duration
}

// PaymentRequest represents a payment request to Hyperswitch
type PaymentRequest struct {
	Amount          int64                  `json:"amount"`
	Currency        string                 `json:"currency"`
	PaymentMethod   string                 `json:"payment_method"`
	PaymentMethodType string               `json:"payment_method_type,omitempty"`
	Customer        *Customer              `json:"customer,omitempty"`
	BillingAddress  *Address               `json:"billing,omitempty"`
	ShippingAddress *Address               `json:"shipping,omitempty"`
	Description     string                 `json:"description,omitempty"`
	Metadata        map[string]interface{} `json:"metadata,omitempty"`
	ReturnURL       string                 `json:"return_url,omitempty"`
	WebhookURL      string                 `json:"webhook_url,omitempty"`
	CaptureMethod   string                 `json:"capture_method,omitempty"`
	ConfirmMethod   string                 `json:"confirm,omitempty"`
	AuthenticationType string              `json:"authentication_type,omitempty"`
}

// Customer represents customer information
type Customer struct {
	ID    string `json:"id,omitempty"`
	Name  string `json:"name,omitempty"`
	Email string `json:"email,omitempty"`
	Phone string `json:"phone,omitempty"`
}

// Address represents billing or shipping address
type Address struct {
	Line1      string `json:"line1,omitempty"`
	Line2      string `json:"line2,omitempty"`
	Line3      string `json:"line3,omitempty"`
	City       string `json:"city,omitempty"`
	State      string `json:"state,omitempty"`
	ZIP        string `json:"zip,omitempty"`
	Country    string `json:"country,omitempty"`
	FirstName  string `json:"first_name,omitempty"`
	LastName   string `json:"last_name,omitempty"`
}

// PaymentResponse represents the response from Hyperswitch
type PaymentResponse struct {
	PaymentID         string                 `json:"payment_id"`
	Status            string                 `json:"status"`
	Amount            int64                  `json:"amount"`
	Currency          string                 `json:"currency"`
	PaymentMethod     string                 `json:"payment_method"`
	PaymentMethodType string                 `json:"payment_method_type"`
	Customer          *Customer              `json:"customer"`
	Description       string                 `json:"description"`
	Metadata          map[string]interface{} `json:"metadata"`
	CreatedAt         string                 `json:"created"`
	LastModified      string                 `json:"last_modified"`
	ClientSecret      string                 `json:"client_secret,omitempty"`
	NextAction        *NextAction            `json:"next_action,omitempty"`
	ErrorMessage      string                 `json:"error_message,omitempty"`
	ErrorCode         string                 `json:"error_code,omitempty"`
}

// NextAction represents the next action required for payment completion
type NextAction struct {
	Type        string      `json:"type"`
	RedirectURL string      `json:"redirect_to_url,omitempty"`
	Data        interface{} `json:"data,omitempty"`
}

// RefundRequest represents a refund request
type RefundRequest struct {
	PaymentID   string                 `json:"payment_id"`
	Amount      int64                  `json:"amount,omitempty"`
	Reason      string                 `json:"reason,omitempty"`
	Metadata    map[string]interface{} `json:"metadata,omitempty"`
}

// RefundResponse represents a refund response
type RefundResponse struct {
	RefundID     string                 `json:"refund_id"`
	PaymentID    string                 `json:"payment_id"`
	Amount       int64                  `json:"amount"`
	Currency     string                 `json:"currency"`
	Status       string                 `json:"status"`
	Reason       string                 `json:"reason"`
	Metadata     map[string]interface{} `json:"metadata"`
	CreatedAt    string                 `json:"created"`
	LastModified string                 `json:"last_modified"`
}

// NewHyperswitchClient creates a new Hyperswitch client
func NewHyperswitchClient(config HyperswitchConfig, logger *zap.Logger) *HyperswitchClient {
	client := resty.New()
	
	// Configure client
	client.SetTimeout(config.Timeout)
	client.SetHeader("Accept", "application/json")
	client.SetHeader("Content-Type", "application/json")
	client.SetHeader("api-key", config.APIKey)
	client.SetHostURL(config.BaseURL)
	
	// Add request/response middleware for logging
	client.OnBeforeRequest(func(c *resty.Client, req *resty.Request) error {
		logger.Info("Hyperswitch Request",
			zap.String("method", req.Method),
			zap.String("url", req.URL),
			zap.Any("headers", req.Header),
		)
		return nil
	})
	
	client.OnAfterResponse(func(c *resty.Client, resp *resty.Response) error {
		logger.Info("Hyperswitch Response",
			zap.String("status", resp.Status()),
			zap.Duration("time", resp.Time()),
			zap.Int("status_code", resp.StatusCode()),
		)
		return nil
	})
	
	return &HyperswitchClient{
		client:  client,
		baseURL: config.BaseURL,
		apiKey:  config.APIKey,
		logger:  logger,
	}
}

// CreatePayment creates a new payment in Hyperswitch
func (h *HyperswitchClient) CreatePayment(req PaymentRequest) (*PaymentResponse, error) {
	h.logger.Info("Creating payment in Hyperswitch",
		zap.Int64("amount", req.Amount),
		zap.String("currency", req.Currency),
		zap.String("payment_method", req.PaymentMethod),
	)
	
	resp, err := h.client.R().
		SetBody(req).
		SetResult(&PaymentResponse{}).
		Post("/payments")
	
	if err != nil {
		h.logger.Error("Failed to create payment", zap.Error(err))
		return nil, fmt.Errorf("failed to create payment: %w", err)
	}
	
	if resp.StatusCode() >= 400 {
		h.logger.Error("Hyperswitch API error",
			zap.Int("status_code", resp.StatusCode()),
			zap.String("response", string(resp.Body())),
		)
		return nil, fmt.Errorf("hyperswitch API error: %s", resp.Status())
	}
	
	result := resp.Result().(*PaymentResponse)
	h.logger.Info("Payment created successfully",
		zap.String("payment_id", result.PaymentID),
		zap.String("status", result.Status),
	)
	
	return result, nil
}

// GetPayment retrieves a payment from Hyperswitch
func (h *HyperswitchClient) GetPayment(paymentID string) (*PaymentResponse, error) {
	h.logger.Info("Retrieving payment from Hyperswitch",
		zap.String("payment_id", paymentID),
	)
	
	resp, err := h.client.R().
		SetResult(&PaymentResponse{}).
		Get(fmt.Sprintf("/payments/%s", paymentID))
	
	if err != nil {
		h.logger.Error("Failed to retrieve payment", zap.Error(err))
		return nil, fmt.Errorf("failed to retrieve payment: %w", err)
	}
	
	if resp.StatusCode() >= 400 {
		h.logger.Error("Hyperswitch API error",
			zap.Int("status_code", resp.StatusCode()),
			zap.String("response", string(resp.Body())),
		)
		return nil, fmt.Errorf("hyperswitch API error: %s", resp.Status())
	}
	
	result := resp.Result().(*PaymentResponse)
	return result, nil
}

// ConfirmPayment confirms a payment in Hyperswitch
func (h *HyperswitchClient) ConfirmPayment(paymentID string, confirmData interface{}) (*PaymentResponse, error) {
	h.logger.Info("Confirming payment in Hyperswitch",
		zap.String("payment_id", paymentID),
	)
	
	resp, err := h.client.R().
		SetBody(confirmData).
		SetResult(&PaymentResponse{}).
		Post(fmt.Sprintf("/payments/%s/confirm", paymentID))
	
	if err != nil {
		h.logger.Error("Failed to confirm payment", zap.Error(err))
		return nil, fmt.Errorf("failed to confirm payment: %w", err)
	}
	
	if resp.StatusCode() >= 400 {
		h.logger.Error("Hyperswitch API error",
			zap.Int("status_code", resp.StatusCode()),
			zap.String("response", string(resp.Body())),
		)
		return nil, fmt.Errorf("hyperswitch API error: %s", resp.Status())
	}
	
	result := resp.Result().(*PaymentResponse)
	h.logger.Info("Payment confirmed successfully",
		zap.String("payment_id", result.PaymentID),
		zap.String("status", result.Status),
	)
	
	return result, nil
}

// CreateRefund creates a refund in Hyperswitch
func (h *HyperswitchClient) CreateRefund(req RefundRequest) (*RefundResponse, error) {
	h.logger.Info("Creating refund in Hyperswitch",
		zap.String("payment_id", req.PaymentID),
		zap.Int64("amount", req.Amount),
	)
	
	resp, err := h.client.R().
		SetBody(req).
		SetResult(&RefundResponse{}).
		Post("/refunds")
	
	if err != nil {
		h.logger.Error("Failed to create refund", zap.Error(err))
		return nil, fmt.Errorf("failed to create refund: %w", err)
	}
	
	if resp.StatusCode() >= 400 {
		h.logger.Error("Hyperswitch API error",
			zap.Int("status_code", resp.StatusCode()),
			zap.String("response", string(resp.Body())),
		)
		return nil, fmt.Errorf("hyperswitch API error: %s", resp.Status())
	}
	
	result := resp.Result().(*RefundResponse)
	h.logger.Info("Refund created successfully",
		zap.String("refund_id", result.RefundID),
		zap.String("status", result.Status),
	)
	
	return result, nil
}

// GetRefund retrieves a refund from Hyperswitch
func (h *HyperswitchClient) GetRefund(refundID string) (*RefundResponse, error) {
	h.logger.Info("Retrieving refund from Hyperswitch",
		zap.String("refund_id", refundID),
	)
	
	resp, err := h.client.R().
		SetResult(&RefundResponse{}).
		Get(fmt.Sprintf("/refunds/%s", refundID))
	
	if err != nil {
		h.logger.Error("Failed to retrieve refund", zap.Error(err))
		return nil, fmt.Errorf("failed to retrieve refund: %w", err)
	}
	
	if resp.StatusCode() >= 400 {
		h.logger.Error("Hyperswitch API error",
			zap.Int("status_code", resp.StatusCode()),
			zap.String("response", string(resp.Body())),
		)
		return nil, fmt.Errorf("hyperswitch API error: %s", resp.Status())
	}
	
	result := resp.Result().(*RefundResponse)
	return result, nil
}

// ListPayments retrieves a list of payments with optional filters
func (h *HyperswitchClient) ListPayments(limit int, offset int, filters map[string]string) ([]PaymentResponse, error) {
	h.logger.Info("Listing payments from Hyperswitch",
		zap.Int("limit", limit),
		zap.Int("offset", offset),
		zap.Any("filters", filters),
	)
	
	request := h.client.R().
		SetQueryParam("limit", fmt.Sprintf("%d", limit)).
		SetQueryParam("offset", fmt.Sprintf("%d", offset))
	
	// Add filters as query parameters
	for key, value := range filters {
		request.SetQueryParam(key, value)
	}
	
	resp, err := request.Get("/payments")
	
	if err != nil {
		h.logger.Error("Failed to list payments", zap.Error(err))
		return nil, fmt.Errorf("failed to list payments: %w", err)
	}
	
	if resp.StatusCode() >= 400 {
		h.logger.Error("Hyperswitch API error",
			zap.Int("status_code", resp.StatusCode()),
			zap.String("response", string(resp.Body())),
		)
		return nil, fmt.Errorf("hyperswitch API error: %s", resp.Status())
	}
	
	var result struct {
		Data []PaymentResponse `json:"data"`
	}
	
	if err := json.Unmarshal(resp.Body(), &result); err != nil {
		h.logger.Error("Failed to parse response", zap.Error(err))
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}
	
	return result.Data, nil
}

// CreateCustomer creates a customer in Hyperswitch
func (h *HyperswitchClient) CreateCustomer(customer Customer) (*Customer, error) {
	h.logger.Info("Creating customer in Hyperswitch",
		zap.String("customer_email", customer.Email),
	)
	
	resp, err := h.client.R().
		SetBody(customer).
		SetResult(&Customer{}).
		Post("/customers")
	
	if err != nil {
		h.logger.Error("Failed to create customer", zap.Error(err))
		return nil, fmt.Errorf("failed to create customer: %w", err)
	}
	
	if resp.StatusCode() >= 400 {
		h.logger.Error("Hyperswitch API error",
			zap.Int("status_code", resp.StatusCode()),
			zap.String("response", string(resp.Body())),
		)
		return nil, fmt.Errorf("hyperswitch API error: %s", resp.Status())
	}
	
	result := resp.Result().(*Customer)
	h.logger.Info("Customer created successfully",
		zap.String("customer_id", result.ID),
	)
	
	return result, nil
}

// GetCustomer retrieves a customer from Hyperswitch
func (h *HyperswitchClient) GetCustomer(customerID string) (*Customer, error) {
	h.logger.Info("Retrieving customer from Hyperswitch",
		zap.String("customer_id", customerID),
	)
	
	resp, err := h.client.R().
		SetResult(&Customer{}).
		Get(fmt.Sprintf("/customers/%s", customerID))
	
	if err != nil {
		h.logger.Error("Failed to retrieve customer", zap.Error(err))
		return nil, fmt.Errorf("failed to retrieve customer: %w", err)
	}
	
	if resp.StatusCode() >= 400 {
		h.logger.Error("Hyperswitch API error",
			zap.Int("status_code", resp.StatusCode()),
			zap.String("response", string(resp.Body())),
		)
		return nil, fmt.Errorf("hyperswitch API error: %s", resp.Status())
	}
	
	result := resp.Result().(*Customer)
	return result, nil
}

// GetPaymentMethods retrieves available payment methods for a customer
func (h *HyperswitchClient) GetPaymentMethods(customerID string, currency string, country string) (interface{}, error) {
	h.logger.Info("Getting payment methods from Hyperswitch",
		zap.String("customer_id", customerID),
		zap.String("currency", currency),
		zap.String("country", country),
	)
	
	resp, err := h.client.R().
		SetQueryParam("customer_id", customerID).
		SetQueryParam("currency", currency).
		SetQueryParam("country", country).
		Get("/account/payment_methods")
	
	if err != nil {
		h.logger.Error("Failed to get payment methods", zap.Error(err))
		return nil, fmt.Errorf("failed to get payment methods: %w", err)
	}
	
	if resp.StatusCode() >= 400 {
		h.logger.Error("Hyperswitch API error",
			zap.Int("status_code", resp.StatusCode()),
			zap.String("response", string(resp.Body())),
		)
		return nil, fmt.Errorf("hyperswitch API error: %s", resp.Status())
	}
	
	var result interface{}
	if err := json.Unmarshal(resp.Body(), &result); err != nil {
		h.logger.Error("Failed to parse response", zap.Error(err))
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}
	
	return result, nil
}

// GetPaymentConnectors retrieves configured payment connectors
func (h *HyperswitchClient) GetPaymentConnectors() (interface{}, error) {
	h.logger.Info("Getting payment connectors from Hyperswitch")
	
	resp, err := h.client.R().Get("/account/connectors")
	
	if err != nil {
		h.logger.Error("Failed to get connectors", zap.Error(err))
		return nil, fmt.Errorf("failed to get connectors: %w", err)
	}
	
	if resp.StatusCode() >= 400 {
		h.logger.Error("Hyperswitch API error",
			zap.Int("status_code", resp.StatusCode()),
			zap.String("response", string(resp.Body())),
		)
		return nil, fmt.Errorf("hyperswitch API error: %s", resp.Status())
	}
	
	var result interface{}
	if err := json.Unmarshal(resp.Body(), &result); err != nil {
		h.logger.Error("Failed to parse response", zap.Error(err))
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}
	
	return result, nil
}

// CreatePaymentIntent creates a payment intent for advanced payment flows
func (h *HyperswitchClient) CreatePaymentIntent(req PaymentRequest) (*PaymentResponse, error) {
	h.logger.Info("Creating payment intent in Hyperswitch",
		zap.Int64("amount", req.Amount),
		zap.String("currency", req.Currency),
	)
	
	resp, err := h.client.R().
		SetBody(req).
		SetResult(&PaymentResponse{}).
		Post("/payment_intents")
	
	if err != nil {
		h.logger.Error("Failed to create payment intent", zap.Error(err))
		return nil, fmt.Errorf("failed to create payment intent: %w", err)
	}
	
	if resp.StatusCode() >= 400 {
		h.logger.Error("Hyperswitch API error",
			zap.Int("status_code", resp.StatusCode()),
			zap.String("response", string(resp.Body())),
		)
		return nil, fmt.Errorf("hyperswitch API error: %s", resp.Status())
	}
	
	result := resp.Result().(*PaymentResponse)
	h.logger.Info("Payment intent created successfully",
		zap.String("payment_id", result.PaymentID),
		zap.String("status", result.Status),
	)
	
	return result, nil
}

// GetAnalytics retrieves payment analytics from Hyperswitch
func (h *HyperswitchClient) GetAnalytics(startDate, endDate string, granularity string) (interface{}, error) {
	h.logger.Info("Getting analytics from Hyperswitch",
		zap.String("start_date", startDate),
		zap.String("end_date", endDate),
		zap.String("granularity", granularity),
	)
	
	resp, err := h.client.R().
		SetQueryParam("start_date", startDate).
		SetQueryParam("end_date", endDate).
		SetQueryParam("granularity", granularity).
		Get("/analytics/payments")
	
	if err != nil {
		h.logger.Error("Failed to get analytics", zap.Error(err))
		return nil, fmt.Errorf("failed to get analytics: %w", err)
	}
	
	if resp.StatusCode() >= 400 {
		h.logger.Error("Hyperswitch API error",
			zap.Int("status_code", resp.StatusCode()),
			zap.String("response", string(resp.Body())),
		)
		return nil, fmt.Errorf("hyperswitch API error: %s", resp.Status())
	}
	
	var result interface{}
	if err := json.Unmarshal(resp.Body(), &result); err != nil {
		h.logger.Error("Failed to parse response", zap.Error(err))
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}
	
	return result, nil
}

// Health check for Hyperswitch connectivity
func (h *HyperswitchClient) HealthCheck() error {
	h.logger.Info("Checking Hyperswitch health")
	
	resp, err := h.client.R().Get("/health")
	
	if err != nil {
		h.logger.Error("Hyperswitch health check failed", zap.Error(err))
		return fmt.Errorf("hyperswitch health check failed: %w", err)
	}
	
	if resp.StatusCode() >= 400 {
		h.logger.Error("Hyperswitch health check failed",
			zap.Int("status_code", resp.StatusCode()),
		)
		return fmt.Errorf("hyperswitch health check failed: %s", resp.Status())
	}
	
	h.logger.Info("Hyperswitch health check passed")
	return nil
}
