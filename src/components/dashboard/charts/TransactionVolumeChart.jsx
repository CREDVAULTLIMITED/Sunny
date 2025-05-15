import React, { useEffect, useRef } from 'react';
import './Charts.css';

const TransactionVolumeChart = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!data || !data.length || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Set dimensions
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    const padding = 40;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - (padding * 2);
    
    // Find min and max values
    const maxVolume = Math.max(...data.map(item => item.volume)) * 1.1; // Add 10% padding
    
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.strokeStyle = '#e2e8f0';
    ctx.stroke();
    
    // Draw horizontal grid lines
    const gridLines = 5;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';
    
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + ((gridLines - i) / gridLines) * chartHeight;
      const value = (i / gridLines) * maxVolume;
      
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.strokeStyle = '#f1f5f9';
      ctx.stroke();
      
      // Draw y-axis labels
      ctx.fillText(
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          notation: 'compact',
          maximumFractionDigits: 1
        }).format(value),
        padding - 5,
        y
      );
    }
    
    // Draw data points and line
    if (data.length > 1) {
      const pointWidth = chartWidth / (data.length - 1);
      
      // Draw line
      ctx.beginPath();
      data.forEach((item, index) => {
        const x = padding + (index * pointWidth);
        const y = height - padding - (item.volume / maxVolume) * chartHeight;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.strokeStyle = '#0070f3';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw area under the line
      ctx.lineTo(padding + ((data.length - 1) * pointWidth), height - padding);
      ctx.lineTo(padding, height - padding);
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 112, 243, 0.1)';
      ctx.fill();
      
      // Draw data points
      data.forEach((item, index) => {
        const x = padding + (index * pointWidth);
        const y = height - padding - (item.volume / maxVolume) * chartHeight;
        
        // Draw point
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#0070f3';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw x-axis labels
        const date = new Date(item.date);
        const dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(dateLabel, x, height - padding + 10);
      });
    }
    
  }, [data]);

  return (
    <div className="chart-wrapper">
      <div className="chart-canvas-container">
        {data && data.length > 0 ? (
          <canvas ref={canvasRef} width="600" height="300"></canvas>
        ) : (
          <div className="chart-no-data">No transaction data available</div>
        )}
      </div>
    </div>
  );
};

export default TransactionVolumeChart;