import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PaymentsIcon,
  BillingIcon,
  FinanceIcon,
  SecurityIcon,
  CodeIcon,
  DocsIcon,
  BlogIcon,
  CreditCardIcon,
  ShoppingCartIcon,
  LinkIcon,
  DeviceTabletIcon,
  FileTextIcon,
  ReceiptIcon,
  PercentIcon,
  CloudIcon,
  LayersIcon,
  BuildingIcon,
  GlobeIcon,
  NewspaperIcon,
  UserCheckIcon,
  BookIcon,
  LifebuoyIcon,
  HandshakeIcon
} from '../icons/MenuIcons';
import { AuthContext } from '../../context/AuthContext';

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [focusedItem, setFocusedItem] = useState(null);
  const menuRef = useRef(null);
  const timeoutRef = useRef(null);
  
  // Handle keyboard navigation within mega menus
  const handleKeyDown = (e, menuId) => {
    const menu = {products: productsMenu, solutions: solutionsMenu, developers: developersMenu, resources: resourcesMenu}[menuId];
    const allItems = menu.sections.flatMap(section => section.items);
    
    switch (e.key) {
      case ' ':
      case 'Enter':
        e.preventDefault();
        if (!activeMenu) {
          setActiveMenu(menuId);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setActiveMenu(null);
        setFocusedItem(null);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!activeMenu) {
          setActiveMenu(menuId);
        } else {
          const currentIndex = focusedItem 
            ? allItems.findIndex(item => item.link === focusedItem)
            : -1;
          const nextIndex = currentIndex < allItems.length - 1 ? currentIndex + 1 : 0;
          setFocusedItem(allItems[nextIndex].link);
          document.querySelector(`a[href="${allItems[nextIndex].link}"]`)?.focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (activeMenu) {
          const currentIndex = focusedItem 
            ? allItems.findIndex(item => item.link === focusedItem)
            : 0;
          const nextIndex = currentIndex > 0 ? currentIndex - 1 : allItems.length - 1;
          setFocusedItem(allItems[nextIndex].link);
          document.querySelector(`a[href="${allItems[nextIndex].link}"]`)?.focus();
        }
        break;
      case 'Tab':
        if (!e.shiftKey && focusedItem) {
          const currentIndex = allItems.findIndex(item => item.link === focusedItem);
          if (currentIndex === allItems.length - 1) {
            setActiveMenu(null);
            setFocusedItem(null);
          }
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
        setFocusedItem(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const productsMenu = {
    sections: [
      {
        title: 'Payments',
        items: [
          {
            title: 'Payments',
            description: 'Online payments infrastructure.',
            link: '/products/payments',
            icon: <CreditCardIcon />,
            featured: true,
            cta: 'Get Started'
          },
          {
            title: 'Checkout',
            description: 'Prebuilt, optimized payment page.',
            link: '/products/checkout',
            icon: <ShoppingCartIcon />,
            cta: 'Try Demo'
          },
          {
            title: 'Payment Links',
            description: 'No-code payments via links.',
            link: '/products/payment-links',
            icon: <LinkIcon />,
            cta: 'Create Link'
          },
          {
            title: 'Terminal',
            description: 'Accept in-person payments.',
            link: '/products/terminal',
            icon: <DeviceTabletIcon />,
            cta: 'Get Started'
          },
          {
            title: 'Invoicing',
            description: 'Create and send invoices easily.',
            link: '/products/invoicing',
            icon: <FileTextIcon />,
            cta: 'Send Invoice'
          }
        ]
      },
      {
        title: 'Revenue and Finance Automation',
        items: [
          {
            title: 'Billing',
            description: 'Subscriptions, invoices, and usage-based billing.',
            link: '/products/billing',
            icon: <ReceiptIcon />,
            cta: 'Start Billing'
          },
          {
            title: 'Tax',
            description: 'Automatic sales tax, VAT, GST.',
            link: '/products/tax',
            icon: <PercentIcon />,
            cta: 'Get Started'
          },
          {
            title: 'Revenue Recognition',
            description: 'Accounting and compliance reporting.',
            link: '/products/revenue',
            icon: <BillingIcon />,
            cta: 'Learn More'
          }
        ]
      },
      {
        title: 'Financial Services',
        items: [
          {
            title: 'Issuing',
            description: 'Create, distribute physical & virtual cards.',
            link: '/products/issuing',
            icon: <FinanceIcon />
          },
          {
            title: 'Treasury',
            description: 'Bank account-like capabilities.',
            link: '/products/treasury',
            icon: <FinanceIcon />
          },
          {
            title: 'Capital',
            description: 'Instant loans and financing.',
            link: '/products/capital',
            icon: <FinanceIcon />
          }
        ]
      },
      {
        title: 'Operations and Intelligence',
        items: [
          {
            title: 'Radar',
            description: 'Fraud prevention with machine learning.',
            link: '/products/radar',
            icon: <SecurityIcon />
          },
          {
            title: 'Atlas',
            description: 'Start a company from anywhere.',
            link: '/products/atlas',
            icon: <SecurityIcon />
          },
          {
            title: 'Climate',
            description: 'Support carbon removal technologies.',
            link: '/products/climate',
            icon: <SecurityIcon />
          },
          {
            title: 'Identity',
            description: 'Verify identities with documents.',
            link: '/products/identity',
            icon: <SecurityIcon />
          },
          {
            title: 'Sigma',
            description: 'SQL-based business analytics.',
            link: '/products/sigma',
            icon: <SecurityIcon />
          },
          {
            title: 'Data Pipeline',
            description: 'Send data to data warehouses.',
            link: '/products/data-pipeline',
            icon: <SecurityIcon />
          }
        ]
      }
    ]
  };

  const solutionsMenu = {
    sections: [
      {
        title: 'By Use Case',
        items: [
          {
            title: 'E-commerce',
            description: 'Payments, checkout, fraud protection.',
            link: '/solutions/ecommerce',
            icon: <ShoppingCartIcon />,
            featured: true,
            cta: 'Get Started'
          },
          {
            title: 'SaaS',
            description: 'Subscriptions, taxes, invoices.',
            link: '/solutions/saas',
            icon: <CloudIcon />,
            cta: 'Get Started'
          },
          {
            title: 'Marketplaces',
            description: 'Split payments, onboarding, etc.',
            link: '/solutions/marketplaces',
            icon: <PaymentsIcon />,
            cta: 'Get Started'
          },
          {
            title: 'Platforms',
            description: 'Embedded payments and financial tools.',
            link: '/solutions/platforms',
            icon: <LayersIcon />,
            cta: 'Get Started'
          }
        ]
      },
      {
        title: 'By Industry',
        items: [
          {
            title: 'Embedded Finance',
            description: 'Banking-as-a-service for platforms.',
            link: '/solutions/embedded-finance',
            icon: <FinanceIcon />,
            cta: 'Learn More'
          },
          {
            title: 'Crypto',
            description: 'Accept crypto, payout in crypto.',
            link: '/solutions/crypto',
            icon: <PaymentsIcon />,
            cta: 'Get Started'
          },
          {
            title: 'Enterprise',
            description: 'Global scale with customization.',
            link: '/solutions/enterprise',
            icon: <BuildingIcon />,
            featured: true,
            cta: 'Contact Sales'
          },
          {
            title: 'Startups',
            description: 'Everything to launch and scale.',
            link: '/solutions/startups',
            icon: <PaymentsIcon />,
            cta: 'Get Started'
          },
          {
            title: 'Global Businesses',
            description: 'Expand globally with local methods.',
            link: '/solutions/global',
            icon: <GlobeIcon />,
            cta: 'Get Started'
          }
        ]
      }
    ]
  };

  const developersMenu = {
    sections: [
      {
        title: 'Documentation',
        items: [
          {
            title: 'Documentation',
            description: 'Full API and integration docs.',
            link: '/developers/docs',
            icon: <DocsIcon />
          },
          {
            title: 'API Reference',
            description: 'All endpoints, with live testing.',
            link: '/developers/api',
            icon: <CodeIcon />
          },
          {
            title: 'SDKs & Libraries',
            description: 'For Node, Python, Java, Ruby, etc.',
            link: '/developers/sdks',
            icon: <CodeIcon />
          },
          {
            title: 'Prebuilt Components',
            description: 'UI libraries, mobile SDKs.',
            link: '/developers/components',
            icon: <CodeIcon />
          },
          {
            title: 'Sample Code',
            description: 'Full open-source integrations.',
            link: '/developers/samples',
            icon: <CodeIcon />
          },
          {
            title: 'Changelog',
            description: 'Recent updates to APIs and features.',
            link: '/developers/changelog',
            icon: <DocsIcon />
          },
          {
            title: 'Sunny CLI',
            description: 'Dev tool for local development.',
            link: '/developers/cli',
            icon: <CodeIcon />
          }
        ]
      }
    ]
  };

  const resourcesMenu = {
    sections: [
      {
        items: [
          {
            title: 'Blog',
            description: 'Product updates, case studies, guides.',
            link: '/resources/blog',
            icon: <NewspaperIcon />,
            featured: true,
            cta: 'Read Blog'
          },
          {
            title: 'Customer Stories',
            description: 'How companies use Sunny.',
            link: '/resources/customers',
            icon: <UserCheckIcon />,
            cta: 'See Stories'
          },
          {
            title: 'Events',
            description: 'Sunny-hosted and sponsored events.',
            link: '/resources/events',
            icon: <BlogIcon />,
            cta: 'View Events'
          },
          {
            title: 'Guides',
            description: 'Step-by-step implementation tutorials.',
            link: '/resources/guides',
            icon: <BookIcon />,
            cta: 'Read Guides'
          },
          {
            title: 'Support',
            description: 'Help center and live support.',
            link: '/support',
            icon: <LifebuoyIcon />,
            featured: true,
            cta: 'Contact Support'
          },
          {
            title: 'Partner Ecosystem',
            description: "Sunny's official partner apps/tools.",
            link: '/partners',
            icon: <HandshakeIcon />,
            cta: 'See Partners'
          },
          {
            title: 'Sunny Press',
            description: 'Books and media published by Sunny.',
            link: '/press',
            icon: <BlogIcon />,
            cta: 'Read More'
          }
        ]
      }
    ]
  };

  const handleMouseEnter = (menuId) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(menuId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setFocusedItem(null);
    }, 300);
  };

  return (
    <nav className="site-navigation" ref={menuRef} role="navigation">
      <div className="nav-links">
        <div 
          className="nav-item" 
          onMouseEnter={() => handleMouseEnter('products')} 
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`nav-link ${activeMenu === 'products' ? 'active' : ''}`}
            onClick={() => setActiveMenu(activeMenu === 'products' ? null : 'products')}
            onKeyDown={(e) => handleKeyDown(e, 'products')}
            aria-expanded={activeMenu === 'products'}
            aria-haspopup="true"
            aria-controls="mega-menu-products"
          >
            Products
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="dropdown-arrow">
              <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div id="mega-menu-products" className={`mega-menu mega-menu-products ${activeMenu === 'products' ? 'active' : ''}`}>
            <div className="mega-menu-content">
              {productsMenu.sections.map((section, index) => (
                <div key={index} className="mega-menu-section">
                  {section.title && <h3 className="mega-menu-section-title">{section.title}</h3>}
                  <div className="mega-menu-items">
                    {section.items.map((item, itemIndex) => (
                      <Link 
                        key={itemIndex} 
                        to={item.link} 
                        className={`mega-menu-item ${item.featured ? 'mega-menu-item-featured' : ''}`}
                        onClick={() => setActiveMenu(null)}
                        data-category="products"
                      >
                        {item.icon && (
                          <div className={`mega-menu-item-icon ${item.iconClass || ''}`}>
                            {item.icon}
                          </div>
                        )}
                        <div className="mega-menu-item-content">
                          <h4 className="mega-menu-item-title">{item.title}</h4>
                          {item.description && (
                            <p className="mega-menu-item-description">{item.description}</p>
                          )}
                          {item.cta && (
                            <span className="mega-menu-item-cta">
                              {item.cta}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mega-menu-partners">
              <span className="mega-menu-partners-label">Trusted by:</span>
              <div className="mega-menu-partners-logos">
                <img src="/assets/logos/visa.svg" alt="Visa" />
                <img src="/assets/logos/mastercard.svg" alt="Mastercard" />
                <img src="/assets/logos/paypal.svg" alt="PayPal" />
                <img src="/assets/logos/apple.svg" alt="Apple Pay" />
                <img src="/assets/logos/google-pay.svg" alt="Google Pay" />
              </div>
            </div>
          </div>
        </div>

        <div 
          className="nav-item" 
          onMouseEnter={() => handleMouseEnter('solutions')} 
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`nav-link ${activeMenu === 'solutions' ? 'active' : ''}`}
            onClick={() => setActiveMenu(activeMenu === 'solutions' ? null : 'solutions')}
            onKeyDown={(e) => handleKeyDown(e, 'solutions')}
            aria-expanded={activeMenu === 'solutions'}
            aria-haspopup="true"
            aria-controls="mega-menu-solutions"
          >
            Solutions
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="dropdown-arrow">
              <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div id="mega-menu-solutions" className={`mega-menu mega-menu-solutions ${activeMenu === 'solutions' ? 'active' : ''}`}>
            <div className="mega-menu-content">
              {solutionsMenu.sections.map((section, index) => (
                <div key={index} className="mega-menu-section">
                  {section.title && <h3 className="mega-menu-section-title">{section.title}</h3>}
                  <div className="mega-menu-items">
                    {section.items.map((item, itemIndex) => (
                      <Link 
                        key={itemIndex} 
                        to={item.link} 
                        className={`mega-menu-item ${item.featured ? 'mega-menu-item-featured' : ''}`}
                        onClick={() => setActiveMenu(null)}
                        data-category="solutions"
                      >
                        {item.icon && (
                          <div className={`mega-menu-item-icon ${item.iconClass || ''}`}>
                            {item.icon}
                          </div>
                        )}
                        <div className="mega-menu-item-content">
                          <h4 className="mega-menu-item-title">{item.title}</h4>
                          {item.description && (
                            <p className="mega-menu-item-description">{item.description}</p>
                          )}
                          {item.cta && (
                            <span className="mega-menu-item-cta">
                              {item.cta}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mega-menu-partners">
              <span className="mega-menu-partners-label">Partners:</span>
              <div className="mega-menu-partners-logos">
                <span className="partner-logo">Amazon</span>
                <span className="partner-logo">CREDVAULT</span>
                <span className="partner-logo">Oracle</span>
              </div>
            </div>
          </div>
        </div>

        <div 
          className="nav-item" 
          onMouseEnter={() => handleMouseEnter('developers')} 
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`nav-link ${activeMenu === 'developers' ? 'active' : ''}`}
            onClick={() => setActiveMenu(activeMenu === 'developers' ? null : 'developers')}
            onKeyDown={(e) => handleKeyDown(e, 'developers')}
            aria-expanded={activeMenu === 'developers'}
            aria-haspopup="true"
            aria-controls="mega-menu-developers"
          >
            Developers
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="dropdown-arrow">
              <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div id="mega-menu-developers" className={`mega-menu mega-menu-developers ${activeMenu === 'developers' ? 'active' : ''}`}>
            <div className="mega-menu-content">
              {developersMenu.sections.map((section, index) => (
                <div key={index} className="mega-menu-section">
                  {section.title && <h3 className="mega-menu-section-title">{section.title}</h3>}
                  <div className="mega-menu-items">
                    {section.items.map((item, itemIndex) => (
                      <Link 
                        key={itemIndex} 
                        to={item.link} 
                        className={`mega-menu-item ${item.featured ? 'mega-menu-item-featured' : ''}`}
                        onClick={() => setActiveMenu(null)}
                        data-category="developers"
                      >
                        {item.icon && (
                          <div className={`mega-menu-item-icon ${item.iconClass || ''}`}>
                            {item.icon}
                          </div>
                        )}
                        <div className="mega-menu-item-content">
                          <h4 className="mega-menu-item-title">{item.title}</h4>
                          {item.description && (
                            <p className="mega-menu-item-description">{item.description}</p>
                          )}
                          {item.cta && (
                            <span className="mega-menu-item-cta">
                              {item.cta}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div 
          className="nav-item" 
          onMouseEnter={() => handleMouseEnter('resources')} 
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`nav-link ${activeMenu === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveMenu(activeMenu === 'resources' ? null : 'resources')}
            onKeyDown={(e) => handleKeyDown(e, 'resources')}
            aria-expanded={activeMenu === 'resources'}
            aria-haspopup="true"
            aria-controls="mega-menu-resources"
          >
            Resources
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="dropdown-arrow">
              <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div id="mega-menu-resources" className={`mega-menu mega-menu-resources ${activeMenu === 'resources' ? 'active' : ''}`}>
            <div className="mega-menu-content">
              {resourcesMenu.sections.map((section, index) => (
                <div key={index} className="mega-menu-section">
                  {section.title && <h3 className="mega-menu-section-title">{section.title}</h3>}
                  <div className="mega-menu-items">
                    {section.items.map((item, itemIndex) => (
                      <Link 
                        key={itemIndex} 
                        to={item.link} 
                        className={`mega-menu-item ${item.featured ? 'mega-menu-item-featured' : ''}`}
                        onClick={() => setActiveMenu(null)}
                        data-category="resources"
                      >
                        {item.icon && (
                          <div className={`mega-menu-item-icon ${item.iconClass || ''}`}>
                            {item.icon}
                          </div>
                        )}
                        <div className="mega-menu-item-content">
                          <h4 className="mega-menu-item-title">{item.title}</h4>
                          {item.description && (
                            <p className="mega-menu-item-description">{item.description}</p>
                          )}
                          {item.cta && (
                            <span className="mega-menu-item-cta">
                              {item.cta}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="nav-item">
          <Link to="/pricing" className="nav-link">
            Pricing
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;