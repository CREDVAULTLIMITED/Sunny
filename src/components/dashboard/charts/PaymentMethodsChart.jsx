import React, { useEffect, useRef } from 'react';
import './Charts.css';

const PaymentMethodsChart = ({ data }) => {
  const canvasRef = useRef(null);
  
  // Colors for different payment methods
  const methodColors = {
    card: '#0070f3',
    bank_transfer: '#10b981',
    mobile_money: '#f59e0b',
    crypto: '#8b5cf6',
    apple_pay: '#000000',
    google_pay: '#4285F4',
    default: '#64748b'
  };

  // Format payment method name for display
  const formatMethodName = (method) => {
    return method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  useEffect(() => {
    if (!data || !data.length || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    const totalVolume = data.reduce((sum, item) => sum + item.volume, 0);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Set dimensions
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    const radius = Math.min(width, height) / 2 * 0.8;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Draw pie chart
    let startAngle = 0;
    
    data.forEach(item => {
      const sliceAngle = (item.volume / totalVolume) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;
      
      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      
      // Fill slice
      ctx.fillStyle = methodColors[item.method] || methodColors.default;
      ctx.fill();
      
      startAngle = endAngle;
    });
    
    // Draw center circle (donut hole)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    
  }, [data]);

  return (
    <div className="chart-wrapper">
      <div className="chart-canvas-container">
        <canvas ref={canvasRef} width="200" height="200"></canvas>
      </div>
      <div className="chart-legend">
        {data && data.map((item, index) => (
          <div key={index} className="legend-item">
            <div 
              className="legend-color" 
              style={{ backgroundColor: methodColors[item.method] || methodColors.default }}
            ></div>
            <div className="legend-label">{formatMethodName(item.method)}</div>
            <div className="legend-value">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
              }).format(item.volume)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodsChart;