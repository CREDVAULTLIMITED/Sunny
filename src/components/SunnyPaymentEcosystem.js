import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';

const SunnyPaymentEcosystem = ({ height = '70vh' }) => {
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);

  useEffect(() => {
    const currentRef = mountRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0a0a0f');
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, currentRef.clientWidth / currentRef.clientHeight, 0.1, 1000);
    camera.position.set(0, 10, 20);
    camera.lookAt(0, 0, 0);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentRef.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.2;
    controls.minDistance = 10;
    controls.maxDistance = 30;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x333333, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    // Add point lights for atmosphere - Sunny brand colors
    const colors = [0x6772e5, 0x24b47e, 0xff6b6b, 0xffa94d];
    
    colors.forEach((color, i) => {
      const pointLight = new THREE.PointLight(color, 0.5, 20);
      const angle = (i / colors.length) * Math.PI * 2;
      const radius = 10;
      pointLight.position.set(
        Math.cos(angle) * radius,
        3 + Math.random() * 5,
        Math.sin(angle) * radius
      );
      scene.add(pointLight);
      
      // Animate the lights
      gsap.to(pointLight.position, {
        y: pointLight.position.y + 2,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
    
    // Create central hub - Sunny's core payment system
    const coreGeometry = new THREE.IcosahedronGeometry(2, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x6772e5,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x6772e5,
      emissiveIntensity: 0.2
    });
    
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.position.set(0, 0, 0);
    core.castShadow = true;
    core.receiveShadow = true;
    core.userData = { type: 'core', name: 'Sunny Core', description: 'Central payment processing system' };
    scene.add(core);
    
    // Animate core rotation
    gsap.to(core.rotation, {
      y: Math.PI * 2,
      duration: 20,
      repeat: -1,
      ease: "none"
    });
    
    // Add glow effect to core
    const glowGeometry = new THREE.IcosahedronGeometry(2.2, 1);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x6772e5,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide
    });
    
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.copy(core.position);
    scene.add(glow);
    
    // Animate glow
    gsap.to(glow.scale, {
      x: 1.1,
      y: 1.1,
      z: 1.1,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    // Create payment modules around the core
    const modules = [];
    const moduleCount = 6;
    const moduleTypes = [
      { name: 'Card Processing', color: 0x24b47e, icon: 'credit-card' },
      { name: 'Mobile Payments', color: 0xff6b6b, icon: 'smartphone' },
      { name: 'Crypto Gateway', color: 0xffa94d, icon: 'bitcoin' },
      { name: 'Bank Transfers', color: 0x2196f3, icon: 'bank' },
      { name: 'Subscription Management', color: 0x9c27b0, icon: 'repeat' },
      { name: 'Fraud Prevention', color: 0x4caf50, icon: 'shield' }
    ];
    
    for (let i = 0; i < moduleCount; i++) {
      const angle = (i / moduleCount) * Math.PI * 2;
      const radius = 7;
      
      const moduleType = moduleTypes[i % moduleTypes.length];
      
      // Create module
      const moduleGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
      const moduleMaterial = new THREE.MeshStandardMaterial({
        color: moduleType.color,
        metalness: 0.5,
        roughness: 0.5,
        emissive: moduleType.color,
        emissiveIntensity: 0.1
      });
      
      const module = new THREE.Mesh(moduleGeometry, moduleMaterial);
      module.position.set(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      );
      
      module.castShadow = true;
      module.receiveShadow = true;
      module.userData = { 
        type: 'module', 
        name: moduleType.name, 
        description: `${moduleType.name} processing module`,
        color: moduleType.color
      };
      
      scene.add(module);
      modules.push(module);
      
      // Animate module rotation
      gsap.to(module.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 10 + Math.random() * 5,
        repeat: -1,
        ease: "none"
      });
      
      // Create connection to core
      const points = [];
      points.push(new THREE.Vector3(0, 0, 0)); // Core position
      points.push(module.position.clone());
      
      const connectionGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const connectionMaterial = new THREE.LineBasicMaterial({ 
        color: moduleType.color,
        transparent: true,
        opacity: 0.5,
        linewidth: 2
      });
      
      const connection = new THREE.Line(connectionGeometry, connectionMaterial);
      scene.add(connection);
      
      // Add data flow particles along connection
      const particleCount = 5;
      
      for (let p = 0; p < particleCount; p++) {
        const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const particleMaterial = new THREE.MeshBasicMaterial({
          color: moduleType.color,
          transparent: true,
          opacity: 0.8
        });
        
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        scene.add(particle);
        
        // Animate particle along the connection
        gsap.to(particle, {
          onUpdate: function() {
            const progress = (this.progress() + (p / particleCount)) % 1;
            
            // Alternate direction based on particle index
            const actualProgress = p % 2 === 0 ? progress : 1 - progress;
            
            particle.position.lerpVectors(
              core.position,
              module.position,
              actualProgress
            );
          },
          duration: 2 + Math.random() * 2,
          repeat: -1,
          ease: "none"
        });
      }
    }
    
    // Add payment methods floating above
    const paymentMethods = [
      { name: 'Credit Cards', position: new THREE.Vector3(-8, 6, -5), color: 0x6772e5 },
      { name: 'Mobile Wallets', position: new THREE.Vector3(8, 6, -5), color: 0x24b47e },
      { name: 'Bank Accounts', position: new THREE.Vector3(0, 6, 8), color: 0xff6b6b }
    ];
    
    paymentMethods.forEach(method => {
      const methodGeometry = new THREE.TorusGeometry(1, 0.3, 16, 32);
      const methodMaterial = new THREE.MeshStandardMaterial({
        color: method.color,
        metalness: 0.7,
        roughness: 0.3,
        emissive: method.color,
        emissiveIntensity: 0.2
      });
      
      const methodMesh = new THREE.Mesh(methodGeometry, methodMaterial);
      methodMesh.position.copy(method.position);
      methodMesh.castShadow = true;
      methodMesh.userData = { 
        type: 'method', 
        name: method.name, 
        description: `${method.name} payment method`,
        color: method.color
      };
      
      scene.add(methodMesh);
      
      // Animate rotation
      gsap.to(methodMesh.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 15 + Math.random() * 5,
        repeat: -1,
        ease: "none"
      });
      
      // Connect to relevant modules
      modules.forEach((module, i) => {
        if (i % 2 === 0) { // Connect only to some modules
          const points = [];
          points.push(methodMesh.position.clone());
          points.push(module.position.clone());
          
          const connectionGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const connectionMaterial = new THREE.LineDashedMaterial({ 
            color: method.color,
            dashSize: 0.3,
            gapSize: 0.2,
            transparent: true,
            opacity: 0.3
          });
          
          const connection = new THREE.Line(connectionGeometry, connectionMaterial);
          connection.computeLineDistances();
          scene.add(connection);
        }
      });
    });
    
    // Add atmospheric particles
    const particleCount = 300;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 30;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 30;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 30;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
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
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.2,
      transparent: true,
      opacity: 0.6,
      map: particleTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    
    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredObject = null;
    
    const handleMouseMove = (event) => {
      // Calculate mouse position in normalized device coordinates
      const rect = currentRef.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);
      
      // Get all interactive objects
      const interactiveObjects = [core, ...modules, ...scene.children.filter(child => 
        child.userData && (child.userData.type === 'method')
      )];
      
      // Calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(interactiveObjects);
      
      // Reset cursor and hover state
      currentRef.style.cursor = 'default';
      
      if (hoveredObject && (!intersects.length || hoveredObject !== intersects[0].object)) {
        gsap.to(hoveredObject.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3
        });
        
        setHoveredElement(null);
        hoveredObject = null;
      }
      
      if (intersects.length > 0) {
        currentRef.style.cursor = 'pointer';
        hoveredObject = intersects[0].object;
        
        gsap.to(hoveredObject.scale, {
          x: 1.2,
          y: 1.2,
          z: 1.2,
          duration: 0.3
        });
        
        setHoveredElement({
          name: hoveredObject.userData.name,
          description: hoveredObject.userData.description,
          color: hoveredObject.userData.color
        });
      }
    };
    
    currentRef.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();
      
      // Rotate particles
      particles.rotation.y = time * 0.05;
      
      // Animate particles
      const positions = particleGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time + i * 0.1) * 0.01;
      }
      particleGeometry.attributes.position.needsUpdate = true;
      
      // Update controls
      controls.update();
      
      // Render
      renderer.render(scene, camera);
    };
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Start animation
    animate();
    setIsLoaded(true);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      currentRef.removeEventListener('mousemove', handleMouseMove);
      
      // Dispose geometries and materials
      scene.traverse(object => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      // Remove renderer
      currentRef.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="sunny-ecosystem-container" style={{ position: 'relative' }}>
      <div 
        ref={mountRef} 
        style={{ 
          width: '100%', 
          height: height,
          borderRadius: '12px',
          overflow: 'hidden',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1s ease-in-out'
        }}
      />
      
      {hoveredElement && (
        <div className="element-tooltip" style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(10, 10, 15, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '8px',
          padding: '15px 20px',
          color: 'white',
          maxWidth: '300px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
          border: `1px solid ${new THREE.Color(hoveredElement.color).getStyle()}`,
          zIndex: 10,
          textAlign: 'center'
        }}>
          <h3 style={{ 
            margin: '0 0 5px 0', 
            color: new THREE.Color(hoveredElement.color).getStyle() 
          }}>
            {hoveredElement.name}
          </h3>
          <p style={{ margin: '0', fontSize: '0.9rem' }}>
            {hoveredElement.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default SunnyPaymentEcosystem;