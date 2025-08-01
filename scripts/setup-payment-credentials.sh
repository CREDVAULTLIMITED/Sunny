#!/bin/bash

echo "Setting up production payment processor credentials..."

# Function to validate credentials
validate_credential() {
    local cred=$1
    local pattern=$2
    if [[ $cred =~ $pattern ]]; then
        echo "✓ Valid credential format"
        return 0
    else
        echo "✗ Invalid credential format"
        return 1
    fi
}

# Load current .env
source .env

# Stripe Credentials
echo "Validating Stripe credentials..."
if [[ $STRIPE_SECRET_KEY == sk_live_* ]]; then
    echo "✓ Valid Stripe live secret key format"
else
    echo "✗ WARNING: Stripe secret key is not a live key"
    echo "Please enter your Stripe live secret key (sk_live_...):"
    read -s STRIPE_SECRET_KEY
fi

if [[ $STRIPE_PUBLISHABLE_KEY == pk_live_* ]]; then
    echo "✓ Valid Stripe live publishable key format"
else
    echo "✗ WARNING: Stripe publishable key is not a live key"
    echo "Please enter your Stripe live publishable key (pk_live_...):"
    read -s STRIPE_PUBLISHABLE_KEY
fi

# PayPal Credentials
echo "Validating PayPal credentials..."
echo "Please enter your PayPal live client ID:"
read -s PAYPAL_CLIENT_ID
echo "Please enter your PayPal live client secret:"
read -s PAYPAL_CLIENT_SECRET

# M-Pesa Credentials
echo "Validating M-Pesa credentials..."
echo "Please enter your M-Pesa production consumer key:"
read -s MPESA_CONSUMER_KEY
echo "Please enter your M-Pesa production consumer secret:"
read -s MPESA_CONSUMER_SECRET
echo "Please enter your M-Pesa production shortcode:"
read MPESA_SHORTCODE

# Cryptocurrency Settings
echo "Configuring cryptocurrency mainnet settings..."
echo "Please enter your Infura mainnet API key:"
read -s ETH_PRIMARY_NODE_KEY
echo "Please enter your Alchemy mainnet API key:"
read -s ETH_BACKUP_NODE_KEY
echo "Please enter your Bitcoin mainnet node API key:"
read -s BTC_PRIMARY_NODE_KEY

# Update .env file with new credentials
cat > .env.production << EOL
# Stripe Configuration
STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY=$STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET=$STRIPE_WEBHOOK_SECRET

# PayPal Configuration
PAYPAL_CLIENT_ID=$PAYPAL_CLIENT_ID
PAYPAL_CLIENT_SECRET=$PAYPAL_CLIENT_SECRET
PAYPAL_ENVIRONMENT=production

# M-Pesa Configuration
MPESA_CONSUMER_KEY=$MPESA_CONSUMER_KEY
MPESA_CONSUMER_SECRET=$MPESA_CONSUMER_SECRET
MPESA_SHORTCODE=$MPESA_SHORTCODE
MPESA_ENVIRONMENT=production

# Cryptocurrency Configuration
ETH_PRIMARY_NODE=https://mainnet.infura.io/v3/$ETH_PRIMARY_NODE_KEY
ETH_BACKUP_NODE=https://eth-mainnet.g.alchemy.com/v2/$ETH_BACKUP_NODE_KEY
BTC_PRIMARY_NODE=https://btc.getblock.io/mainnet/$BTC_PRIMARY_NODE_KEY

# Keep existing configurations
$(grep -v "^STRIPE_\|^PAYPAL_\|^MPESA_\|^ETH_\|^BTC_" .env)
EOL

# Encrypt sensitive credentials
echo "Encrypting sensitive credentials..."
node scripts/setup-production-secrets.js

echo "✅ Payment processor credentials setup complete!"
