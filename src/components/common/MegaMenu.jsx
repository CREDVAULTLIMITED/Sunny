import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../../context/AuthContext';

const MenuSection = ({ title, items, category }) => {
  const { isAuthenticated } = useContext(AuthContext) || { isAuthenticated: false };
  
  return (
    <div className={`mega-menu-section mega-menu-${category}`}>
      {title && <h3 className="mega-menu-section-title">{title}</h3>}
      <div className="mega-menu-items">
        {items.map((item, index) => (
          <Link 
            key={index} 
            to={item.link} 
            className={`mega-menu-item ${item.featured ? 'mega-menu-item-featured' : ''}`}
            data-category={category}
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
                  {isAuthenticated ? item.cta.authenticated : item.cta.default}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const MegaMenu = ({ sections, isOpen, onClose, category }) => {
  if (!isOpen) return null;

  return (
    <div className={`mega-menu mega-menu-${category}`} onMouseLeave={onClose}>
      <div className="mega-menu-content">
        {sections.map((section, index) => (
          <MenuSection key={index} {...section} category={category} />
        ))}
      </div>
      {category === 'products' && (
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
      )}
      {category === 'solutions' && (
        <div className="mega-menu-partners">
          <span className="mega-menu-partners-label">Partners:</span>
          <div className="mega-menu-partners-logos">
            <span className="partner-logo">Amazon</span>
            <span className="partner-logo">CREDVAULT</span>
            <span className="partner-logo">Oracle</span>
          </div>
        </div>
      )}
    </div>
  );
};

MenuSection.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      link: PropTypes.string.isRequired,
      icon: PropTypes.node,
      iconClass: PropTypes.string,
      featured: PropTypes.bool,
      cta: PropTypes.shape({
        default: PropTypes.string,
        authenticated: PropTypes.string
      })
    })
  ).isRequired
};

MegaMenu.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      items: PropTypes.array.isRequired
    })
  ).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired
};

export default MegaMenu;
