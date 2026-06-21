import { FiBell, FiSearch, FiUser } from 'react-icons/fi';

export default function Topbar() {
  return (
    <div className="glass-header" style={{ padding: '1rem 2rem', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '300px' }}>
        <FiSearch size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Search everywhere..." 
          className="input-field" 
          style={{ paddingLeft: '3rem', background: 'rgba(15, 23, 42, 0.4)', border: 'none' }}
        />
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <FiBell size={22} color="var(--text-muted)" />
          <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: 'var(--status-danger)', width: '10px', height: '10px', borderRadius: '50%' }}></span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', borderLeft: '1px solid var(--glass-border)', paddingLeft: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>Super Admin</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Admin Role</p>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiUser size={20} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
}
