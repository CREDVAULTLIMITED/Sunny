import React, { useState } from 'react';
import PageTemplate from '../../components/common/PageTemplate';
import { CodeIcon } from '../../components/icons/MenuIcons';
import '../../styles/pages/SdksPage.css';

const SdksPage = () => {
  const [activePlatform, setActivePlatform] = useState('javascript');
  const sdkData = {
    javascript: {
      name: 'JavaScript',
      package: '@sunny/payments',
      installation: 'npm install @sunny/payments',
      example: `import { SunnyPayments } from '@sunny/payments';\nconst sunny = new SunnyPayments('sk_test_...');`,
      docs: '/docs/sdk/javascript'
    },
    python: {
      name: 'Python',
      package: 'sunny-payments',
      installation: 'pip install sunny-payments',
      example: `import sunny\nsunny.api_key = "sk_test_..."`,
      docs: '/docs/sdk/python'
    },
    php: {
      name: 'PHP',
      package: 'sunny/sunny-php',
      installation: 'composer require sunny/sunny-php',
      example: `<?php
require_once('vendor/autoload.php');

\\Sunny\\Sunny::setApiKey('sk_test_...');

$payment = \\Sunny\\Payment::create([
    'amount' => 2000,
    'currency' => 'usd',
    'payment_method' => 'pm_card_visa',
    'confirm' => true
]);`,
      docs: '/docs/sdk/php'
    },
    ruby: {
      name: 'Ruby',
      package: 'sunny-ruby',
      installation: 'gem install sunny-ruby',
      example: `require 'sunny'

# Initialize with your API key
Sunny.api_key = 'sk_test_...'

# Create a payment
payment = Sunny::Payment.create(
  amount: 2000,
  currency: 'usd',
  payment_method: 'pm_card_visa',
  confirm: true
)`,
      docs: '/docs/sdk/ruby'
    },
    java: {
      name: 'Java',
      package: 'com.sunny.payments',
      installation: `<!-- Add to pom.xml -->
<dependency>
    <groupId>com.sunny</groupId>
    <artifactId>sunny-java</artifactId>
    <version>3.2.0</version>
</dependency>`,
      example: `import com.sunny.Sunny;
import com.sunny.model.Payment;
import com.sunny.param.PaymentCreateParams;

Sunny.apiKey = "sk_test_...";

PaymentCreateParams params = PaymentCreateParams.builder()
    .setAmount(2000L)
    .setCurrency("usd")
    .setPaymentMethod("pm_card_visa")
    .setConfirm(true)
    .build();

Payment payment = Payment.create(params);`,
      docs: '/docs/sdk/java'
    },
    go: {
      name: 'Go',
      package: 'github.com/sunny-payments/sunny-go',
      installation: 'go get github.com/sunny-payments/sunny-go',
      example: `package main

import (
    "github.com/sunny-payments/sunny-go"
)

func main() {
    sunny.Key = "sk_test_..."

    params := &sunny.PaymentParams{
        Amount:        sunny.Int64(2000),
        Currency:      sunny.String("usd"),
        PaymentMethod: sunny.String("pm_card_visa"),
        Confirm:       sunny.Bool(true),
    }

    payment, _ := sunny.Payments.Create(params)
}`,
      docs: '/docs/sdk/go'
    },
    dotnet: {
      name: '.NET',
      package: 'Sunny.Net',
      installation: 'Install-Package Sunny.Net',
      example: `using Sunny;
using Sunny.Payments;

SunnyConfiguration.ApiKey = "sk_test_...";

var options = new PaymentCreateOptions
{
    Amount = 2000,
    Currency = "usd",
    PaymentMethod = "pm_card_visa",
    Confirm = true
};

var service = new PaymentService();
Payment payment = service.Create(options);`,
      docs: '/docs/sdk/dotnet'
    }
  };

  return (
    <PageTemplate>
      <div className="devpage-header-row">
        <span className="devpage-icon"><CodeIcon /></span>
        <h1 className="devpage-title">SDKs & Libraries</h1>
      </div>
      <div className="devpage-hero">
        <p className="devpage-description">Official client libraries for integrating with Sunny Payments. Choose your platform to see real installation and usage instructions.</p>
      </div>
      <div className="devpage-content">
        <div className="sdk-tabs">
          {Object.keys(sdkData).map(platform => (
            <button
              key={platform}
              className={`sdk-tab ${platform === activePlatform ? 'active' : ''}`}
              onClick={() => setActivePlatform(platform)}
            >
              {sdkData[platform].name}
            </button>
          ))}
        </div>
        <div className="sdk-details">
          <h2>{sdkData[activePlatform].name} SDK</h2>
          <p>Package: <code>{sdkData[activePlatform].package}</code></p>
          <pre className="code-block">{sdkData[activePlatform].installation}</pre>
          <pre className="code-block">{sdkData[activePlatform].example}</pre>
          <a href={sdkData[activePlatform].docs} className="btn btn-outline" target="_blank" rel="noopener noreferrer">View Full Docs</a>
        </div>
      </div>
    </PageTemplate>
  );
};

export default SdksPage;