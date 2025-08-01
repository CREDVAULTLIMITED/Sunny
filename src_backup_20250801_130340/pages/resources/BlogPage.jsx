import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/common/PageTemplate';
import { BlogIcon } from '../../components/icons/MenuIcons';
import '../../styles/pages/resources.css';

const BlogPage = () => (
  <PageTemplate>
    <div className="page-container fade-in blog-bg">
      <div className="icon-title-row">
        <BlogIcon className="stripe-style-icon" />
        <h1 className="page-title">Blog</h1>
      </div>
      <section className="resources-hero">
        <div className="container">
          <p>Latest insights, product updates, and industry trends</p>
          <div className="hero-cta">
            <a href="#featured" className="btn-hero-primary">Read latest articles</a>
            <a href="#newsletter" className="btn-hero-secondary">Subscribe to newsletter</a>
          </div>
        </div>
      </section>

      <div className="container">
        <section id="featured" className="featured-article-section">
          <div className="featured-article">
            <div className="article-content">
              <span className="article-category">Product Update</span>
              <h3>Introducing Multi-Currency Accounts</h3>
              <p>Hold and manage multiple currencies in a single account with our new multi-currency feature. Perfect for businesses operating globally or individuals who frequently deal with international transactions.</p>
              <div className="article-meta">
                <span className="article-date">May 15, 2023</span>
                <span className="article-author">By Sarah Johnson</span>
              </div>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link to="/blog/multi-currency-accounts" className="btn btn-primary">Read More</Link>
            </div>
            <div className="article-image" style={{backgroundImage: 'url(https://via.placeholder.com/600x400)'}}></div>
          </div>
        </section>

        <section className="articles-section">
          <div className="filter-bar">
            <button className="filter-btn active">All</button>
            <button className="filter-btn">Product Updates</button>
            <button className="filter-btn">Case Studies</button>
            <button className="filter-btn">Industry Trends</button>
            <button className="filter-btn">Developer Tutorials</button>
          </div>
          
          <div className="articles-grid">
            <div className="article-card">
              <div className="article-card-image" style={{backgroundImage: 'url(https://via.placeholder.com/400x200)'}}></div>
              <div className="article-card-content">
                <span className="article-category">Industry Trends</span>
                <h3>The Future of Cross-Border Payments</h3>
                <p>Exploring how new technologies are reshaping international money transfers and what this means for businesses operating globally.</p>
                <div className="article-meta">
                  <span className="article-date">April 28, 2023</span>
                </div>
                <Link to="#" className="read-more">
                  Read article
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M14 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="article-card">
              <div className="article-card-image" style={{backgroundImage: 'url(https://via.placeholder.com/400x200)'}}></div>
              <div className="article-card-content">
                <span className="article-category">Case Study</span>
                <h3>How TechStart Expanded to 20 Markets</h3>
                <p>Learn how this startup used Sunny to power their global expansion and increase revenue by 150% in just 12 months.</p>
                <div className="article-meta">
                  <span className="article-date">April 15, 2023</span>
                </div>
                <Link to="#" className="read-more">
                  Read article
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M14 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="article-card">
              <div className="article-card-image" style={{backgroundImage: 'url(https://via.placeholder.com/400x200)'}}></div>
              <div className="article-card-content">
                <span className="article-category">Developer Tutorial</span>
                <h3>Building a Subscription Service with Sunny API</h3>
                <p>Step-by-step guide to implementing recurring billing with examples in Node.js, Python, and Ruby.</p>
                <div className="article-meta">
                  <span className="article-date">April 3, 2023</span>
                </div>
                <Link to="#" className="read-more">
                  Read article
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M14 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="article-card">
              <div className="article-card-image" style={{backgroundImage: 'url(https://via.placeholder.com/400x200)'}}></div>
              <div className="article-card-content">
                <span className="article-category">Product Update</span>
                <h3>Enhanced Fraud Protection Features</h3>
                <p>New AI-powered tools to prevent fraudulent transactions while reducing false positives by up to 60%.</p>
                <div className="article-meta">
                  <span className="article-date">March 22, 2023</span>
                </div>
                <Link to="#" className="read-more">
                  Read article
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M14 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="article-card">
              <div className="article-card-image" style={{backgroundImage: 'url(https://via.placeholder.com/400x200)'}}></div>
              <div className="article-card-content">
                <span className="article-category">Industry Trends</span>
                <h3>The Rise of Embedded Finance</h3>
                <p>How non-financial companies are integrating financial services into their offerings and what it means for the industry.</p>
                <div className="article-meta">
                  <span className="article-date">March 10, 2023</span>
                </div>
                <Link to="#" className="read-more">
                  Read article
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M14 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="article-card">
              <div className="article-card-image" style={{backgroundImage: 'url(https://via.placeholder.com/400x200)'}}></div>
              <div className="article-card-content">
                <span className="article-category">Developer Tutorial</span>
                <h3>Implementing Webhooks for Real-Time Updates</h3>
                <p>Learn how to set up and secure webhooks to receive real-time notifications about payment events.</p>
                <div className="article-meta">
                  <span className="article-date">February 28, 2023</span>
                </div>
                <Link to="#" className="read-more">
                  Read article
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M14 5l7 7-7 7"/>
                  </svg>
                </Link>
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
      
      <section id="newsletter" className="newsletter-section">
        <div className="container">
          <div className="newsletter-container">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get the latest updates and insights delivered to your inbox</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  </PageTemplate>
);

export default BlogPage;