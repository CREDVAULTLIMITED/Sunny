'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CreditCard, Globe, TrendingUp } from 'lucide-react';

interface PaymentMethodData {
  method: string;
  count: number;
  amount: number;
  success_rate: number;
  average_processing_time: number;
}

interface CountryData {
  country: string;
  count: number;
  amount: number;
  success_rate: number;
  popular_payment_methods: string[];
}

interface PaymentAnalyticsProps {
  paymentMethods: PaymentMethodData[];
  countryData: CountryData[];
  isLoading?: boolean;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const formatPercentage = (value: number) => {
  return `${(value * 100).toFixed(1)}%`;
};

export function PaymentAnalytics({ paymentMethods, countryData, isLoading = false }: PaymentAnalyticsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map(j => (
                  <div key={j} className="flex justify-between items-center">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Sort payment methods by amount
  const sortedPaymentMethods = [...paymentMethods].sort((a, b) => b.amount - a.amount);
  // Sort countries by transaction count
  const sortedCountries = [...countryData].sort((a, b) => b.count - a.count);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5 text-muted-foreground" />
            <CardTitle>Payment Methods</CardTitle>
          </div>
          <div className="text-sm text-muted-foreground">
            {paymentMethods.length} methods
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedPaymentMethods.map((method) => (
              <div key={method.method} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium capitalize">
                    {method.method.replace('_', ' ')}
                  </span>
                  <span className="font-medium">
                    {formatCurrency(method.amount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{method.count} transactions</span>
                  <span>{formatPercentage(method.success_rate)} success</span>
                </div>
                <div className="w-full bg-gray-200 h-1 rounded-full">
                  <div 
                    className="bg-blue-500 h-1 rounded-full" 
                    style={{ 
                      width: `${(method.amount / sortedPaymentMethods[0].amount) * 100}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center">
            <Globe className="mr-2 h-5 w-5 text-muted-foreground" />
            <CardTitle>Geographical Distribution</CardTitle>
          </div>
          <div className="text-sm text-muted-foreground">
            {countryData.length} countries
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedCountries.map((country) => (
              <div key={country.country} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    {country.country}
                  </span>
                  <span className="font-medium">
                    {formatCurrency(country.amount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{country.count} transactions</span>
                  <span>{formatPercentage(country.success_rate)} success</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Popular: {country.popular_payment_methods.map(m => m.replace('_', ' ')).join(', ')}
                </div>
                <div className="w-full bg-gray-200 h-1 rounded-full">
                  <div 
                    className="bg-green-500 h-1 rounded-full" 
                    style={{ 
                      width: `${(country.count / sortedCountries[0].count) * 100}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

