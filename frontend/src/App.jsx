import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

function App() {
  // For now, let's mock an authenticated state
  const isAuthenticated = true;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route 
          path="/*" 
          element={
            isAuthenticated ? (
              <div className="app-container">
                <Sidebar />
                <div className="main-content">
                  <Topbar />
                  <div style={{ marginTop: '20px' }}>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      {/* We will add more routes like /clients, /orders here */}
                    </Routes>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
