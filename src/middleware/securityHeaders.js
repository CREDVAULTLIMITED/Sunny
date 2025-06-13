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
          "'unsafe-inline'", // Only for critical inline scripts
          "https://js.stripe.com",
          "https://maps.googleapis.com",
          "https://checkout.paypal.com"
        ],
        styleSrc: [
          "'self'", 
          "'unsafe-inline'", // Required for styled-components
          "https://fonts.googleapis.com"
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com"
        ],
        imgSrc: [
          "'self'",
          "data:",
          "https:",
          "blob:"
        ],
        connectSrc: [
          "'self'",
          "https://api.stripe.com",
          "https://api.paypal.com",
          "wss:"
        ],
        frameSrc: [
          "'self'",
          "https://js.stripe.com",
          "https://checkout.paypal.com"
        ],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: []
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
      'geolocation=(), microphone=(), camera=(), payment=(self), usb=()'
    );
    
    // Expect-CT header for certificate transparency
    res.setHeader('Expect-CT', 'max-age=86400, enforce');
    
    next();
  });
};

module.exports = securityHeaders;

