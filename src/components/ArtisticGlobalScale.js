import React, { useEffect, useRef } from 'react';

const ArtisticGlobalScale = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const { width, height } = canvas.parentElement.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Colors
    const colors = ['#6772e5', '#24b47e', '#ff6b6b', '#ffa94d'];
    
    // Create nodes representing countries
    const nodes = [];
    const nodeCount = 150;
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.5 + 0.1,
        angle: Math.random() * Math.PI * 2,
        connectionCount: 0
      });
    }
    
    // Create connections between nodes
    const connections = [];
    const maxConnections = 3;
    
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      
      // Sort other nodes by distance
      const otherNodes = [...nodes];
      otherNodes.splice(i, 1);
      otherNodes.sort((a, b) => {
        const distA = Math.hypot(a.x - node.x, a.y - node.y);
        const distB = Math.hypot(b.x - node.x, b.y - node.y);
        return distA - distB;
      });
      
      // Connect to closest nodes
      for (let j = 0; j < Math.min(maxConnections, otherNodes.length); j++) {
        if (node.connectionCount < maxConnections && otherNodes[j].connectionCount < maxConnections) {
          connections.push({
            from: node,
            to: otherNodes[j],
            opacity: Math.random() * 0.2 + 0.1
          });
          
          node.connectionCount++;
          otherNodes[j].connectionCount++;
        }
      }
    }
    
    // Create text elements
    const texts = [
      { text: "195+ Countries", x: canvas.width * 0.2, y: canvas.height * 0.3, size: 24, color: colors[0] },
      { text: "135+ Currencies", x: canvas.width * 0.8, y: canvas.height * 0.4, size: 24, color: colors[1] },
      { text: "$10B+ Transactions", x: canvas.width * 0.5, y: canvas.height * 0.7, size: 24, color: colors[2] },
      { text: "Global Scale", x: canvas.width * 0.5, y: canvas.height * 0.2, size: 36, color: "#ffffff" }
    ];
    
    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      connections.forEach(connection => {
        ctx.beginPath();
        ctx.moveTo(connection.from.x, connection.from.y);
        ctx.lineTo(connection.to.x, connection.to.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${connection.opacity})`;
        ctx.stroke();
      });
      
      // Draw and update nodes
      nodes.forEach(node => {
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Draw glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, node.radius * 0.5,
          node.x, node.y, node.radius * 4
        );
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Update position
        node.x += Math.cos(node.angle) * node.speed;
        node.y += Math.sin(node.angle) * node.speed;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) {
          node.angle = Math.PI - node.angle;
        }
        if (node.y < 0 || node.y > canvas.height) {
          node.angle = -node.angle;
        }
      });
      
      // Draw text elements
      texts.forEach(text => {
        ctx.font = `bold ${text.size}px Arial`;
        ctx.fillStyle = text.color;
        ctx.textAlign = 'center';
        ctx.fillText(text.text, text.x, text.y);
        
        // Draw text glow
        ctx.shadowColor = text.color;
        ctx.shadowBlur = 15;
        ctx.fillText(text.text, text.x, text.y);
        ctx.shadowBlur = 0;
      });
      
      requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      height: '500px', 
      background: 'linear-gradient(180deg, #0a0a0f 0%, #141429 100%)',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '12px'
    }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          display: 'block' 
        }}
      />
    </div>
  );
};

export default ArtisticGlobalScale;