import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import AdminDashboard from './pages/AdminDashboard';
import MiddleLevelDashboard from './pages/MiddleLevelDashboard';
import EndLevelDashboard from './pages/EndLevelDashboard';

// A component to decide which dashboard to render based on user role
const RoleBasedDashboard = () => {
  const { user } = useContext(AuthContext);
  
  if (!user) return <Navigate to="/login" />;
  
  switch (user.role) {
    case 'SA':
      return <AdminDashboard />;
    case 'ML':
      return <MiddleLevelDashboard />;
    case 'EL':
      return <EndLevelDashboard />;
    default:
      return <Navigate to="/login" />;
  }
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Protected Routes inside DashboardLayout */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<RoleBasedDashboard />} />
        {/* Placeholder routes for future implementation */}
        <Route path="clients" element={<div><h2 className="glass-card">Clients Management</h2></div>} />
        <Route path="orders" element={<div><h2 className="glass-card">Orders Management</h2></div>} />
        <Route path="suppliers" element={<div><h2 className="glass-card">Suppliers Management</h2></div>} />
        <Route path="staff" element={<div><h2 className="glass-card">Staff Management</h2></div>} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
