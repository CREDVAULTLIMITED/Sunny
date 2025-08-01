import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'zh', name: '中文' },
    { code: 'ar', name: 'العربية' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <span className="sunny-logo-placeholder"></span>
              <span>Sunny</span>
            </Link>
          </div>
          
          <div className="header-center">
            <Navigation />
          </div>
          
          <div className="header-buttons">
            <div className="language-selector">
              <button 
                onClick={() => setLangDropdown(!langDropdown)} 
                className="btn btn-text lang-button"
                aria-expanded={langDropdown}
                aria-haspopup="true"
              >
                EN
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {langDropdown && (
                <div className="lang-dropdown">
                  {languages.map(lang => (
                    <button 
                      key={lang.code} 
                      className="lang-option"
                      onClick={() => {
                        // Language change logic would go here
                        setLangDropdown(false);
                      }}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <Link to="/dashboard" className="btn btn-outline">Dashboard</Link>
            <Link to="/contact" className="btn btn-primary">Contact Sales</Link>
            <Link to="/login" className="btn btn-text">Sign in</Link>
          </div>
          
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;