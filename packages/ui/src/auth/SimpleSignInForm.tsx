'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { SignInRequest, AuthResponse, MFAType } from '@sunny/shared-types';

interface SimpleSignInFormProps {
  onSubmit: (data: SignInRequest) => Promise<AuthResponse>;
  redirectUrl?: string;
  isLoading?: boolean;
}

export default function SimpleSignInForm({ 
  onSubmit, 
  redirectUrl,
  isLoading: externalLoading = false 
}: SimpleSignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // MFA states
  const [requiresMFA, setRequiresMFA] = useState(false);
  const [availableMFAMethods, setAvailableMFAMethods] = useState<MFAType[]>([]);
  const [selectedMFAMethod, setSelectedMFAMethod] = useState<MFAType | null>(null);
  const [mfaCode, setMfaCode] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError
  } = useForm<{
    email: string;
    password: string;
    rememberMe: boolean;
  }>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const mfaMethodOptions = [
    {
      type: MFAType.SMS,
      name: 'SMS Code',
      description: 'Code sent to your phone',
      icon: DevicePhoneMobileIcon
    },
    {
      type: MFAType.EMAIL,
      name: 'Email Code',
      description: 'Code sent to your email',
      icon: EnvelopeIcon
    },
    {
      type: MFAType.TOTP,
      name: 'Authenticator App',
      description: 'Code from authenticator app',
      icon: ShieldCheckIcon
    }
  ];

  const handleFormSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      setAuthError(null);

      // Create SignInRequest from form data
      const signInData: SignInRequest = {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe || false,
        mfaCode: requiresMFA && selectedMFAMethod && mfaCode ? mfaCode : undefined
      };

      const response = await onSubmit(signInData);

      if (response.success) {
        // Handle successful authentication - redirect will be handled by parent
        if (response.redirectUrl) {
          window.location.href = response.redirectUrl;
        }
      } else if (response.requiresMFA && response.mfaMethods) {
        // Handle MFA requirement
        setRequiresMFA(true);
        setAvailableMFAMethods(response.mfaMethods);
        setSelectedMFAMethod(response.mfaMethods[0]);
      } else if (response.error) {
        // Handle authentication error
        setAuthError(response.error.message);
        if (response.error.field) {
          setError(response.error.field as any, {
            type: 'manual',
            message: response.error.message
          });
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setAuthError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMFASubmit = async () => {
    if (!mfaCode || !selectedMFAMethod) return;
    
    const currentFormData = watch();
    await handleFormSubmit(currentFormData);
  };

  const resetMFA = () => {
    setRequiresMFA(false);
    setAvailableMFAMethods([]);
    setSelectedMFAMethod(null);
    setMfaCode('');
    setAuthError(null);
  };

  const loading = isLoading || externalLoading;

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {authError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-4"
        >
          <div className="flex items-start">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-red-800 dark:text-red-200">{authError}</p>
            </div>
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {!requiresMFA ? (
          // Main Sign In Form
          <motion.form
            key="signin-form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-6"
          >
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  {...register('rememberMe')}
                  type="checkbox"
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Remember me
                </span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center">
                  Sign In
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </div>
              )}
            </motion.button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link
                href={`/sign-up${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
                className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </motion.form>
        ) : (
          // MFA Verification Form
          <motion.div
            key="mfa-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Verify Your Identity
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Please choose a verification method to complete your sign-in.
              </p>
            </div>

            {/* MFA Method Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Choose verification method
              </label>
              <div className="space-y-2">
                {availableMFAMethods.map((method) => {
                  const option = mfaMethodOptions.find(opt => opt.type === method);
                  if (!option) return null;

                  const Icon = option.icon;
                  return (
                    <label
                      key={method}
                      className={`flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedMFAMethod === method
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600'
                      }`}
                    >
                      <input
                        type="radio"
                        value={method}
                        checked={selectedMFAMethod === method}
                        onChange={(e) => setSelectedMFAMethod(e.target.value as MFAType)}
                        className="sr-only"
                      />
                      <Icon className={`h-5 w-5 mr-3 ${
                        selectedMFAMethod === method ? 'text-green-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <p className={`font-medium ${
                          selectedMFAMethod === method ? 'text-green-900 dark:text-green-100' : 'text-gray-900 dark:text-white'
                        }`}>
                          {option.name}
                        </p>
                        <p className={`text-sm ${
                          selectedMFAMethod === method ? 'text-green-700 dark:text-green-300' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {option.description}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* MFA Code Input */}
            <div className="space-y-2">
              <label htmlFor="mfaCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Verification Code
              </label>
              <input
                id="mfaCode"
                type="text"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-lg tracking-widest"
                placeholder="000000"
                maxLength={6}
                autoComplete="one-time-code"
              />
            </div>

            {/* MFA Actions */}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={resetMFA}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
              <motion.button
                type="button"
                onClick={handleMFASubmit}
                disabled={!mfaCode || mfaCode.length < 6 || loading}
                whileHover={{ scale: (!mfaCode || mfaCode.length < 6 || loading) ? 1 : 1.02 }}
                whileTap={{ scale: (!mfaCode || mfaCode.length < 6 || loading) ? 1 : 0.98 }}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  'Verify'
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
