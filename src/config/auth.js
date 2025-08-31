/**
 * Authentication Configuration
 * This file contains the configuration for all authentication methods
 */

const authConfig = {
  google: {
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    enabled: Boolean(process.env.REACT_APP_GOOGLE_CLIENT_ID),
  },
  apple: {
    clientId: process.env.REACT_APP_APPLE_CLIENT_ID,
    enabled: Boolean(process.env.REACT_APP_APPLE_CLIENT_ID),
  },
  microsoft: {
    clientId: process.env.REACT_APP_MICROSOFT_CLIENT_ID,
    enabled: Boolean(process.env.REACT_APP_MICROSOFT_CLIENT_ID),
    redirectUri: `${process.env.REACT_APP_API_URL}/auth/microsoft/callback`,
  },
  slack: {
    clientId: process.env.REACT_APP_SLACK_CLIENT_ID,
    enabled: Boolean(process.env.REACT_APP_SLACK_CLIENT_ID),
    redirectUri: `${process.env.REACT_APP_API_URL}/auth/slack/callback`,
  },
};

export const getAuthConfig = (provider) => {
  return authConfig[provider] || { enabled: false };
};

export const isProviderEnabled = (provider) => {
  return Boolean(authConfig[provider]?.enabled);
};

export default authConfig;
