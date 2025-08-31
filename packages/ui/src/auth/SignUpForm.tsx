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
  InformationCircleIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import {
  UserCircleIcon,
  BuildingOfficeIcon,
  CodeBracketIcon,
  CogIcon,
  BanknotesIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { 
  SignUpSchema, 
  UserAccountType, 
  BusinessType,
  InstitutionType,
  type SignUpRequest, 
  type AuthResponse 
} from '@sunny/shared-types';

interface SignUpFormProps {
  onSubmit: (data: SignUpRequest) => Promise<AuthResponse>;
  defaultAccountType?: UserAccountType;
  redirectUrl?: string;
  className?: string;
}

export default function SignUpForm({
  onSubmit,
  defaultAccountType,
  redirectUrl,
  className = ''
}: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    trigger
  } = useForm<{
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    accountType: UserAccountType;
    agreeToTerms: boolean;
    agreeToPrivacy: boolean;
    marketingConsent?: boolean;
    businessName?: string;
    businessType?: BusinessType;
    institutionName?: string;
    institutionType?: InstitutionType;
    company?: string;
    phone?: string;
    referralCode?: string;
  }>({
    defaultValues: {
      accountType: defaultAccountType || UserAccountType.INDIVIDUAL,
      agreeToTerms: false,
      agreeToPrivacy: false,
      marketingConsent: false
    }
  });

  const accountType = watch('accountType');
  const password = watch('password');
  const email = watch('email');

  // Account type options
  const accountTypeOptions = [
    {
      value: UserAccountType.INDIVIDUAL,
      label: 'Individual',
      description: 'Personal payment account for individual users',
      icon: UserCircleIcon,
      destination: 'app.sunnypayments.com'
    },
    {
      value: UserAccountType.BUSINESS,
      label: 'Business',
      description: 'Merchant account for businesses and organizations',
      icon: BuildingOfficeIcon,
      destination: 'business.sunnypayments.com'
    },
    {
      value: UserAccountType.INSTITUTION,
      label: 'Institution',
      description: 'For banks, SACCOs, and financial institutions',
      icon: BanknotesIcon,
      destination: 'institutions.sunnypayments.com'
    },
    {
      value: UserAccountType.DEVELOPER,
      label: 'Developer',
      description: 'API access and integration tools for developers',
      icon: CodeBracketIcon,
      destination: 'developers.sunnypayments.com'
    }
  ];

  const businessTypeOptions = [
    { value: BusinessType.SOLE_PROPRIETORSHIP, label: 'Sole Proprietorship' },
    { value: BusinessType.PARTNERSHIP, label: 'Partnership' },
    { value: BusinessType.CORPORATION, label: 'Corporation' },
    { value: BusinessType.LLC, label: 'Limited Liability Company (LLC)' },
    { value: BusinessType.NON_PROFIT, label: 'Non-Profit Organization' },
    { value: BusinessType.STARTUP, label: 'Startup' },
    { value: BusinessType.ENTERPRISE, label: 'Enterprise' }
  ];

  const institutionTypeOptions = [
    { value: InstitutionType.BANK, label: 'Commercial Bank' },
    { value: InstitutionType.CREDIT_UNION, label: 'Credit Union' },
    { value: InstitutionType.FINTECH, label: 'Fintech Company' },
    { value: InstitutionType.PAYMENT_PROCESSOR, label: 'Payment Processor' },
    { value: InstitutionType.REMITTANCE_SERVICE, label: 'Remittance Service' },
    { value: InstitutionType.SACCO, label: 'SACCO (Kenya)' },
    { value: InstitutionType.MICROFINANCE, label: 'Microfinance Institution' }
  ];

  // Password strength calculation
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password)) strength += 10;
    if (/[A-Z]/.test(password)) strength += 10;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 15;

    setPasswordStrength(Math.min(strength, 100));
  }, [password]);

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 30) return 'bg-red-500';
    if (strength < 60) return 'bg-yellow-500';
    if (strength < 80) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 30) return 'Weak';
    if (strength < 60) return 'Fair';
    if (strength < 80) return 'Good';
    return 'Strong';
  };

  const handleFormSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      setAuthError(null);

      // Create SignUpRequest from form data
      const signUpData: SignUpRequest = {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        accountType: data.accountType,
        agreeToTerms: data.agreeToTerms,
        agreeToPrivacy: data.agreeToPrivacy,
        marketingConsent: data.marketingConsent,
        businessName: data.businessName,
        businessType: data.businessType,
        institutionName: data.institutionName,
        institutionType: data.institutionType,
        company: data.company,
        phone: data.phone,
        referralCode: data.referralCode
      };

      const response = await onSubmit(signUpData);

      if (response.success) {
        // Handle successful registration - redirect will be handled by parent
        if (response.redirectUrl) {
          window.location.href = response.redirectUrl;
        }
      } else if (response.error) {
        setAuthError(response.error.message);
        if (response.error.field) {
          setError(response.error.field as keyof SignUpRequest, {
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

  const handleNextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const getFieldsForStep = (step: number): (keyof SignUpRequest)[] => {
    switch (step) {
      case 1:
        return ['accountType'];
      case 2:
        return ['firstName', 'lastName', 'email', 'phone', 'businessName', 'businessType', 'institutionName', 'institutionType', 'company'];
      case 3:
        return ['password', 'confirmPassword', 'agreeToTerms', 'agreeToPrivacy'];
      default:
        return [];
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderAccountTypeStep();
      case 2:
        return renderPersonalInfoStep();
      case 3:
        return renderPasswordStep();
      default:
        return null;
    }
  };

  const renderAccountTypeStep = () => (
    <motion.div
      key="step-1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Choose Your Account Type
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Select the type of account that best describes your needs
        </p>
      </div>

      <div className="space-y-3">
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
              <Icon className={`h-8 w-8 mr-4 ${
                accountType === option.value
                  ? 'text-green-600'
                  : 'text-gray-400'
              }`} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-medium ${
                    accountType === option.value
                      ? 'text-green-900 dark:text-green-100'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {option.label}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {option.destination}
                  </span>
                </div>
                <p className={`text-sm mt-1 ${
                  accountType === option.value
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {option.description}
                </p>
              </div>
              {accountType === option.value && (
                <CheckCircleIcon className="h-6 w-6 text-green-600 ml-2" />
              )}
            </motion.label>
          );
        })}
      </div>

      {errors.accountType && (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
          <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
          {errors.accountType.message}
        </p>
      )}
    </motion.div>
  );

  const renderPersonalInfoStep = () => (
    <motion.div
      key="step-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Personal Information
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Tell us about yourself to create your account
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="space-y-2">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            {...register('firstName')}
            className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.firstName
                ? 'border-red-300 dark:border-red-600'
                : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="John"
          />
          {errors.firstName && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            {...register('lastName')}
            className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.lastName
                ? 'border-red-300 dark:border-red-600'
                : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email Address
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register('email')}
            className={`w-full px-4 py-3 pl-12 border rounded-xl transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.email
                ? 'border-red-300 dark:border-red-600'
                : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="john@example.com"
          />
          <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        {errors.email && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone (Optional) */}
      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Phone Number <span className="text-gray-400">(Optional)</span>
        </label>
        <div className="relative">
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            {...register('phone')}
            className={`w-full px-4 py-3 pl-12 border rounded-xl transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.phone
                ? 'border-red-300 dark:border-red-600'
                : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="+1 (555) 123-4567"
          />
          <PhoneIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        {errors.phone && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Conditional Fields Based on Account Type */}
      {accountType === UserAccountType.BUSINESS && (
        <>
          <div className="space-y-2">
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Business Name
            </label>
            <input
              id="businessName"
              type="text"
              {...register('businessName')}
              className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.businessName
                  ? 'border-red-300 dark:border-red-600'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Acme Corp"
            />
            {errors.businessName && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.businessName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Business Type
            </label>
            <select
              id="businessType"
              {...register('businessType')}
              className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.businessType
                  ? 'border-red-300 dark:border-red-600'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <option value="">Select business type</option>
              {businessTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.businessType && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.businessType.message}
              </p>
            )}
          </div>
        </>
      )}

      {accountType === UserAccountType.INSTITUTION && (
        <>
          <div className="space-y-2">
            <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Institution Name
            </label>
            <input
              id="institutionName"
              type="text"
              {...register('institutionName')}
              className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.institutionName
                  ? 'border-red-300 dark:border-red-600'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Sunny Bank"
            />
            {errors.institutionName && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.institutionName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="institutionType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Institution Type
            </label>
            <select
              id="institutionType"
              {...register('institutionType')}
              className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.institutionType
                  ? 'border-red-300 dark:border-red-600'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <option value="">Select institution type</option>
              {institutionTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.institutionType && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.institutionType.message}
              </p>
            )}
          </div>
        </>
      )}

      {accountType === UserAccountType.DEVELOPER && (
        <div className="space-y-2">
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Company <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            id="company"
            type="text"
            {...register('company')}
            className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.company
                ? 'border-red-300 dark:border-red-600'
                : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Tech Corp"
          />
          {errors.company && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.company.message}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );

  const renderPasswordStep = () => (
    <motion.div
      key="step-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Secure Your Account
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Create a strong password and agree to our terms
        </p>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            {...register('password')}
            className={`w-full px-4 py-3 pr-12 border rounded-xl transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.password
                ? 'border-red-300 dark:border-red-600'
                : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Create a strong password"
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
        
        {/* Password Strength Indicator */}
        {password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Password strength:</span>
              <span className={`font-medium ${
                passwordStrength < 30 ? 'text-red-600' :
                passwordStrength < 60 ? 'text-yellow-600' :
                passwordStrength < 80 ? 'text-blue-600' : 'text-green-600'
              }`}>
                {getPasswordStrengthText(passwordStrength)}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                style={{ width: `${passwordStrength}%` }}
              />
            </div>
          </div>
        )}
        
        {errors.password && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            {...register('confirmPassword')}
            className={`w-full px-4 py-3 pr-12 border rounded-xl transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              errors.confirmPassword
                ? 'border-red-300 dark:border-red-600'
                : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {showConfirmPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Agreements */}
      <div className="space-y-4">
        <label className="flex items-start">
          <input
            type="checkbox"
            {...register('agreeToTerms')}
            className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2 mt-1"
          />
          <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
            I agree to the{' '}
            <Link href="/terms" className="text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 underline">
              Terms of Service
            </Link>
            {' '}and understand that my account will be subject to verification.
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="text-sm text-red-600 dark:text-red-400 ml-7">
            {errors.agreeToTerms.message}
          </p>
        )}

        <label className="flex items-start">
          <input
            type="checkbox"
            {...register('agreeToPrivacy')}
            className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2 mt-1"
          />
          <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
            I agree to the{' '}
            <Link href="/privacy" className="text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 underline">
              Privacy Policy
            </Link>
            {' '}and consent to the processing of my personal data.
          </span>
        </label>
        {errors.agreeToPrivacy && (
          <p className="text-sm text-red-600 dark:text-red-400 ml-7">
            {errors.agreeToPrivacy.message}
          </p>
        )}

        <label className="flex items-start">
          <input
            type="checkbox"
            {...register('marketingConsent')}
            className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2 mt-1"
          />
          <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
            I would like to receive marketing communications and product updates from Sunny Payments.{' '}
            <span className="text-gray-500">(Optional)</span>
          </span>
        </label>
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
            Creating Account...
          </div>
        ) : (
          <div className="flex items-center">
            Create Account
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </div>
        )}
      </motion.button>

      {/* Sign In Link */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <Link
          href={`/sign-in${accountType ? `?type=${accountType}` : ''}${redirectUrl ? `&redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
          className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-colors"
        >
          Sign in here
        </Link>
      </p>
    </motion.div>
  );

  return (
    <div className={`w-full ${className}`}>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-500">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="h-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              Previous
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
            >
              Next
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
