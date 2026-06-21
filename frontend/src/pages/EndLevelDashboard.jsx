import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const EndLevelDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h2>Hello, {user.fullName}!</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Your active manufacturing pipeline.
        </p>
      </div>

      <div className="glass-card">
        <h3 style={{ margin: '0 0 1rem', color: 'var(--accent-secondary)' }}>Current Task</h3>
        <p><strong>Order:</strong> #ORD-2024-892</p>
        <p><strong>Type:</strong> 5-Ply Corrugated Box</p>
        <p><strong>Status:</strong> In Production</p>
      </div>
    </div>
  );
};

export default EndLevelDashboard;
