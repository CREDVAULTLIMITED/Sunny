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

const LoginPage = () => {
  const { t, i18n } = useTranslation();
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
  
  const navigate = useNavigate();
  const { login: authContextLogin } = useAuth();
  
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
                    <h1>Welcome back</h1>
                    <p>Log in to your account</p>
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
                          <span className="loading-spinner"></span>
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
                            placeholder="Email address" 
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
                      
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className={`input-wrapper ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <svg className={`input-icon ${isRTL ? 'ml-2' : 'mr-2'}`} viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                          </svg>
                          <input 
                            type={showPassword ? "text" : "password"} 
                            id="password" 
                            name="password" 
                            placeholder={t('auth.login.password')} 
                            autoComplete="current-password" 
                            required
                            value={password}
                            onChange={handlePasswordChange}
                            ref={passwordInputRef}
                            className={isRTL ? 'text-right' : 'text-left'}
                            aria-describedby={passwordError ? "passwordError" : undefined}
                          />
                          <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className={`password-toggle ${isRTL ? 'mr-2' : 'ml-2'}`}
                            aria-label={showPassword ? t('auth.login.hidePassword') : t('auth.login.showPassword')}
                          >
                            {showPassword ? (
                              <svg viewBox="0 0 24 24" width="20" height="20">
                                <path fill="currentColor" d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                              </svg>
                            ) : (
                              <svg viewBox="0 0 24 24" width="20" height="20">
                                <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                              </svg>
                            )}
                          </button>
                        </div>
                        {passwordError && (
                          <div id="passwordError" className="field-error" role="alert">{passwordError}</div>
                        )}
                        
                        {/* Password Strength Meter */}
                        {password.length > 0 && (
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
                                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                              ></div>
                            </div>
                            {passwordStrength.feedback.length > 0 && (
                              <ul className="password-feedback">
                                {passwordStrength.feedback.map((feedback, index) => (
                                  <li key={index}>{t(feedback)}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="form-group remember-forgot-row">
                        <div className={`remember-me ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="form-checkbox"
                          />
                          <label 
                            htmlFor="rememberMe" 
                            className={`text-sm ${isRTL ? 'mr-2' : 'ml-2'}`}
                          >
                            {t('auth.login.rememberMe')}
                          </label>
                        </div>
                        
                        <div className="forgot-password">
                          <Link to="/forgot-password" className="forgot-password-link">
                            {t('auth.login.forgotPassword')}
                          </Link>
                        </div>
                      </div>
                      
                      <button 
                        type="submit" 
                        className="auth-button" 
                        disabled={isLoading}
                        aria-label={t('auth.login.signIn')}
                      >
                        {isLoading ? (
                          <span className="loading-spinner" aria-hidden="true"></span>
                        ) : t('auth.login.signIn')}
                      </button>
                      
                      <div className="social-login-section">
                        <div className="separator">
                          <span>{t('auth.login.orContinueWith')}</span>
                        </div>
                        
                        <div className="social-buttons">
                          <button
                            type="button"
                            onClick={() => handleSocialLogin('google')}
                            className="social-button google"
                            disabled={socialLoginProcessing}
                            aria-label={t('auth.socialLogin.google')}
                          >
                            <svg viewBox="0 0 24 24" width="20" height="20">
                              <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                            </svg>
                            <span>Google</span>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => handleSocialLogin('github')}
                            className="social-button github"
                            disabled={socialLoginProcessing}
                            aria-label={t('auth.socialLogin.github')}
                          >
                            <svg viewBox="0 0 24 24" width="20" height="20">
                              <path fill="currentColor" d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.67-4.57,4.92a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z"/>
                            </svg>
                            <span>GitHub</span>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => handleSocialLogin('apple')}
                            className="social-button apple"
                            disabled={socialLoginProcessing}
                            aria-label={t('auth.socialLogin.apple')}
                          >
                            <svg viewBox="0 0 24 24" width="20" height="20">
                              <path fill="currentColor" d="M17.05,11.97 C17.0246096,10.5718767 17.7061526,9.25334219 18.9,8.46 C18.0554662,7.24288312 16.6892267,6.53245215 15.23,6.5 C13.723,6.329 12.295,7.3625 11.526,7.3625 C10.757,7.3625 9.524,6.5 8.261,6.5305 C6.48220592,6.5876529 4.89125485,7.68134052 4.1745,9.3405 C2.6135,12.7275 3.7305,17.7245 5.237,20.4095 C6.001,21.7095 6.9095,23.1675 8.1095,23.113 C9.2665,23.0585 9.7105,22.351 11.1285,22.351 C12.546,22.351 12.9465,23.113 14.162,23.083 C15.4275,23.053 16.2075,21.773 16.9715,20.4735 C17.549,19.5645 17.9885,18.5765 18.284,17.5415 C16.8291139,16.8483153 15.9241217,15.4087258 15.929,13.82 C15.93175,13.2191095 16.0538906,12.6249531 16.2875,12.076 C16.5211094,11.5270469 16.8607815,11.0371639 17.285,10.635 C17.1642779,11.0745423 17.0780922,11.5232252 17.028,11.977 L17.05,11.97 Z"/>
                              <path fill="currentColor" d="M12.99,6.006 C13.5715187,5.33814546 13.893335,4.47011962 13.9,3.571 C13.0175293,3.61270023 12.1902955,4.00929542 11.594,4.67 C11.0215219,5.30281933 10.6815776,6.1347265 10.6375,7.002 C11.5275895,7.00538662 12.3832404,6.64376131 12.99,6.006 L12.99,6.006 Z"/>
                            </svg>
                            <span>Apple</span>
                          </button>
                        </div>
                      </div>
                      
                      <div className="signup-prompt">
                        <p>
                          {t('auth.login.noAccount')} 
                          <Link to="/register" className="signup-link">
                            {t('auth.login.signUp')}
                          </Link>
                        </p>
                      </div>
                    </form>
                  )}
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
