const AWS = require('aws-sdk');
const config = require('../src/config/config');

// Configure AWS credentials from environment variables
const cloudfront = new AWS.CloudFront({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Create CloudFront distribution configuration
const distributionConfig = {
  DistributionConfig: {
    CallerReference: `sunny-payments-${Date.now()}`,
    Comment: 'Sunny Payments Static Assets CDN',
    DefaultCacheBehavior: {
      TargetOriginId: 'SunnyPaymentsOrigin',
      ViewerProtocolPolicy: 'redirect-to-https',
      AllowedMethods: {
        Quantity: 2,
        Items: ['GET', 'HEAD'],
        CachedMethods: {
          Quantity: 2,
          Items: ['GET', 'HEAD']
        }
      },
      CachePolicyId: '658327ea-f89d-4fab-a63d-7e88639e58f6', // Managed-CachingOptimized
      OriginRequestPolicyId: '88a5eaf4-2fd4-4709-b370-b4c650ea3fcf', // Managed-CORS-S3Origin
      Compress: true,
      SmoothStreaming: false
    },
    Enabled: true,
    Origins: {
      Quantity: 1,
      Items: [{
        Id: 'SunnyPaymentsOrigin',
        DomainName: `${process.env.S3_BUCKET_NAME}.s3.amazonaws.com`,
        S3OriginConfig: {
          OriginAccessIdentity: ''  // Will be updated after OAI creation
        }
      }]
    },
    PriceClass: 'PriceClass_All',
    HttpVersion: 'http2',
    ViewerCertificate: {
      CloudFrontDefaultCertificate: true,
      MinimumProtocolVersion: 'TLSv1.2_2021'
    }
  }
};

async function setupCDN() {
  try {
    // Create Origin Access Identity
    const oaiResponse = await cloudfront.createCloudFrontOriginAccessIdentity({
      CloudFrontOriginAccessIdentityConfig: {
        CallerReference: `sunny-payments-oai-${Date.now()}`,
        Comment: 'Sunny Payments OAI'
      }
    }).promise();

    // Update distribution config with OAI
    distributionConfig.DistributionConfig.Origins.Items[0].S3OriginConfig.OriginAccessIdentity = 
      `origin-access-identity/cloudfront/${oaiResponse.CloudFrontOriginAccessIdentity.Id}`;

    // Create CloudFront distribution
    const distribution = await cloudfront.createDistribution(distributionConfig).promise();
    
    console.log('CDN Distribution created successfully:', distribution.Distribution.DomainName);

    // Update environment variables
    const envUpdates = {
      CDN_DOMAIN: distribution.Distribution.DomainName,
      CDN_DISTRIBUTION_ID: distribution.Distribution.Id
    };

    // Update .env.production file
    const fs = require('fs');
    const envFile = '.env.production';
    let envContent = fs.readFileSync(envFile, 'utf8');
    
    Object.entries(envUpdates).forEach(([key, value]) => {
      const regex = new RegExp(`^${key}=.*$`, 'm');
      if (envContent.match(regex)) {
        envContent = envContent.replace(regex, `${key}=${value}`);
      } else {
        envContent += `\n${key}=${value}`;
      }
    });
    
    fs.writeFileSync(envFile, envContent);

    return distribution.Distribution.DomainName;
  } catch (error) {
    console.error('Error setting up CDN:', error);
    throw error;
  }
}

module.exports = { setupCDN };
