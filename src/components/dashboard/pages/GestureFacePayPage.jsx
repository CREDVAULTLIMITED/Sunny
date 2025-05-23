import React, { useState } from 'react';
import { Card, Badge, Button, SearchBar, Toggle, StatsDisplay } from '../common';
import { CameraIcon, FaceIcon, HandIcon } from '../icons';

const GestureFacePayPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const biometricStats = {
    total: { label: 'Total Users', value: '1,234' },
    facePay: { label: 'FacePay Users', value: '856' },
    gesturePay: { label: 'GesturePay Users', value: '378' },
    successRate: { label: 'Success Rate', value: '99.8%' }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Gesture & Face Pay</h1>
          <p className="text-gray-600">Configure biometric payment methods</p>
        </div>
        <Button variant="primary" leftIcon={<CameraIcon />}>
          Test Biometrics
        </Button>
      </div>

      <StatsDisplay stats={biometricStats} />

      <div className="my-6">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search biometric settings..."
        />
      </div>

      <div className="grid gap-4">
        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Face Pay</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Face Recognition</h3>
                  <p className="text-sm text-gray-600">Enable face recognition payments</p>
                  <Badge variant="feature">Premium</Badge>
                </div>
                <Toggle />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Liveness Detection</h3>
                  <p className="text-sm text-gray-600">Detect real faces vs photos</p>
                </div>
                <Toggle />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Gesture Pay</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Hand Gestures</h3>
                  <p className="text-sm text-gray-600">Enable gesture-based payments</p>
                  <Badge variant="feature">Premium</Badge>
                </div>
                <Toggle />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Custom Gestures</h3>
                  <p className="text-sm text-gray-600">Configure custom payment gestures</p>
                </div>
                <Button variant="secondary">Configure</Button>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Transaction Limits</h3>
                  <p className="text-sm text-gray-600">Set limits for biometric payments</p>
                </div>
                <Button variant="secondary">Set Limits</Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Fraud Detection</h3>
                  <p className="text-sm text-gray-600">Configure AI-based fraud prevention</p>
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

export default GestureFacePayPage;
