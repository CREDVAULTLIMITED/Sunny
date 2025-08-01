'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { TransactionsTable } from '@/components/dashboard/transactions-table';
import { TransactionVolumeChart } from '@/components/dashboard/transaction-volume-chart';
import { PaymentMethodsChart } from '@/components/dashboard/payment-methods-chart';
import { CountryDistributionMap } from '@/components/dashboard/country-distribution-map';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { useTransactions } from '@/hooks/use-transactions';
import { useStats } from '@/hooks/use-stats';

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  
  const { transactions, isLoading: transactionsLoading } = useTransactions({
    startDate: dateRange.from.toISOString(),
    endDate: dateRange.to.toISOString(),
  });
  
  const { stats, isLoading: statsLoading } = useStats({
    startDate: dateRange.from.toISOString(),
    endDate: dateRange.to.toISOString(),
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Overview of your payment processing activity."
      >
        <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
        />
      </DashboardHeader>
      
      <DashboardStats stats={stats} isLoading={statsLoading} />
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Transaction Volume</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <TransactionVolumeChart data={stats?.dailyVolume} isLoading={statsLoading} />
              </CardContent>
            </Card>
            
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <PaymentMethodsChart data={stats?.byPaymentMethod} isLoading={statsLoading} />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionsTable 
                  transactions={transactions?.slice(0, 5)} 
                  isLoading={transactionsLoading}
                  compact
                />
              </CardContent>
            </Card>
            
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Global Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <CountryDistributionMap data={stats?.byCountry} isLoading={statsLoading} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionsTable 
                transactions={transactions} 
                isLoading={transactionsLoading}
                pagination
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Success Rate Chart */}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Average Transaction Value</CardTitle>
              </CardHeader>
              <CardContent>
                {/* ATV Chart */}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Processing Time</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Processing Time Chart */}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}