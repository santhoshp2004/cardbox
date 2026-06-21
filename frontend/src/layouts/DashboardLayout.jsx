import React, { useContext } from 'react';
import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiLogOut, FiHome, FiUsers, FiBox, FiTruck } from 'react-icons/fi';
import './DashboardLayout.css';

const DashboardLayout = ({ allowedRoles }) => {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) return <div className="loading-screen">Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">CB</div>
          <h2>CardBox</h2>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/" className="nav-item">
            <FiHome className="nav-icon" /> Dashboard
          </Link>
          
          {(user.role === 'SA' || user.role === 'ML') && (
            <>
              <Link to="/clients" className="nav-item">
                <FiUsers className="nav-icon" /> Clients
              </Link>
              <Link to="/orders" className="nav-item">
                <FiBox className="nav-icon" /> Orders
              </Link>
              <Link to="/suppliers" className="nav-item">
                <FiTruck className="nav-icon" /> Suppliers
              </Link>
            </>
          )}

          {user.role === 'SA' && (
            <Link to="/staff" className="nav-item">
              <FiUsers className="nav-icon" /> Staff Mgmt
            </Link>
          )}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">{user.fullName.charAt(0)}</div>
            <div className="user-info">
              <span className="user-name">{user.fullName}</span>
              <span className="user-role">{user.role}</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <h1 className="page-title">Management Portal</h1>
          <div className="topbar-actions">
            <div className="status-badge pulse">Live System</div>
          </div>
        </header>
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
