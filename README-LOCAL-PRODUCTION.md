# Local Production Preview for Sunny Payment Gateway

This guide helps you run your app in a real production environment on your local machine, using safe test credentials and localhost URLs. This is useful for previewing your production build before deploying to your live domain.

## How to Run Local Production Preview

1. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Build and start the app in local production mode:**
   ```bash
   ENV_FILE=.env.local-production node scripts/deploy-production.js --local-production
   ```
   - This will use `.env.local-production` for all environment variables.
   - The app will be available at http://localhost:3000

3. **Stop the app:**
   ```bash
   docker-compose -f docker/production/docker-compose.yml down
   ```

## Notes
- You can safely edit `.env.local-production` to test different settings.
- When ready for real production, use `.env.production` and your live domain.
- This preview includes Nginx, MongoDB, and Redis as in real production.

---
Sunny Team
