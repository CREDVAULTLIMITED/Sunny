import React, { useState } from 'react';
import { Card, Badge, Button, SearchBar, Toggle, StatsDisplay } from '../common';
import { SettingsIcon, SecurityIcon, NotificationIcon } from '../icons';

const SettingsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-600">Configure your payment gateway settings</p>
        </div>
      </div>

      <div className="my-6">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search settings..."
        />
      </div>

      <div className="grid gap-4">
        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Business Profile</h3>
                  <p className="text-sm text-gray-600">Update your business information</p>
                </div>
                <Button variant="secondary">Edit</Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Team Members</h3>
                  <p className="text-sm text-gray-600">Manage team access and roles</p>
                </div>
                <Button variant="secondary">Manage</Button>
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
                  <h3 className="font-semibold">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600">Enable additional security</p>
                </div>
                <Toggle />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Password Policy</h3>
                  <p className="text-sm text-gray-600">Configure password requirements</p>
                </div>
                <Button variant="secondary">Configure</Button>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Configure email alerts</p>
                </div>
                <Toggle />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">SMS Notifications</h3>
                  <p className="text-sm text-gray-600">Configure SMS alerts</p>
                  <Badge variant="feature">Premium</Badge>
                </div>
                <Toggle />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Payment Settings</h2>
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Payment Methods</h3>
                  <p className="text-sm text-gray-600">Enable/disable payment methods</p>
                </div>
                <Button variant="secondary">Configure</Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Transaction Limits</h3>
                  <p className="text-sm text-gray-600">Set transaction thresholds</p>
                </div>
                <Button variant="secondary">Set Limits</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
