import React, { useState } from 'react';
import '../styles/pages/pricing.css';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [volume, setVolume] = useState(10000);
  const [avgTransaction, setAvgTransaction] = useState(75);
  const [paymentMethods, setPaymentMethods] = useState({
    cards: true,
    bankTransfers: false,
    digitalWallets: false
  });

  // Calculate estimated fees
  const calculateFees = () => {
    const transactions = volume / avgTransaction;
    let rate = 0.029; // 2.9%
    let flatFee = 0.30; // 30¢
    
    if (paymentMethods.bankTransfers) {
      rate -= 0.005; // Lower rate for bank transfers
    }
    
    if (billingCycle === 'annually') {
      rate -= 0.002; // Discount for annual billing
    }
    
    // Volume discount
    if (volume > 50000) {
      rate -= 0.003;
    } else if (volume > 20000) {
      rate -= 0.001;
    }
    
    const totalFee = (volume * rate) + (transactions * flatFee);
    const effectiveRate = (totalFee / volume) * 100;
    
    return {
      totalFee: totalFee.toFixed(2),
      effectiveRate: effectiveRate.toFixed(1)
    };
  };

  const fees = calculateFees();

  return (
    <div className="page-container">
      <section className="pricing-hero">
        <div className="container">
          <h1>Simple, Transparent Pricing</h1>
          <p>No hidden fees. Pay only for what you use.</p>
        </div>
      </section>

      <div className="container">
        <div className="pricing-toggle">
          <span className={`toggle-label ${billingCycle === 'monthly' ? 'active' : ''}`}>
            Monthly
          </span>
          <div 
            className={`toggle-switch ${billingCycle}`}
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly')}
          >
            <div className="toggle-knob"></div>
          </div>
          <span className={`toggle-label ${billingCycle === 'annually' ? 'active' : ''}`}>
            Annually
            <span className="toggle-discount">Save 20%</span>
          </span>
        </div>

        <div className="pricing-table">
          <div className="pricing-column">
            <div className="pricing-header">
              <h3>Standard</h3>
              <p className="pricing-description">For small businesses and startups</p>
              <div className="pricing-rate">
                <span className="rate">2.9%</span>
                <span className="plus">+</span>
                <span className="flat-fee">30¢</span>
              </div>
              <p className="per-transaction">per successful card charge</p>
            </div>
            <div className="pricing-features">
              <ul>
                <li>Accept all major credit cards</li>
                <li>24/7 email support</li>
                <li>Fraud prevention</li>
                <li>Dashboard access</li>
                <li>Basic reporting</li>
              </ul>
            </div>
            <div className="pricing-cta">
              <a href="/signup" className="btn btn-outline">Get Started</a>
            </div>
          </div>
          
          <div className="pricing-column featured">
            <div className="pricing-header">
              <h3>Plus</h3>
              <p className="pricing-description">For growing businesses</p>
              <div className="pricing-rate">
                <span className="rate">2.5%</span>
                <span className="plus">+</span>
                <span className="flat-fee">25¢</span>
              </div>
              <p className="per-transaction">per successful card charge</p>
            </div>
            <div className="pricing-features">
              <ul>
                <li>All Standard features</li>
                <li>Priority support</li>
                <li>Advanced fraud protection</li>
                <li>Subscription management</li>
                <li>Multi-currency support</li>
                <li>Custom reports</li>
              </ul>
            </div>
            <div className="pricing-cta">
              <a href="/signup" className="btn btn-primary">Get Started</a>
            </div>
          </div>
          
          <div className="pricing-column">
            <div className="pricing-header">
              <h3>Enterprise</h3>
              <p className="pricing-description">For large businesses</p>
              <div className="pricing-rate">
                <span className="custom-pricing">Custom Pricing</span>
              </div>
              <p className="per-transaction">based on volume</p>
            </div>
            <div className="pricing-features">
              <ul>
                <li>All Plus features</li>
                <li>Dedicated account manager</li>
                <li>Custom integration support</li>
                <li>Service level agreement</li>
                <li>Volume discounts</li>
                <li>Enterprise reporting</li>
              </ul>
            </div>
            <div className="pricing-cta">
              <a href="/contact" className="btn btn-outline">Contact Sales</a>
            </div>
          </div>
        </div>
      </div>
      
      <section className="calculator-section">
        <div className="container">
          <h2>Pricing Calculator</h2>
          <p>Estimate your monthly fees based on your business needs</p>
          
          <div className="calculator">
            <div className="calculator-inputs">
              <div className="input-group">
                <label>Monthly transaction volume</label>
                <input 
                  type="range" 
                  min="1000" 
                  max="100000" 
                  step="1000" 
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                />
                <div className="range-value">${volume.toLocaleString()}</div>
              </div>
              <div className="input-group">
                <label>Average transaction size</label>
                <input 
                  type="range" 
                  min="10" 
                  max="1000" 
                  step="10" 
                  value={avgTransaction}
                  onChange={(e) => setAvgTransaction(parseInt(e.target.value))}
                />
                <div className="range-value">${avgTransaction}</div>
              </div>
              <div className="input-group">
                <label>Payment methods</label>
                <div className="checkbox-group">
                  <label>
                    <input 
                      type="checkbox" 
                      checked={paymentMethods.cards} 
                      onChange={() => setPaymentMethods({...paymentMethods, cards: !paymentMethods.cards})}
                    />
                    Credit Cards
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      checked={paymentMethods.bankTransfers} 
                      onChange={() => setPaymentMethods({...paymentMethods, bankTransfers: !paymentMethods.bankTransfers})}
                    />
                    Bank Transfers
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      checked={paymentMethods.digitalWallets} 
                      onChange={() => setPaymentMethods({...paymentMethods, digitalWallets: !paymentMethods.digitalWallets})}
                    />
                    Digital Wallets
                  </label>
                </div>
              </div>
            </div>
            <div className="calculator-results">
              <div className="result-card">
                <h3>Estimated Monthly Fee</h3>
                <div className="result-value">${fees.totalFee}</div>
                <p>Based on your selections</p>
              </div>
              <div className="result-card">
                <h3>Effective Rate</h3>
                <div className="result-value">{fees.effectiveRate}%</div>
                <p>Of total processing volume</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Are there any setup fees?</h3>
              <p>No, there are no setup fees or monthly fees. You only pay when you process a transaction.</p>
            </div>
            <div className="faq-item">
              <h3>Do you offer volume discounts?</h3>
              <p>Yes, businesses processing over $100,000 per month may qualify for volume discounts.</p>
            </div>
            <div className="faq-item">
              <h3>What payment methods are supported?</h3>
              <p>We support all major credit cards, bank transfers, digital wallets, and local payment methods.</p>
            </div>
            <div className="faq-item">
              <h3>How long does it take to get paid?</h3>
              <p>Standard payouts are processed within 2 business days. Express payouts are available for an additional fee.</p>
            </div>
            <div className="faq-item">
              <h3>Is there a minimum contract period?</h3>
              <p>No, there are no long-term contracts or commitments. You can cancel at any time.</p>
            </div>
            <div className="faq-item">
              <h3>Do you charge for failed payments?</h3>
              <p>No, you only pay fees on successful transactions. There are no fees for declined payments.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="enterprise-section">
        <div className="container">
          <h2>Enterprise Pricing</h2>
          <p>Custom pricing and solutions for high-volume businesses</p>
          
          <div className="enterprise-features">
            <div className="enterprise-feature">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Volume-based discounts</span>
            </div>
            <div className="enterprise-feature">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Dedicated account manager</span>
            </div>
            <div className="enterprise-feature">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Custom contracts</span>
            </div>
            <div className="enterprise-feature">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Priority support</span>
            </div>
          </div>
          
          <a href="/contact" className="btn btn-primary">Contact Sales</a>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;