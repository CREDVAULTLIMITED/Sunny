import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';

// Simplex noise implementation for terrain generation
class SimplexNoise {
  constructor() {
    this.grad3 = [
      [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
      [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
      [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]
    ];
    this.p = [];
    for (let i = 0; i < 256; i++) {
      this.p[i] = Math.floor(Math.random() * 256);
    }
    
    // To remove the need for index wrapping, double the permutation table length
    this.perm = new Array(512);
    this.gradP = new Array(512);
    
    // Skipping the rest of the initialization for brevity
    this.seed(0);
  }
  
  seed(seed) {
    if (seed > 0 && seed < 1) {
      // Scale the seed out
      seed *= 65536;
    }
    
    seed = Math.floor(seed);
    if (seed < 256) {
      seed |= seed << 8;
    }
    
    for (let i = 0; i < 256; i++) {
      let v;
      if (i & 1) {
        v = this.p[i] ^ (seed & 255);
      } else {
        v = this.p[i] ^ ((seed >> 8) & 255);
      }
      
      this.perm[i] = this.perm[i + 256] = v;
      this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12];
    }
  }
  
  // 2D simplex noise
  noise(xin, yin) {
    // For simplicity, using a basic implementation
    return (Math.sin(xin * 0.5) * Math.cos(yin * 0.5) + 
            Math.sin(xin * 1.0) * Math.cos(yin * 1.0) * 0.5 + 
            Math.sin(xin * 2.0) * Math.cos(yin * 2.0) * 0.25) * 0.5 + 0.5;
  }
}

const SunnyTerrain = ({ data = [], height = '70vh' }) => {
  const mountRef = useRef(null);
  const [activeRegion, setActiveRegion] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const currentRef = mountRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0a0a0f');
    scene.fog = new THREE.FogExp2('#0a0a0f', 0.02);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, currentRef.clientWidth / currentRef.clientHeight, 0.1, 1000);
    camera.position.set(0, 15, 30);
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
    controls.minDistance = 15;
    controls.maxDistance = 50;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x333333, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -30;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.camera.bottom = -30;
    scene.add(directionalLight);
    
    // Add subtle point lights for atmosphere - Sunny brand colors
    const colors = [0x6772e5, 0x24b47e, 0xff6b6b, 0xffa94d];
    
    colors.forEach((color, i) => {
      const pointLight = new THREE.PointLight(color, 0.5, 20);
      const angle = (i / colors.length) * Math.PI * 2;
      const radius = 15;
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
    
    // Create terrain
    const terrainSize = 50;
    const resolution = 128;
    const geometry = new THREE.PlaneGeometry(
      terrainSize, 
      terrainSize, 
      resolution - 1, 
      resolution - 1
    );
    geometry.rotateX(-Math.PI / 2);
    
    // Generate terrain heightmap
    const simplex = new SimplexNoise();
    const vertices = geometry.attributes.position.array;
    
    // Create regions data structure
    const regions = [];
    const regionCount = data.length || 8;
    
    // Default regions if no data provided
    const defaultRegions = [
      { id: 'us', name: 'United States', value: 85, color: 0x6772e5 },
      { id: 'eu', name: 'Europe', value: 72, color: 0x24b47e },
      { id: 'asia', name: 'Asia Pacific', value: 65, color: 0xff6b6b },
      { id: 'africa', name: 'Africa', value: 45, color: 0xffa94d },
      { id: 'sa', name: 'South America', value: 58, color: 0x9c27b0 },
      { id: 'au', name: 'Australia', value: 62, color: 0x2196f3 },
      { id: 'ca', name: 'Canada', value: 70, color: 0x4caf50 },
      { id: 'me', name: 'Middle East', value: 55, color: 0xff9800 }
    ];
    
    for (let i = 0; i < regionCount; i++) {
      const angle = (i / regionCount) * Math.PI * 2;
      const distance = terrainSize * 0.3;
      
      const regionData = data[i] || defaultRegions[i % defaultRegions.length];
      
      regions.push({
        id: regionData.id,
        name: regionData.name,
        value: regionData.value,
        center: new THREE.Vector2(
          Math.cos(angle) * distance,
          Math.sin(angle) * distance
        ),
        radius: 5 + Math.random() * 5,
        height: 2 + (regionData.value / 100) * 5, // Height based on value
        color: regionData.color
      });
    }
    
    // Apply height to terrain
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const z = vertices[i + 2];
      
      // Base terrain with simplex noise
      let height = simplex.noise(x * 0.02, z * 0.02) * 0.5;
      height += simplex.noise(x * 0.04, z * 0.04) * 0.25;
      
      // Add region-based heights
      for (const region of regions) {
        const point = new THREE.Vector2(x, z);
        const distance = point.distanceTo(region.center);
        
        if (distance < region.radius) {
          // Create a peak for each region
          const influence = 1 - (distance / region.radius);
          const peakHeight = region.height * Math.pow(influence, 2);
          height += peakHeight;
        }
      }
      
      // Apply height
      vertices[i + 1] = height;
    }
    
    // Update normals for lighting
    geometry.computeVertexNormals();
    
    // Create terrain material
    const terrainMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 0.1,
      roughness: 0.8,
      flatShading: false,
      vertexColors: true
    });
    
    // Add vertex colors based on height and regions
    const colors2 = new Float32Array(vertices.length);
    
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      const z = vertices[i + 2];
      
      // Default color based on height
      let color = new THREE.Color(0x222222);
      
      // Blend with region colors
      for (const region of regions) {
        const point = new THREE.Vector2(x, z);
        const distance = point.distanceTo(region.center);
        
        if (distance < region.radius * 1.2) {
          const influence = 1 - (distance / (region.radius * 1.2));
          const regionColor = new THREE.Color(region.color);
          
          // Blend colors based on influence
          color.lerp(regionColor, influence * 0.7);
        }
      }
      
      // Apply color
      colors2[i] = color.r;
      colors2[i + 1] = color.g;
      colors2[i + 2] = color.b;
    }
    
    geometry.setAttribute('color', new THREE.BufferAttribute(colors2, 3));
    
    // Create terrain mesh
    const terrain = new THREE.Mesh(geometry, terrainMaterial);
    terrain.receiveShadow = true;
    terrain.castShadow = true;
    scene.add(terrain);
    
    // Add region markers
    const markers = [];
    
    regions.forEach(region => {
      // Create marker base
      const markerGeometry = new THREE.CylinderGeometry(0.2, 0.5, region.height * 1.5, 6);
      const markerMaterial = new THREE.MeshStandardMaterial({
        color: region.color,
        metalness: 0.3,
        roughness: 0.7,
        emissive: region.color,
        emissiveIntensity: 0.2
      });
      
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      
      // Position marker on terrain
      marker.position.set(
        region.center.x,
        region.height + 0.75,
        region.center.y
      );
      
      marker.castShadow = true;
      marker.userData = { region };
      scene.add(marker);
      markers.push(marker);
      
      // Add floating icon above marker
      const iconGeometry = new THREE.OctahedronGeometry(0.5, 0);
      const iconMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: region.color,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2
      });
      
      const icon = new THREE.Mesh(iconGeometry, iconMaterial);
      icon.position.set(
        region.center.x,
        region.height + 2.5,
        region.center.y
      );
      icon.castShadow = true;
      scene.add(icon);
      
      // Animate icon
      gsap.to(icon.position, {
        y: icon.position.y + 0.5,
        duration: 1.5 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      gsap.to(icon.rotation, {
        y: Math.PI * 2,
        duration: 5 + Math.random() * 5,
        repeat: -1,
        ease: "none"
      });
      
      // Add pulsing light
      const pulseLight = new THREE.PointLight(region.color, 1, 5);
      pulseLight.position.copy(icon.position);
      scene.add(pulseLight);
      
      gsap.to(pulseLight, {
        intensity: 0.5,
        duration: 1 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
    
    // Add data streams between regions
    const streams = [];
    
    for (let i = 0; i < regions.length; i++) {
      const sourceRegion = regions[i];
      
      // Connect to 1-3 other regions
      const connectionCount = Math.floor(Math.random() * 3) + 1;
      
      for (let j = 0; j < connectionCount; j++) {
        // Select a target region that isn't the source
        const targetIndex = (i + 1 + Math.floor(Math.random() * (regions.length - 1))) % regions.length;
        const targetRegion = regions[targetIndex];
        
        // Create a curved path between regions
        const start = new THREE.Vector3(
          sourceRegion.center.x,
          sourceRegion.height + 1.5,
          sourceRegion.center.y
        );
        
        const end = new THREE.Vector3(
          targetRegion.center.x,
          targetRegion.height + 1.5,
          targetRegion.center.y
        );
        
        // Create a midpoint for the curve
        const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        midPoint.y += 5 + Math.random() * 5;
        
        // Create a quadratic bezier curve
        const curve = new THREE.QuadraticBezierCurve3(start, midPoint, end);
        const points = curve.getPoints(30);
        const streamGeometry = new THREE.BufferGeometry().setFromPoints(points);
        
        // Create gradient material
        const streamMaterial = new THREE.LineDashedMaterial({
          color: new THREE.Color(sourceRegion.color).lerp(new THREE.Color(targetRegion.color), 0.5),
          linewidth: 1,
          scale: 1,
          dashSize: 0.3,
          gapSize: 0.2,
          transparent: true,
          opacity: 0.7
        });
        
        const stream = new THREE.Line(streamGeometry, streamMaterial);
        stream.computeLineDistances();
        scene.add(stream);
        streams.push({
          line: stream,
          source: sourceRegion,
          target: targetRegion
        });
        
        // Add flowing particles along the stream
        const particleCount = 5 + Math.floor(Math.random() * 5);
        
        for (let p = 0; p < particleCount; p++) {
          const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
          const particleMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(sourceRegion.color).lerp(new THREE.Color(targetRegion.color), Math.random()),
            transparent: true,
            opacity: 0.8
          });
          
          const particle = new THREE.Mesh(particleGeometry, particleMaterial);
          scene.add(particle);
          
          // Animate particle along the curve
          gsap.to(particle, {
            onUpdate: function() {
              const progress = this.progress();
              const position = curve.getPointAt(progress);
              particle.position.copy(position);
            },
            duration: 2 + Math.random() * 2,
            repeat: -1,
            ease: "none"
          });
        }
      }
    }
    
    // Add atmospheric particles
    const particleCount = 500;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * terrainSize * 1.5;
      particlePositions[i3 + 1] = Math.random() * 15;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * terrainSize * 1.5;
      particleSizes[i] = Math.random() * 0.5 + 0.1;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
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
    let hoveredMarker = null;
    
    const handleMouseMove = (event) => {
      // Calculate mouse position in normalized device coordinates
      const rect = currentRef.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);
      
      // Calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(markers);
      
      // Reset cursor and hover state
      currentRef.style.cursor = 'default';
      
      if (hoveredMarker && (!intersects.length || hoveredMarker !== intersects[0].object)) {
        gsap.to(hoveredMarker.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3
        });
        hoveredMarker = null;
      }
      
      if (intersects.length > 0) {
        currentRef.style.cursor = 'pointer';
        hoveredMarker = intersects[0].object;
        
        gsap.to(hoveredMarker.scale, {
          x: 1.2,
          y: 1.2,
          z: 1.2,
          duration: 0.3
        });
      }
    };
    
    const handleClick = (event) => {
      if (hoveredMarker) {
        const region = hoveredMarker.userData.region;
        setActiveRegion(region);
        
        // Animate camera to focus on the region
        gsap.to(camera.position, {
          x: region.center.x * 1.5,
          y: region.height + 10,
          z: region.center.y * 1.5,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: () => {
            camera.lookAt(region.center.x, region.height, region.center.y);
          }
        });
        
        // Highlight the selected region
        markers.forEach(marker => {
          const isSelected = marker.userData.region.id === region.id;
          gsap.to(marker.material, {
            emissiveIntensity: isSelected ? 0.8 : 0.2,
            duration: 0.5
          });
        });
      }
    };
    
    currentRef.addEventListener('mousemove', handleMouseMove);
    currentRef.addEventListener('click', handleClick);
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      
      // Animate terrain subtle movement
      const time = clock.getElapsedTime() * 0.2;
      const vertices = geometry.attributes.position.array;
      
      for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const z = vertices[i + 2];
        
        // Skip vertices near region centers to keep peaks stable
        let skipVertex = false;
        for (const region of regions) {
          const point = new THREE.Vector2(x, z);
          if (point.distanceTo(region.center) < region.radius * 0.8) {
            skipVertex = true;
            break;
          }
        }
        
        if (!skipVertex) {
          // Add subtle wave motion to the terrain
          vertices[i + 1] += Math.sin(time + x * 0.5 + z * 0.5) * 0.01;
        }
      }
      
      geometry.attributes.position.needsUpdate = true;
      
      // Animate particles
      const positions = particleGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time + i * 0.1) * 0.01;
        
        // Wrap particles that go too high
        if (positions[i3 + 1] > 20) {
          positions[i3 + 1] = 0;
        }
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
      currentRef.removeEventListener('click', handleClick);
      
      // Dispose geometries and materials
      geometry.dispose();
      terrainMaterial.dispose();
      
      markers.forEach(marker => {
        marker.geometry.dispose();
        marker.material.dispose();
      });
      
      streams.forEach(stream => {
        stream.line.geometry.dispose();
        stream.line.material.dispose();
      });
      
      particleGeometry.dispose();
      particleMaterial.dispose();
      
      // Remove renderer
      currentRef.removeChild(renderer.domElement);
    };
  }, [data]);

  return (
    <div className="sunny-terrain-container" style={{ position: 'relative' }}>
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
      
      {activeRegion && (
        <div className="region-info-panel" style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(10, 10, 15, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '8px',
          padding: '20px',
          color: 'white',
          maxWidth: '300px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
          border: `1px solid ${new THREE.Color(activeRegion.color).getStyle()}`,
          zIndex: 10
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: new THREE.Color(activeRegion.color).getStyle() }}>
            {activeRegion.name}
          </h3>
          <p style={{ margin: '0 0 15px 0' }}>
            Value: {activeRegion.value.toLocaleString()}
          </p>
          <button 
            onClick={() => setActiveRegion(null)}
            style={{
              background: 'transparent',
              border: '1px solid white',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default SunnyTerrain;