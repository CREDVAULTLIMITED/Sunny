import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../i18n/config';
import './LandingPage.css';
import SunnyLogo from '../../assets/images/sunny-logo.svg';

// Loading placeholder component
const LoadingPage = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-blue)]"></div>
  </div>
);

const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isRTL, setIsRTL] = useState(i18n.dir() === 'rtl');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('organizations'); // Default active tab
  const langMenuRef = useRef(null);
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'zh', name: '中文' },
    { code: 'ar', name: 'العربية' }
  ];

  // Update RTL state when language changes
  useEffect(() => {
    setIsRTL(i18n.dir() === 'rtl');
    document.documentElement.lang = i18n.language;
  }, [i18n.language, i18n]);

  // Close language menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setShowLangMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langMenuRef]);

  const changeLanguage = async (langCode) => {
    if (langCode === i18n.language) {
      setShowLangMenu(false);
      return;
    }

    // Store scroll position before change
    const scrollPos = window.scrollY;

    setIsLoading(true);
    await i18n.changeLanguage(langCode);

    // Add to localStorage for persistence
    localStorage.setItem('sunnyLanguage', langCode);

    // Add a class for transition effects
    document.body.classList.add('language-transition');

    // Short timeout to allow UI to update smoothly
    setTimeout(() => {
      setIsLoading(false);
      // Restore scroll position
      window.scrollTo(0, scrollPos);
      // Remove transition class
      setTimeout(() => {
        document.body.classList.remove('language-transition');
      }, 500);
    }, 400);

    setShowLangMenu(false);
  };

  // Helper function to get dashboard link based on user type
  const getDashboardLink = (userType) => {
    switch(userType) {
      case 'organizations':
        return '/enterprise-dashboard';
      case 'individuals':
        return '/personal-dashboard';
      case 'sme':
        return '/business-dashboard';
      case 'developers':
        return '/developer-dashboard';
      default:
        return '/dashboard';
    }
  };

  return (
    <Suspense fallback={<LoadingPage />}>
      {isLoading ? <LoadingPage /> : (
        <div className={`min-h-screen landingpage ${isRTL ? 'rtl' : 'ltr'} transition-all duration-300`}>
          {/* Header / Navigation */}
          <header className="site-header">
            <div className="container">
              <div className="header-content">
                <div className="main-nav">
                  <div className="logo">
                    <img src={SunnyLogo} alt="Sunny Payments" className="sunny-logo" />
                    <span>Sunny</span>
                  </div>
                  <nav className="nav-links">
                    <Link to="/">{t('common.home', 'Home')}</Link>
                    <Link to="/solutions">{t('common.solutions', 'Solutions')}</Link>
                    <Link to="/pricing">{t('common.pricing', 'Pricing')}</Link>
                    <Link to="/developers">{t('common.developers', 'Developers')}</Link>
                    <Link to="/about">{t('common.about', 'About')}</Link>
                  </nav>
                </div>
                <div className="nav-buttons">
                  <div className="relative" ref={langMenuRef}>
                    <button 
                      onClick={() => setShowLangMenu(!showLangMenu)} 
                      className="btn btn-text"
                    >
                      {languages.find(lang => lang.code === i18n.language)?.name || 'English'}
                    </button>
                    
                    {showLangMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <div className="py-1">
                          {languages.map((language) => (
                            <button
                              key={language.code}
                              onClick={() => changeLanguage(language.code)}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            >
                              {language.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <Link to="/login" className="btn btn-outline">{t('common.signIn', 'Sign in')}</Link>
                  <Link to="/signup" className="btn btn-primary">{t('common.getStarted', 'Get Started')}</Link>
                </div>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="hero">
            <div className="container">
              <div className="hero-content">
                <div className="hero-text">
                  <h1>Payments for Everyone</h1>
                  <p>Discover the perfect payment solution for your specific needs, whether you're a global enterprise, a small business, an individual, or a developer.</p>
                  <div className="user-type-tabs">
                    <button 
                      className={`tab-button ${activeTab === 'organizations' ? 'active' : ''}`}
                      onClick={() => setActiveTab('organizations')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Organizations
                    </button>
                    <button 
                      className={`tab-button ${activeTab === 'individuals' ? 'active' : ''}`}
                      onClick={() => setActiveTab('individuals')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Individuals
                    </button>
                    <button 
                      className={`tab-button ${activeTab === 'sme' ? 'active' : ''}`}
                      onClick={() => setActiveTab('sme')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Small & Medium Businesses
                    </button>
                    <button 
                      className={`tab-button ${activeTab === 'developers' ? 'active' : ''}`}
                      onClick={() => setActiveTab('developers')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Developers
                    </button>
                  </div>
                </div>
                <div className="hero-visual">
                  <div className="user-type-illustration">
                    {activeTab === 'organizations' && (
                      <div className="enterprise-visual">
                        <div className="visual-element globe"></div>
                        <div className="visual-element chart"></div>
                        <div className="visual-element dashboard"></div>
                      </div>
                    )}
                    {activeTab === 'individuals' && (
                      <div className="individual-visual">
                        <div className="payment-cards">
                          <div className="payment-card">
                            <div className="card-header">
                              <div className="card-logo"></div>
                              <div className="card-chip"></div>
                            </div>
                            <div className="card-number">**** **** **** 4242</div>
                            <div className="card-footer">
                              <div>JOHN DOE</div>
                              <div>04/25</div>
                            </div>
                          </div>
                          <div className="payment-card card-alt">
                            <div className="card-header">
                              <div className="card-logo"></div>
                              <div className="card-chip"></div>
                            </div>
                            <div className="card-number">**** **** **** 5555</div>
                            <div className="card-footer">
                              <div>JANE SMITH</div>
                              <div>08/27</div>
                            </div>
                          </div>
                          <div className="mobile-payment-icon"></div>
                        </div>
                      </div>
                    )}
                    {activeTab === 'sme' && (
                      <div className="sme-visual">
                        <div className="visual-element invoice"></div>
                        <div className="visual-element revenue-chart"></div>
                        <div className="visual-element pos-terminal"></div>
                      </div>
                    )}
                    {activeTab === 'developers' && (
                      <div className="developer-visual">
                        <div className="code-window">
                          <div className="code-header">
                            <span className="red-dot"></span>
                            <span className="yellow-dot"></span>
                            <span className="green-dot"></span>
                          </div>
                          <div className="code-content">
                            <pre>
                              <code className="language-javascript">
                              {`import SunnySDK from 'sunny-payments';

// Initialize the SDK
const sunny = new SunnySDK({
  apiKey: 'your_api_key',
  environment: 'sandbox'
});

// Process a payment
const payment = await sunny.createPayment({
  amount: '100.00',
  currency: 'USD',
  paymentMethod: 'card',
  ...
});`}
                              </code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* User Type Section - Content changes based on active tab */}
          <section className="user-type-section">
            <div className="container">
              {/* Organizations Section */}
              {activeTab === 'organizations' && (
                <div className="user-section-content org-content">
                  <div className="section-header">
                    <h2>Enterprise-Grade Solutions</h2>
                    <p>Optimize global payment operations with our comprehensive enterprise platform</p>
                  </div>
                  
                  <div className="features-grid enterprise-features">
                    <div className="feature-card">
                      <div className="feature-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </div>
                      <h3>Global Operations</h3>
                      <p>Unify payments across 150+ countries with multi-currency support and localized checkout experiences.

