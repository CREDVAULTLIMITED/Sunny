import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * InteractiveFlowDiagram component
 * Shows an interactive flow diagram for payment processes
 */
const InteractiveFlowDiagram = ({ flowType }) => {
  const [activeNode, setActiveNode] = useState(0);
  
  // Define different flows based on payment type
  const getFlowData = () => {
    const flows = {
      standard: {
        title: 'Payment Flow',
        nodes: [
          { 
            id: 0, 
            label: 'Customer', 
            description: 'Customer initiates payment through your checkout page or payment link.',
            icon: 'user'
          },
          { 
            id: 1, 
            label: 'Payment', 
            description: 'Customer selects their preferred payment method and enters details.',
            icon: 'creditCard'
          },
          { 
            id: 2, 
            label: 'Processing', 
            description: 'Sunny securely processes the payment with advanced fraud detection.',
            icon: 'server'
          },
          { 
            id: 3, 
            label: 'Settlement', 
            description: 'Funds are settled to your account based on your settlement schedule.',
            icon: 'bank'
          }
        ]
      },
      crypto: {
        title: 'Crypto Payment Flow',
        nodes: [
          { 
            id: 0, 
            label: 'Customer', 
            description: 'Customer chooses to pay with cryptocurrency at checkout.',
            icon: 'user'
          },
          { 
            id: 1, 
            label: 'Wallet', 
            description: 'Customer sends payment from their crypto wallet to the provided address.',
            icon: 'wallet'
          },
          { 
            id: 2, 
            label: 'Blockchain', 
            description: 'Transaction is verified on the blockchain network.',
            icon: 'blockchain'
          },
          { 
            id: 3, 
            label: 'Conversion', 
            description: 'Crypto is automatically converted to your preferred currency (optional).',
            icon: 'exchange'
          },
          { 
            id: 4, 
            label: 'Settlement', 
            description: 'Funds are settled to your account.',
            icon: 'bank'
          }
        ]
      },
      mobileMoney: {
        title: 'Mobile Money Flow',
        nodes: [
          { 
            id: 0, 
            label: 'Customer', 
            description: 'Customer chooses mobile money as their payment method.',
            icon: 'user'
          },
          { 
            id: 1, 
            label: 'Phone Number', 
            description: 'Customer enters their registered mobile money phone number.',
            icon: 'phone'
          },
          { 
            id: 2, 
            label: 'Authorization', 
            description: 'Customer receives a prompt on their phone to authorize the payment.',
            icon: 'lock'
          },
          { 
            id: 3, 
            label: 'Confirmation', 
            description: 'Payment is confirmed and receipt is generated.',
            icon: 'check'
          },
          { 
            id: 4, 
            label: 'Settlement', 
            description: 'Funds are settled to your account.',
            icon: 'bank'
          }
        ]
      }
    };
    
    return flows[flowType] || flows.standard;
  };
  
  // Get icon component based on icon name
  const getIcon = (iconName) => {
    const icons = {
      user: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      creditCard: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      server: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      bank: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
      wallet: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      blockchain: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      exchange: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      phone: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      lock: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      check: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    };
    
    return icons[iconName] || icons.user;
  };
  
  const flowData = getFlowData();
  
  return (
    <div className="interactive-flow-diagram">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{flowData.title}</h3>
      
      <div className="flow-nodes mb-6">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between">
          {flowData.nodes.map((node, index) => (
            <React.Fragment key={node.id}>
              <div 
                className={`flow-node cursor-pointer transition-all ${
                  activeNode === node.id 
                    ? 'bg-indigo-100 border-indigo-500 text-indigo-700' 
                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                } border rounded-lg p-3 flex flex-col items-center justify-center w-full md:w-auto mb-2 md:mb-0`}
                onClick={() => setActiveNode(node.id)}
              >
                <div className={`icon-circle h-12 w-12 rounded-full flex items-center justify-center mb-2 ${
                  activeNode === node.id ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {getIcon(node.icon)}
                </div>
                <div className="text-sm font-medium">{node.label}</div>
              </div>
              
              {index < flowData.nodes.length - 1 && (
                <div className="flow-connector hidden md:block flex-grow mx-2">
                  <div className="h-0.5 bg-gray-200 w-full relative">
                    <div 
                      className="absolute top-1/2 right-0 transform -translate-y-1/2 text-gray-400"
                      style={{ right: '-12px' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="flow-explanation bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
            {getIcon(flowData.nodes[activeNode].icon)}
          </div>
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-1">{flowData.nodes[activeNode].label}</h4>
            <p className="text-sm text-gray-600">{flowData.nodes[activeNode].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

InteractiveFlowDiagram.propTypes = {
  flowType: PropTypes.oneOf(['standard', 'crypto', 'mobileMoney']).isRequired
};

InteractiveFlowDiagram.defaultProps = {
  flowType: 'standard'
};

export default InteractiveFlowDiagram;