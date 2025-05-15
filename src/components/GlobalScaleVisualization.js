import React, { useRef, useEffect } from 'react';

const GlobalScaleVisualization = ({ height = '500px' }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Set canvas dimensions to match display size
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        const { devicePixelRatio:ratio = 1 } = window;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        ctx.scale(ratio, ratio);
        return true;
      }
      return false;
    };
    
    resizeCanvas();
    
    // Colors
    const colors = [
      '#6772e5', // Sunny blue
      '#24b47e', // Sunny green
      '#ff6b6b', // Sunny red
      '#ffa94d'  // Sunny orange
    ];
    
    // Create connection points representing global regions
    const regions = [
      { x: width * 0.2, y: height * 0.3, size: 8, name: 'North America' },
      { x: width * 0.35, y: height * 0.4, size: 7, name: 'South America' },
      { x: width * 0.5, y: height * 0.25, size: 8, name: 'Europe' },
      { x: width * 0.6, y: height * 0.35, size: 9, name: 'Africa' },
      { x: width * 0.75, y: height * 0.3, size: 8, name: 'Asia' },
      { x: width * 0.85, y: height * 0.6, size: 7, name: 'Australia' }
    ];
    
    // Create connections between regions
    const connections = [
      { from: 0, to: 2 },
      { from: 0, to: 1 },
      { from: 2, to: 3 },
      { from: 2, to: 4 },
      { from: 4, to: 5 },
      { from: 3, to: 4 },
      { from: 1, to: 3 }
    ];
    
    // Animation variables
    let particles = [];
    let animationFrameId;
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      const connection = connections[Math.floor(Math.random() * connections.length)];
      const fromRegion = regions[connection.from];
      const toRegion = regions[connection.to];
      
      particles.push({
        x: fromRegion.x,
        y: fromRegion.y,
        targetX: toRegion.x,
        targetY: toRegion.y,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.random() * 2
      });
    }
    
    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw connections
      connections.forEach(connection => {
        const fromRegion = regions[connection.from];
        const toRegion = regions[connection.to];
        
        ctx.beginPath();
        ctx.moveTo(fromRegion.x, fromRegion.y);
        
        // Create a curved line
        const controlX = (fromRegion.x + toRegion.x) / 2;
        const controlY = (fromRegion.y + toRegion.y) / 2 - 50;
        
        ctx.quadraticCurveTo(controlX, controlY, toRegion.x, toRegion.y);
        
        ctx.strokeStyle = 'rgba(103, 114, 229, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      
      // Draw regions
      regions.forEach((region, i) => {
        // Draw outer glow
        const gradient = ctx.createRadialGradient(
          region.x, region.y, region.size / 2,
          region.x, region.y, region.size * 2
        );
        gradient.addColorStop(0, colors[i % colors.length]);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(region.x, region.y, region.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw region point
        ctx.beginPath();
        ctx.arc(region.x, region.y, region.size, 0, Math.PI * 2);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        
        // Draw region name
        ctx.font = '12px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(region.name, region.x, region.y + region.size + 15);
      });
      
      // Draw and update particles
      particles.forEach(particle => {
        // Update position
        particle.progress += particle.speed;
        if (particle.progress >= 1) {
          // Reset particle to a new random connection
          const connection = connections[Math.floor(Math.random() * connections.length)];
          const fromRegion = regions[connection.from];
          const toRegion = regions[connection.to];
          
          particle.x = fromRegion.x;
          particle.y = fromRegion.y;
          particle.targetX = toRegion.x;
          particle.targetY = toRegion.y;
          particle.progress = 0;
          particle.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        // Calculate position along curve
        const fromRegion = { x: particle.x, y: particle.y };
        const toRegion = { x: particle.targetX, y: particle.targetY };
        const controlX = (fromRegion.x + toRegion.x) / 2;
        const controlY = (fromRegion.y + toRegion.y) / 2 - 50;
        
        const t = particle.progress;
        const x = (1 - t) * (1 - t) * fromRegion.x + 2 * (1 - t) * t * controlX + t * t * toRegion.x;
        const y = (1 - t) * (1 - t) * fromRegion.y + 2 * (1 - t) * t * controlY + t * t * toRegion.y;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Draw glow
        const glow = ctx.createRadialGradient(
          x, y, particle.size / 2,
          x, y, particle.size * 2
        );
        glow.addColorStop(0, particle.color);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(x, y, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      });
      
      // Add title
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText('Global Payment Network', width / 2, 40);
      
      // Add subtitle
      ctx.font = '16px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText('Connecting businesses across 195+ countries', width / 2, 70);
      
      animationFrameId = window.requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    
    // Cleanup
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <div style={{ 
      width: '100%', 
      height: height, 
      background: 'linear-gradient(180deg, #0a0a0f 0%, #141429 100%)',
      borderRadius: '12px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: '100%', 
          height: '100%',
          display: 'block'
        }}
      />
      
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '0',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: '30px'
      }}>
        <div style={{
          background: 'rgba(10, 10, 15, 0.7)',
          backdropFilter: 'blur(10px)',
          padding: '15px 20px',
          borderRadius: '8px',
          color: 'white',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>195+</div>
          <div style={{ fontSize: '14px', opacity: 0.7 }}>Countries</div>
        </div>
        
        <div style={{
          background: 'rgba(10, 10, 15, 0.7)',
          backdropFilter: 'blur(10px)',
          padding: '15px 20px',
          borderRadius: '8px',
          color: 'white',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>135+</div>
          <div style={{ fontSize: '14px', opacity: 0.7 }}>Currencies</div>
        </div>
        
        <div style={{
          background: 'rgba(10, 10, 15, 0.7)',
          backdropFilter: 'blur(10px)',
          padding: '15px 20px',
          borderRadius: '8px',
          color: 'white',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>$10B+</div>
          <div style={{ fontSize: '14px', opacity: 0.7 }}>Transactions</div>
        </div>
      </div>
    </div>
  );
};

export default GlobalScaleVisualization;