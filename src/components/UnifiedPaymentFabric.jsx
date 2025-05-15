import React, { useEffect, useRef } from 'react';

/**
 * Unified Payment Fabric Component
 * A textile-inspired visualization showing how Sunny weaves together global payments
 */
const UnifiedPaymentFabric = ({ width = '100%', height = '400px' }) => {
  const canvasRef = useRef(null);
  
  // Add a class name to help with debugging
  const componentClassName = "unified-payment-fabric-visualization";
  
  // Configuration for the visualization
  const config = {
    threads: 40,                // Number of threads in the fabric
    nodeCount: 15,              // Number of transaction hubs
    colors: {
      americas: '#FF6B6B',      // Red for Americas
      europe: '#48DBB4',        // Green for Europe
      asia: '#4D96FF',          // Blue for Asia
      africa: '#FFCE54',        // Yellow for Africa
      oceania: '#AC92EC'        // Purple for Oceania
    },
    animationSpeed: 0.5,        // Base animation speed
    rippleLifetime: 100,        // How long ripples last
    rippleSize: 30,             // Maximum ripple size
    brandColor: '#FFD43B'       // Sunny brand color (yellow)
  };

  // Active ripples in the visualization
  const ripples = useRef([]);
  
  // Animation frame reference
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let threads = [];
    let nodes = [];
    let animating = true;
    
    // Set canvas size with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    // Initialize threads
    const initThreads = () => {
      threads = [];
      const regions = Object.keys(config.colors);
      
      for (let i = 0; i < config.threads; i++) {
        // Distribute threads across the canvas
        const startY = Math.random() * canvas.height / dpr;
        const endY = Math.random() * canvas.height / dpr;
        const controlPoint1X = canvas.width / dpr * 0.33 + (Math.random() * 50 - 25);
        const controlPoint1Y = Math.random() * canvas.height / dpr;
        const controlPoint2X = canvas.width / dpr * 0.66 + (Math.random() * 50 - 25);
        const controlPoint2Y = Math.random() * canvas.height / dpr;
        
        // Assign a region/color to each thread
        const region = regions[Math.floor(Math.random() * regions.length)];
        
        threads.push({
          startX: 0,
          startY,
          controlPoint1X,
          controlPoint1Y,
          controlPoint2X,
          controlPoint2Y,
          endX: canvas.width / dpr,
          endY,
          color: config.colors[region],
          speed: 0.5 + Math.random() * 0.5, // Variation in thread animation speed
          offset: Math.random() * 100,      // Starting offset for animation
          width: 1 + Math.random() * 1.5    // Variation in thread thickness
        });
      }
    };
    
    // Initialize transaction hub nodes
    const initNodes = () => {
      nodes = [];
      
      for (let i = 0; i < config.nodeCount; i++) {
        nodes.push({
          x: canvas.width / dpr * 0.1 + Math.random() * (canvas.width / dpr * 0.8),
          y: canvas.height / dpr * 0.1 + Math.random() * (canvas.height / dpr * 0.8),
          size: 3 + Math.random() * 4,
          pulse: 0,
          pulseSpeed: 0.02 + Math.random() * 0.03
        });
      }
    };
    
    // Draw a single thread with bezier curve
    const drawThread = (thread, time) => {
      const { startX, startY, controlPoint1X, controlPoint1Y, 
              controlPoint2X, controlPoint2Y, endX, endY, 
              color, speed, offset, width } = thread;
      
      // Create animated dash pattern
      const dashOffset = (time * speed + offset) % 100;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.bezierCurveTo(
        controlPoint1X, controlPoint1Y,
        controlPoint2X, controlPoint2Y,
        endX, endY
      );
      
      ctx.lineWidth = width;
      ctx.strokeStyle = color;
      ctx.setLineDash([4, 3]);
      ctx.lineDashOffset = -dashOffset;
      ctx.stroke();
      ctx.setLineDash([]);
    };
    
    // Draw a transaction hub node
    const drawNode = (node, time) => {
      const { x, y, size, pulse, pulseSpeed } = node;
      
      // Draw main node
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = config.brandColor;
      ctx.fill();
      
      // Draw pulse effect
      const pulseValue = Math.sin(time * pulseSpeed + pulse) * 0.5 + 0.5;
      const pulseSize = size + pulseValue * 5;
      
      ctx.beginPath();
      ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 212, 59, ${0.3 - pulseValue * 0.3})`;
      ctx.fill();
    };
    
    // Create a new ripple effect at specified coordinates
    const createRipple = (x, y) => {
      ripples.current.push({
        x,
        y,
        size: 0,
        maxSize: config.rippleSize,
        life: config.rippleLifetime,
        opacity: 0.7
      });
    };
    
    // Draw all active ripples
    const drawRipples = () => {
      ripples.current.forEach((ripple, index) => {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.size, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 212, 59, ${ripple.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Update ripple properties
        ripple.size += ripple.maxSize / ripple.life;
        ripple.opacity -= 0.7 / ripple.life;
        ripple.life--;
        
        // Remove dead ripples
        if (ripple.life <= 0) {
          ripples.current.splice(index, 1);
        }
      });
    };
    
    // Draw Sunny branding elements
    const drawBrandingElements = () => {
      // Subtle "S" shape woven into the fabric
      const centerX = canvas.width / dpr / 2;
      const centerY = canvas.height / dpr / 2;
      const size = Math.min(canvas.width / dpr, canvas.height / dpr) * 0.4;
      
      ctx.beginPath();
      ctx.moveTo(centerX - size/4, centerY - size/3);
      ctx.bezierCurveTo(
        centerX + size/3, centerY - size/3,
        centerX - size/3, centerY + size/3,
        centerX + size/4, centerY + size/3
      );
      ctx.strokeStyle = `rgba(255, 212, 59, 0.15)`;
      ctx.lineWidth = 8;
      ctx.stroke();
    };
    
    // Main animation loop
    const animate = (timestamp) => {
      if (!animating) return;
      
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      
      // Draw branding elements in the background
      drawBrandingElements();
      
      // Draw all threads
      threads.forEach(thread => drawThread(thread, timestamp / 50));
      
      // Draw all nodes
      nodes.forEach(node => drawNode(node, timestamp / 50));
      
      // Draw all active ripples
      drawRipples();
      
      // Randomly create new ripples
      if (Math.random() < 0.02) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        createRipple(randomNode.x, randomNode.y);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Initialize and start animation
    initThreads();
    initNodes();
    animationRef.current = requestAnimationFrame(animate);
    
    // Handle window resize
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // Reinitialize threads and nodes for new dimensions
      initThreads();
      initNodes();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      animating = false;
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={`unified-payment-fabric ${componentClassName}`}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          width, 
          height,
          borderRadius: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.03)'
        }}
      />
    </div>
  );
};

export default UnifiedPaymentFabric;