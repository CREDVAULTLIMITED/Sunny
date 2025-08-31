import React from 'react';
import PageTemplate from '../../components/common/PageTemplate';
import { SupportIcon } from '../../components/icons/MenuIcons';
import '../../styles/pages/resources.css';

const CustomersPage = () => (
  <PageTemplate>
    <div className="page-container fade-in customers-bg">
      <div className="icon-title-row">
        <SupportIcon className="stripe-style-icon" />
        <h1 className="page-title">Customer Stories</h1>
      </div>
      <section className="resources-hero">
        <div className="container">
          <p>See how businesses around the world are growing with Sunny Payments</p>
          <div className="hero-cta">
            <a href="#featured" className="btn-hero-primary">View success stories</a>
            <a href="#contact" className="btn-hero-secondary">Become a case study</a>
          </div>
        </div>
      </section>

      <div className="container">
        <section id="featured" className="customer-stories-section">
          <h2>Featured Customer</h2>
          <div className="customer-story">
            <div className="customer-content">
              <div className="customer-logo"></div>
              <h3>GlobalTech Solutions</h3>
              <p className="customer-quote">"Sunny Payments has transformed our global expansion. Their flexible payment options and robust API have increased our conversion rates by 35% across new markets."</p>
              <div className="customer-meta">
                <span className="customer-name">Sarah Johnson</span>
                <span className="customer-title">CTO, GlobalTech Solutions</span>
              </div>
              <div className="customer-results">
                <div className="result-item">
                  <div className="result-value">35%</div>
                  <div className="result-label">Increase in conversion</div>
                </div>
                <div className="result-item">
                  <div className="result-value">15</div>
                  <div className="result-label">New markets entered</div>
                </div>
                <div className="result-item">
                  <div className="result-value">50%</div>
                  <div className="result-label">Reduction in fraud</div>
                </div>
              </div>
              <button onClick={() => window.location.href='/customers/globaltech'} className="btn btn-primary">Read Full Story</button>
            </div>
            <div className="customer-image" style={{backgroundImage: 'url(https://via.placeholder.com/600x400)'}}></div>
          </div>
        </section>

        <section className="customer-stories-grid">
          <div className="filter-bar">
            <button className="filter-btn active">All Industries</button>
            <button className="filter-btn">E-commerce</button>
            <button className="filter-btn">SaaS</button>
            <button className="filter-btn">Marketplaces</button>
            <button className="filter-btn">Enterprise</button>
          </div>
          
          <div className="articles-grid">
            <div className="article-card">
              <div className="article-card-image" style={{backgroundImage: 'url(https://via.placeholder.com/400x200)'}}></div>
              <div className="article-card-content">
                <span className="article-category">E-commerce</span>
                <h3>Fashion Forward</h3>
                <p>Leading online fashion retailer expanded to 20 new countries in 6 months with Sunny's global payment infrastructure.</p>
                <div className="article-meta">
                  <span className="article-date">Results: 45% increase in international sales</span>
                </div>
                <button onClick={() => window.location.href='/customers/fashion-forward'} className="read-more">
                  Read story
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M14 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="article-card">
              <div className="article-card-image" style={{backgroundImage: 'url(https://via.placeholder.com/400x200)'}}></div>
              <div className="article-card-content">
                <span className="article-category">SaaS</span>
                <h3>SaaS Central</h3>
                <p>Subscription management platform reduced churn by 25% with smart dunning and flexible payment options.</p>
                <div className="article-meta">
                  <span className="article-date">Results: $1.2M in recovered revenue</span>
                </div>
                <button onClick={() => window.location.href='/customers/saas-central'} className="read-more">
                  Read story
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M14 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="article-card">
              <div className="article-card-image" style={{backgroundImage: 'url(https://via.placeholder.com/400x200)'}}></div>
              <div className="article-card-content">
                <span className="article-category">Marketplaces</span>
                <h3>Market Connect</h3>
                <p>Global marketplace simplified seller onboarding across 15 countries with Sunny's Connect platform.</p>
                <div className="article-meta">
                  <span className="article-date">Results: 3x faster seller onboarding</span>
                </div>
                <button onClick={() => window.location.href='/customers/market-connect'} className="read-more">
                  Read story
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M14 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="article-card">
              <div className="article-card-image" style={{backgroundImage: 'url(https://via.placeholder.com/400x200)'}}></div>
              <div className="article-card-content">
                <span className="article-category">Enterprise</span>
                <h3>Enterprise Solutions</h3>
                <p>Fortune 500 company consolidated global payment operations and reduced processing costs by 30%.</p>
                <div className="article-meta">
                  <span className="article-date">Results: $5M annual savings</span>
                </div>
                <button onClick={() => window.location.href='/customers/enterprise-solutions'} className="read-more">
                  Read story
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M14 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="article-card">
              <div className="article-card-image" style={{backgroundImage: 'url(https://via.placeholder.com/400x200)'}}></div>
              <div className="article-card-content">
                <span className="article-category">E-commerce</span>
                <h3>Gadget World</h3>
                <p>Electronics retailer implemented Sunny Checkout and saw immediate improvements in conversion rates.</p>
                <div className="article-meta">
                  <span className="article-date">Results: 22% checkout conversion increase</span>
                </div>
                <button onClick={() => window.location.href='/customers/gadget-world'} className="read-more">
                  Read story
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M14 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="article-card">
              <div className="article-card-image" style={{backgroundImage: 'url(https://via.placeholder.com/400x200)'}}></div>
              <div className="article-card-content">
                <span className="article-category">SaaS</span>
                <h3>CloudTools</h3>
                <p>B2B software provider expanded globally with multi-currency support and localized payment methods.</p>
                <div className="article-meta">
                  <span className="article-date">Results: 40% growth in international customers</span>
                </div>
                <button onClick={() => window.location.href='/customers/cloudtools'} className="read-more">
                  Read story
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M14 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="pagination">
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <button className="pagination-btn">
              Next
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </section>
      </div>
      
      <section className="stats-section">
        <div className="container">
          <h2>The Impact of Sunny Payments</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">$70B+</div>
              <div className="stat-label">Processed annually</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">150+</div>
              <div className="stat-label">Countries supported</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">25%</div>
              <div className="stat-label">Average conversion increase</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">10,000+</div>
              <div className="stat-label">Businesses powered</div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="contact" className="contact-form-section">
        <div className="container">
          <h2>Share Your Success Story</h2>
          <p>We'd love to hear how Sunny Payments has helped your business grow</p>
          <div className="contact-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label>Company</label>
              <input type="text" className="form-control" placeholder="Your company name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label>How has Sunny Payments helped your business?</label>
              <textarea className="form-textarea" placeholder="Tell us your story"></textarea>
            </div>
            <div className="form-check">
              <input type="checkbox" id="permission" />
              <label htmlFor="permission">I give permission for Sunny Payments to feature my story</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit Your Story</button>
          </div>
        </div>
      </section>
    </div>
  </PageTemplate>
);

export default CustomersPage;