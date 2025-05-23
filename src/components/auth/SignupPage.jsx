import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext.jsx';
import authService from '../../services/authService.js';
import { loggingService } from '../../services/loggingService.js';
import '../../i18n/config';
import './LoginPage.css'; // Reusing styles from LoginPage
import '../homepage/rtl.css';
import SunnyLogo from '../../assets/images/sunny-logo.svg';
import { generateSecureToken } from '../../security/encryption.js';

// Loading component
const LoadingPage = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-blue)]"></div>
  </div>
);

// Business Types
const BUSINESS_TYPES = [
  { id: 'sole_proprietorship', label: 'Sole Proprietorship' },
  { id: 'partnership', label: 'Partnership' },
  { id: 'llc', label: 'Limited Liability Company (LLC)' },
  { id: 'corporation', label: 'Corporation' },
  { id: 'nonprofit', label: 'Nonprofit Organization' },
  { id: 'other', label: 'Other' }
];

// Countries list
const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
  { code: 'IN', name: 'India' },
  { code: 'BR', name: 'Brazil' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'KE', name: 'Kenya' },
  { code: 'GH', name: 'Ghana' },
  { code: 'OTHER', name: 'Other' }
];

// Accepted document types for business verification
const DOCUMENT_TYPES = [
  { id: 'business_registration', label: 'Business Registration Certificate' },
  { id: 'tax_id', label: 'Tax ID Documentation' },
  { id: 'incorporation', label: 'Certificate of Incorporation' },
  { id: 'business_license', label: 'Business License' },
  { id: 'utility_bill', label: 'Utility Bill (for address verification)' },
  { id: 'bank_statement', label: 'Bank Statement' },
  { id: 'other', label: 'Other Documentation' }
];

// SignupPage Component
const SignupPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Get CSRF token from query params if available (for email verification)
  const queryParams = new URLSearchParams(location.search);
  const verificationToken = queryParams.get('token');
  const emailParam = queryParams.get('email');

  // Check if we're in verification mode
  const isVerificationMode = !!verificationToken;

  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(isVerificationMode ? 6 : 1);
  const totalSteps = 6; // Total number of steps

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isRTL, setIsRTL] = useState(i18n.dir() === 'rtl');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Form data - Step 1: Basic Info
  const [email, setEmail] = useState(emailParam || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ valid: false, strength: 'weak', score: 0, feedback: [] });

  // Form data - Step 2: Account Type
  const [accountType, setAccountType] = useState('individual');

  // Form data - Step 3: Profile Details (Individual)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  // Form data - Step 3/4: Business Details
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [taxId, setTaxId] = useState('');
  const [businessWebsite, setBusinessWebsite] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [businessCountry, setBusinessCountry] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessCity, setBusinessCity] = useState('');
  const [businessState, setBusinessState] = useState('');
  const [businessZipCode, setBusinessZipCode] = useState('');

  // Form data - Step 4/5: Business Verification
  const [documents, setDocuments] = useState([]);
  const [documentType, setDocumentType] = useState('');

  // Form data - Step 5/6: Security Setup
  const [setupMFA, setSetupMFA] = useState(false);
  const [mfaQRCode, setMfaQRCode] = useState('');
  const [mfaSecret, setMfaSecret] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [recoveryCodes, setRecoveryCodes] = useState([]);
  const [downloadedRecoveryCodes, setDownloadedRecoveryCodes] = useState(false);

  // Verification state
  const [verificationEmail, setVerificationEmail] = useState(emailParam || '');
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  // Handle email verification
  const verifyEmail = useCallback(async () => {
    if (!verificationToken) return;

    setIsLoading(true);
    setError(null);

    try {
      loggingService.info('Verifying email with token');

      const result = await authService.verifyEmail(verificationToken);

      if (result.success) {
        setVerificationSuccess(true);
        setSuccessMessage(t('auth.verification.success'));

        // If auto-login is implemented, navigate to dashboard after a delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        setError(result.message || t('auth.verification.failed'));
      }
    } catch (err) {
      setError(err.message || t('auth.verification.unexpectedError'));
      loggingService.error('Email verification error', err);
    } finally {
      setIsLoading(false);
    }
  }, [verificationToken, t, navigate, setIsLoading, setError, setVerificationSuccess, setSuccessMessage]);

  // Form validation errors
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [businessNameError, setBusinessNameError] = useState('');
  const [taxIdError, setTaxIdError] = useState('');
  const [mfaCodeError, setMfaCodeError] = useState('');

  // Terms acceptance
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedTermsError, setAcceptedTermsError] = useState('');
  const [acceptedPrivacyError, setAcceptedPrivacyError] = useState('');

  // Marketing preferences
  const [acceptMarketing, setAcceptMarketing] = useState(false);

  // Refs
  const langMenuRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const mfaInputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Handle different languages
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'zh', name: '中文' },
    { code: 'ar', name: 'العربية' },
  ];

  // Set RTL mode when language changes
  useEffect(() => {
    setIsRTL(i18n.dir() === 'rtl');
    document.documentElement.lang = i18n.language;
  }, [i18n.language, i18n]);

  // Handle clicks outside language menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setShowLangMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus first input on component mount
  useEffect(() => {
    if (emailInputRef.current && currentStep === 1) {
      emailInputRef.current.focus();
    }
  }, [currentStep]);

  // Process email verification if token is present
  useEffect(() => {
    if (isVerificationMode) {
      verifyEmail();
    }
  }, [isVerificationMode, verifyEmail]);

  // Change language
  const changeLanguage = async (langCode) => {
    if (langCode === i18n.language) return setShowLangMenu(false);

    const scrollPos = window.scrollY;
    setIsLoading(true);
    await i18n.changeLanguage(langCode);
    localStorage.setItem('sunnyLanguage', langCode);
    document.body.classList.add('language-transition');
    setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, scrollPos);
      setTimeout(() => document.body.classList.remove('language-transition'), 500);
    }, 400);
    setShowLangMenu(false);
  };

  // Navigate between steps
  const goToNextStep = () => {
    // Skip business verification step for individual accounts
    if (currentStep === 3 && accountType === 'individual') {
      setCurrentStep(5); // Skip to security setup
    } else {
      setCurrentStep(prev => prev + 1);
    }

    // Scroll to top when changing steps
    window.scrollTo(0, 0);
  };

  const goToPreviousStep = () => {
    // Skip business verification step for individual accounts when going back
    if (currentStep === 5 && accountType === 'individual') {
      setCurrentStep(3); // Go back to profile details
    } else {
      setCurrentStep(prev => prev - 1);
    }

    // Scroll to top when changing steps
    window.scrollTo(0, 0);
  };

  // Form validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError(t('auth.validation.emailRequired'));
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError(t('auth.validation.invalidEmail'));
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError(t('auth.validation.passwordRequired'));
      return false;
    } else if (password.length < 8) {
      setPasswordError(t('auth.validation.passwordTooShort'));
      return false;
    }

    const strength = authService.validatePasswordStrength(password);
    if (!strength.valid) {
      setPasswordError(t('auth.validation.passwordNotStrong'));
      return false;
    }

    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) {
      setConfirmPasswordError(t('auth.validation.confirmPasswordRequired'));
      return false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError(t('auth.validation.passwordsDoNotMatch'));
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const validateName = (name, setter) => {
    if (!name) {
      setter(t('auth.validation.nameRequired'));
      return false;
    } else if (name.length < 2) {
      setter(t('auth.validation.nameTooShort'));
      return false;
    }
    setter('');
    return true;
  };

  const validatePhoneNumber = (phone) => {
    // Basic phone validation - can be enhanced for international formats
    const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/;
    if (!phone) {
      setPhoneNumberError(t('auth.validation.phoneRequired'));
      return false;
    } else if (!phoneRegex.test(phone)) {
      setPhoneNumberError(t('auth.validation.invalidPhone'));
      return false;
    }
    setPhoneNumberError('');
    return true;
  };

  const validateBusinessName = (name) => {
    if (!name) {
      setBusinessNameError(t('auth.validation.businessNameRequired'));
      return false;
    } else if (name.length < 2) {
      setBusinessNameError(t('auth.validation.businessNameTooShort'));
      return false;
    }
    setBusinessNameError('');
    return true;
  };

  const validateTaxId = (id) => {
    if (!id) {
      setTaxIdError(t('auth.validation.taxIdRequired'));
      return false;
    }
    setTaxIdError('');
    return true;
  };

  const validateMfaCode = (code) => {
    const codeRegex = /^[0-9]{6}$/;
    if (!code) {
      setMfaCodeError(t('auth.validation.mfaCodeRequired'));
      return false;
    } else if (!codeRegex.test(code)) {
      setMfaCodeError(t('auth.validation.invalidMfaCode'));
      return false;
    }
    setMfaCodeError('');
    return true;
  };

  const validateTermsAcceptance = () => {
    let isValid = true;
    if (!acceptedTerms) {
      setAcceptedTermsError(t('auth.validation.acceptTerms'));
      isValid = false;
    } else {
      setAcceptedTermsError('');
    }

    if (!acceptedPrivacy) {
      setAcceptedPrivacyError(t('auth.validation.acceptPrivacy'));
      isValid = false;
    } else {
      setAcceptedPrivacyError('');
    }

    return isValid;
  };

  // Handle file uploads for business verification
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      // Create preview and prepare files for upload
      const newDocuments = files.map(file => ({
        id: `doc_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        file,
        name: file.name,
        type: documentType || 'other',
        size: file.size,
        preview: URL.createObjectURL(file),
        uploadProgress: 0,
        uploaded: false,
        error: null
      }));

      setDocuments(prev => [...prev, ...newDocuments]);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Remove uploaded document
  const removeDocument = (docId) => {
    setDocuments(prev => {
      const updated = prev.filter(doc => doc.id !== docId);

      // Release object URL to prevent memory leaks
      const docToRemove = prev.find(doc => doc.id === docId);
      if (docToRemove && docToRemove.preview) {
        URL.revokeObjectURL(docToRemove.preview);
      }

      return updated;
    });
  };

  // Simulate file upload with progress
  const simulateFileUpload = async (docId) => {
    // In a real implementation, this would use FormData and XHR/fetch to upload to a server
    // with progress tracking

    setDocuments(prev => prev.map(doc =>
      doc.id === docId ? {...doc, uploadProgress: 0, uploaded: false, error: null} : doc
    ));

    // Simulate progress updates
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));

      setDocuments(prev => prev.map(doc =>
        doc.id === docId ? {...doc, uploadProgress: progress} : doc
      ));
    }

    // Mark as uploaded
    setDocuments(prev => prev.map(doc =>
      doc.id === docId ? {...doc, uploaded: true} : doc
    ));
  };

  // Generate CSRF token for form submission
  const [csrfToken, setCsrfToken] = useState('');

  // Initialize CSRF token on mount
  useEffect(() => {
    // In a real implementation, this would be fetched from the server
    const token = generateSecureToken(32);
    setCsrfToken(token);

    // Store in sessionStorage for verification on submit
    sessionStorage.setItem('csrf_token', token);
  }, []);

  // Validate step 1: Basic Information
  const validateStep1 = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    return isEmailValid && isPasswordValid && isConfirmPasswordValid;
  };

  // Validate step 2: Account Type
  const validateStep2 = () => {
    // Account type selection is handled by UI, always valid
    return true;
  };

  // Validate step 3: Profile Details
  const validateStep3 = () => {
    if (accountType === 'individual') {
      const isFirstNameValid = validateName(firstName, setFirstNameError);
      const isLastNameValid = validateName(lastName, setLastNameError);
      const isPhoneValid = validatePhoneNumber(phoneNumber);

      return isFirstNameValid && isLastNameValid && isPhoneValid;
    } else {
      // Business profile validation
      const isFirstNameValid = validateName(firstName, setFirstNameError);
      const isLastNameValid = validateName(lastName, setLastNameError);
      const isPhoneValid = validatePhoneNumber(phoneNumber);
      const isBusinessNameValid = validateBusinessName(businessName);
      const isTaxIdValid = validateTaxId(taxId);

      return isFirstNameValid && isLastNameValid && isPhoneValid &&
             isBusinessNameValid && isTaxIdValid;
    }
  };

  // Validate step 4: Business Verification
  const validateStep4 = () => {
    // For business accounts, require at least one document
    if (accountType === 'business' && documents.length === 0) {
      setError(t('auth.validation.documentsRequired'));
      return false;
    }

    setError(null);
    return true;
  };

  // Validate step 5: Security Setup
  const validateStep5 = () => {
    // If MFA is enabled, validate MFA code
    if (setupMFA) {
      const isMfaValid = validateMfaCode(mfaCode);

      // Check if recovery codes were downloaded
      if (!downloadedRecoveryCodes) {
        setError(t('auth.validation.downloadRecoveryCodes'));
        return false;
      }

      return isMfaValid;
    }

    // MFA not enabled, validation passes
    return true;
  };

  // Handle form submission for each step
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic CSRF protection
    if (e.target.csrf_token?.value !== sessionStorage.getItem('csrf_token')) {
      setError(t('auth.error.securityError'));
      loggingService.error('CSRF token mismatch');
      return;
    }

    setError(null);
    setSuccessMessage(null);

    // Validate current step
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      case 4:
        isValid = validateStep4();
        break;
      case 5:
        isValid = validateStep5();
        break;
      default:
        isValid = false;
    }

    if (!isValid) return;

    // If this is the last step or we're at step 5 for individual accounts, submit the registration
    if ((currentStep === 5 && accountType === 'individual') ||
        (currentStep === 5 && accountType === 'business')) {

      // Validate terms acceptance
      if (!validateTermsAcceptance()) return;

      await submitRegistration();
    } else {
      // Otherwise proceed to next step
      goToNextStep();
    }
  };

  // Submit the final registration
  const submitRegistration = async () => {
    setIsLoading(true);

    try {
      loggingService.info('Submitting registration form');

      // Prepare registration data
      const registrationData = {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        accountType,
        country,
        acceptMarketing,
        setupMFA,
        // Add address details
        address: {
          street: address,
          city,
          state,
          zipCode,
          country
        }
      };

      // Add business details if applicable
      if (accountType === 'business') {
        registrationData.business = {
          name: businessName,
          type: businessType,
          taxId,
          website: businessWebsite,
          email: businessEmail || email,
          phone: businessPhone || phoneNumber,
          address: {
            street: businessAddress || address,
            city: businessCity || city,
            state: businessState || state,
            zipCode: businessZipCode || zipCode,
            country: businessCountry || country
          },
          documents: documents.map(doc => ({
            type: doc.type,
            name: doc.name,
            size: doc.size
          }))
        };
      }

      // Add MFA details if enabled
      if (setupMFA) {
        registrationData.mfa = {
          enabled: true,
          verificationCode: mfaCode
        };
      }

      // Call the registration API
      const result = await authService.register(registrationData);

      if (result.success) {
        if (result.requiresVerification) {
          // Show success and move to verification step
          setVerificationSent(true);
          setVerificationEmail(email);
          setCurrentStep(6);
          setSuccessMessage(t('auth.signup.verificationSent'));
        } else {
          // Auto-login if no verification needed
          login(result.data.token, result.data.user);
          
          // Also store token directly in localStorage for ProtectedRoute
          localStorage.setItem('sunnyAuthToken', result.data.token);
          
          setSuccessMessage(t('auth.signup.registrationSuccess'));

          // Redirect to dashboard after a delay
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
        }
      } else {
        setError(result.message || t('auth.signup.registrationFailed'));
      }
    } catch (err) {
      setError(err.message || t('auth.error.unexpectedError'));
      loggingService.error('Registration error', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Request a new verification email
  const requestNewVerificationEmail = async () => {
    if (!verificationEmail) return;

    setIsLoading(true);
    setError(null);

    try {
      loggingService.info('Requesting new verification email');

      // In a real implementation, this would call an API endpoint
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate successful request
      setSuccessMessage(t('auth.verification.newEmailSent'));
      loggingService.info('New verification email requested successfully');

    } catch (err) {
      setError(err.message || t('auth.verification.requestFailed'));
      loggingService.error('Request new verification email error', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Render different steps of the form
  const renderStep = (step) => {
    switch (step) {
      case 1:
        return (
          <>
            {/* Basic Information */}
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">{t('auth.signup.step1.title')}</h2>
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.label.email')} <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value); }}
                onBlur={(e) => validateEmail(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border ${emailError ? 'border-red-500' : 'border-gray-300 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]'}`}
                placeholder={t('auth.placeholder.email')}
                disabled={isVerificationMode} // Disable email field if in verification mode
                ref={emailInputRef}
              />
              {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.label.password')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                    setPasswordStrength(authService.validatePasswordStrength(e.target.value));
                  }}
                  onBlur={(e) => validatePassword(e.target.value)}
                  className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring focus:border ${passwordError ? 'border-red-500' : 'border-gray-300 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]'}`}
                  placeholder={t('auth.placeholder.password')}
                  ref={passwordInputRef}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.953 9.953 0 011.563-2.566m0 0L21 21m-1.414-1.414l-4.243-4.243m2.414-1.06l1.414 1.414m-2.414-1.06l-1.414 1.414m-1.414-1.06l1.414 1.414" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
              {password && (
                <div className="mt-2 text-sm">
                  <p>{t(`auth.passwordStrength.${passwordStrength.strength}`)}</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {passwordStrength.feedback.map((feedback, index) => (
                      <li key={index}>{feedback}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.label.confirmPassword')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); validateConfirmPassword(e.target.value); }}
                  onBlur={(e) => validateConfirmPassword(e.target.value)}
                  className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring focus:border ${confirmPasswordError ? 'border-red-500' : 'border-gray-300 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]'}`}
                  placeholder={t('auth.placeholder.confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.953 9.953 0 011.563-2.566m0 0L21 21m-1.414-1.414l-4.243-4.243m2.414-1.06l1.414 1.414m-2.414-1.06l-1.414 1.414m-1.414-1.06l1.414 1.414" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {confirmPasswordError && <p className="mt-1 text-sm text-red-600">{confirmPasswordError}</p>}
            </div>
          </>
        );
      case 2:
        return (
          <>
            {/* Account Type Selection */}
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">{t('auth.signup.step2.title')}</h2>
            <p className="text-gray-600 mb-6 text-center">{t('auth.signup.step2.description')}</p>
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-center">
              <button
                type="button"
                onClick={() => setAccountType('individual')}
                className={`flex-1 p-6 border rounded-md shadow-sm text-center transition-colors duration-200 ${accountType === 'individual' ? 'border-[var(--primary-blue)] ring-2 ring-[var(--primary-blue)] bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-3 text-[var(--primary-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium text-gray-900">{t('auth.accountType.individual')}</span>
                <p className="text-sm text-gray-500 mt-1">{t('auth.accountType.individualDescription')}</p>
              </button>
              <button
                type="button"
                onClick={() => setAccountType('business')}
                className={`flex-1 p-6 border rounded-md shadow-sm text-center transition-colors duration-200 ${accountType === 'business' ? 'border-[var(--primary-blue)] ring-2 ring-[var(--primary-blue)] bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-3 text-[var(--primary-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.318-.68-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium text-gray-900">{t('auth.accountType.business')}</span>
                <p className="text-sm text-gray-500 mt-1">{t('auth.accountType.businessDescription')}</p>
              </button>
            </div>
            {!accountType && <p className="mt-4 text-sm text-red-600 text-center">{t('auth.validation.accountTypeRequired')}</p>}
          </>
        );
      case 3:
        return (
          <>
            {/* Profile Details */}
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">{t(`auth.signup.step3.${accountType === 'individual' ? 'individualTitle' : 'businessTitle'}`)}</h2>
            <p className="text-gray-600 mb-6 text-center">{t(`auth.signup.step3.${accountType === 'individual' ? 'individualDescription' : 'businessDescription'}`)}</p>
            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.label.firstName')} <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value); validateName(e.target.value, setFirstNameError); }}
                  onBlur={(e) => validateName(e.target.value, setFirstNameError)}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border ${firstNameError ? 'border-red-500' : 'border-gray-300 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]'}`}
                  placeholder={t('auth.placeholder.firstName')}
                />
                {firstNameError && <p className="mt-1 text-sm text-red-600">{firstNameError}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.label.lastName')} <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value); validateName(e.target.value, setLastNameError); }}
                  onBlur={(e) => validateName(e.target.value, setLastNameError)}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border ${lastNameError ? 'border-red-500' : 'border-gray-300 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]'}`}
                  placeholder={t('auth.placeholder.lastName')}
                />
                {lastNameError && <p className="mt-1 text-sm text-red-600">{lastNameError}</p>}
              </div>
            </div>
            {/* Phone Number */}
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.label.phoneNumber')} <span className="text-red-500">*</span>
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                required
                value={phoneNumber}
                onChange={(e) => { setPhoneNumber(e.target.value); validatePhoneNumber(e.target.value); }}
                onBlur={(e) => validatePhoneNumber(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border ${phoneNumberError ? 'border-red-500' : 'border-gray-300 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]'}`}
                placeholder={t('auth.placeholder.phoneNumber')}
              />
              {phoneNumberError && <p className="mt-1 text-sm text-red-600">{phoneNumberError}</p>}
            </div>
            {/* Country */}
            <div className="mb-4">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.label.country')}
              </label>
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]"
              >
                <option value="">{t('auth.placeholder.selectCountry')}</option>
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>
            {/* Address (Optional) */}
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.label.address')}
              </label>
              <input
                id="address"
                name="address"
                type="text"
                autoComplete="street-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]"
                placeholder={t('auth.placeholder.address')}
              />
            </div>
            {/* City, State, Zip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.label.city')}
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]"
                  placeholder={t('auth.placeholder.city')}
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.label.state')}
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  autoComplete="address-level1"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]"
                  placeholder={t('auth.placeholder.state')}
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('auth.label.zipCode')}
                </label>
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  autoComplete="postal-code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]"
                  placeholder={t('auth.placeholder.zipCode')}
                />
              </div>
            </div>

            {accountType === 'business' && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('auth.signup.step3.businessInfo')}</h3>
                {/* Business Name */}
                <div className="mb-4">
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.label.businessName')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => { setBusinessName(e.target.value); validateBusinessName(e.target.value); }}
                    onBlur={(e) => validateBusinessName(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border ${businessNameError ? 'border-red-500' : 'border-gray-300 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]'}`}
                    placeholder={t('auth.placeholder.businessName')}
                  />
                  {businessNameError && <p className="mt-1 text-sm text-red-600">{businessNameError}</p>}
                </div>
                {/* Business Type */}
                <div className="mb-4">
                  <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.label.businessType')}
                  </label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]"
                  >
                    <option value="">{t('auth.placeholder.selectBusinessType')}</option>
                    {BUSINESS_TYPES.map((type) => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                </div>
                {/* Tax ID */}
                <div className="mb-4">
                  <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.label.taxId')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="taxId"
                    name="taxId"
                    type="text"
                    required
                    value={taxId}
                    onChange={(e) => { setTaxId(e.target.value); validateTaxId(e.target.value); }}
                    onBlur={(e) => validateTaxId(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border ${taxIdError ? 'border-red-500' : 'border-gray-300 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]'}`}
                    placeholder={t('auth.placeholder.taxId')}
                  />
                  {taxIdError && <p className="mt-1 text-sm text-red-600">{taxIdError}</p>}
                </div>
                {/* Business Website (Optional) */}
                <div className="mb-4">
                  <label htmlFor="businessWebsite" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.label.businessWebsite')}
                  </label>
                  <input
                    id="businessWebsite"
                    name="businessWebsite"
                    type="url"
                    value={businessWebsite}
                    onChange={(e) => setBusinessWebsite(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]"
                    placeholder={t('auth.placeholder.businessWebsite')}
                  />
                </div>
                {/* Business Email (Optional) */}
                <div className="mb-4">
                  <label htmlFor="businessEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.label.businessEmail')}
                  </label>
                  <input
                    id="businessEmail"
                    name="businessEmail"
                    type="email"
                    autoComplete="email"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]"
                    placeholder={t('auth.placeholder.businessEmail')}
                  />
                </div>
                {/* Business Phone (Optional) */}
                <div className="mb-4">
                  <label htmlFor="businessPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.label.businessPhone')}
                  </label>
                  <input
                    id="businessPhone"
                    name="businessPhone"
                    type="tel"
                    autoComplete="tel"
                    value={businessPhone}
                    onChange={(e) => setBusinessPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]"
                    placeholder={t('auth.placeholder.businessPhone')}
                  />
                </div>
                {/* Business Address (Optional, defaults to individual if empty) */}
                <div className="mb-4">
                  <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.label.businessAddress')}
                  </label>
                  <input
                    id="businessAddress"
                    name="businessAddress"
                    type="text"
                    autoComplete="street-address"
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]"
                    placeholder={t('auth.placeholder.businessAddress')}
                  />
                </div>
                {/* Business City, State, Zip (Optional, defaults to individual if empty) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label htmlFor="businessCity" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('auth.label.businessCity')}
                    </label>
                    <input
                      id="businessCity"
                      name="businessCity"
                      type="text"
                      autoComplete="address-level2"
                      value={businessCity}
                      onChange={(e) => setBusinessCity(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]"
                      placeholder={t('auth.placeholder.businessCity')}
                    />
                  </div>
                  <div>
                    <label htmlFor="businessState" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('auth.label.businessState')}
                    </label>
                    <input
                      id="businessState"
                      name="businessState"
                      type="text"
                      autoComplete="address-level1"
                      value={businessState}
                      onChange={(e) => setBusinessState(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]"
                      placeholder={t('auth.placeholder.businessState')}
                    />
                  </div>
                  <div>
                    <label htmlFor="businessZipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('auth.label.businessZipCode')}
                    </label>
                    <input
                      id="businessZipCode"
                      name="businessZipCode"
                      type="text"
                      autoComplete="postal-code"
                      value={businessZipCode}
                      onChange={(e) => setBusinessZipCode(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]"
                      placeholder={t('auth.placeholder.businessZipCode')}
                    />
                  </div>
                </div>
                {/* Business Country (Optional, defaults to individual if empty) */}
                <div className="mb-4">
                  <label htmlFor="businessCountry" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.label.businessCountry')}
                  </label>
                  <select
                    id="businessCountry"
                    name="businessCountry"
                    autoComplete="country-name"
                    value={businessCountry}
                    onChange={(e) => setBusinessCountry(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]"
                  >
                    <option value="">{t('auth.placeholder.selectCountry')}</option>
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </>
        );
      case 4: // Business Verification (Only for business accounts)
        if (accountType === 'individual') return null; // Should have been skipped

        return (
          <>
            {/* Business Verification */}
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">{t('auth.signup.step4.title')}</h2>
            <p className="text-gray-600 mb-6 text-center">{t('auth.signup.step4.description')}</p>

            {/* Document Type Selection */}
            <div className="mb-4">
              <label htmlFor="documentType" className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.label.documentType')} <span className="text-red-500">*</span>
              </label>
              <select
                id="documentType"
                name="documentType"
                required
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]"
              >
                <option value="">{t('auth.placeholder.selectDocumentType')}</option>
                {DOCUMENT_TYPES.map((type) => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('auth.label.uploadDocuments')} <span className="text-red-500">*</span>
              </label>
              <div
                className={`flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer ${documentType ? 'border-[var(--primary-blue)] hover:border-blue-600' : 'border-gray-300 hover:border-gray-400'}`}
                onClick={() => documentType && fileInputRef.current?.click()}
              >
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className={`relative cursor-pointer rounded-md bg-white font-medium ${documentType ? 'text-[var(--primary-blue)] hover:text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--primary-blue)] focus-within:ring-offset-2' : 'text-gray-500 cursor-not-allowed'}`}>
                      <span>{t('auth.label.uploadAFile')}</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileUpload}
                        ref={fileInputRef}
                        disabled={!documentType}
                        multiple // Allow multiple file uploads
                      />
                    </label>
                    <p className="pl-1">{t('auth.label.orDragAndDrop')}</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, PDF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            {/* Uploaded Documents List */}
            {documents.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">{t('auth.label.uploadedDocuments')}</h3>
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  {documents.map(doc => (
                    <li key={doc.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        {/* Document icon */}
                        <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414L14.586 5A2 2 0 0115 6.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2 flex-1 w-0 truncate">
                          {doc.name} ({doc.type})
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0 space-x-4">
                        {doc.uploaded ? (
                          <span className="text-green-600">{t('auth.status.uploaded')}</span>
                        ) : doc.error ? (
                          <span className="text-red-600">{t('auth.status.uploadError')}</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => simulateFileUpload(doc.id)}
                            className="font-medium text-[var(--primary-blue)] hover:text-blue-600"
                          >
                            {t('auth.action.upload')}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeDocument(doc.id)}
                          className="font-medium text-red-600 hover:text-red-800"
                        >
                          {t('auth.action.remove')}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

             {error && <p className="mt-4 text-sm text-red-600 text-center">{error}</p>}
          </>
        );
      case 5: // Security Setup
        return (
          <>
            {/* Security Setup (MFA) */}
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">{t('auth.signup.step5.title')}</h2>
             <p className="text-gray-600 mb-6 text-center">{t('auth.signup.step5.description')}</p>

             {/* Enable MFA */}
            <div className="flex items-center mb-6">
              <input
                id="setupMFA"
                name="setupMFA"
                type="checkbox"
                checked={setupMFA}
                onChange={(e) => setSetupMFA(e.target.checked)}
                className="h-4 w-4 text-[var(--primary-blue)] border-gray-300 rounded focus:ring-[var(--primary-blue)]"
              />
              <label htmlFor="setupMFA" className="ml-2 block text-sm text-gray-900">
                {t('auth.label.enableMFA')}
              </label>
            </div>

            {setupMFA && (
              <div className="border p-6 rounded-md space-y-6">
                <h3 className="text-lg font-medium text-gray-900">{t('auth.mfa.setup')}</h3>
                <p className="text-gray-600">{t('auth.mfa.instructions')}</p>

                {/* MFA QR Code and Secret (Simulated) */}
                <div className="flex flex-col items-center space-y-4">
                  {mfaQRCode ? (
                    <img src={mfaQRCode} alt="MFA QR Code" className="w-40 h-40 border p-2" />
                  ) : (
                     <div className="w-40 h-40 border p-2 flex items-center justify-center text-gray-500">
                       {t('auth.mfa.qrCodePlaceholder')}
                     </div>
                  )}
                  <p className="text-sm font-mono bg-gray-100 p-2 rounded break-all">{t('auth.mfa.secret')}: {mfaSecret || 'Generating...'}</p>
                   <button
                    type="button"
                    onClick={async () => {
                       // Simulate generating QR code and secret
                       setIsLoading(true);
                       await new Promise(resolve => setTimeout(resolve, 1000));
                       setMfaSecret('SIMULATED_SECRET_' + Math.random().toString(36).substring(2, 15).toUpperCase());
                       // Simulate generating a base64 encoded QR code image
                       setMfaQRCode('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='); // Placeholder base64
                       setIsLoading(false);
                    }}
                    disabled={isLoading || mfaQRCode !== ''}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[var(--primary-blue)] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-blue)] disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     {isLoading ? t('common.loading') : t('auth.mfa.generateQR')}
                   </button>
                </div>

                {/* MFA Code Input */}
                <div className="mb-4">
                  <label htmlFor="mfaCode" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.label.mfaCode')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="mfaCode"
                    name="mfaCode"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength="6"
                    required
                    value={mfaCode}
                    onChange={(e) => { setMfaCode(e.target.value); validateMfaCode(e.target.value); }}
                     onBlur={(e) => validateMfaCode(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border ${mfaCodeError ? 'border-red-500' : 'border-gray-300 focus:ring-[var(--primary-blue)] focus:border-[var(--primary-blue)]'}`}
                    placeholder="123456"
                    ref={mfaInputRef}
                  />
                  {mfaCodeError && <p className="mt-1 text-sm text-red-600">{mfaCodeError}</p>}
                </div>

                {/* Recovery Codes (Simulated) */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">{t('auth.mfa.recoveryCodes')}</h3>
                  <p className="text-gray-600 mb-4">{t('auth.mfa.recoveryCodesDescription')}</p>
                  {recoveryCodes.length === 0 ? (
                    <button
                      type="button"
                      onClick={async () => {
                         setIsLoading(true);
                         await new Promise(resolve => setTimeout(resolve, 1000));
                         setRecoveryCodes([
                           'CODE-A-123', 'CODE-B-456', 'CODE-C-789', 'CODE-D-012',
                           'CODE-E-345', 'CODE-F-678', 'CODE-G-901', 'CODE-H-234'
                         ]);
                         setIsLoading(false);
                      }}
                       disabled={isLoading}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? t('common.loading') : t('auth.mfa.generateRecoveryCodes')}
                    </button>
                  ) : (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.545-1.36 3.31 0l3.498 6.298c.766 1.36 0 3.03-1.659 3.03H6.516c-1.66 0-2.424-1.67-1.659-3.03l3.498-6.298zM10 13a1 1 0 110 2 1 1 0 010-2zm1-7a1 1 0 10-2 0v3a1 1 0 102 0V6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-yellow-700">
                            {t('auth.mfa.recoveryCodesWarning')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <ul className="list-disc list-inside font-mono text-gray-700 bg-gray-100 p-4 rounded-md">
                    {recoveryCodes.map((code, index) => (
                      <li key={index}>{code}</li>
                    ))}
                  </ul>
                  {recoveryCodes.length > 0 && (
                    <div className="mt-4 flex items-center">
                       <input
                        id="downloadedRecoveryCodes"
                        name="downloadedRecoveryCodes"
                        type="checkbox"
                        checked={downloadedRecoveryCodes}
                        onChange={(e) => setDownloadedRecoveryCodes(e.target.checked)}
                        className="h-4 w-4 text-[var(--primary-blue)] border-gray-300 rounded focus:ring-[var(--primary-blue)]"
                      />
                      <label htmlFor="downloadedRecoveryCodes" className="ml-2 block text-sm text-gray-900">
                        {t('auth.label.downloadedRecoveryCodes')} <span className="text-red-500">*</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )}
             {error && <p className="mt-4 text-sm text-red-600 text-center">{error}</p>}
          </>
        );
      case 6: // Email Verification / Success
         if (verificationSuccess) {
           return (
            <div className="text-center py-10">
               <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               <h2 className="mt-4 text-2xl font-bold text-gray-900">{t('auth.verification.verifiedTitle')}</h2>
               <p className="mt-2 text-gray-600">{t('auth.verification.verifiedMessage')}</p>
               {successMessage && <p className="mt-4 text-sm text-green-600">{successMessage}</p>}
            </div>
           );
         }

        return (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-gray-900">{t('auth.verification.title')}</h2>
            <p className="mt-2 text-gray-600">
              {t('auth.verification.message', { email: verificationEmail })}
            </p>
            {verificationSent && successMessage && <p className="mt-4 text-sm text-green-600">{successMessage}</p>}
             {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            <div className="mt-6">
              <button
                type="button"
                onClick={requestNewVerificationEmail}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[var(--primary-blue)] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-blue)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                 {isLoading ? t('common.sending') : t('auth.action.resendVerificationEmail')}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <Suspense fallback={<LoadingPage />}>
      <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'} transition-all duration-300`}>
        {isLoading && !isVerificationMode && <LoadingPage />} {/* Show loading only for form steps, not verification */}
        <header className="site-header">
          <div className="container">
            <div className="header-content">
              <div className="logo">
                <Link to="/">
                  <img src={SunnyLogo} alt={t('common.brandName')} height="40" />
                  <span>{t('common.brandName')}</span>
                </Link>
              </div>
              <div className="flex items-center space-x-6">
                {/* Language Switcher */}
                <div className="language-switcher relative" ref={langMenuRef}>
                  <button onClick={() => setShowLangMenu(!showLangMenu)} className="flex items-center text-gray-600 hover:text-gray-900 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 14l7-7m0 0l7 7m-7-7v10m0 0h7M3 14h.01M17 14h.01" />
                    </svg>
                    {languages.find(lang => lang.code === i18n.language)?.name || 'Language'}
                    <svg className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${showLangMenu ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  {showLangMenu && (
                    <div className="language-menu absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`block w-full text-left px-4 py-2 text-sm ${i18n.language === lang.code ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            {!isVerificationMode && (
              <div>
                 <img className="mx-auto h-12 w-auto" src={SunnyLogo} alt={t('common.brandName')} />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  {t('auth.signup.title')}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  {t('auth.signup.subtitle')}
                </p>
                {/* Progress Bar */}
                <div className="mt-8 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                   <div className="bg-[var(--primary-blue)] h-2.5 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
                </div>
                 <p className="mt-2 text-center text-sm text-gray-600">{t('auth.signup.stepIndicator', { currentStep, totalSteps: accountType === 'individual' ? totalSteps - 1 : totalSteps})}</p>
              </div>
            )}


            <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
               <input type="hidden" name="csrf_token" value={csrfToken} />

              {renderStep(currentStep)}

              {currentStep <= (accountType === 'individual' ? totalSteps - 1 : totalSteps) && currentStep !== 6 && (
                <div className="flex justify-between mt-6">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={goToPreviousStep}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {t('common.previous')}
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading || (currentStep === 5 && setupMFA && !downloadedRecoveryCodes)}
                    className={`ml-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[var(--primary-blue)] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-blue)] disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoading ? t('common.loading') : (currentStep === 5 ? t('auth.signup.complete') : t('common.next'))}
                  </button>
                </div>
              )}

              {/* Terms and Privacy checkboxes for the final step before submission */}
               {((currentStep === 5 && accountType === 'individual') || (currentStep === 5 && accountType === 'business')) && (
                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="flex items-center">
                    <input
                      id="acceptedTerms"
                      name="acceptedTerms"
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => { setAcceptedTerms(e.target.checked); validateTermsAcceptance(); }}
                      className={`h-4 w-4 text-[var(--primary-blue)] rounded focus:ring-[var(--primary-blue)] ${acceptedTermsError ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    <label htmlFor="acceptedTerms" className="ml-2 block text-sm text-gray-900">
                      {t('auth.label.acceptTerms')} <span className="text-red-500">*</span>
                    </label>
                  </div>
                   {acceptedTermsError && <p className="mt-1 text-sm text-red-600">{acceptedTermsError}</p>}

                  <div className="flex items-center">
                    <input
                      id="acceptedPrivacy"
                      name="acceptedPrivacy"
                      type="checkbox"
                      checked={acceptedPrivacy}
                      onChange={(e) => { setAcceptedPrivacy(e.target.checked); validateTermsAcceptance(); }}
                       className={`h-4 w-4 text-[var(--primary-blue)] rounded focus:ring-[var(--primary-blue)] ${acceptedPrivacyError ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    <label htmlFor="acceptedPrivacy" className="ml-2 block text-sm text-gray-900">
                      {t('auth.label.acceptPrivacy')} <span className="text-red-500">*</span>
                    </label>
                  </div>
                  {acceptedPrivacyError && <p className="mt-1 text-sm text-red-600">{acceptedPrivacyError}</p>}

                   <div className="flex items-center mt-4">
                    <input
                      id="acceptMarketing"
                      name="acceptMarketing"
                      type="checkbox"
                      checked={acceptMarketing}
                      onChange={(e) => setAcceptMarketing(e.target.checked)}
                      className="h-4 w-4 text-[var(--primary-blue)] border-gray-300 rounded focus:ring-[var(--primary-blue)]"
                    />
                    <label htmlFor="acceptMarketing" className="ml-2 block text-sm text-gray-900">
                      {t('auth.label.acceptMarketing')}
                    </label>
                  </div>
                </div>
               )}

              {/* Error Message */}
              {error && !isVerificationMode && <div className="text-red-600 text-sm text-center">{error}</div>}
              {successMessage && !isVerificationMode && !verificationSuccess && <div className="text-green-600 text-sm text-center">{successMessage}</div>}


              {!isVerificationMode && currentStep !== 6 && (
                 <div className="text-center mt-6">
                  <p className="text-sm text-gray-600">
                    {t('auth.alreadyHaveAccount')}{' '}
                    <Link to="/login" className="font-medium text-[var(--primary-blue)] hover:text-blue-700">
                      {t('auth.loginNow')}
                    </Link>
                  </p>
                </div>
              )}

            </form>
          </div>
        </main>

        <footer className="site-footer">
          <div className="container text-center text-sm text-gray-600 py-4">
            © {new Date().getFullYear()} {t('common.brandName')}. {t('common.allRightsReserved')}.
          </div>
        </footer>
      </div>
    </Suspense>
  );
};

export default SignupPage;