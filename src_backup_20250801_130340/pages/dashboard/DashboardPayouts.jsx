import React, { useEffect, useState } from 'react';
import { paymentService } from '../../services/paymentService';
import '../../styles/pages/dashboard-components.css';

const DashboardPayouts = () => {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPayouts() {
      try {
        setLoading(true);
        const data = await paymentService.getBalanceTransactions();
        setPayouts(data);
      } catch (err) {
        setError('Failed to load payouts.');
      } finally {
        setLoading(false);
      }
    }
    fetchPayouts();
  }, []);

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard-payouts">
      <h1>Payouts</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          {payouts.map((payout) => (
            <tr key={payout.id}>
              <td>{payout.id}</td>
              <td>${payout.amount}</td>
              <td>{payout.status}</td>
              <td>{payout.date}</td>
              <td>{payout.destination}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPayouts;
