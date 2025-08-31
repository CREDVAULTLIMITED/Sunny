'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import {
  UserCircleIcon,
  BuildingOfficeIcon,
  CodeBracketIcon,
  CogIcon,
  BanknotesIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { SignInSchema, UserAccountType, MFAType, type SignInRequest, type AuthResponse } from '@sunny/shared-types';

interface SignInFormProps {
  onSubmit: (data: SignInRequest) => Promise<AuthResponse>;
  defaultAccountType?: UserAccountType;
  redirectUrl?: string;
  className?: string;
}

export default function SignInForm({
  onSubmit,
  defaultAccountType,
  redirectUrl,
  className = ''
}: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [requiresMFA, setRequiresMFA] = useState(false);
  const [availableMFAMethods, setAvailableMFAMethods] = useState<MFAType[]>([]);
  const [selectedMFAMethod, setSelectedMFAMethod] = useState<MFAType | null>(null);
  const [mfaCode, setMfaCode] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError
  } = useForm<{
    email: string;
    password: string;
    accountType?: UserAccountType;
    rememberMe: boolean;
    mfaCode?: string;
  }>({
    defaultValues: {
      email: '',
      password: '',
      accountType: defaultAccountType,
      rememberMe: false
    }
  });

  const accountType = watch('accountType');

  // Account type options with icons and descriptions
  const accountTypeOptions = [
    {
      value: UserAccountType.INDIVIDUAL,
      label: 'Individual',
      description: 'Personal payment account',
      icon: UserCircleIcon,
      destination: 'app.sunnypayments.com'
    },
    {
      value: UserAccountType.BUSINESS,
      label: 'Business',
      description: 'Merchant account for businesses',
      icon: BuildingOfficeIcon,
      destination: 'business.sunnypayments.com'
    },
    {
      value: UserAccountType.INSTITUTION,
      label: 'Institution',
      description: 'Banks, SACCOs, and financial institutions',
      icon: BanknotesIcon,
      destination: 'institutions.sunnypayments.com'
    },
    {
      value: UserAccountType.DEVELOPER,
      label: 'Developer',
      description: 'API access and integration tools',
      icon: CodeBracketIcon,
      destination: 'developers.sunnypayments.com'
    },
    {
      value: UserAccountType.ADMIN,
      label: 'Admin',
      description: 'Platform administration',
      icon: CogIcon,
      destination: 'admin.sunnypayments.com'
    }
  ];

  const mfaMethodOptions = [
    {
      value: MFAType.SMS,
      label: 'SMS Code',
      description: 'Code sent to your phone',
      icon: DevicePhoneMobileIcon
    },
    {
      value: MFAType.EMAIL,
      label: 'Email Code',
      description: 'Code sent to your email',
      icon: EnvelopeIcon
    },
    {
      value: MFAType.TOTP,
      label: 'Authenticator App',
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
        accountType: data.accountType,
        rememberMe: data.rememberMe || false,
        mfaCode: requiresMFA && selectedMFAMethod && mfaCode ? mfaCode : undefined
      };

      const response = await onSubmit(signInData);

      if (response.success) {
        // Handle successful authentication - redirect will be handled by parent
        if (response.redirectUrl) {
          window.location.href = response.redirectUrl;
        }
      } else if (response.requiresMFA) {
        // Handle MFA requirement
        setRequiresMFA(true);
        setAvailableMFAMethods(response.mfaMethods || []);
        setSelectedMFAMethod(response.mfaMethods?.[0] || null);
      } else if (response.error) {
        setAuthError(response.error.message);
        if (response.error.field) {
          setError(response.error.field as keyof SignInRequest, {
            type: 'manual',
            message: response.error.message
          });
        }
      }
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'An unexpected error occurred');
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

  return (
    <div className={`w-full ${className}`}>
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
            {/* Account Type Selection */}
            {!defaultAccountType && (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Account Type
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {accountTypeOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <motion.label
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          accountType === option.value
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600'
                        }`}
                      >
                        <input
                          type="radio"
                          value={option.value}
                          {...register('accountType')}
                          className="sr-only"
                        />
                        <Icon className={`h-6 w-6 mr-3 ${
                          accountType === option.value
                            ? 'text-green-600'
                            : 'text-gray-400'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className={`font-medium ${
                              accountType === option.value
                                ? 'text-green-900 dark:text-green-100'
                                : 'text-gray-900 dark:text-white'
                            }`}>
                              {option.label}
                            </h3>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {option.destination}
                            </span>
                          </div>
                          <p className={`text-sm ${
                            accountType === option.value
                              ? 'text-green-700 dark:text-green-300'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {option.description}
                          </p>
                        </div>
                        {accountType === option.value && (
                          <CheckCircleIcon className="h-5 w-5 text-green-600 ml-2" />
                        )}
                      </motion.label>
                    );
                  })}
                </div>
                {errors.accountType && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.accountType.message}
                  </p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email')}
                className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.email
                    ? 'border-red-300 dark:border-red-600'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  {...register('password')}
                  className={`w-full px-4 py-3 pr-12 border rounded-xl transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.password
                      ? 'border-red-300 dark:border-red-600'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
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
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('rememberMe')}
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

            {/* Error Message */}
            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
              >
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-sm text-red-700 dark:text-red-300">{authError}</p>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              {isLoading ? (
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
                href={`/sign-up${accountType ? `?type=${accountType}` : ''}${redirectUrl ? `&redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
                className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </motion.form>
        ) : (
          // MFA Form
          <motion.div
            key="mfa-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center">
              <ShieldCheckIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Two-Factor Authentication
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Please verify your identity to continue
              </p>
            </div>

            {/* MFA Method Selection */}
            {availableMFAMethods.length > 1 && (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Verification Method
                </label>
                <div className="space-y-2">
                  {mfaMethodOptions
                    .filter(option => availableMFAMethods.includes(option.value))
                    .map((option) => {
                      const Icon = option.icon;
                      return (
                        <label
                          key={option.value}
                          className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                            selectedMFAMethod === option.value
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-green-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="mfaMethod"
                            value={option.value}
                            checked={selectedMFAMethod === option.value}
                            onChange={(e) => setSelectedMFAMethod(e.target.value as MFAType)}
                            className="sr-only"
                          />
                          <Icon className={`h-5 w-5 mr-3 ${
                            selectedMFAMethod === option.value
                              ? 'text-green-600'
                              : 'text-gray-400'
                          }`} />
                          <div>
                            <p className={`font-medium ${
                              selectedMFAMethod === option.value
                                ? 'text-green-900 dark:text-green-100'
                                : 'text-gray-900 dark:text-white'
                            }`}>
                              {option.label}
                            </p>
                            <p className={`text-sm ${
                              selectedMFAMethod === option.value
                                ? 'text-green-700 dark:text-green-300'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {option.description}
                            </p>
                          </div>
                        </label>
                      );
                    })}
                </div>
              </div>
            )}

            {/* MFA Code Input */}
            <div className="space-y-2">
              <label htmlFor="mfaCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Verification Code
              </label>
              <input
                id="mfaCode"
                type="text"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="000000"
                maxLength={6}
                autoComplete="one-time-code"
              />
            </div>

            {/* Error Message */}
            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
              >
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-sm text-red-700 dark:text-red-300">{authError}</p>
                </div>
              </motion.div>
            )}

            {/* MFA Submit Button */}
            <div className="space-y-3">
              <motion.button
                onClick={handleMFASubmit}
                disabled={isLoading || mfaCode.length !== 6}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  'Verify Code'
                )}
              </motion.button>

              <button
                type="button"
                onClick={resetMFA}
                className="w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Back to sign in
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
