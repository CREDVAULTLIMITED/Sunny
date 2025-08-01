import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { paymentService } from '../../services/paymentService';
import '../../styles/pages/dashboard-components.css';

const DashboardBalance = () => {
  const [balance, setBalance] = useState(null);
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBalanceAndPayouts() {
      try {
        setLoading(true);
        const balanceData = await paymentService.getAvailableBalance();
        const payoutsData = await paymentService.getBalanceTransactions();
        setBalance(balanceData);
        setPayouts(payoutsData);
      } catch (err) {
        setError('Failed to load balance or payouts.');
      } finally {
        setLoading(false);
      }
    }
    fetchBalanceAndPayouts();
  }, []);

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard-balance">
      <div className="page-header">
        <div className="header-left">
          <h1>Balance &amp; Payouts</h1>
        </div>
        <div className="header-right">
          <button className="btn btn-outline">Download Statement</button>
          <button className="btn btn-primary">Withdraw Funds</button>
        </div>
      </div>
      <div className="balance-overview">
        <div className="balance-cards">
          <div className="balance-card available">
            <div className="balance-header">
              <h2>Available Balance</h2>
            </div>
            <div className="balance-amount">{balance?.available ? `$${balance.available}` : '-'}</div>
            <div className="balance-meta">
              <span className="balance-label">Next Payout:</span>
              <span className="balance-value">{balance?.nextPayout ? `$${balance.nextPayout.amount} (${balance.nextPayout.date})` : '-'}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="payouts-table">
        <h2>Payouts</h2>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={payouts}
            columns={[
              { field: 'id', headerName: 'Payout ID', width: 130 },
              {
                field: 'amount',
                headerName: 'Amount',
                width: 130,
                valueFormatter: (params) => {
                  return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: params.row.currency
                  }).format(params.value);
                }
              },
              { field: 'status', headerName: 'Status', width: 130 },
              {
                field: 'date',
                headerName: 'Date',
                width: 130,
                valueFormatter: (params) => {
                  return new Date(params.value).toLocaleDateString();
                }
              },
              { field: 'destination', headerName: 'Destination', width: 200 }
            ]}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            className="payout-table"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardBalance;
