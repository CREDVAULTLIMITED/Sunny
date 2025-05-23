'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Shield, AlertTriangle, TrendingUp } from 'lucide-react';
import { Badge } from '../ui/badge';

interface RiskMetrics {
  fraud_attempts: number;
  suspicious_transactions: number;
  high_risk_countries: string[];
  average_risk_score: number;
}

interface FraudMonitoringProps {
  riskMetrics: RiskMetrics;
  isLoading?: boolean;
}

export function FraudMonitoring({ riskMetrics, isLoading = false }: FraudMonitoringProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Determine risk level based on average risk score
  const riskLevel = 
    riskMetrics.average_risk_score > 0.7 ? 'high' :
    riskMetrics.average_risk_score > 0.4 ? 'medium' : 'low';

  const riskColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <Shield className="mr-2 h-5 w-5 text-muted-foreground" />
          <CardTitle>Fraud Monitoring</CardTitle>
        </div>
        <Badge className={riskColors[riskLevel]}>
          {riskLevel.toUpperCase()} RISK
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
              <span>Fraud Attempts</span>
            </div>
            <span className="font-medium">{riskMetrics.fraud_attempts}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <AlertTriangle className="w-4 h-4 text-orange-500 mr-2" />
              <span>Suspicious Transactions</span>
            </div>
            <span className="font-medium">{riskMetrics.suspicious_transactions}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 text-blue-500 mr-2" />
              <span>Risk Score</span>
            </div>
            <span className="font-medium">
              {(riskMetrics.average_risk_score * 100).toFixed(1)}%
            </span>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">High Risk Countries</p>
            <div className="flex flex-wrap gap-2">
              {riskMetrics.high_risk_countries.map(country => (
                <Badge key={country} variant="secondary">
                  {country}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

