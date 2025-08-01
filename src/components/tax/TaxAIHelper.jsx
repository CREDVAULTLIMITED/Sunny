import React, { useState } from 'react';
import TaxManager from '../../core/TaxManager';
import './TaxAIHelper.css';

const TaxAIHelper = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [calculationMode, setCalculationMode] = useState(false);
  const [calculation, setCalculation] = useState({
    amount: '',
    country: '',
    productType: 'physical'
  });
  const [calculationResult, setCalculationResult] = useState(null);

  const handleAskHelios = async () => {
    setIsLoading(true);
    try {
      const result = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: query,
          context: 'tax',
          calculation: calculationMode ? calculation : undefined,
          calculationResult
        })
      });
      
      const data = await result.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error querying Helios:', error);
      setResponse('I apologize, but I encountered an error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCalculate = async () => {
    if (!calculation.amount || !calculation.country) return;
    
    setIsLoading(true);
    try {
      const result = await TaxManager.calculateTransactionTax({
        amount: parseFloat(calculation.amount),
        currency: 'USD', // TODO: Make currency configurable
        sourceCountry: 'US', // TODO: Make source country configurable
        destinationCountry: calculation.country,
        productType: calculation.productType,
        transactionType: 'sale'
      });

      setCalculationResult(result);
      setQuery(`Calculate tax for ${calculation.amount} ${calculation.productType} goods in ${calculation.country}`);
      setCalculationMode(true);
      await handleAskHelios();
    } catch (error) {
      console.error('Error calculating tax:', error);
      setResponse('I apologize, but I encountered an error calculating the tax. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tax-ai-helper">
      <div className="ai-helper-header">
        <div className="helios-avatar">
          <div className="avatar-glow"></div>
          <div className="avatar-core">H</div>
        </div>
        <h3>Ask Helios about Taxes</h3>
        <div className="mode-switch">
          <button 
            className={`mode-button ${!calculationMode ? 'active' : ''}`}
            onClick={() => setCalculationMode(false)}
          >
            Ask Question
          </button>
          <button 
            className={`mode-button ${calculationMode ? 'active' : ''}`}
            onClick={() => setCalculationMode(true)}
          >
            Calculate Tax
          </button>
        </div>
      </div>
      
      <div className="ai-helper-content">
        {calculationMode ? (
          <div className="calculation-form">
            <div className="input-group">
              <label>Amount</label>
              <input
                type="number"
                value={calculation.amount}
                onChange={(e) => setCalculation(prev => ({
                  ...prev,
                  amount: e.target.value
                }))}
                placeholder="Enter amount"
              />
            </div>
            <div className="input-group">
              <label>Country</label>
              <input
                type="text"
                value={calculation.country}
                onChange={(e) => setCalculation(prev => ({
                  ...prev,
                  country: e.target.value
                }))}
                placeholder="Enter country"
              />
            </div>
            <div className="input-group">
              <label>Product Type</label>
              <select
                value={calculation.productType}
                onChange={(e) => setCalculation(prev => ({
                  ...prev,
                  productType: e.target.value
                }))}
              >
                <option value="physical">Physical Goods</option>
                <option value="digital">Digital Goods</option>
                <option value="service">Services</option>
              </select>
            </div>
            <button
              onClick={handleCalculate}
              disabled={isLoading || !calculation.amount || !calculation.country}
              className="calculate-button"
            >
              {isLoading ? 'Calculating...' : 'Calculate Tax'}
            </button>
          </div>
        ) : (
          <>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about tax rates, requirements, or calculations..."
              className="ai-query-input"
            />
            <button
              onClick={handleAskHelios}
              disabled={isLoading || !query.trim()}
              className="ask-button"
            >
              {isLoading ? 'Thinking...' : 'Ask Helios'}
            </button>
          </>
        )}

        {response && (
          <div className="ai-response">
            <div className="response-content">
              {response}
            </div>
          </div>
        )}

        {!calculationMode && (
          <div className="quick-questions">
            <h4>Common Questions</h4>
            <div className="question-buttons">
              <button onClick={() => setQuery('What are the VAT requirements for selling digital products in the EU?')}>
                EU VAT Requirements
              </button>
              <button onClick={() => setQuery('How do I handle tax for subscription services?')}>
                Subscription Taxation
              </button>
              <button onClick={() => setQuery('What are the current tax thresholds for US sales tax?')}>
                US Tax Thresholds
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxAIHelper;
