import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * SidebarPaymentFilters component
 * Provides filters for different payment methods in the sidebar
 */
const SidebarPaymentFilters = ({ onFilterChange }) => {
  const [selectedMethods, setSelectedMethods] = useState([]);
  
  const paymentMethods = [
    { id: 'card', name: 'Card Payments', icon: CardIcon },
    { id: 'bank', name: 'Bank Transfers', icon: BankIcon },
    { id: 'mobile', name: 'Mobile Money', icon: MobileIcon },
    { id: 'qr', name: 'QR Payments', icon: QRIcon },
    { id: 'p2p', name: 'P2P Transfers', icon: P2PIcon },
    { id: 'crypto', name: 'Crypto', icon: CryptoIcon },
    { id: 'wallet', name: 'Digital Wallets', icon: WalletIcon }
  ];
  
  const toggleMethod = (methodId) => {
    setSelectedMethods(prevMethods => {
      const isSelected = prevMethods.includes(methodId);
      const newMethods = isSelected
        ? prevMethods.filter(id => id !== methodId)
        : [...prevMethods, methodId];
      
      // Notify parent component about filter change
      if (onFilterChange) {
        onFilterChange(newMethods);
      }
      
      return newMethods;
    });
  };
  
  return (
    <div className="sidebar-payment-filters px-3 py-3 border-t border-indigo-800">
      <h3 className="text-xs font-semibold text-indigo-200 uppercase tracking-wider mb-2">
        Payment Methods
      </h3>
      
      <div className="space-y-1">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            className={`w-full flex items-center px-2 py-1.5 text-sm font-medium rounded-md ${
              selectedMethods.includes(method.id)
                ? 'bg-indigo-600 text-white'
                : 'text-indigo-100 hover:bg-indigo-800'
            }`}
            onClick={() => toggleMethod(method.id)}
          >
            <method.icon className="mr-2 h-4 w-4 text-indigo-300" />
            <span>{method.name}</span>
            
            {selectedMethods.includes(method.id) && (
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-auto h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Icon components
function CardIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

function BankIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
  );
}

function MobileIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function QRIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
    </svg>
  );
}

function P2PIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function CryptoIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

function WalletIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

SidebarPaymentFilters.propTypes = {
  onFilterChange: PropTypes.func
};

export default SidebarPaymentFilters;