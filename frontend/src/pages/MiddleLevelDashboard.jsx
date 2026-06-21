import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const MiddleLevelDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h2>Welcome, {user.fullName}!</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Manage your assigned clients and orders.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card">
          <h3 style={{ margin: '0 0 1rem', color: 'var(--accent-secondary)' }}>My Active Orders</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>42</div>
        </div>
        <div className="glass-card">
          <h3 style={{ margin: '0 0 1rem', color: 'var(--accent-secondary)' }}>My Clients</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>15</div>
        </div>
        <div className="glass-card">
          <h3 style={{ margin: '0 0 1rem', color: 'var(--accent-secondary)' }}>Pending Dispatches</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b' }}>7</div>
        </div>
      </div>
    </div>
  );
};

export default MiddleLevelDashboard;
