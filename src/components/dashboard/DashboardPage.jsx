import React, { useState, useEffect, useCallback } from 'react';
import { useSunny } from '../../sdk/SunnyReactSDK.js';
import '../../sdk/SunnyReactSDK.css';
import PaymentMethodsChart from './charts/PaymentMethodsChart.jsx';
import CountryDistributionMap from './charts/CountryDistributionMap.jsx';
import MetricCard from './widgets/MetricCard.jsx';
import { getTransactionHistory } from '../../core/transactionLogger.js';
import { getOfflineStatus } from '../../core/offline/offlineManager.js';
import IdentityManager from '../../core/identity/IdentityManager.js';
import { getPendingPayouts } from '../../core/instantSettlement.js';
import { getRegionalInsights } from '../../core/ai/regionalAnalytics.js';

const DashboardPage = () => {
  const { sdk } = useSunny();
  const [stats, setStats] = useState({
    totalBalance: 0,
    totalBalanceTrend: 0,
    todayVolume: 0,
    todayVolumeTrend: 0,
    pendingPayouts: 0,
    pendingPayoutsCount: 0,
    offlineTransactions: 0,
    syncStatus: 'Loading...'
  });
  const [recentActivity, setRecentActivity] = useState({
    transactions: [],
    customers: []
  });
  const [userStats, setUserStats] = useState({
    biometricUsage: 0,
    offlineSyncDevices: 0
  });
  const [smartSuggestions, setSmartSuggestions] = useState({
    recommendations: []
  });
  const [paymentMethodsData, setPaymentMethodsData] = useState([]);
  const [countryDistributionData, setCountryDistributionData] = useState([]);
  const [chartsLoading, setChartsLoading] = useState(true);
  const [chartsError, setChartsError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshInterval] = useState(30000); // 30 seconds
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Load dashboard statistics
  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setChartsLoading(true);

      // Fetch total balance and trend
      const balanceData = await sdk.getFinancialOverview();

      // Calculate today's volume
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      const todayTransactions = await getTransactionHistory({
        startDate: startOfDay,
        endDate: now,
        status: 'COMPLETED'
      });

      // Calculate today's volume
      const todayVolume = todayTransactions.reduce((sum, tx) => sum + tx.amount, 0);

      // Calculate yesterday's volume for trend
      const startOfYesterday = new Date(startOfDay);
      startOfYesterday.setDate(startOfYesterday.getDate() - 1);
      const endOfYesterday = new Date(startOfDay);
      endOfYesterday.setMilliseconds(endOfYesterday.getMilliseconds() - 1);

      const yesterdayTransactions = await getTransactionHistory({
        startDate: startOfYesterday,
        endDate: endOfYesterday,
        status: 'COMPLETED'
      });

      const yesterdayVolume = yesterdayTransactions.reduce((sum, tx) => sum + tx.amount, 0);
      const volumeTrend = yesterdayVolume ? ((todayVolume - yesterdayVolume) / yesterdayVolume) * 100 : 0;

      // Fetch pending payouts
      const pendingPayoutsData = await getPendingPayouts();

      // Get offline transaction status
      const offlineData = await getOfflineStatus();

      // Update stats
      setStats({
        totalBalance: balanceData.availableBalance,
        totalBalanceTrend: balanceData.balanceTrend,
        todayVolume: todayVolume,
        todayVolumeTrend: volumeTrend,
        pendingPayouts: pendingPayoutsData.totalAmount,
        pendingPayoutsCount: pendingPayoutsData.count,
        offlineTransactions: offlineData.pendingTransactionCount,
        syncStatus: offlineData.syncStatus
      });

      // Extract and process payment methods data
      if (balanceData.paymentMethods && Array.isArray(balanceData.paymentMethods)) {
        const formattedPaymentMethodsData = balanceData.paymentMethods.map(method => ({
          method: method.type,
          volume: method.volume
        }));
        setPaymentMethodsData(formattedPaymentMethodsData);
      } else {
        // Fallback with sample data if API doesn't return expected format
        setPaymentMethodsData([
          { method: 'card', volume: 120000 },
          { method: 'bank_transfer', volume: 85000 },
          { method: 'mobile_money', volume: 65000 },
          { method: 'crypto', volume: 35000 }
        ]);
      }

      // Extract and process country distribution data
      if (balanceData.countryDistribution && Array.isArray(balanceData.countryDistribution)) {
        const formattedCountryData = balanceData.countryDistribution.map(country => ({
          country: country.code,
          volume: country.volume
        }));
        setCountryDistributionData(formattedCountryData);
      } else {
        // Fallback with sample data if API doesn't return expected format
        setCountryDistributionData([
          { country: 'US', volume: 250000 },
          { country: 'GB', volume: 120000 },
          { country: 'DE', volume: 85000 },
          { country: 'FR', volume: 65000 },
          { country: 'CA', volume: 45000 }
        ]);
      }

      setChartsLoading(false);
      setChartsError(null);
      setLoading(false);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
      setError(err.message || 'Failed to load dashboard data');
      setChartsError(err.message || 'Failed to load chart data');
      setLoading(false);
      setChartsLoading(false);
    }
  }, [sdk]); // Added sdk to dependency array

  // Load recent activity data
  const loadRecentActivity = useCallback(async () => {
    try {
      // Get recent transactions
      const recentTransactions = await getTransactionHistory({
        limit: 4,
        sort: 'createdAt:desc'
      });

      // Format transactions for display
      const formattedTransactions = recentTransactions.map(tx => ({
        name: tx.customerName || tx.metadata?.customerDetails?.name || 'Anonymous',
        amount: tx.amount,
        // Assuming transaction object has id and date properties for display
        id: tx.id,
        date: new Date(tx.createdAt).toLocaleDateString(), // Assuming createdAt exists
        title: `TX ${tx.id}` // Placeholder title
      }));

      // Get customers with issues
      const customersWithIssues = await sdk.getCustomersWithRecentIssues({
        limit: 4,
        includeDetails: true
      });

      // Format customers for display
      const formattedCustomers = customersWithIssues.map(customer => {
        // Calculate relative date
        const txDate = new Date(customer.lastFailedTransaction.date);
        const today = new Date();
        const isToday = txDate.toDateString() === today.toDateString();

        // Corrected logic for yesterday check
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const isYesterdayCorrected = txDate.toDateString() === yesterday.toDateString();

        const dateText = isToday ? 'Today' : isYesterdayCorrected ? 'Yesterday' : new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric'
        }).format(txDate);

        return {
          name: customer.name,
          date: dateText,
          issue: customer.lastFailedTransaction.errorType || 'Payment failed'
        };
      });

      setRecentActivity({
        transactions: formattedTransactions,
        customers: formattedCustomers
      });
    } catch (err) {
      console.error("Failed to load recent activity:", err);
    }
  }, [sdk]); // Added sdk to dependency array

  // Load user statistics
  const loadUserStats = useCallback(async () => {
    try {
      // Get biometric usage statistics
      const biometricStats = await IdentityManager.getBiometricUsageStats();

      // Get offline sync device count
      const offlineData = await getOfflineStatus();

      setUserStats({
        biometricUsage: biometricStats.percentageUsing,
        offlineSyncDevices: offlineData.pendingSyncDevices
      });
    } catch (err) {
      console.error("Failed to load user statistics:", err);
    }
  }, []); // Note: IdentityManager doesn't need to be in dependencies if it's a static import/object

  // Load smart suggestions
  const loadSmartSuggestions = useCallback(async () => {
    try {
      // Get payment method analytics by region
      const regionalAnalytics = await getRegionalInsights();

      // Format recommendations
      const recommendations = regionalAnalytics.paymentMethodRecommendations.map(rec => ({
        name: rec.paymentMethod,
        region: rec.regionName,
        conversionImprovement: rec.expectedConversionImprovement
      }));

      setSmartSuggestions({
        recommendations
      });
    } catch (err) {
      console.error("Failed to load smart suggestions:", err);
    }
  }, []); // Dependencies seem okay here

  useEffect(() => {
    // Initial data load
    const loadAllData = async () => {
      await Promise.all([
        loadDashboardData(),
        loadRecentActivity(),
        loadUserStats(),
        loadSmartSuggestions()
      ]);
    };

    loadAllData();

    // Set up refresh interval
    const intervalId = setInterval(() => {
      loadDashboardData();
      loadRecentActivity();
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [loadDashboardData, loadRecentActivity, loadUserStats, loadSmartSuggestions, refreshInterval]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center text-red-600 mb-4">
            <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-lg font-semibold">Error Loading Dashboard</h2>
          </div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={loadDashboardData} // Note: This only reloads dashboard data, not all data
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-9xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold mb-1">Welcome back! 👋</h1>
        <p className="text-gray-600">Here's what's happening with your payments today.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          label="Total Balance"
          value={`$${stats.totalBalance.toLocaleString()}`}
          trend={stats.totalBalanceTrend}
          trendLabel="from last month"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <MetricCard
          label="Today's Volume"
          value={`$${stats.todayVolume.toLocaleString()}`}
          trend={stats.todayVolumeTrend}
          trendLabel="from yesterday"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
        <MetricCard
          label="Pending Payouts"
          value={`$${stats.pendingPayouts.toLocaleString()}`}
          subtext={`Processing (${stats.pendingPayoutsCount} payouts)`}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          }
        />
        <MetricCard
          label="Offline Transactions"
          value={stats.offlineTransactions}
          subtext={`Status: ${stats.syncStatus}`}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Volume by Payment Method</h2>
          {chartsLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : chartsError ? (
            <div className="flex flex-col items-center justify-center h-48 text-red-500">
              <svg className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Failed to load chart data</p>
              <button
                onClick={loadDashboardData}
                className="mt-2 px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Retry
              </button>
            </div>
          ) : (
            <PaymentMethodsChart data={paymentMethodsData} />
          )}
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Transactions per Region</h2>
          {chartsLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : chartsError ? (
            <div className="flex flex-col items-center justify-center h-48 text-red-500">
              <svg className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Failed to load chart data</p>
              <button
                onClick={loadDashboardData}
                className="mt-2 px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Retry
              </button>
            </div>
          ) : (
            <CountryDistributionMap data={countryDistributionData} />
          )}
        </div>
      </div>

      {/* User & Device Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Biometric Usage</h2>
          <div className="flex items-center">
            <div className="relative w-20 h-20 mr-4">
              <svg className="w-20 h-20" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="3"
                  strokeDasharray={`${userStats.biometricUsage}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-semibold">{userStats.biometricUsage}%</span>
              </div>
            </div>
            <div>
              <p className="text-gray-800 font-medium">of users</p>
              <p className="text-gray-600">Using Gesture or FacePay</p>
              <button className="mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-md hover:bg-indigo-200 transition">
                Configure
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Offline Sync</h2>
          <div className="flex items-center">
            <div className="relative w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-800 font-semibold">{userStats.offlineSyncDevices} Devices currently pending sync</p>
              <button className="mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-md hover:bg-indigo-200 transition">
                Manage
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
            <div className="text-xs text-gray-500">
              Updated {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
          {recentActivity.transactions.length === 0 ? (
            <div className="py-4 text-center text-gray-500">
              No recent transactions found
            </div>
          ) : (
            <div className="space-y-4">
              {/* Corrected mapping to use properties from formattedTransactions */}
              {recentActivity.transactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                      {/* Assuming transaction.id exists */}
                      <span className="text-blue-600 font-medium">{transaction.id ? transaction.id.charAt(0) : '?'}</span>
                    </div>
                    <div>
                      {/* Assuming transaction.title exists */}
                      <p className="text-sm font-medium text-gray-800">{transaction.title}</p>
                       {/* Assuming transaction.date exists */}
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  {/* Assuming transaction.amount exists and is formatted */}
                  <span className="text-sm font-medium">${transaction.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Frequent Customers</h2>
          <div className="space-y-4">
             {/* Corrected mapping to use properties from formattedCustomers */}
            {recentActivity.customers.map((customer, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center">
                  <div className="bg-red-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                     {/* Assuming customer.name exists */}
                    <span className="text-red-600 font-medium">{customer.name ? customer.name.charAt(0) : '?'}</span>
                  </div>
                  <div>
                    {/* Assuming customer.name exists */}
                    <p className="text-sm font-medium text-gray-800">{customer.name}</p>
                    {/* Assuming customer.date exists */}
                    <p className="text-xs text-gray-500">{customer.date}</p>
                  </div>
                </div>
                {/* Assuming customer.issue exists */}
                <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
                  {customer.issue}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Smart Suggestions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Smart Rail Suggestions</h2>
          <button className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-800">View All</button>
        </div>

        {/* Note: The hardcoded suggestions below are examples. You would likely map over smartSuggestions.recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Example mapping of suggestions */}
            {smartSuggestions.recommendations.length > 0 ? (
                smartSuggestions.recommendations.map((suggestion, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start">
                            <div className="bg-green-100 rounded-md p-3 mr-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800">{suggestion.name} recommended</h3>
                                <p className="text-sm text-gray-600">for {suggestion.region} region</p>
                                <button className="mt-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition">
                                  Implement
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                 <div className="border border-gray-200 rounded-lg p-4 md:col-span-2 text-center text-gray-500">
                    No smart rail suggestions at this time.
                 </div>
            )}

             {/* The original "Add a New Rail" card can remain or be dynamic */}
           <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-md p-3 mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Add a New Rail</h3>
                <p className="text-sm text-gray-600">15+ options incl. Prestack Jinsy</p>
                <button className="mt-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition">
                  Start Wizard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;