import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext.jsx';
import authService from '../../services/authService.js';
import { loggingService } from '../../services/loggingService.js';
import '../../i18n/config';
import './LoginPage.css';
import '../homepage/rtl.css';
import SunnyLogo from '../../assets/images/sunny-logo.svg';

const LoadingPage = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-blue)]"></div>
  </div>
);

const PasswordStrengthMeter = ({ passwordStrength }) => {
  const { t } = useTranslation();
  
  if (!passwordStrength) return null;

  return (
    <div className="password-strength-container">
      <div className="password-strength-label">
        <span>{t('auth.passwordStrength')}:</span>
        <span className={`strength-${passwordStrength.strength}`}>
          {t(`auth.passwordStrength.${passwordStrength.strength}`)}
        </span>
      </div>
      <div className="password-strength-meter">
        <div 
          className={`strength-bar strength-${passwordStrength.strength}`} 
          style={{ width: `${passwordStrength.score * 25}%` }}
        />
      </div>
      {passwordStrength.feedback && passwordStrength.feedback.length > 0 && (
        <ul className="password-feedback">
          {passwordStrength.feedback.map((feedback, index) => (
            <li key={index}>{feedback}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const LoginPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { login: authContextLogin } = useAuth();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // UI states
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isRTL, setIsRTL] = useState(i18n.dir() === 'rtl');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  
  // Validation states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ valid: false, strength: 'weak', score: 0, feedback: [] });

  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitMessage, setRateLimitMessage] = useState('');
  
  // MFA states
  const [showMFA, setShowMFA] = useState(false);
  const [mfaToken, setMfaToken] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [mfaError, setMfaError] = useState('');
  
  // Social login states
  const [socialLoginProcessing, setSocialLoginProcessing] = useState(false);
  
  // Refs
  const langMenuRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const mfaInputRef = useRef(null);
  
  // Focus the email input on initial load
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'zh', name: '中文' },
    { code: 'ar', name: 'العربية' },
  ];

  useEffect(() => {
    setIsRTL(i18n.dir() === 'rtl');
    document.documentElement.lang = i18n.language;
  }, [i18n.language, i18n]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setShowLangMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Validate email format
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
  
  // Validate password
  const validatePassword = (password) => {
    if (!password) {
      setPasswordError(t('auth.validation.passwordRequired'));
      return false;
    } else if (password.length < 8) {
      setPasswordError(t('auth.validation.passwordTooShort'));
      return false;
    }
    setPasswordError('');
    return true;
  };
  
  // Check password strength as user types
  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength({ valid: false, strength: 'weak', score: 0, feedback: [] });
      return;
    }
    
    const strength = authService.validatePasswordStrength(password);
    setPasswordStrength(strength);
  };
  
  // Handle password change
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
    if (passwordError) validatePassword(newPassword);
  };
  
  // Handle email change
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (emailError) validateEmail(newEmail);
  };
  
  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset messages
    setError(null);
    setSuccessMessage(null);
    setMfaError('');
    
    // Validate form
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      loggingService.info('Attempting login', { email });
      
      const result = await authService.login(email, password);
      
      if (result.success) {
        // Check if MFA is required
        if (result.requiresMFA) {
          setMfaToken(result.mfaToken);
          setShowMFA(true);
          setSuccessMessage(result.message);
          
          // Focus on MFA input after render
          setTimeout(() => {
            if (mfaInputRef.current) {
              mfaInputRef.current.focus();
            }
          }, 100);
        } else {
          // Handle successful login without MFA
          loggingService.info('Login successful', { email });
          
          // Store user in auth context and in localStorage for ProtectedRoute
          authContextLogin(result.data.token, result.data.user);
          
          // Also store token directly in localStorage for ProtectedRoute
          localStorage.setItem('sunnyAuthToken', result.data.token);
          
          setSuccessMessage(t('auth.login.loginSuccess'));
          
          // Redirect to dashboard after a short delay to show success message
          setTimeout(() => {
            navigate('/dashboard');
          }, 500);
        }
      } else {
        // Handle rate limiting
        if (result.message && result.message.includes('Too many failed login attempts')) {
          setIsRateLimited(true);
          setRateLimitMessage(result.message);
        }
        
        setError(result.message || t('auth.login.loginFailed'));
        loggingService.error('Login failed', { message: result.message });
      }
    } catch (err) {
      setError(err.message || t('auth.login.unexpectedError'));
      loggingService.error('Login error', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle MFA verification
  const handleVerifyMFA = async (e) => {
    e.preventDefault();
    
    if (!mfaCode || mfaCode.length < 6) {
      setMfaError(t('auth.mfa.invalidCode'));
      return;
    }
    
    setIsLoading(true);
    setMfaError('');
    
    try {
      loggingService.info('Verifying MFA code');
      
      const result = await authService.verifyMFA(mfaToken, mfaCode);
      
      if (result.success) {
        loggingService.info('MFA verification successful');
        
        // Store user in auth context
        authContextLogin(result.data.token, result.data.user);
        
        setSuccessMessage(t('auth.mfa.verificationSuccess'));
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      } else {
        setMfaError(result.message || t('auth.mfa.verificationFailed'));
        loggingService.error('MFA verification failed', { message: result.message });
      }
    } catch (err) {
      setMfaError(err.message || t('auth.mfa.unexpectedError'));
      loggingService.error('MFA verification error', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle social login
  const handleSocialLogin = async (provider) => {
    if (socialLoginProcessing) return;
    
    setSocialLoginProcessing(true);
    setError(null);
    
    try {
      loggingService.info('Initiating social login', { provider });
      
      // In a real implementation, this would redirect to the provider's authentication page
      // or open a popup window. For this example, we'll simulate a successful login
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful login
      const mockResult = {
        success: true,
        data: {
          token: 'mock-social-token-' + Math.random().toString(36).substr(2, 9),
          user: {
            id: 'user_' + Math.random().toString(36).substr(2, 9),
            email: 'social.user@example.com',
            firstName: 'John',
            lastName: 'Doe',
            provider: provider
          }
        }
      };
      
      // Store user in auth context
      authContextLogin(mockResult.data.token, mockResult.data.user);
      
      loggingService.info('Social login successful', { provider });
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || `${t('auth.socialLogin.failed')} ${provider}`);
      loggingService.error('Social login error', { provider, error: err });
    } finally {
      setSocialLoginProcessing(false);
    }
  };

  return (
    <Suspense fallback={<LoadingPage />}>
      <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'} transition-all duration-300`}>
        {isLoading ? <LoadingPage /> : (
          <>
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
                    <div className="relative" ref={langMenuRef}>
                      <button 
                        className="flex items-center text-gray-700 hover:text-[var(--primary-blue)] focus:outline-none" 
                        onClick={() => setShowLangMenu(!showLangMenu)}
                        aria-label="Change language"
                        aria-expanded={showLangMenu}
                      >
                        <svg className={`w-5 h-5 no-flip ${isRTL ? 'ml-1' : 'mr-1'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{i18n.language.toUpperCase()}</span>
                      </button>
                      {showLangMenu && (
                        <div className={`absolute language-menu ${isRTL ? 'left-0' : 'right-0'} mt-2 w-48 bg-white rounded-md shadow-lg z-20`}>
                          <div className="py-1">
                            {languages.map(lang => (
                              <button
                                key={lang.code}
                                className={`w-full ${isRTL ? 'text-right' : 'text-left'} px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${i18n.language === lang.code ? 'font-bold bg-gray-50' : ''}`}
                                onClick={() => changeLanguage(lang.code)}
                              >
                                {lang.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </header>
            
            <div className="auth-container">
              <div className="auth-card">
                <div className="auth-content">
                  <div className="auth-form-header">
                    <h1>{t('auth.login.welcome')}</h1>
                    <p>{t('auth.login.subtitle')}</p>
                  </div>
                  
                  {/* Success and Error Messages */}
                  {successMessage && (
                    <div className="form-success" role="alert">
                      <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                      </svg>
                      <span>{successMessage}</span>
                    </div>
                  )}
                  
                  {error && (
                    <div className="form-error" role="alert">
                      <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586l-1.293-1.293z" />
                      </svg>
                      <span>{error}</span>
                    </div>
                  )}
                  
                  {/* Rate Limiting Warning */}
                  {isRateLimited && (
                    <div className="form-warning" role="alert">
                      <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" />
                      </svg>
                      <span>{rateLimitMessage}</span>
                    </div>
                  )}
                  
                  {/* MFA Section */}
                  {showMFA ? (
                    <form onSubmit={handleVerifyMFA} className="auth-form">
                      <div className="form-group">
                        <label htmlFor="mfaCode">{t('auth.mfa.enterCode')}</label>
                        <div className={`input-wrapper ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <svg className={`input-icon ${isRTL ? 'ml-2' : 'mr-2'}`} viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M11 17c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm0-14v4h2V5.08c3.39.49 6 3.39 6 6.92 0 3.87-3.13 7-7 7s-7-3.13-7-7c0-1.68.59-3.22 1.58-4.42L12 13l1.41-1.41-6.8-6.8v.02C4.42 6.45 3 9.05 3 12c0 4.97 4.02 9 9 9 4.97 0 9-4.03 9-9s-4.03-9-9-9h-1zm7 9c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1zM6 12c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1z" />
                          </svg>
                          <input
                            type="text"
                            id="mfaCode"
                            name="mfaCode"
                            placeholder={t('auth.mfa.verificationCode')}
                            value={mfaCode}
                            onChange={(e) => setMfaCode(e.target.value)}
                            className={isRTL ? 'text-right' : 'text-left'}
                            autoComplete="one-time-code"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength="6"
                            ref={mfaInputRef}
                            aria-describedby="mfaHelpText"
                            required
                          />
                        </div>
                        <small id="mfaHelpText" className="form-help-text">
                          {t('auth.mfa.codeHelp')}
                        </small>
                        {mfaError && (
                          <div className="field-error">{mfaError}</div>
                        )}
                      </div>
                      
                      <button type="submit" className="auth-button" disabled={isLoading}>
                        {isLoading ? (
                          <span className="loading-spinner" />
                        ) : t('auth.mfa.verify')}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleSubmit} className="auth-form">
                      <div className="form-group">
                        <label htmlFor="email">{t('auth.login.email')}</label>
                        <div className={`input-wrapper ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <svg className={`input-icon ${isRTL ? 'ml-2' : 'mr-2'}`} viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                          </svg>
                          <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder={t('auth.enterEmail')} 
                            autoComplete="email" 
                            required
                            value={email}
                            onChange={handleEmailChange}
                            className={isRTL ? 'text-right' : 'text-left'}
                            ref={emailInputRef}
                            aria-describedby={emailError ? "emailError" : undefined}
                          />
                        </div>
                        {emailError && (
                          <div id="emailError" className="field-error" role="alert">{emailError}</div>
                        )}
                      </div>
                      
                      {/* Password Input Group */}
                      <div className="form-group">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          {t('auth.password')}
                        </label>
                        <div className="mt-1 relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            ref={passwordInputRef}
                            value={password}
                            onChange={handlePasswordChange}
                            className={`appearance-none block w-full px-3 py-2 border ${
                              passwordError ? 'border-red-300' : 'border-gray-300'
                            } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-blue focus:border-primary-blue sm:text-sm`}
                            placeholder={t('auth.enterPassword')}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleSubmit(e);
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                          >
                            {showPassword ? (
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            ) : (
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                        {passwordError && (
                          <div id="passwordError" className="field-error" role="alert">
                            {passwordError}
                          </div>
                        )}
                        {password && <PasswordStrengthMeter passwordStrength={passwordStrength} />}
                      </div>

                      <div className="form-group">
                        <div className="flex justify-between items-center">
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox"
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span className="ml-2">{t('auth.rememberMe')}</span>
                          </label>
                          <Link to="/forgot-password" className="text-primary-600 hover:text-primary-500">
                            {t('auth.forgotPassword')}
                          </Link>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="auth-button"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="loading-spinner" />
                        ) : t('auth.login.signIn')}
                      </button>
                    </form>
                  )}
                  
                  <div className="auth-footer">
                    <p>
                      {t('auth.login.noAccount')}{' '}
                      <Link to="/signup" className="text-primary-600 hover:text-primary-500">
                        {t('auth.login.signUp')}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Suspense>
  );
};

export default LoginPage;
