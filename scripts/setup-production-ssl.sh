#!/bin/bash

# Production SSL Setup Script
echo "Setting up SSL for Production..."

# Variables
DOMAIN="sunnypayments.com"
SSL_DIR="docker/production/ssl"
CERTBOT_DIR="/etc/letsencrypt/live/$DOMAIN"

# Create SSL directory
mkdir -p $SSL_DIR

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Install certbot if not installed
if ! command_exists certbot; then
    echo "Installing certbot..."
    sudo apt-get update
    sudo apt-get install -y certbot
fi

# Generate production SSL certificates using Let's Encrypt
echo "Generating SSL certificates..."
sudo certbot certonly --standalone \
    -d $DOMAIN \
    -d api.$DOMAIN \
    -d www.$DOMAIN \
    --agree-tos \
    --non-interactive \
    --preferred-challenges http \
    --email admin@$DOMAIN

# Copy certificates to Docker SSL directory
echo "Copying certificates to Docker SSL directory..."
sudo cp $CERTBOT_DIR/fullchain.pem $SSL_DIR/certificate.crt
sudo cp $CERTBOT_DIR/privkey.pem $SSL_DIR/private.key

# Generate strong DH parameters for perfect forward secrecy
echo "Generating DH parameters..."
openssl dhparam -out $SSL_DIR/dhparam.pem 4096

# Set proper permissions
sudo chmod 600 $SSL_DIR/private.key
sudo chmod 644 $SSL_DIR/certificate.crt
sudo chmod 644 $SSL_DIR/dhparam.pem

# Create SSL certificate renewal script
cat > scripts/renew-ssl.sh << 'EOL'
#!/bin/bash
certbot renew
cp /etc/letsencrypt/live/sunnypayments.com/fullchain.pem docker/production/ssl/certificate.crt
cp /etc/letsencrypt/live/sunnypayments.com/privkey.pem docker/production/ssl/private.key
docker-compose -f docker/production/docker-compose.yml restart nginx
EOL

chmod +x scripts/renew-ssl.sh

# Add SSL renewal to crontab
(crontab -l 2>/dev/null; echo "0 0 1 * * /home/sam/Downloads/Sunny-main/scripts/renew-ssl.sh") | crontab -

echo "SSL setup completed successfully!"
