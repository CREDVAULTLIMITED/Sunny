import React from 'react';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { convertAmount } from '../../utils/formatters';

export const OverviewTrendsChart = ({ data }) => {
    if (!data || !data.length) return null;

    return (
        <div className="trends-chart">
            <h3>Revenue Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#635bff" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#635bff" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <YAxis 
                        tickFormatter={(value) => convertAmount(value, 'USD', 'USD', { USD: 1 })}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip 
                        formatter={(value) => convertAmount(value, 'USD', 'USD', { USD: 1 })}
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#635bff" 
                        fillOpacity={1} 
                        fill="url(#colorRevenue)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export const TransactionVolumeChart = ({ data }) => {
    if (!data || !data.length) return null;

    return (
        <div className="volume-chart">
            <h3>Transaction Volume</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="count" 
                        stroke="#00d4ff" 
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export const PaymentMethodsChart = ({ data }) => {
    if (!data || !data.length) return null;

    return (
        <div className="payment-methods-chart">
            <h3>Payment Methods</h3>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="card" 
                        stackId="1"
                        stroke="#635bff" 
                        fill="#635bff"
                    />
                    <Area 
                        type="monotone" 
                        dataKey="bank_transfer" 
                        stackId="1"
                        stroke="#00d4ff" 
                        fill="#00d4ff"
                    />
                    <Area 
                        type="monotone" 
                        dataKey="crypto" 
                        stackId="1"
                        stroke="#32CD32" 
                        fill="#32CD32"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
