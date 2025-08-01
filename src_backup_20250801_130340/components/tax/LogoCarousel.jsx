import React, { useState, useEffect } from 'react';
import './LogoCarousel.css';

const LogoCarousel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);
  
  const logos = [
    {
      name: 'Adobe',
      src: '/assets/images/client-logos/adobe.svg',
      alt: 'Adobe logo'
    },
    {
      name: 'Shopify',
      src: '/assets/images/client-logos/shopify.svg',
      alt: 'Shopify logo'
    },
    {
      name: 'Zoom',
      src: '/assets/images/client-logos/zoom.svg',
      alt: 'Zoom logo'
    },
    {
      name: 'Atlassian',
      src: '/assets/images/client-logos/atlassian.svg',
      alt: 'Atlassian logo'
    },
    {
      name: 'Dropbox',
      src: '/assets/images/client-logos/dropbox.svg',
      alt: 'Dropbox logo'
    },
    {
      name: 'Slack',
      src: '/assets/images/client-logos/slack.svg',
      alt: 'Slack logo'
    },
    {
      name: 'DocuSign',
      src: '/assets/images/client-logos/docusign.svg',
      alt: 'DocuSign logo'
    },
    {
      name: 'Asana',
      src: '/assets/images/client-logos/asana.svg',
      alt: 'Asana logo'
    }
  ];

  useEffect(() => {
    // Preload all images
    const imagePromises = logos.map(logo => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => prev + 1);
          resolve();
        };
        img.onerror = reject;
        img.src = logo.src;
      });
    });

    Promise.all(imagePromises)
      .then(() => setIsLoading(false))
      .catch(error => console.error('Error loading logo images:', error));
  }, []);

  if (isLoading) {
    const progress = Math.round((loadedImages / logos.length) * 100);
    return (
      <div className="logo-carousel-loading">
        <div className="loading-progress" style={{ width: `${progress}%` }} />
      </div>
    );
  }

  return (
    <div className="logo-carousel">
      <div className="logo-track">
        {/* Duplicate logos for seamless infinite scroll */}
        {[...logos, ...logos].map((logo, index) => (
          <div key={`${logo.name}-${index}`} className="logo-slide">
            <img 
              src={logo.src} 
              alt={logo.alt}
              loading={index >= logos.length ? "lazy" : "eager"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoCarousel;
