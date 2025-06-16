import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/common/PageTemplate';
import HeliosChat from '../../components/tax/HeliosChat';
import TaxContactForm from '../../components/tax/TaxContactForm';
import LogoCarousel from '../../components/tax/LogoCarousel';
import { countries } from '../../data/countries';
import './TaxPage.css';

const TaxPage = () => {
  const pageTitle = "Tax";
  const pageDescription = "Automate tax compliance from start to finish, so you can focus on scaling your business.";

  const examples = [
    {
      company: 'Togethere',
      product: 'Togethere Pro',
      amount: 20.00,
      currency: 'USD',
      tax: { rate: 10.25, type: 'Sales tax', location: 'Zip code: 99999' }
    },
    {
      company: 'Showflix',
      product: 'Digital subscription',
      amount: 50.00,
      currency: 'EUR',
      tax: { rate: 21, type: 'Spain VAT', location: 'IP address' }
    },
    {
      company: 'Powdur',
      product: 'Pure set',
      amount: 76.00,
      currency: 'USD',
      shipping: 5.00,
      tax: { rate: 7.75, type: 'Sales tax', location: 'Zip code: 94508' }
    }
  ];

  const stats = [
    {
      value: '100+',
      label: 'Countries supported'
    },
    {
      value: '600+',
      label: 'Product types'
    },
    {
      value: '99.999%',
      label: 'System uptime'
    },
    {
      value: '72%',
      label: 'Businesses see compliance as a growth barrier'
    }
  ];

  return (
    <PageTemplate title={pageTitle} description={pageDescription}>
      <div className="tax-page">
        {/* Example Cards Section */}
        <section className="examples-section">
          <div className="container">
            <div className="examples-grid">
              {examples.map((example, index) => (
                <div key={index} className="example-card">
                  <div className="example-header">
                    <span className="example-company">{example.company}</span>
                    <span className="example-amount">
                      {example.currency === 'USD' ? '$' : '€'}{example.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="example-details">
                    <div className="example-detail-row">
                      <span className="detail-label">{example.product}</span>
                      <span className="detail-value">
                        {example.currency === 'USD' ? '$' : '€'}{example.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="example-detail-row">
                      <span className="detail-label">
                        {example.tax.type} ({example.tax.rate}%)
                      </span>
                      <span className="detail-value">
                        {example.currency === 'USD' ? '$' : '€'}
                        {((example.amount * example.tax.rate) / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className="example-detail-row">
                      <span className="detail-label">{example.tax.location}</span>
                    </div>
                    {example.shipping && (
                      <div className="example-detail-row">
                        <span className="detail-label">Shipping</span>
                        <span className="detail-value">
                          {example.currency === 'USD' ? '$' : '€'}{example.shipping.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <div className="section-header">
              <h2>One solution for all your tax needs</h2>
              <p>Save time and reduce risk with automated tax compliance</p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <h3>Streamline tax compliance</h3>
                <p>Manage sales tax, VAT, and GST in one place. Monitor obligations, automate calculations, and simplify filings.</p>
              </div>
              <div className="feature-card">
                <h3>Global coverage</h3>
                <p>Support for 100+ countries and all US states across 600+ product types. Real-time calculations with 99.999% uptime.</p>
              </div>
              <div className="feature-card">
                <h3>Easy integration</h3>
                <p>Get started with one click or one line of code. Seamlessly integrates with your existing payment stack.</p>
              </div>
              <div className="feature-card">
                <h3>Reduce risk</h3>
                <p>Automated compliance monitoring and timely filing reminders help you avoid penalties and interest.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="trusted-by-section">
          <div className="container">
            <div className="section-header">
              <h2>Trusted by industry leaders</h2>
              <p>Join thousands of businesses using Sunny Tax for global compliance</p>
            </div>
            <LogoCarousel />
          </div>
        </section>

        {/* How it Works Section */}
        <section className="how-it-works-section">
          <div className="container">
            <div className="section-header">
              <h2>End-to-end tax compliance solution</h2>
              <p>Four simple steps to automate your tax compliance</p>
            </div>
            <div className="steps-grid">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Integrate in minutes</h3>
                <p>Start collecting taxes globally with a single click or one line of code.</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>Monitor obligations</h3>
                <p>Get alerts when you need to register for tax collection in new regions.</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>Automate collection</h3>
                <p>Calculate and collect the right amount of tax for every transaction.</p>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <h3>Simplify filing</h3>
                <p>Generate detailed reports or let our partners handle your filings.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Countries Section */}
        <section className="countries-section">
          <div className="container">
            <div className="section-header">
              <h2>Global coverage</h2>
              <p>Supporting businesses in over 100 countries and all US states</p>
            </div>
            <div className="countries-grid">
              {countries.map((country) => (
                <div key={country.code} className="country-item">
                  <img
                    src={`https://flagcdn.com/48x36/${country.code.toLowerCase()}.png`}
                    alt={`${country.name} flag`}
                    className="country-flag"
                  />
                  <div className="country-info">
                    <span className="country-name">{country.name}</span>
                    {country.type === 'remote' && (
                      <span className="country-type">Remote sellers only</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div className="container">
            <div className="section-header">
              <h2>Trusted by businesses worldwide</h2>
              <p>See how companies are using Sunny Tax to automate compliance</p>
            </div>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"Sunny Tax helped us expand to 12 new markets in 6 months. The automated compliance monitoring is a game-changer."</p>
                </div>
                <div className="testimonial-author">
                  <img src="/assets/images/testimonials/sarah-chen.jpg" alt="Sarah Chen" className="author-image" />
                  <div className="author-info">
                    <h4>Sarah Chen</h4>
                    <p>CFO, TechGrowth Inc</p>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"We reduced our tax compliance workload by 85% and eliminated manual calculations. Now we're confident in our global tax setup."</p>
                </div>
                <div className="testimonial-author">
                  <img src="/assets/images/testimonials/marcus-torres.jpg" alt="Marcus Torres" className="author-image" />
                  <div className="author-info">
                    <h4>Marcus Torres</h4>
                    <p>Head of Finance, CloudScale</p>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="testimonial-content">
                  <p>"The integration was seamless, and their support team guided us through every step. Our tax filings are now fully automated."</p>
                </div>
                <div className="testimonial-author">
                  <img src="/assets/images/testimonials/emily-zhang.jpg" alt="Emily Zhang" className="author-image" />
                  <div className="author-info">
                    <h4>Emily Zhang</h4>
                    <p>Operations Director, ShopGlobal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Documentation Section */}
        <section className="technical-section">
          <div className="container">
            <div className="section-header">
              <h2>Developer-first approach</h2>
              <p>Built for developers, with comprehensive documentation and easy-to-use APIs</p>
            </div>
            <div className="technical-content">
              <div className="code-preview">
                <div className="code-header">
                  <div className="code-label">Calculate tax with a single API call</div>
                  <div className="code-actions">
                    <button className="code-action" aria-label="Copy code">
                      <svg className="copy-icon" viewBox="0 0 24 24" width="20" height="20">
                        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <pre className="code-block">
{`const sunny = require('@sunny/payments');

const taxCalculation = await sunny.tax.calculate({
  amount: 100.00,
  currency: 'USD',
  customer_location: {
    country: 'US',
    state: 'CA',
    postal_code: '94108'
  },
  product_tax_code: 'txcd_10000000'
});`}
                </pre>
              </div>
              <div className="api-features">
                <div className="api-feature">
                  <h3>Real-time tax calculation</h3>
                  <p>Calculate sales tax, VAT, and GST in milliseconds with our global tax API</p>
                </div>
                <div className="api-feature">
                  <h3>Extensive documentation</h3>
                  <p>Detailed guides, API references, and sample code in multiple languages</p>
                </div>
                <div className="api-feature">
                  <h3>Testing environment</h3>
                  <p>Sandbox environment for testing tax calculations and validating integrations</p>
                </div>
                <div className="api-feature">
                  <h3>Webhook notifications</h3>
                  <p>Real-time updates for tax rate changes and compliance requirements</p>
                </div>
              </div>
            </div>
            <div className="technical-actions">
              <Link to="/developers/docs/tax" className="btn-secondary">View documentation</Link>
              <Link to="/developers/api/tax" className="btn-text">API reference</Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Ready to simplify tax compliance?</h2>
              <p>Join thousands of businesses that trust us for their tax needs.</p>
              <TaxContactForm />
            </div>
          </div>
        </section>

        {/* Helios Chat Integration */}
        <HeliosChat />
      </div>
    </PageTemplate>
  );
};

export default TaxPage;