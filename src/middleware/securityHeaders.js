/**
 * Security Headers Middleware
 * Adds essential security headers for production deployment
 */

const helmet = require('helmet');

const securityHeaders = (app) => {
  // Use Helmet with custom configuration
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'", 
          "https://js.stripe.com",
          "https://maps.googleapis.com",
          "https://checkout.paypal.com",
          "https://api.sunnypayments.com"
        ],
        styleSrc: [
          "'self'", 
          "https://fonts.googleapis.com"
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com"
        ],
        imgSrc: [
          "'self'",
          "https:",
          "data:"
        ],
        connectSrc: [
          "'self'",
          "https://api.stripe.com",
          "https://api.paypal.com",
          "https://api.sunnypayments.com",
          "wss://ws.sunnypayments.com"
        ],
        frameSrc: [
          "'self'",
          "https://js.stripe.com",
          "https://checkout.paypal.com"
        ],
        objectSrc: ["'none'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        upgradeInsecureRequests: [],
        blockAllMixedContent: true
      }
    },
    
    // Strict Transport Security
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true
    },
    
    // X-Frame-Options
    frameguard: {
      action: 'deny'
    },
    
    // X-Content-Type-Options
    noSniff: true,
    
    // X-XSS-Protection
    xssFilter: true,
    
    // Referrer Policy
    referrerPolicy: {
      policy: 'strict-origin-when-cross-origin'
    },
    
    // Permissions Policy
    permittedCrossDomainPolicies: false,
    
    // Hide X-Powered-By header
    hidePoweredBy: true
  }));
  
  // Additional custom security headers
  app.use((req, res, next) => {
    // Prevent MIME type sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Prevent clickjacking
    res.setHeader('X-Frame-Options', 'DENY');
    
    // Enable XSS filtering
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // Control referrer information
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Permissions policy for sensitive features
    res.setHeader('Permissions-Policy', 
      'geolocation=(), microphone=(), camera=()'
    );
    
    // Expect-CT header for certificate transparency
    res.setHeader('Expect-CT', 'max-age=86400, enforce');
    
    // Cross-Origin headers
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    
    next();
  });
};

module.exports = securityHeaders;

