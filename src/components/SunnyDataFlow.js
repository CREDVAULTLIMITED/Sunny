import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { gsap } from 'gsap';

const SunnyDataFlow = ({ height = '70vh' }) => {
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Current reference to the DOM element
    const currentRef = mountRef.current;
    
    // Scene setup with a dark background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#050816');
    
    // Camera with a wider field of view for dramatic effect
    const camera = new THREE.PerspectiveCamera(60, currentRef.clientWidth / currentRef.clientHeight, 0.1, 1000);
    camera.position.z = 20;
    
    // Renderer with antialiasing for smooth edges
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentRef.appendChild(renderer.domElement);
    
    // Post-processing for glow effects
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    
    // Add bloom effect for the glowing nodes and connections
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.8,  // strength
      0.3,  // radius
      0.9   // threshold
    );
    composer.addPass(bloomPass);
    
    // Create nodes representing global connection points
    const nodeGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const nodeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x6772e5,
      transparent: true,
      opacity: 0.8
    });
    
    const nodes = [];
    const nodeCount = 40;
    
    // Create nodes in a spherical arrangement
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      
      const x = 10 * Math.sin(phi) * Math.cos(theta);
      const y = 10 * Math.sin(phi) * Math.sin(theta);
      const z = 10 * Math.cos(phi);
      
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
      node.position.set(x, y, z);
      node.scale.set(
        Math.random() * 0.5 + 0.5,
        Math.random() * 0.5 + 0.5,
        Math.random() * 0.5 + 0.5
      );
      
      // Store original position for animation
      node.userData.originalPosition = { x, y, z };
      node.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      );
      
      scene.add(node);
      nodes.push(node);
    }
    
    // Create connections between nodes
    const connections = [];
    const connectionMaterial = new THREE.LineBasicMaterial({ 
      color: 0x6772e5,
      transparent: true,
      opacity: 0.2,
      linewidth: 1
    });
    
    // Connect nodes that are close to each other
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        
        if (distance < 8) {
          const points = [];
          points.push(nodes[i].position);
          
          // Create a curved connection
          const midPoint = new THREE.Vector3().addVectors(nodes[i].position, nodes[j].position).multiplyScalar(0.5);
          const offset = new THREE.Vector3().subVectors(midPoint, new THREE.Vector3(0, 0, 0)).normalize().multiplyScalar(Math.random() * 2);
          midPoint.add(offset);
          points.push(midPoint);
          
          points.push(nodes[j].position);
          
          const curve = new THREE.QuadraticBezierCurve3(
            nodes[i].position,
            midPoint,
            nodes[j].position
          );
          
          const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(20));
          const connection = new THREE.Line(geometry, connectionMaterial.clone());
          
          // Store the connected nodes for animation
          connection.userData.nodeA = nodes[i];
          connection.userData.nodeB = nodes[j];
          connection.userData.midPoint = midPoint;
          
          scene.add(connection);
          connections.push(connection);
        }
      }
    }
    
    // Add data flow particles along connections
    const flowParticles = [];
    const flowGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const flowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.8
    });
    
    connections.forEach(connection => {
      if (Math.random() > 0.7) return; // Only add particles to some connections
      
      const particle = new THREE.Mesh(flowGeometry, flowMaterial.clone());
      
      // Set random starting position along the connection
      particle.userData.connection = connection;
      particle.userData.progress = Math.random();
      particle.userData.speed = Math.random() * 0.01 + 0.005;
      
      scene.add(particle);
      flowParticles.push(particle);
    });
    
    // Add ambient particles in the background
    const ambientParticles = [];
    const ambientParticleCount = 200;
    const ambientParticleGeometry = new THREE.BufferGeometry();
    const ambientParticlePositions = new Float32Array(ambientParticleCount * 3);
    const ambientParticleSizes = new Float32Array(ambientParticleCount);
    
    for (let i = 0; i < ambientParticleCount; i++) {
      const i3 = i * 3;
      ambientParticlePositions[i3] = (Math.random() - 0.5) * 40;
      ambientParticlePositions[i3 + 1] = (Math.random() - 0.5) * 40;
      ambientParticlePositions[i3 + 2] = (Math.random() - 0.5) * 40;
      ambientParticleSizes[i] = Math.random() * 2;
    }
    
    ambientParticleGeometry.setAttribute('position', new THREE.BufferAttribute(ambientParticlePositions, 3));
    ambientParticleGeometry.setAttribute('size', new THREE.BufferAttribute(ambientParticleSizes, 1));
    
    // Create a simple circle texture for particles
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    
    const particleTexture = new THREE.CanvasTexture(canvas);
    
    const ambientParticleMaterial = new THREE.PointsMaterial({
      color: 0x6772e5,
      size: 0.2,
      transparent: true,
      opacity: 0.6,
      map: particleTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const ambientParticleSystem = new THREE.Points(ambientParticleGeometry, ambientParticleMaterial);
    scene.add(ambientParticleSystem);
    
    // Add subtle rotation to the entire scene
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);
    
    // Move all objects to the network group
    scene.children.forEach(child => {
      if (child !== networkGroup) {
        scene.remove(child);
        networkGroup.add(child);
      }
    });
    
    // Controls for interactive rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = false;
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      
      // Rotate the entire network
      networkGroup.rotation.y += delta * 0.1;
      networkGroup.rotation.x += delta * 0.05;
      
      // Animate nodes with subtle movement
      nodes.forEach(node => {
        // Apply velocity
        node.position.add(node.userData.velocity);
        
        // Calculate distance from original position
        const originalPos = node.userData.originalPosition;
        const distance = node.position.distanceTo(
          new THREE.Vector3(originalPos.x, originalPos.y, originalPos.z)
        );
        
        // Apply spring force back to original position if too far
        if (distance > 1) {
          const direction = new THREE.Vector3(
            originalPos.x - node.position.x,
            originalPos.y - node.position.y,
            originalPos.z - node.position.z
          ).normalize();
          
          node.position.add(direction.multiplyScalar(0.02));
        }
        
        // Randomly change velocity
        if (Math.random() > 0.99) {
          node.userData.velocity.set(
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01
          );
        }
        
        // Pulse the node size
        const scale = 1 + Math.sin(clock.elapsedTime * 2 + node.position.x) * 0.1;
        node.scale.set(scale, scale, scale);
      });
      
      // Update connections to follow nodes
      connections.forEach(connection => {
        const nodeA = connection.userData.nodeA;
        const nodeB = connection.userData.nodeB;
        
        // Update the curve points
        const points = [];
        points.push(nodeA.position.clone());
        
        // Update midpoint
        const midPoint = new THREE.Vector3().addVectors(nodeA.position, nodeB.position).multiplyScalar(0.5);
        const offset = connection.userData.midPoint.clone().sub(new THREE.Vector3(0, 0, 0)).normalize().multiplyScalar(Math.random() * 0.1 + 1.9);
        midPoint.add(offset);
        points.push(midPoint);
        
        points.push(nodeB.position.clone());
        
        // Create new curve
        const curve = new THREE.QuadraticBezierCurve3(
          nodeA.position,
          midPoint,
          nodeB.position
        );
        
        // Update geometry
        connection.geometry.dispose();
        connection.geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(20));
      });
      
      // Animate flow particles
      flowParticles.forEach(particle => {
        particle.userData.progress += particle.userData.speed;
        
        if (particle.userData.progress > 1) {
          particle.userData.progress = 0;
        }
        
        const connection = particle.userData.connection;
        const nodeA = connection.userData.nodeA;
        const nodeB = connection.userData.nodeB;
        const midPoint = connection.userData.midPoint;
        
        // Calculate position along the curve
        const curve = new THREE.QuadraticBezierCurve3(
          nodeA.position,
          midPoint,
          nodeB.position
        );
        
        const position = curve.getPointAt(particle.userData.progress);
        particle.position.copy(position);
        
        // Pulse the particle size
        const scale = 1 + Math.sin(clock.elapsedTime * 5 + particle.userData.progress * 10) * 0.3;
        particle.scale.set(scale, scale, scale);
      });
      
      // Animate ambient particles
      const positions = ambientParticleGeometry.attributes.position.array;
      for (let i = 0; i < ambientParticleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(clock.elapsedTime * 0.1 + i * 0.1) * 0.01;
      }
      ambientParticleGeometry.attributes.position.needsUpdate = true;
      
      // Update controls
      controls.update();
      
      // Render the scene
      composer.render();
    };
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
      composer.setSize(currentRef.clientWidth, currentRef.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Add interactive camera movement on mouse move
    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      gsap.to(camera.position, {
        x: mouseX * 2,
        y: mouseY * 2,
        duration: 1
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    animate();
    setIsLoaded(true);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Dispose geometries and materials
      nodes.forEach(node => {
        node.geometry.dispose();
        node.material.dispose();
      });
      
      connections.forEach(connection => {
        connection.geometry.dispose();
        connection.material.dispose();
      });
      
      flowParticles.forEach(particle => {
        particle.geometry.dispose();
        particle.material.dispose();
      });
      
      ambientParticleGeometry.dispose();
      ambientParticleMaterial.dispose();
      
      // Remove renderer
      currentRef.removeChild(renderer.domElement);
    };
  }, []);
  
  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: height,
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 1s ease-in-out'
      }}
    >
      <div className="overlay-text" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: 'white',
        zIndex: 10,
        pointerEvents: 'none',
        textShadow: '0 0 10px rgba(0,0,0,0.5)'
      }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Global Network</h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px' }}>
          Connecting businesses across 195+ countries with seamless payment processing
        </p>
      </div>
    </div>
  );
};

export default SunnyDataFlow;