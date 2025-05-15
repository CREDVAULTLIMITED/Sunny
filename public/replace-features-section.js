/**
 * Script to completely replace the features section with a clean implementation
 */
document.addEventListener('DOMContentLoaded', function() {
  // Wait for the page to fully load
  setTimeout(function() {
    replaceFeatureSection();
  }, 500);
});

/**
 * Replace the features section with a clean implementation
 */
function replaceFeatureSection() {
  // Get the features section
  const featuresSection = document.getElementById('features-grid');
  if (!featuresSection) return;
  
  // Create new HTML for the features section
  const newHTML = `
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
      <div class="section-header" style="text-align: center; max-width: 700px; margin: 0 auto 60px;">
        <h2 style="font-size: 36px; font-weight: 700; margin-bottom: 16px; color: #333; text-align: center;">Everything You Need to Accept Payments</h2>
        <p style="font-size: 18px; line-height: 1.5; color: #666; text-align: center;">A complete toolkit for global commerce</p>
      </div>
      
      <div class="features-container" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
        <div class="feature-item" style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease; border: 1px solid #f1f5f9; display: flex; flex-direction: column; align-items: center; text-align: center;">
          <div class="feature-icon" style="width: 60px; height: 60px; background-color: #f0f9ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; color: #0284c7;">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
            </svg>
          </div>
          <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 12px; color: #333; text-align: center; width: 100%;">Global Payments</h3>
          <p style="font-size: 16px; color: #666; line-height: 1.5; margin-bottom: 16px; text-align: center; width: 100%;">Accept payments in 135+ currencies with local payment methods</p>
          <a href="signup-enhanced.html" class="feature-link" style="display: inline-block; margin-top: auto; color: #0ea5e9; font-weight: 500; text-decoration: none;">Start Now</a>
        </div>
        
        <div class="feature-item" style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease; border: 1px solid #f1f5f9; display: flex; flex-direction: column; align-items: center; text-align: center;">
          <div class="feature-icon" style="width: 60px; height: 60px; background-color: #f0f9ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; color: #0284c7;">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
            </svg>
          </div>
          <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 12px; color: #333; text-align: center; width: 100%;">Fraud Protection</h3>
          <p style="font-size: 16px; color: #666; line-height: 1.5; margin-bottom: 16px; text-align: center; width: 100%;">Advanced AI-powered fraud detection and prevention</p>
        </div>
        
        <div class="feature-item" style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease; border: 1px solid #f1f5f9; display: flex; flex-direction: column; align-items: center; text-align: center;">
          <div class="feature-icon" style="width: 60px; height: 60px; background-color: #f0f9ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; color: #0284c7;">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </div>
          <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 12px; color: #333; text-align: center; width: 100%;">Smart Routing</h3>
          <p style="font-size: 16px; color: #666; line-height: 1.5; margin-bottom: 16px; text-align: center; width: 100%;">Optimize payment success rates with intelligent routing</p>
          <a href="dashboard-enhanced.html#routing" class="feature-link" style="display: inline-block; margin-top: auto; color: #0ea5e9; font-weight: 500; text-decoration: none;">Explore Routing Options</a>
        </div>
        
        <div class="feature-item" style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease; border: 1px solid #f1f5f9; display: flex; flex-direction: column; align-items: center; text-align: center;">
          <div class="feature-icon" style="width: 60px; height: 60px; background-color: #f0f9ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; color: #0284c7;">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
            </svg>
          </div>
          <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 12px; color: #333; text-align: center; width: 100%;">Multi-currency Support</h3>
          <p style="font-size: 16px; color: #666; line-height: 1.5; margin-bottom: 16px; text-align: center; width: 100%;">Charge in local currencies and settle in your preferred currency</p>
        </div>
        
        <div class="feature-item" style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease; border: 1px solid #f1f5f9; display: flex; flex-direction: column; align-items: center; text-align: center;">
          <div class="feature-icon" style="width: 60px; height: 60px; background-color: #f0f9ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; color: #0284c7;">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
          </div>
          <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 12px; color: #333; text-align: center; width: 100%;">Real-time Analytics</h3>
          <p style="font-size: 16px; color: #666; line-height: 1.5; margin-bottom: 16px; text-align: center; width: 100%;">Comprehensive dashboards with actionable insights</p>
          <a href="dashboard-enhanced.html" class="feature-link" style="display: inline-block; margin-top: auto; color: #0ea5e9; font-weight: 500; text-decoration: none;">View Dashboard Demo</a>
        </div>
        
        <div class="feature-item" style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease; border: 1px solid #f1f5f9; display: flex; flex-direction: column; align-items: center; text-align: center;">
          <div class="feature-icon" style="width: 60px; height: 60px; background-color: #f0f9ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; color: #0284c7;">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
            </svg>
          </div>
          <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 12px; color: #333; text-align: center; width: 100%;">Instant Payouts</h3>
          <p style="font-size: 16px; color: #666; line-height: 1.5; margin-bottom: 16px; text-align: center; width: 100%;">Get your money faster with same-day deposits</p>
        </div>
      </div>
    </div>
  `;
  
  // Set styles for the features section
  featuresSection.style.padding = '80px 0';
  featuresSection.style.backgroundColor = 'white';
  featuresSection.style.textAlign = 'center';
  
  // Replace the content
  featuresSection.innerHTML = newHTML;
  
  // Add responsive styles
  const mediaQuery = window.matchMedia('(max-width: 992px)');
  if (mediaQuery.matches) {
    const featuresContainer = featuresSection.querySelector('.features-container');
    if (featuresContainer) {
      featuresContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
    }
  }
  
  const smallMediaQuery = window.matchMedia('(max-width: 768px)');
  if (smallMediaQuery.matches) {
    const featuresContainer = featuresSection.querySelector('.features-container');
    if (featuresContainer) {
      featuresContainer.style.gridTemplateColumns = '1fr';
    }
    
    const sectionTitle = featuresSection.querySelector('.section-header h2');
    if (sectionTitle) {
      sectionTitle.style.fontSize = '28px';
    }
    
    const sectionSubtitle = featuresSection.querySelector('.section-header p');
    if (sectionSubtitle) {
      sectionSubtitle.style.fontSize = '16px';
    }
  }
  
  console.log('Features section replaced with clean implementation');
}