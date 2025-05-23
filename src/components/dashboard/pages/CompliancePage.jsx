import React, { useState } from 'react';
import { Card, Badge, Button, SearchBar, Toggle, StatsDisplay } from '../common';
import { ComplianceIcon, DocumentIcon, ShieldIcon } from '../icons';

const CompliancePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const complianceStats = {
    total: { label: 'Total Verifications', value: '2,450' },
    pending: { label: 'Pending Review', value: '85' },
    approved: { label: 'Approved', value: '2,300' },
    rejected: { label: 'Rejected', value: '65' }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Compliance & KYC</h1>
          <p className="text-gray-600">Manage compliance requirements and verification processes</p>
        </div>
        <Button variant="primary" leftIcon={<DocumentIcon />}>
          Download Reports
        </Button>
      </div>

      <StatsDisplay stats={complianceStats} />

      <div className="my-6">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search verifications..."
        />
      </div>

      <div className="grid gap-4">
        <Card>
          <div className="flex justify-between items-center p-4">
            <div>
              <h3 className="font-semibold">Automated KYC Verification</h3>
              <p className="text-sm text-gray-600">Enable automatic identity verification</p>
              <Badge variant="feature">Premium</Badge>
            </div>
            <Toggle />
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center p-4">
            <div>
              <h3 className="font-semibold">Document Verification</h3>
              <p className="text-sm text-gray-600">Configure acceptable document types</p>
            </div>
            <Button variant="secondary">Configure</Button>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center p-4">
            <div>
              <h3 className="font-semibold">Compliance Rules</h3>
              <p className="text-sm text-gray-600">Set up transaction monitoring rules</p>
            </div>
            <Button variant="secondary">Manage Rules</Button>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center p-4">
            <div>
              <h3 className="font-semibold">Audit Logs</h3>
              <p className="text-sm text-gray-600">Track all compliance-related activities</p>
            </div>
            <Button variant="secondary">View Logs</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CompliancePage;
