import { FiTrendingUp, FiBox, FiUsers, FiTruck } from 'react-icons/fi';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>{title}</p>
        <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>{value}</h3>
      </div>
      <div style={{ background: `rgba(${color}, 0.1)`, padding: '0.75rem', borderRadius: '0.75rem' }}>
        <Icon size={24} style={{ color: `rgb(${color})` }} />
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
      <FiTrendingUp color="var(--status-success)" />
      <span style={{ color: 'var(--status-success)' }}>{trend}</span>
      <span style={{ color: 'var(--text-muted)' }}>vs last month</span>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>Overview</h1>
        <p>Welcome back! Here's what's happening with your manufacturing today.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        <StatCard title="Total Revenue" value="$48,205" icon={FiTrendingUp} color="79, 70, 229" trend="+12.5%" />
        <StatCard title="Pending Orders" value="124" icon={FiBox} color="245, 158, 11" trend="+5.2%" />
        <StatCard title="Total Clients" value="89" icon={FiUsers} color="16, 185, 129" trend="+2.4%" />
        <StatCard title="Active Deliveries" value="12" icon={FiTruck} color="59, 130, 246" trend="+18.1%" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', minHeight: '300px' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Recent Orders</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Placeholder for table/list */}
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 600 }}>ORD-2023-001</p>
                <p style={{ fontSize: '0.875rem' }}>5-ply Corrugated Boxes (1000 pcs)</p>
              </div>
              <span style={{ padding: '0.25rem 0.75rem', background: 'rgba(245, 158, 11, 0.2)', color: 'var(--status-warning)', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600 }}>IN PRODUCTION</span>
            </div>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 600 }}>ORD-2023-002</p>
                <p style={{ fontSize: '0.875rem' }}>Custom Print Boxes (500 pcs)</p>
              </div>
              <span style={{ padding: '0.25rem 0.75rem', background: 'rgba(59, 130, 246, 0.2)', color: 'var(--status-info)', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600 }}>DISPATCHED</span>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>System Alerts</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <div style={{ padding: '1rem', borderLeft: '4px solid var(--status-danger)', background: 'rgba(255,255,255,0.02)', borderRadius: '0 0.5rem 0.5rem 0' }}>
               <p style={{ fontWeight: 500, fontSize: '0.875rem' }}>Low Raw Material: Kraft Paper</p>
               <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Just now</p>
             </div>
             <div style={{ padding: '1rem', borderLeft: '4px solid var(--status-success)', background: 'rgba(255,255,255,0.02)', borderRadius: '0 0.5rem 0.5rem 0' }}>
               <p style={{ fontWeight: 500, fontSize: '0.875rem' }}>Delivery Vehicle DL-01-4455 returned</p>
               <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>2 hours ago</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
