import React, { useState } from 'react';
import { Card, Badge, Button, SearchBar, StatsDisplay } from '../common';
import { WalletIcon, ChartIcon, DownloadIcon } from '../icons';

const BalancesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const balanceStats = {
    total: { label: 'Total Balance', value: '₦15.2M' },
    pending: { label: 'Pending', value: '₦2.1M' },
    available: { label: 'Available', value: '₦13.1M' },
    reserved: { label: 'Reserved', value: '₦450K' }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Account Balances</h1>
          <p className="text-gray-600">Manage your payment account balances</p>
        </div>
        <Button variant="primary" leftIcon={<DownloadIcon />}>
          Download Statement
        </Button>
      </div>

      <StatsDisplay stats={balanceStats} />

      <div className="my-6">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search transactions..."
        />
      </div>

      <div className="grid gap-4">
        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Payment Account</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Main Account Balance</h3>
                  <p className="text-sm text-gray-600">₦13,100,000.00</p>
                  <Badge variant="success">Available</Badge>
                </div>
                <Button variant="secondary">Withdraw</Button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Pending Balance</h3>
                  <p className="text-sm text-gray-600">₦2,100,000.00</p>
                  <Badge variant="warning">Pending</Badge>
                </div>
                <Button variant="secondary">View Details</Button>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Multi-Currency Balances</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">USD Account</h3>
                  <p className="text-sm text-gray-600">$25,430.00</p>
                  <Badge variant="success">Active</Badge>
                </div>
                <Button variant="secondary">Manage</Button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">EUR Account</h3>
                  <p className="text-sm text-gray-600">€18,750.00</p>
                  <Badge variant="success">Active</Badge>
                </div>
                <Button variant="secondary">Manage</Button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Add Currency</h3>
                  <p className="text-sm text-gray-600">Support for 50+ currencies</p>
                  <Badge variant="feature">Premium</Badge>
                </div>
                <Button variant="secondary">Add</Button>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Settlement Settings</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Auto-Settlement</h3>
                  <p className="text-sm text-gray-600">Automatically settle funds to your bank account</p>
                </div>
                <Button variant="secondary">Configure</Button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Settlement Schedule</h3>
                  <p className="text-sm text-gray-600">Set up custom settlement schedules</p>
                </div>
                <Button variant="secondary">Configure</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BalancesPage;
