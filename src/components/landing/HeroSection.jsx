import React from 'react';
import checkoutFlowImage from '../../ui/assets/images/checkout-illustration.svg';
import './hero-section.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="bg-pattern"></div>
        <div className="bg-glow"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Global payments infrastructure for the internet</h1>
            <p className="hero-subtitle">Millions of businesses of all sizes use Sunny's software and APIs to accept payments, send payouts, and manage their businesses online.</p>
            
            <div className="hero-buttons">
              <a href="/dashboard" className="btn btn-primary">Try Dashboard Demo</a>
              <a href="/contact" className="btn btn-secondary">Contact Sales</a>
            </div>
          </div>
          <div className="hero-image">
            <img src={checkoutFlowImage} alt="Sunny Checkout Flow" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;