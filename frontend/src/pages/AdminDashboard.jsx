import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h2>Welcome back, Super Admin {user.fullName}!</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Here is your high-level overview of the Cardbox operations.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card">
          <h3 style={{ margin: '0 0 1rem', color: 'var(--accent-secondary)' }}>Total Orders</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>1,248</div>
        </div>
        <div className="glass-card">
          <h3 style={{ margin: '0 0 1rem', color: 'var(--accent-secondary)' }}>Active Clients</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>84</div>
        </div>
        <div className="glass-card">
          <h3 style={{ margin: '0 0 1rem', color: 'var(--accent-secondary)' }}>Suppliers</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>32</div>
        </div>
        <div className="glass-card">
          <h3 style={{ margin: '0 0 1rem', color: 'var(--accent-secondary)' }}>System Health</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--success)' }}>Optimal</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
