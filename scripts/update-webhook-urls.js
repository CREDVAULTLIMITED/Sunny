#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.production' });

// Update webhook URLs in configuration
const configPath = path.join(__dirname, '../src/config/config.js');
const configContent = fs.readFileSync(configPath, 'utf8');

// Update webhook base URL
const updatedConfig = configContent.replace(
  /webhooks:\s*{\s*baseUrl:\s*['"]http:\/\/[^'"]+['"]/g,
  `webhooks: { baseUrl: 'https://api.sunnypayments.com/webhooks'`
);

fs.writeFileSync(configPath, updatedConfig);

// Update Stripe webhook endpoints
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function updateStripeWebhooks() {
  try {
    const webhooks = await stripe.webhookEndpoints.list();
    
    for (const webhook of webhooks.data) {
      if (webhook.url.startsWith('http://')) {
        const newUrl = webhook.url.replace('http://', 'https://');
        await stripe.webhookEndpoints.update(webhook.id, {
          url: newUrl
        });
        console.log(`Updated Stripe webhook ${webhook.id} to use HTTPS`);
      }
    }
  } catch (error) {
    console.error('Error updating Stripe webhooks:', error);
  }
}

// Update PayPal webhook endpoints
const axios = require('axios');

async function updatePayPalWebhooks() {
  try {
    const accessToken = await getPayPalAccessToken();
    const { data: webhooks } = await axios.get('https://api.paypal.com/v1/notifications/webhooks', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    for (const webhook of webhooks.webhooks) {
      if (webhook.url.startsWith('http://')) {
        const newUrl = webhook.url.replace('http://', 'https://');
        await axios.patch(
          `https://api.paypal.com/v1/notifications/webhooks/${webhook.id}`,
          { url: newUrl },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        console.log(`Updated PayPal webhook ${webhook.id} to use HTTPS`);
      }
    }
  } catch (error) {
    console.error('Error updating PayPal webhooks:', error);
  }
}

async function getPayPalAccessToken() {
  const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64');
  const { data } = await axios.post(
    'https://api.paypal.com/v1/oauth2/token',
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return data.access_token;
}

// Run updates
async function main() {
  console.log('Updating webhook URLs to HTTPS...');
  
  await updateStripeWebhooks();
  await updatePayPalWebhooks();
  
  console.log('Webhook URL updates completed!');
}

main().catch(console.error);
