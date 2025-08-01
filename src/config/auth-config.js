/**
 * Authentication Configuration Constants
 */

export const OAUTH_CONFIG = {
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
  },
  slack: {
    clientId: process.env.REACT_APP_SLACK_CLIENT_ID,
    enabled: Boolean(process.env.REACT_APP_SLACK_CLIENT_ID),
  },
};

export const getOAuthConfig = (provider) => {
  return OAUTH_CONFIG[provider] || { enabled: false, clientId: null };
};
