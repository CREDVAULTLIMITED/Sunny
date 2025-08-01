import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Navigation from './Navigation';
import SunnyLogo from '../../assets/images/sunny-logo.svg';
import './PageTemplate.css';

const PageTemplate = ({ title, description, children }) => {
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

  return (
    <div className="page-container">
      <header className={`site-header ${!isHeaderVisible ? 'header-hidden' : ''}`}>
        <div className="container">
          <div className="header-content">
            <div className="main-nav">
              <Link to="/" className="logo">
                <img src={SunnyLogo} alt="Sunny Payments" className="sunny-logo" />
                <span>Sunny</span>
              </Link>
              <Navigation />
            </div>
            <div className="nav-buttons">
              <Link to="/login" className="btn btn-text">Sign in</Link>
              <Link to="/contact" className="btn btn-primary">Contact Sales</Link>
            </div>
          </div>
        </div>
      </header>
      
      <main>
        {title && (
          <div className="hero-section">
            <div className="container">
              <h1>{title}</h1>
              {description && <p className="hero-description">{description}</p>}
            </div>
          </div>
        )}
        <div className="container">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PageTemplate;