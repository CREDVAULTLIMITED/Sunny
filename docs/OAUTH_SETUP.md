# Setting up Authentication

To enable social authentication in your development environment, you need to configure the following environment variables:

## Required Environment Variables

Add these to your `.env.development` file:

```bash
# OAuth Client IDs
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
REACT_APP_APPLE_CLIENT_ID=your-apple-client-id
REACT_APP_MICROSOFT_CLIENT_ID=your-microsoft-client-id
REACT_APP_SLACK_CLIENT_ID=your-slack-client-id

# API Configuration for OAuth callbacks
REACT_APP_API_URL=http://localhost:3001
```

## Setting Up OAuth Credentials

1. Google OAuth:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a project or select an existing one
   - Enable the Google+ API
   - Go to Credentials
   - Create an OAuth 2.0 Client ID
   - Add authorized JavaScript origins and redirect URIs
   - Copy the Client ID to REACT_APP_GOOGLE_CLIENT_ID

2. Apple Sign In:
   - Go to [Apple Developer Portal](https://developer.apple.com)
   - Register your app
   - Enable Sign in with Apple
   - Configure your Services ID
   - Add your domain and redirect URL
   - Copy the Services ID to REACT_APP_APPLE_CLIENT_ID

3. Microsoft OAuth:
   - Go to [Azure Portal](https://portal.azure.com)
   - Register your application
   - Add platform (Web)
   - Configure redirect URIs
   - Copy the Application (client) ID to REACT_APP_MICROSOFT_CLIENT_ID

4. Slack OAuth:
   - Go to [Slack API](https://api.slack.com/apps)
   - Create a new app
   - Add OAuth Scopes
   - Configure redirect URLs
   - Copy the Client ID to REACT_APP_SLACK_CLIENT_ID

## Important Notes

- Never commit actual client IDs to version control
- Use different credentials for development and production
- Keep your client secrets secure
- Regularly rotate your credentials
