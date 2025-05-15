import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout.jsx';
import Card from '../components/Card.jsx';
import FeatureIntroduction from '../components/FeatureIntroduction.jsx';
import InteractiveFlowDiagram from '../components/InteractiveFlowDiagram.jsx';
import HelpButton from '../components/HelpButton.jsx';
import QuickStartGuide from '../components/QuickStartGuide.jsx';

/**
 * Dashboard component
 */
const Dashboard = () => {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [showIntro, setShowIntro] = useState(true);
  const [showQuickStart, setShowQuickStart] = useState(false);
  
  // Update section based on URL or other navigation events
  useEffect(() => {
    // This would typically use router information
    // For now we'll just default to dashboard
    setCurrentSection('dashboard');
    
    // Check if we should show intro (could be based on user preferences)
    const dismissedGuides = JSON.parse(localStorage.getItem('sunny_dismissed_guides') || '{}');
    setShowIntro(!dismissedGuides[currentSection]);
    
    // Check if this is a new user
    const isNewUser = localStorage.getItem('sunny_new_user') !== 'false';
    if (isNewUser) {
      setShowQuickStart(true);
      localStorage.setItem('sunny_new_user', 'false');
    }
  }, [currentSection]);
  
  // Sample data for dashboard
  const stats = [
    { name: 'Total Transactions', value: '2,543', change: '+12.5%', trend: 'up' },
    { name: 'Total Volume', value: '$128,420', change: '+8.2%', trend: 'up' },
    { name: 'Success Rate', value: '98.7%', change: '+0.5%', trend: 'up' },
    { name: 'Average Transaction', value: '$50.50', change: '-2.3%', trend: 'down' },
  ];

  const recentTransactions = [
    { id: 'TRX-001', date: '2023-06-15 14:32', amount: '$125.00', status: 'completed', method: 'card', customer: 'John Doe' },
    { id: 'TRX-002', date: '2023-06-15 13:21', amount: '$75.50', status: 'completed', method: 'mobile_money', customer: 'Jane Smith' },
    { id: 'TRX-003', date: '2023-06-15 12:05', amount: '$250.00', status: 'pending', method: 'bank_transfer', customer: 'Robert Johnson' },
    { id: 'TRX-004', date: '2023-06-15 11:47', amount: '$42.75', status: 'completed', method: 'qr_code', customer: 'Emily Davis' },
    { id: 'TRX-005', date: '2023-06-15 10:30', amount: '$180.25', status: 'failed', method: 'card', customer: 'Michael Wilson' },
  ];

  const paymentMethods = [
    { method: 'Card', percentage: 45 },
    { method: 'Mobile Money', percentage: 30 },
    { method: 'Bank Transfer', percentage: 15 },
    { method: 'QR Code', percentage: 10 },
  ];

  return (
    <DashboardLayout>
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Dashboard</h1>
      </div>
      
      {/* Feature Introduction */}
      {showIntro && (
        <FeatureIntroduction 
          section={currentSection} 
          onDismiss={() => setShowIntro(false)}
        />
      )}
      
      {/* Interactive Flow Diagram */}
      <div className="mb-6">
        <Card>
          <Card.Header>
            <Card.Title>How Payments Work</Card.Title>
          </Card.Header>
          <Card.Body>
            <InteractiveFlowDiagram flowType="standard" />
          </Card.Body>
        </Card>
      </div>
      
      {/* Quick Start Guide Modal */}
      {showQuickStart && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <QuickStartGuide onClose={() => setShowQuickStart(false)} />
        </div>
      )}
      
      {/* Help Button */}
      <HelpButton section={currentSection} />
      
      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} padding="medium" className="overflow-hidden">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 truncate">{stat.name}</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <Card.Header>
            <Card.Title>Transaction Volume</Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="h-64 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Transaction volume chart goes here</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Header>
            <Card.Title>Payment Methods</Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              {paymentMethods.map((item) => (
                <div key={item.method}>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-700">{item.method}</div>
                    <div className="text-sm font-medium text-gray-700">{item.percentage}%</div>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>
      
      {/* Recent Transactions */}
      {/* Feature Details */}
      <div className="mt-8 mb-8">
        <Card>
          <Card.Header className="flex items-center justify-between">
            <Card.Title>Payment Method Spotlight</Card.Title>
            <div className="flex space-x-2">
              <button 
                className={`px-3 py-1 text-sm rounded-md ${currentSection === 'crypto' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setCurrentSection('crypto')}
              >
                Crypto
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${currentSection === 'banking' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setCurrentSection('banking')}
              >
                Banking
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${currentSection === 'mobileMoney' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setCurrentSection('mobileMoney')}
              >
                Mobile Money
              </button>
            </div>
          </Card.Header>
          <Card.Body>
            <FeatureDetails feature={currentSection} />
          </Card.Body>
        </Card>
      </div>
      
      <div className="mt-8">
        <Card>
          <Card.Header className="flex items-center justify-between">
            <Card.Title>Recent Transactions</Card.Title>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all
            </button>
          </Card.Header>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {transaction.method === 'card' && 'Card'}
                        {transaction.method === 'mobile_money' && 'Mobile Money'}
                        {transaction.method === 'bank_transfer' && 'Bank Transfer'}
                        {transaction.method === 'qr_code' && 'QR Code'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status === 'completed' && 'Completed'}
                        {transaction.status === 'pending' && 'Pending'}
                        {transaction.status === 'failed' && 'Failed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;