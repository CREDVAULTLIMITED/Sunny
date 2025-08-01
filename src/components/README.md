# Sunny Visualization Components

This directory contains advanced 3D visualization components for the Sunny payment platform. These components provide interactive, engaging ways to visualize Sunny's global payment ecosystem.

## Core Visualization Components

### SunnyTerrain

An innovative 3D terrain visualization that represents Sunny's global payment landscape. Each region on the terrain represents a different market or payment region, with heights indicating transaction volumes or other metrics.

**Features:**
- Interactive 3D terrain with dynamic lighting
- Region-based visualization with color coding
- Flowing data streams between regions
- Interactive tooltips on hover
- Animated particles and atmospheric effects

### SunnyDataFlow

A fluid network visualization showing how data and payments flow through the Sunny network. This component creates an abstract representation of global connectivity with nodes and flowing data particles.

**Features:**
- Dynamic node network with physics-based animation
- Flowing data particles along connection paths
- Interactive camera movement
- Bloom effects and post-processing for visual appeal
- Ambient particle system for depth

### SunnyPaymentEcosystem

A comprehensive visualization of Sunny's payment ecosystem, showing the relationships between different payment modules, methods, and the core processing system.

**Features:**
- Central hub representing Sunny's core payment system
- Surrounding modules for different payment capabilities
- Interactive elements with hover information
- Data flow visualization between components
- Animated elements that respond to user interaction

## Usage

Import these components directly:

```jsx
import { SunnyTerrain, SunnyDataFlow, SunnyPaymentEcosystem } from '../components';

// Or use the pre-built sections
import { 
  SunnyTerrainSection, 
  SunnyDataFlowSection, 
  SunnyPaymentEcosystemSection 
} from '../components';
```

### Basic Example

```jsx
import React from 'react';
import { SunnyTerrain } from '../components';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        {/* Other content */}
      </section>
      
      <section className="visualization-section">
        <h2>Our Global Network</h2>
        <SunnyTerrain height="600px" />
      </section>
      
      {/* Other sections */}
    </div>
  );
};
```

### With Custom Data

```jsx
import React from 'react';
import { SunnyTerrain } from '../components';

const REGION_DATA = [
  { id: 'us', name: 'United States', value: 85, color: 0x6772e5 },
  { id: 'eu', name: 'Europe', value: 72, color: 0x24b47e },
  // More regions...
];

const AnalyticsPage = () => {
  return (
    <div className="analytics-page">
      <h1>Global Transaction Analytics</h1>
      <SunnyTerrain data={REGION_DATA} height="500px" />
    </div>
  );
};
```

## Performance Notes

These visualizations use WebGL through Three.js and are optimized for performance. However, they are still resource-intensive. Consider the following:

1. Use the `height` prop to control the size and thus the rendering load
2. For mobile devices, you may want to use simpler visualizations or reduce particle counts
3. The components automatically handle cleanup to prevent memory leaks

## Dependencies

- Three.js for 3D rendering
- GSAP for animations
- React for component structure

## Browser Support

These visualizations work in all modern browsers that support WebGL:
- Chrome 9+
- Firefox 4+
- Safari 5.1+
- Edge 12+
- Opera 12+