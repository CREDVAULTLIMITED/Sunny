<div align="center">
  <img src="public/assets/logos/sunny-logo.svg" alt="Sunny Payment Gateway Logo" width="400"/>
</div>

# Sunny Payment Gateway
A comprehensive, global payment processing solution by CREDVAULT LIMITED designed to meet all modern payment needs with enterprise-grade security and scalability.

## Key Features
- Global coverage, multi-currency, and local payment support
- Instant payouts and real-time settlements
- PCI DSS Level 1, HSM integration, advanced fraud detection
- Developer-friendly APIs, SDKs, and documentation
- Responsive admin dashboard and analytics
- Support for subscriptions, marketplaces, and more

## Technical Architecture
- **Rust Core**: High-performance payment processing
- **Go API Gateway**: Efficient API handling
- **TypeScript/React Admin Dashboard**: Modern UI
- Multi-cloud, Kubernetes, Terraform, zero-downtime deployments

## Project Structure
See the workspace for detailed folder layout and code organization.

## DeepSeek Models Integration

### Setup
1. Run the setup script to download DeepSeek Coder models:
   ```bash
   bash scripts/setup-deepseek-coder.sh
   ```
2. Run the setup script to download DeepSeek R1 and Companion models:
   ```bash
   bash scripts/download-deepseek-r1.sh
   ```
3. Verify models are stored in both `src/ai/deepseek-coder/models` and `src/ai/deepseek-companion/models`.
   - Both directories must be present and populated for full migration or advanced features.
   - Ensure folder structure matches what the scripts expect.

### Usage
To load a model locally:
```javascript
await modelManager.loadLocalModel('deepseek-coder-33b-instruct');
await modelManager.loadLocalModel('deepseek-coder-6.7b-instruct');
await modelManager.loadLocalModel('deepseek-coder-33b-base');
// For DeepSeek R1/Companion, see src/ai/deepseek-companion/README.md for usage examples.
```

### Notes
- Models are stored locally for full control.
- **GPU requirements:** Large models (e.g., 33B, 70B, 671B) require significant GPU memory (e.g., 33B needs ~45GB, 70B/671B much more).
- Fine-tuning: Use `setupTrainingEnvironment` in `ModelManager.js`.
- If you encounter issues, check that all model directories exist and are populated as expected.

### Security Reminder
- After migration or adding new models/services, run the security test script:
  ```bash
  node scripts/run-security-test.js
  ```
- Review and update your security configuration as needed. See `docs/SECURITY_CHECKLIST.md` for best practices.

## Getting Started

### For Developers
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sunny.git
   cd sunny
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Access the dashboard at http://localhost:3000

### For Users
1. Sign up at [dashboard.sunnypayments.com](https://dashboard.sunnypayments.com)
2. Get your API keys from the dashboard
3. Install the SDK:
   ```bash
   npm install sunny-payment-gateway
   ```
4. Initialize the SDK in your app:
   ```javascript
   import SunnySDK from 'sunny-payment-gateway';
   const sunny = new SunnySDK({ apiKey: 'your_api_key', environment: 'sandbox' });
   ```
5. Process a payment (see docs for details)

## 🚀 Local Production Preview

You can run the Sunny Payment Gateway in a real production environment on your local machine for safe preview and testing.

### Steps:

1. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Run the production build locally:**
   ```bash
   ENV_FILE=.env.local-production node scripts/deploy-production.js --local-production
   ```
   - This uses `.env.local-production` for all environment variables.
   - The app will be available at [http://localhost:3000](http://localhost:3000)

3. **Stop the app:**
   ```bash
   docker-compose -f docker/production/docker-compose.yml down
   ```

> You can edit `.env.local-production` to test different settings. For real production, use `.env.production` and your live domain.

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License
MIT License. See [LICENSE](LICENSE).

## Support
- Check the [documentation](./docs/)
- Open an issue on GitHub
- Contact support at support@sunnypayments.com
