#!/bin/bash

# SSL Setup Script for Sunny Payment Gateway
SSL_DIR="docker/production/ssl"
DOMAIN="sunnypayments.com"

# Create SSL directory if it doesn't exist
mkdir -p "${SSL_DIR}"

# Generate strong DH parameters for perfect forward secrecy
openssl dhparam -out "${SSL_DIR}/dhparam.pem" 2048

# Generate private key
openssl genrsa -out "${SSL_DIR}/private.key" 4096

# Generate CSR
openssl req -new -key "${SSL_DIR}/private.key" -out "${SSL_DIR}/request.csr" -subj "/C=US/ST=State/L=City/O=Sunny Payments/CN=${DOMAIN}"

# Generate self-signed certificate (for development/testing)
openssl x509 -req -days 365 -in "${SSL_DIR}/request.csr" -signkey "${SSL_DIR}/private.key" -out "${SSL_DIR}/certificate.crt"

# Set proper permissions
chmod 600 "${SSL_DIR}/private.key"
chmod 644 "${SSL_DIR}/certificate.crt"

echo "SSL certificates generated successfully in ${SSL_DIR}"
echo "For production, replace certificate.crt with your CA-signed certificate"
