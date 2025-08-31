'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AuthProvider, 
  UserAccountType, 
  type SocialAuthRequest, 
  type AuthResponse 
} from '@sunny/shared-types';

interface SocialAuthButtonsProps {
  onSocialAuth: (data: SocialAuthRequest) => Promise<AuthResponse>;
  accountType?: UserAccountType;
  mode?: 'signin' | 'signup';
  className?: string;
}

export default function SocialAuthButtons({
  onSocialAuth,
  accountType,
  mode = 'signin',
  className = ''
}: SocialAuthButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<AuthProvider | null>(null);

  const handleSocialAuth = async (provider: AuthProvider) => {
    try {
      setLoadingProvider(provider);
      
      // This would integrate with the actual OAuth flow
      // For now, we'll simulate the process
      const response = await simulateOAuthFlow(provider);
      
      if (response.accessToken) {
        await onSocialAuth({
          provider,
          providerUserId: response.userId,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          accountType
        });
      }
    } catch (error) {
      console.error(`${provider} authentication failed:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  // Simulate OAuth flow (replace with actual OAuth implementation)
  const simulateOAuthFlow = async (provider: AuthProvider) => {
    // In a real implementation, this would:
    // 1. Open OAuth popup/redirect
    // 2. Handle OAuth callback
    // 3. Extract tokens and user info
    return new Promise<{
      userId: string;
      accessToken: string;
      refreshToken?: string;
    }>((resolve, reject) => {
      setTimeout(() => {
        // Simulate OAuth flow
        resolve({
          userId: `${provider}_user_123`,
          accessToken: `${provider}_access_token`,
          refreshToken: `${provider}_refresh_token`
        });
      }, 1500);
    });
  };

  const socialProviders = [
    {
      provider: AuthProvider.GOOGLE,
      name: 'Google',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-900',
      borderColor: 'border-gray-300',
      icon: (
        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      ),
      description: accountType === UserAccountType.BUSINESS ? 'Google Workspace' : 'Personal Google account'
    },
    {
      provider: AuthProvider.APPLE,
      name: 'Apple',
      bgColor: 'bg-black hover:bg-gray-900',
      textColor: 'text-white',
      borderColor: 'border-black',
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 11.99c-.016-3.246 2.639-4.805 2.759-4.875-1.503-2.2-3.842-2.5-4.676-2.534-1.99-.207-3.878 1.171-4.888 1.171-1.01 0-2.571-1.142-4.225-1.111-2.173.032-4.173 1.262-5.29 3.207-2.256 3.914-.576 9.708 1.621 12.881 1.074 1.552 2.357 3.296 4.037 3.233 1.614-.063 2.224-1.044 4.177-1.044 1.952 0 2.531 1.044 4.256 1.011 1.756-.032 2.86-1.566 3.934-3.118 1.243-1.793 1.754-3.53 1.785-3.621-.039-.016-3.426-1.313-3.462-5.2z"/>
          <path d="M15.194 7.036c.883-1.066 1.478-2.548 1.316-4.025-1.272.051-2.813.848-3.726 1.915-.821.952-1.54 2.471-1.347 3.927 1.425.111 2.879-.724 3.757-1.817z"/>
        </svg>
      ),
      description: 'Sign in with Apple ID'
    },
    {
      provider: AuthProvider.MICROSOFT,
      name: 'Microsoft',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
      borderColor: 'border-blue-600',
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.4 0H0v11.4h11.4V0z"/>
          <path d="M24 0H12.6v11.4H24V0z"/>
          <path d="M11.4 12.6H0V24h11.4V12.6z"/>
          <path d="M24 12.6H12.6V24H24V12.6z"/>
        </svg>
      ),
      description: accountType === UserAccountType.BUSINESS ? 'Microsoft 365' : 'Microsoft account'
    }
  ];

  // Add LinkedIn for business users
  if (accountType === UserAccountType.BUSINESS) {
    socialProviders.push({
      provider: AuthProvider.LINKEDIN,
      name: 'LinkedIn',
      bgColor: 'bg-blue-700 hover:bg-blue-800',
      textColor: 'text-white',
      borderColor: 'border-blue-700',
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      description: 'Professional LinkedIn account'
    });
  }

  // Add GitHub for developers
  if (accountType === UserAccountType.DEVELOPER) {
    socialProviders.push({
      provider: AuthProvider.GITHUB,
      name: 'GitHub',
      bgColor: 'bg-gray-900 hover:bg-black',
      textColor: 'text-white',
      borderColor: 'border-gray-900',
      icon: (
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      description: 'Developer GitHub account'
    });
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            Or {mode === 'signin' ? 'sign in' : 'sign up'} with
          </span>
        </div>
      </div>

      {/* Social Auth Buttons */}
      <div className="space-y-3">
        {socialProviders.map((social) => (
          <motion.button
            key={social.provider}
            type="button"
            onClick={() => handleSocialAuth(social.provider)}
            disabled={loadingProvider !== null}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center justify-center px-4 py-3 border rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${social.bgColor} ${social.textColor} ${social.borderColor} focus:ring-green-500`}
          >
            {loadingProvider === social.provider ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-3"></div>
                Connecting...
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                {social.icon}
                <div className="flex-1 text-left">
                  <div className="font-medium">
                    Continue with {social.name}
                  </div>
                  <div className="text-xs opacity-75">
                    {social.description}
                  </div>
                </div>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Security Notice */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start">
          <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
              Secure Social Authentication
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              We use industry-standard OAuth 2.0 protocols to securely authenticate with third-party providers. 
              Your credentials are never stored on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
