import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const StylizedGlobe = () => {
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // Removed unused variable
  // const [hoverD, setHoverD] = useState(null);

  useEffect(() => {
    // Current reference to the DOM element
    const currentRef = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentRef.clientWidth / currentRef.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    
    renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
    currentRef.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = false;
    
    // Earth geometry
    const earthGeometry = new THREE.SphereGeometry(5, 64, 64);
    
    // Earth material with stylized shader
    const earthMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec2 vUv;
        uniform float time;
        
        void main() {
          // Stylized gradient colors
          vec3 color1 = vec3(0.1, 0.2, 0.3);
          vec3 color2 = vec3(0.2, 0.3, 0.4);
          
          // Create gradient based on latitude
          float latitude = asin(vNormal.y) / 3.14159 + 0.5;
          vec3 baseColor = mix(color1, color2, latitude);
          
          // Add subtle pulse effect
          float pulse = sin(time * 0.5) * 0.05 + 0.95;
          
          // Add edge glow
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 glow = vec3(0.3, 0.4, 0.5) * intensity * 0.5;
          
          gl_FragColor = vec4(baseColor * pulse + glow, 1.0);
        }
      `,
      uniforms: {
        time: { value: 0.0 }
      }
    });
    
    // Create the Earth mesh
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    
    // Add atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(5.2, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform float time;
        
        void main() {
          // Animated glow color
          vec3 baseGlow = vec3(0.3, 0.4, 0.6);
          float pulseRate = sin(time * 0.3) * 0.1 + 0.9;
          vec3 glowColor = baseGlow * pulseRate;
          
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
          gl_FragColor = vec4(glowColor, 1.0) * intensity;
        }
      `,
      uniforms: {
        time: { value: 0.0 }
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
    
    // Add stylized grid lines
    const gridGeometry = new THREE.SphereGeometry(5.02, 36, 18);
    const gridMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec2 vUv;
        uniform float time;
        
        float grid(vec2 uv, float size) {
          vec2 grid = fract(uv * size);
          return (step(0.98, grid.x) + step(0.98, grid.y)) * 0.5;
        }
        
        void main() {
          // Create grid pattern
          float gridX = grid(vUv, 36.0);
          float gridY = grid(vUv, 18.0);
          
          // Combine grids with pulsing effect
          float gridValue = (gridX + gridY) * (0.9 + sin(time * 0.5) * 0.1);
          
          // Fade grid at poles
          float polarFade = pow(abs(vNormal.y), 2.0);
          gridValue *= (1.0 - polarFade);
          
          // Set color and opacity
          vec3 gridColor = vec3(0.5, 0.6, 0.8);
          gl_FragColor = vec4(gridColor, gridValue * 0.3);
        }
      `,
      uniforms: {
        time: { value: 0.0 }
      },
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    
    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    scene.add(grid);
    
    // Position camera
    camera.position.z = 10;
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Update shader uniforms
      earthMaterial.uniforms.time.value = elapsedTime;
      atmosphereMaterial.uniforms.time.value = elapsedTime;
      gridMaterial.uniforms.time.value = elapsedTime;
      
      // Rotate the earth slowly
      earth.rotation.y = elapsedTime * 0.1;
      grid.rotation.y = elapsedTime * 0.1;
      
      controls.update();
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
      currentRef.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: '600px',
        borderRadius: '8px',
        overflow: 'hidden',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 1s ease-in-out'
      }}
    />
  );
};

export default StylizedGlobe;