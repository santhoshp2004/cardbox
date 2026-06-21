export default function Login() {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: 'var(--primary-color)', fontSize: '2rem', fontWeight: 800 }}>CardBox<span style={{color: 'white'}}>.Sys</span></h1>
          <p style={{ marginTop: '0.5rem' }}>Sign in to your account</p>
        </div>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Email Address</label>
            <input type="email" className="input-field" placeholder="admin@cardbox.com" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Password</label>
            <input type="password" className="input-field" placeholder="••••••••" />
          </div>
          <button type="button" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
