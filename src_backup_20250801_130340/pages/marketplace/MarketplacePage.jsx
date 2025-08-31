import React, { useState } from 'react';
import { Grid, Card, Button, Rating } from '@mui/material';

const MarketplacePage = () => {
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', name: 'All Plugins' },
    { id: 'payment', name: 'Payment Methods' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'security', name: 'Security' },
    { id: 'integration', name: 'Integrations' },
    { id: 'ui', name: 'UI Components' }
  ];

  const plugins = [
    {
      id: 1,
      name: 'Advanced Fraud Detection',
      developer: 'Sunny Security',
      rating: 4.8,
      reviews: 156,
      price: 'Free',
      category: 'security',
      description: 'Enhanced fraud detection using AI and machine learning'
    },
    {
      id: 2,
      name: 'Multi-Currency Converter',
      developer: 'FinTech Solutions',
      rating: 4.6,
      reviews: 89,
      price: '$29/month',
      category: 'payment',
      description: 'Real-time currency conversion with 160+ currencies'
    },
    // Add more sample plugins
  ];

  return (
    <div className="marketplace-page">
      <div className="marketplace-header">
        <h1>Sunny Marketplace</h1>
        <p>Extend your payment capabilities with trusted plugins and integrations</p>
        
        <div className="marketplace-actions">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search plugins..."
              className="search-input"
            />
          </div>
          
          <Button variant="contained" color="primary">
            Submit Your Plugin
          </Button>
        </div>
      </div>

      <div className="marketplace-content">
        <aside className="marketplace-sidebar">
          <div className="category-filters">
            <h3>Categories</h3>
            <ul>
              {categories.map(cat => (
                <li key={cat.id}>
                  <button
                    className={`category-btn ${category === cat.id ? 'active' : ''}`}
                    onClick={() => setCategory(cat.id)}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="price-filters">
            <h3>Price</h3>
            <ul>
              <li>
                <label>
                  <input type="checkbox" /> Free
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> Paid
                </label>
              </li>
            </ul>
          </div>
        </aside>

        <main className="marketplace-main">
          <div className="marketplace-controls">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <Grid container spacing={3}>
            {plugins.map(plugin => (
              <Grid item xs={12} sm={6} md={4} key={plugin.id}>
                <Card className="plugin-card">
                  <div className="plugin-header">
                    <h3>{plugin.name}</h3>
                    <span className="plugin-price">{plugin.price}</span>
                  </div>
                  
                  <p className="plugin-description">{plugin.description}</p>
                  
                  <div className="plugin-meta">
                    <div className="plugin-developer">By {plugin.developer}</div>
                    <div className="plugin-rating">
                      <Rating value={plugin.rating} precision={0.1} readOnly size="small" />
                      <span>({plugin.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="plugin-actions">
                    <Button variant="contained" fullWidth>
                      Install Plugin
                    </Button>
                    <Button variant="text" fullWidth>
                      Learn More
                    </Button>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </main>
      </div>
    </div>
  );
};

export default MarketplacePage;
