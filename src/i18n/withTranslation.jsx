import React from 'react';
import { useTranslation } from 'react-i18next';

// Higher-order component to wrap pages with translation support
export const withTranslation = (WrappedComponent, namespace = '') => {
  return function TranslatedComponent(props) {
    const { t, i18n } = useTranslation(namespace);
    
    // Handle RTL languages
    React.useEffect(() => {
      const isRTL = i18n.dir() === 'rtl';
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.body.className = isRTL ? 'rtl' : 'ltr';
    }, [i18n]);

    return (
      <WrappedComponent 
        {...props} 
        t={t} 
        i18n={i18n}
        isRTL={i18n.dir() === 'rtl'}
      />
    );
  };
};

export default withTranslation;
