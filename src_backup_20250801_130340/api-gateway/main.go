package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/creditboost/sunny/api-gateway/config"
	"github.com/creditboost/sunny/api-gateway/handlers"
	"github.com/creditboost/sunny/api-gateway/middleware"
	"github.com/creditboost/sunny/api-gateway/routes"
	"github.com/creditboost/sunny/api-gateway/services"
	"github.com/gin-contrib/cors"
	ginzap "github.com/gin-contrib/zap"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
	"go.uber.org/zap"
)

// @title           Sunny Payment Gateway API
// @version         2.0
// @description     A comprehensive, global payment processing solution
// @termsOfService  https://sunnypayments.com/terms/

// @contact.name   API Support
// @contact.url    https://sunnypayments.com/support
// @contact.email  api@sunnypayments.com

// @license.name  MIT
// @license.url   https://opensource.org/licenses/MIT

// @host      api.sunnypayments.com
// @BasePath  /v2

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
// @description Type "Bearer" followed by a space and the JWT token.

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		fmt.Printf("Warning: .env file not found: %v\n", err)
	}

	// Initialize configuration
	cfg, err := config.Load()
	if err != nil {
		fmt.Printf("Failed to load configuration: %v\n", err)
		os.Exit(1)
	}

	// Set up logger
	logger, err := setupLogger(cfg.Environment)
	if err != nil {
		fmt.Printf("Failed to set up logger: %v\n", err)
		os.Exit(1)
	}
	defer logger.Sync()

	// Set Gin mode based on environment
	if cfg.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Initialize services
	services, err := services.NewServices(cfg, logger)
	if err != nil {
		logger.Fatal("Failed to initialize services", zap.Error(err))
	}

	// Initialize handlers
	handlers := handlers.NewHandlers(services, logger)

	// Set up router
	router := setupRouter(cfg, logger, handlers)

	// Start server
	server := &http.Server{
		Addr:    fmt.Sprintf(":%d", cfg.Port),
		Handler: router,
	}

	// Start server in a goroutine
	go func() {
		logger.Info("Starting server", zap.Int("port", cfg.Port))
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Fatal("Failed to start server", zap.Error(err))
		}
	}()

	// Wait for interrupt signal to gracefully shut down the server
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	logger.Info("Shutting down server...")

	// Create a deadline for server shutdown
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Attempt graceful shutdown
	if err := server.Shutdown(ctx); err != nil {
		logger.Fatal("Server forced to shutdown", zap.Error(err))
	}

	logger.Info("Server exiting")
}

func setupLogger(env string) (*zap.Logger, error) {
	var logger *zap.Logger
	var err error

	if env == "production" {
		logger, err = zap.NewProduction()
	} else {
		logger, err = zap.NewDevelopment()
	}

	return logger, err
}

func setupRouter(cfg *config.Config, logger *zap.Logger, handlers *handlers.Handlers) *gin.Engine {
	router := gin.New()

	// Add middleware
	router.Use(ginzap.Ginzap(logger, time.RFC3339, true))
	router.Use(ginzap.RecoveryWithZap(logger, true))
	router.Use(otelgin.Middleware("sunny-api-gateway"))
	router.Use(middleware.RequestID())
	router.Use(middleware.RateLimiter(cfg.RateLimit))

	// Configure CORS
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = cfg.CorsAllowOrigins
	corsConfig.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	corsConfig.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization", "X-Request-ID"}
	corsConfig.ExposeHeaders = []string{"Content-Length", "Content-Type", "X-Request-ID"}
	corsConfig.AllowCredentials = true
	corsConfig.MaxAge = 12 * time.Hour
	router.Use(cors.New(corsConfig))

	// Health check and metrics endpoints
	router.GET("/health", handlers.Health.Check)
	router.GET("/metrics", gin.WrapH(promhttp.Handler()))

	// API documentation
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Set up API routes
	apiV2 := router.Group("/v2")
	routes.SetupRoutes(apiV2, handlers, middleware.Auth(cfg.JWTSecret))

	return router
}