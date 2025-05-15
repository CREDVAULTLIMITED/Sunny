import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import '../styles/components/AnalyticsDashboard.css';

/**
 * AnalyticsDashboard component for Sunny Payment Gateway
 * 
 * A comprehensive dashboard for visualizing payment analytics
 */
const AnalyticsDashboard = ({
  merchantId,
  apiKey,
  timeframe = 'last30days',
  className = '',
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);
  
  // Fetch analytics data
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real implementation, this would fetch from an API
        // For this example, we'll use mock data
        const { startDate, endDate } = getTimeframeDates(selectedTimeframe);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const data = {
          timeframe: {
            startDate,
            endDate
          },
          summary: {
            totalTransactions: 1250,
            successfulTransactions: 1180,
            failedTransactions: 70,
            totalVolume: 125000.50,
            averageTransactionValue: 100.40,
            conversionRate: 92.5
          },
          paymentMethods: {
            card: {
              count: 850,
              volume: 95000.25,
              successRate: 94.2
            },
            bank_transfer: {
              count: 150,
              volume: 18500.75,
              successRate: 98.0
            },
            mobile_money: {
              count: 200,
              volume: 8500.50,
              successRate: 89.5
            },
            crypto: {
              count: 50,
              volume: 3000.00,
              successRate: 96.0
            }
          },
          timeline: generateMockTimelineData(startDate, endDate),
          geoDistribution: {
            US: {
              count: 500,
              volume: 55000.00
            },
            GB: {
              count: 200,
              volume: 22000.00
            },
            DE: {
              count: 150,
              volume: 16500.00
            },
            IN: {
              count: 120,
              volume: 8500.00
            },
            KE: {
              count: 80,
              volume: 4000.00
            },
            other: {
              count: 200,
              volume: 19000.50
            }
          }
        };
        
        setAnalyticsData(data);
      } catch (err) {
        setError('Failed to load analytics data');
        console.error('Analytics error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, [merchantId, apiKey, selectedTimeframe]);
  
  // Get start and end dates for a timeframe
  const getTimeframeDates = (timeframe) => {
    const endDate = new Date();
    let startDate = new Date();
    
    switch (timeframe) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'yesterday':
        startDate.setDate(startDate.getDate() - 1);
        startDate.setHours(0, 0, 0, 0);
        endDate.setDate(endDate.getDate() - 1);
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'last7days':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'last30days':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case 'thisMonth':
        startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
        break;
      case 'lastMonth':
        startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1);
        endDate = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
        break;
      default:
        startDate.setDate(startDate.getDate() - 30);
    }
    
    return {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
  };
  
  // Generate mock timeline data
  const generateMockTimelineData = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const result = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      
      result.push({
        date: date.toISOString().split('T')[0],
        transactions: Math.floor(Math.random() * 50) + 30,
        volume: Math.floor(Math.random() * 5000) + 3000,
        successRate: Math.floor(Math.random() * 10) + 88
      });
    }
    
    return result;
  };
  
  // Handle timeframe change
  const handleTimeframeChange = (newTimeframe) => {
    setSelectedTimeframe(newTimeframe);
  };
  
  // Format currency
  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);
  };
  
  // Format number with commas
  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };
  
  // Format percentage
  const formatPercentage = (percentage) => {
    return `${percentage.toFixed(1)}%`;
  };
  
  const baseClass = 'sunny-analytics-dashboard';
  const classes = [baseClass, className].filter(Boolean).join(' ');
  
  if (loading) {
    return (
      <div className={`${classes} ${baseClass}--loading`}>
        <div className={`${baseClass}__loader`}>
          <div className={`${baseClass}__loader-spinner`}></div>
          <div className={`${baseClass}__loader-text`}>Loading analytics data...</div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={`${classes} ${baseClass}--error`}>
        <div className={`${baseClass}__error`}>
          <div className={`${baseClass}__error-icon`}>!</div>
          <div className={`${baseClass}__error-message`}>{error}</div>
        </div>
      </div>
    );
  }
  
  if (!analyticsData) {
    return null;
  }
  
  return (
    <div className={classes} {...props}>
      <div className={`${baseClass}__header`}>
        <h1 className={`${baseClass}__title`}>Payment Analytics</h1>
        
        <div className={`${baseClass}__timeframe-selector`}>
          <button
            className={`${baseClass}__timeframe-button ${selectedTimeframe === 'today' ? `${baseClass}__timeframe-button--active` : ''}`}
            onClick={() => handleTimeframeChange('today')}
          >
            Today
          </button>
          <button
            className={`${baseClass}__timeframe-button ${selectedTimeframe === 'yesterday' ? `${baseClass}__timeframe-button--active` : ''}`}
            onClick={() => handleTimeframeChange('yesterday')}
          >
            Yesterday
          </button>
          <button
            className={`${baseClass}__timeframe-button ${selectedTimeframe === 'last7days' ? `${baseClass}__timeframe-button--active` : ''}`}
            onClick={() => handleTimeframeChange('last7days')}
          >
            Last 7 Days
          </button>
          <button
            className={`${baseClass}__timeframe-button ${selectedTimeframe === 'last30days' ? `${baseClass}__timeframe-button--active` : ''}`}
            onClick={() => handleTimeframeChange('last30days')}
          >
            Last 30 Days
          </button>
          <button
            className={`${baseClass}__timeframe-button ${selectedTimeframe === 'thisMonth' ? `${baseClass}__timeframe-button--active` : ''}`}
            onClick={() => handleTimeframeChange('thisMonth')}
          >
            This Month
          </button>
          <button
            className={`${baseClass}__timeframe-button ${selectedTimeframe === 'lastMonth' ? `${baseClass}__timeframe-button--active` : ''}`}
            onClick={() => handleTimeframeChange('lastMonth')}
          >
            Last Month
          </button>
        </div>
      </div>
      
      <div className={`${baseClass}__summary-cards`}>
        <Card className={`${baseClass}__summary-card`}>
          <div className={`${baseClass}__summary-card-title`}>Total Volume</div>
          <div className={`${baseClass}__summary-card-value`}>
            {formatCurrency(analyticsData.summary.totalVolume)}
          </div>
        </Card>
        
        <Card className={`${baseClass}__summary-card`}>
          <div className={`${baseClass}__summary-card-title`}>Transactions</div>
          <div className={`${baseClass}__summary-card-value`}>
            {formatNumber(analyticsData.summary.totalTransactions)}
          </div>
        </Card>
        
        <Card className={`${baseClass}__summary-card`}>
          <div className={`${baseClass}__summary-card-title`}>Success Rate</div>
          <div className={`${baseClass}__summary-card-value`}>
            {formatPercentage(analyticsData.summary.conversionRate)}
          </div>
        </Card>
        
        <Card className={`${baseClass}__summary-card`}>
          <div className={`${baseClass}__summary-card-title`}>Avg. Transaction</div>
          <div className={`${baseClass}__summary-card-value`}>
            {formatCurrency(analyticsData.summary.averageTransactionValue)}
          </div>
        </Card>
      </div>
      
      <div className={`${baseClass}__charts-row`}>
        <Card className={`${baseClass}__chart-card ${baseClass}__timeline-chart`}>
          <h2 className={`${baseClass}__chart-title`}>Transaction Volume</h2>
          <div className={`${baseClass}__chart-container`}>
            {/* In a real implementation, this would be a chart component */}
            <div className={`${baseClass}__chart-placeholder`}>
              <div className={`${baseClass}__chart-bars`}>
                {analyticsData.timeline.map((day, index) => (
                  <div 
                    key={day.date} 
                    className={`${baseClass}__chart-bar`}
                    style={{ 
                      height: `${(day.volume / 8000) * 100}%`,
                      left: `${(index / analyticsData.timeline.length) * 100}%`
                    }}
                    title={`${day.date}: ${formatCurrency(day.volume)}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </Card>
        
        <Card className={`${baseClass}__chart-card ${baseClass}__payment-methods-chart`}>
          <h2 className={`${baseClass}__chart-title`}>Payment Methods</h2>
          <div className={`${baseClass}__chart-container`}>
            <div className={`${baseClass}__payment-methods-list`}>
              {Object.entries(analyticsData.paymentMethods).map(([method, data]) => (
                <div key={method} className={`${baseClass}__payment-method-item`}>
                  <div className={`${baseClass}__payment-method-name`}>
                    {method.replace('_', ' ')}
                  </div>
                  <div className={`${baseClass}__payment-method-bar-container`}>
                    <div 
                      className={`${baseClass}__payment-method-bar`}
                      style={{ width: `${(data.volume / analyticsData.summary.totalVolume) * 100}%` }}
                    ></div>
                  </div>
                  <div className={`${baseClass}__payment-method-value`}>
                    {formatCurrency(data.volume)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
      
      <div className={`${baseClass}__charts-row`}>
        <Card className={`${baseClass}__chart-card ${baseClass}__geo-chart`}>
          <h2 className={`${baseClass}__chart-title`}>Geographic Distribution</h2>
          <div className={`${baseClass}__chart-container`}>
            <div className={`${baseClass}__geo-distribution-list`}>
              {Object.entries(analyticsData.geoDistribution).map(([country, data]) => (
                <div key={country} className={`${baseClass}__geo-item`}>
                  <div className={`${baseClass}__geo-country`}>
                    {country === 'other' ? 'Other Countries' : country}
                  </div>
                  <div className={`${baseClass}__geo-bar-container`}>
                    <div 
                      className={`${baseClass}__geo-bar`}
                      style={{ width: `${(data.volume / analyticsData.summary.totalVolume) * 100}%` }}
                    ></div>
                  </div>
                  <div className={`${baseClass}__geo-value`}>
                    {formatCurrency(data.volume)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        
        <Card className={`${baseClass}__chart-card ${baseClass}__success-rate-chart`}>
          <h2 className={`${baseClass}__chart-title`}>Success Rate by Payment Method</h2>
          <div className={`${baseClass}__chart-container`}>
            <div className={`${baseClass}__success-rate-list`}>
              {Object.entries(analyticsData.paymentMethods).map(([method, data]) => (
                <div key={method} className={`${baseClass}__success-rate-item`}>
                  <div className={`${baseClass}__success-rate-name`}>
                    {method.replace('_', ' ')}
                  </div>
                  <div className={`${baseClass}__success-rate-bar-container`}>
                    <div 
                      className={`${baseClass}__success-rate-bar`}
                      style={{ width: `${data.successRate}%` }}
                    ></div>
                  </div>
                  <div className={`${baseClass}__success-rate-value`}>
                    {formatPercentage(data.successRate)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

AnalyticsDashboard.propTypes = {
  merchantId: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  timeframe: PropTypes.oneOf(['today', 'yesterday', 'last7days', 'last30days', 'thisMonth', 'lastMonth']),
  className: PropTypes.string,
};

export default AnalyticsDashboard;