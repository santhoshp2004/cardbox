import { Link } from 'react-router-dom';
import { FiHome, FiUsers, FiBox, FiTruck, FiBriefcase } from 'react-icons/fi';

export default function Sidebar() {
  return (
    <div className="glass-panel" style={{ width: '260px', margin: '1rem', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ padding: '0 1rem' }}>
        <h2 style={{ color: 'var(--primary-color)', fontSize: '1.5rem', fontWeight: 700 }}>CardBox<span style={{color: 'white'}}>.Sys</span></h2>
      </div>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', color: 'var(--text-main)', background: 'rgba(79, 70, 229, 0.1)' }}>
          <FiHome size={20} color="var(--primary-color)" />
          <span style={{ fontWeight: 500 }}>Dashboard</span>
        </Link>
        <Link to="/orders" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', color: 'var(--text-muted)' }}>
          <FiBox size={20} />
          <span>Orders</span>
        </Link>
        <Link to="/clients" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', color: 'var(--text-muted)' }}>
          <FiBriefcase size={20} />
          <span>Clients</span>
        </Link>
        <Link to="/suppliers" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', color: 'var(--text-muted)' }}>
          <FiTruck size={20} />
          <span>Suppliers</span>
        </Link>
        <Link to="/users" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', color: 'var(--text-muted)' }}>
          <FiUsers size={20} />
          <span>User Management</span>
        </Link>
      </nav>
    </div>
  );
}
