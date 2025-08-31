import React, { useState, useEffect, Suspense } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import Navigation from '../common/Navigation';
import { useTranslation } from 'react-i18next';
import '../../i18n/config';
import './HomePage.css';
// eslint-disable-next-line no-unused-vars
import SunnyLogo from '../../assets/images/sunny-logo.svg';

// Add global styles for RTL support
import './rtl.css';

// Loading placeholder component
const LoadingPage = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-blue)]"></div>
  </div>
);

// Stripe-like animated gradient background
const AnimatedGradient = () => (
  <div className="gradient-bg">
    <div className="gradient-circle gradient-circle-1"></div>
    <div className="gradient-circle gradient-circle-2"></div>
    <div className="gradient-circle gradient-circle-3"></div>
  </div>
);

// Stripe-like code snippet component
const CodeSnippet = () => (
  <div className="code-snippet">
    <div className="code-header">
      <div className="code-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span className="code-label">Integration Example</span>
    </div>
    <pre className="code-content">
      <code>{`import { SunnyPayments } from '@sunny/payments';

const payment = await sunny.payments.create({
  amount: 2000,
  currency: 'usd',
  payment_method: 'card',
  confirm: true,
});`}</code>
    </pre>
  </div>
);

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(i18n.dir() === 'rtl');
  const [isLoading] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll for header visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHeaderVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Update RTL state when language changes
  useEffect(() => {
    setIsRTL(i18n.dir() === 'rtl');
    // Update HTML lang attribute
    document.documentElement.lang = i18n.language;
  }, [i18n.language, i18n]);


  return (
    <Suspense fallback={<LoadingPage />}>
      {isLoading ? <LoadingPage /> : (
        <div className={`min-h-screen homepage ${isRTL ? 'rtl' : 'ltr'} transition-all duration-300`}>
          <AnimatedGradient />
          
          {/* Header / Navigation */}
          <header className={`site-header ${!isHeaderVisible ? 'header-hidden' : ''}`}>
            <div className="container">
              <div className="header-content">
                <div className="main-nav">
                  <Link to="/" className="logo">
                    <img src={SunnyLogo} alt="Sunny Payments" className="sunny-logo" />
                    <span>Sunny</span>
                  </Link>
                  <Navigation />
                  <Link to="/pricing">{t('common.pricing', 'Pricing')}</Link>
                </div>                  <div className="nav-buttons">
                    <Link to="/login" className="btn btn-text">{t('common.signIn', 'Sign in')}</Link>
                    <Link to="/contact" className="btn btn-primary">{t('common.contact', 'Contact Sales')}</Link>
                  </div>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="hero">
            <div className="container">
              <div className="hero-content">
                <div className="hero-text">
                  <h1>
                    <span className="gradient-text">{t('homePage.hero.title1', 'Next Generation')}</span>
                    <br />
                    {t('homePage.hero.title2', 'Payment Platform')}
                  </h1>
                  <p className="hero-description">{t('homePage.hero.description', 'Send, receive, and manage payments seamlessly across global markets with a single integration.')}</p>
                  <div className="hero-actions">
                    <Link to="/signup" className="btn btn-primary btn-large">
                      {t('common.getStarted', 'Get Started')}
                      <svg className="ml-2" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                    <Link to="/contact" className="btn btn-outline btn-large">{t('common.contact', 'Contact Sales')}</Link>
                  </div>
                  <div className="hero-stats">
                    <div className="stat">
                      <div className="stat-value">150+</div>
                      <div className="stat-label">{t('homePage.stats.countries', 'Countries')}</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value">99.9%</div>
                      <div className="stat-label">{t('homePage.stats.uptime', 'Uptime')}</div>
                    </div>
                    <div className="stat">
                      <div className="stat-value">10M+</div>
                      <div className="stat-label">{t('homePage.stats.transactions', 'Transactions')}</div>
                    </div>
                  </div>
                </div>
                <div className="hero-visual">
                  <div className="code-demo">
                    <CodeSnippet />
                    <div className="payment-cards">
                      <div className="payment-card">
                        <div className="card-header">
                          <div className="card-chip"></div>
                          <div className="card-brand"></div>
                        </div>
                        <div className="card-number">**** **** **** 4242</div>
                        <div className="card-footer">
                          <div className="card-holder">JOHN DOE</div>
                          <div className="card-expires">04/25</div>
                        </div>
                      </div>
                      <div className="payment-card card-alt">
                        <div className="card-header">
                          <div className="card-chip"></div>
                          <div className="card-brand"></div>
                        </div>
                        <div className="card-number">**** **** **** 5555</div>
                        <div className="card-footer">
                          <div className="card-holder">JANE SMITH</div>
                          <div className="card-expires">08/27</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="features">
            <div className="container">
              <div className="section-header">
                <h2>{t('homePage.features.title', 'Built for Modern Businesses')}</h2>
                <p>{t('homePage.features.description', 'Everything you need to accept payments and grow your business globally.')}</p>
              </div>
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                  </div>
                  <h3>{t('homePage.features.payments.title', 'Smart Payments')}</h3>
                  <p>{t('homePage.features.payments.description', 'Accept payments in 150+ currencies with smart routing and automatic optimization.')}</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18.5v.5m-4 2h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 4h4M9 15.5c0-1.657 1.343-3 3-3s3 1.343 3 3" strokeDasharray="1 3"/>
                    </svg>
                  </div>
                  <h3>{t('homePage.features.mobilePayments.title', 'Mobile Payments')}</h3>
                  <p>{t('homePage.features.mobilePayments.description', 'Integrate with popular mobile money providers across Africa, Asia, and beyond to reach billions of customers.')}</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <h3>{t('homePage.features.cryptoPayments.title', 'Crypto Payments')}</h3>
                  <p>{t('homePage.features.cryptoPayments.description', 'Accept cryptocurrency payments with instant conversion to fiat currencies and same-day settlements.')}</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M3 10h18M4 10h16v11H4zM12 3L3 7l9 4 9-4z"/>
                      <path strokeLinecap="round" strokeWidth={1.5} d="M7 14h10M7 17h6" strokeDasharray="1 3"/>
                    </svg>
                  </div>
                  <h3>{t('homePage.features.bankTransfers.title', 'Bank Transfers')}</h3>
                  <p>{t('homePage.features.bankTransfers.description', 'Direct bank transfers with instant notifications.')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Solutions Section */}
          <section className="solutions">
            <div className="container">
              <div className="section-header">
                <h2>{t('homePage.solutions.title', 'Solutions for Every Business')}</h2>
                <p>{t('homePage.solutions.subtitle', 'Whether you\'re a startup or an enterprise, our payment solutions can be tailored to meet your specific needs.')}</p>
              </div>
              <div className="solutions-grid">
                <div className="solution-card">
                  <h3>{t('homePage.solutions.ecommerce.title', 'E-commerce')}</h3>
                  <p>{t('homePage.solutions.ecommerce.description', 'Optimize your online store with our seamless checkout experiences, fraud protection, and global payment methods.')}</p>
                  <Link to="/solutions" className="learn-more">
                    {t('common.learnMore', 'Learn More')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
                <div className="solution-card">
                  <h3>{t('homePage.solutions.marketplaces.title', 'Marketplaces')}</h3>
                  <p>{t('homePage.solutions.marketplaces.description', 'Manage complex payment flows between buyers and sellers with our powerful marketplace solutions.')}</p>
                  <Link to="/solutions" className="learn-more">
                    {t('common.learnMore', 'Learn More')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
                <div className="solution-card">
                  <h3>{t('homePage.solutions.saas.title', 'SaaS')}</h3>
                  <p>{t('homePage.solutions.saas.description', 'Streamline recurring billing with flexible subscription management tools and global payment processing.')}</p>
                  <Link to="/solutions" className="learn-more">
                    {t('common.learnMore', 'Learn More')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="testimonials">
            <div className="container">
              <div className="section-header">
                <h2>{t('homePage.stats.title', 'Trusted by businesses worldwide')}</h2>
                <p>{t('homePage.stats.subtitle', 'Join thousands of businesses already using our platform')}</p>
              </div>
              <div className="testimonial">
                <div className="testimonial-content">
                  "{t('homePage.testimonial.quote', 'Sunny Payments has transformed our global expansion. Their flexible payment options and robust API have increased our conversion rates by 35% across new markets.')}"
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar"></div>
                  <div className="author-info">
                    <h4>Sarah Johnson</h4>
                    <p>CTO, GlobalTech Solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <div className="container">
              <div className="cta-content">
                <h2>{t('homePage.cta.title', 'Ready to get started?')}</h2>
                <p>{t('homePage.cta.subtitle', 'Create your account today.')}</p>
                <div className="cta-buttons">
                  <Link to="/signup" className="btn btn-primary btn-large">{t('common.getStarted', 'Get Started')}</Link>
                  <Link to="/contact" className="btn btn-outline btn-large">{t('common.contact', 'Contact')}</Link>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="site-footer">
            <div className="container">
              <div className="footer-grid">
                <div className="footer-brand">
                  <div className="logo">
                    <img src={SunnyLogo} alt="Sunny Payments" className="sunny-logo footer-logo"/>
                    <span>Sunny</span>
                  </div>
                  <p>{t('footerTagline', 'Empowering businesses worldwide with seamless payment solutions')}</p>
                </div>
                <div className="footer-links">
                  <div className="footer-links-column">
                    <h4>{t('product')}</h4>
                    <ul>
                      <li><Link to="/features">{t('features')}</Link></li>
                      <li><Link to="/solutions">{t('solutions')}</Link></li>
                      <li><Link to="/integrations">{t('integrations')}</Link></li>
                      <li><Link to="/enterprise">{t('enterprise')}</Link></li>
                    </ul>
                  </div>
                  <div className="footer-links-column">
                    <h4>{t('developers')}</h4>
                    <ul>
                      <li><Link to="/developers/docs">{t('documentation')}</Link></li>
                      <li><Link to="/developers/api">{t('apiReference')}</Link></li>
                      <li><Link to="/developers/sdks">{t('sdkGuides')}</Link></li>
                      <li><Link to="/support">{t('support')}</Link></li>
                    </ul>
                  </div>
                  <div className="footer-links-column">
                    <h4>{t('company')}</h4>
                    <ul>
                      <li><Link to="/about">{t('aboutUs')}</Link></li>
                      <li><Link to="/why-sunny">{t('whyChooseUs')}</Link></li>
                      <li><Link to="/careers">{t('careers')}</Link></li>
                      <li><Link to="/blog">{t('blog')}</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                <div className="footer-legal">
                  <p>© {new Date().getFullYear()} Sunny Payments</p>
                  <div className="footer-legal-links">
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms of Service</Link>
                  </div>
                </div>
                <div className="footer-social">
                  <a href="https://twitter.com/sunnypayments" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </a>
                  <a href="https://linkedin.com/company/sunny-payments" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="https://github.com/sunny-payments" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </Suspense>
  );
};

export default HomePage;
