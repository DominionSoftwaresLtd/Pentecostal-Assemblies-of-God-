import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, MapPin, Sparkles, AlertCircle, CheckCircle2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import logoImg from '../assets/logo ngungo.png';

const departmentsList = [
  'Women Department', 'Men Department', 'Youth Department',
  'Sunday School Department', 'Praise and Worship', 'Instrumentalist',
  'Choir', 'Ushering', 'General Congregation',
];

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const BrandHeader = () => (
  <div className="auth-brand-header">
    <div className="auth-brand-logo">
      <img src={logoImg} alt="PAG Ngungo" />
    </div>
    <span className="auth-brand-name">PAG Ngungo Assembly</span>
    <span className="auth-brand-location">Mbeere District Headquarters, Embu County</span>
  </div>
);

const Signup = () => {
  const [step, setStep] = useState('form');
  const [googleUser, setGoogleUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', department: 'Praise and Worship',
    residence: '', password: '', confirmPassword: '',
  });
  const [extraData, setExtraData] = useState({ phone: '', residence: '', department: 'Praise and Worship' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const fireAuthChange = () => window.dispatchEvent(new Event('kemt_auth_change'));
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleGoogleSignIn = () => {
    if (!GOOGLE_CLIENT_ID) {
      setGoogleLoading(true);
      setTimeout(() => {
        setGoogleUser({ name: '', email: '', googleId: 'g-demo-' + Date.now(), picture: null });
        setStep('google-extra');
        setGoogleLoading(false);
      }, 700);
      return;
    }
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: window.location.origin + '/auth/google/callback',
      response_type: 'token', scope: 'openid email profile', prompt: 'select_account',
    });
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  };

  const handleGoogleExtraSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    if (!extraData.phone || !extraData.residence || !googleUser?.name || !googleUser?.email) {
      setError('Please fill in all required fields.');
      setLoading(false); return;
    }
    try {
      let registered = false; let userData = null;
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: googleUser.name, email: googleUser.email, phone: extraData.phone, department: extraData.department, residence: extraData.residence, password: 'GoogleOAuth_' + Date.now(), googleId: googleUser.googleId }),
        });
        const data = await res.json();
        if (res.ok && data.success) { registered = true; userData = data.user; localStorage.setItem('kemt_member_token', data.token); }
        else { setError(data.message || 'Registration failed.'); }
      } catch {
        userData = { _id: 'mem-g-' + Date.now(), name: googleUser.name, email: googleUser.email, phone: extraData.phone, department: extraData.department, residence: extraData.residence, role: 'Member', status: 'Active' };
        localStorage.setItem('kemt_member_token', 'kemt_g_offline_' + Date.now());
        registered = true;
      }
      if (registered && userData) {
        localStorage.setItem('kemt_current_user', JSON.stringify(userData));
        localStorage.setItem('kemt_admin_user', JSON.stringify(userData));
        fireAuthChange();
        setSuccessMsg('Account created! Welcome to PAG Ngungo Assembly.');
        setTimeout(() => navigate('/'), 1500);
      }
    } catch { setError('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setSuccessMsg('');
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match.'); return; }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      let isRegistered = false; let userData = null;
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone, department: formData.department, residence: formData.residence, password: formData.password }),
        });
        const data = await res.json();
        if (res.ok && data.success) { isRegistered = true; userData = data.user; localStorage.setItem('kemt_member_token', data.token); }
        else { setError(data.message || 'Registration failed. Please check your details.'); }
      } catch {
        userData = { _id: 'mem-' + Date.now(), name: formData.name, email: formData.email.trim().toLowerCase(), phone: formData.phone, department: formData.department, residence: formData.residence, role: 'Member', status: 'Active' };
        localStorage.setItem('kemt_member_token', 'kemt_offline_' + Date.now());
        isRegistered = true;
      }
      if (isRegistered && userData) {
        localStorage.setItem('kemt_current_user', JSON.stringify(userData));
        localStorage.setItem('kemt_admin_user', JSON.stringify(userData));
        fireAuthChange();
        setSuccessMsg('Account created! Welcome to PAG Ngungo Assembly. Redirecting…');
        setTimeout(() => navigate('/'), 1600);
      }
    } catch { setError('A connection issue occurred. Please try again.'); }
    finally { setLoading(false); }
  };

  // ── Google Extra Details Step ──
  if (step === 'google-extra') {
    return (
      <div className="auth-page-wrapper">
        <div className="auth-form-container" style={{ maxWidth: '480px' }}>
          <BrandHeader />
          <div className="auth-form-card">
            <h2 className="auth-form-title">Complete your profile</h2>
            <p className="auth-form-sub">A few more details to finish setting up your church account</p>

            {error && <div className="auth-error-box"><AlertCircle size={16} style={{ flexShrink: 0 }} /><span>{error}</span></div>}

            <form onSubmit={handleGoogleExtraSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="auth-row-2">
                <div className="auth-input-group">
                  <label>Full Name *</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon"><User size={15} /></span>
                    <input type="text" required value={googleUser?.name || ''} onChange={e => setGoogleUser({ ...googleUser, name: e.target.value })} placeholder="Your full name" />
                  </div>
                </div>
                <div className="auth-input-group">
                  <label>Email *</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon"><Mail size={15} /></span>
                    <input type="email" required value={googleUser?.email || ''} onChange={e => setGoogleUser({ ...googleUser, email: e.target.value })} placeholder="your@email.com" />
                  </div>
                </div>
              </div>
              <div className="auth-row-2">
                <div className="auth-input-group">
                  <label>Phone *</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon"><Phone size={15} /></span>
                    <input type="tel" required value={extraData.phone} onChange={e => setExtraData({ ...extraData, phone: e.target.value })} placeholder="+254 7XX XXX XXX" />
                  </div>
                </div>
                <div className="auth-input-group">
                  <label>Residence *</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon"><MapPin size={15} /></span>
                    <input type="text" required value={extraData.residence} onChange={e => setExtraData({ ...extraData, residence: e.target.value })} placeholder="e.g. Nairobi, Meru" />
                  </div>
                </div>
              </div>
              <div className="auth-input-group">
                <label>Ministry Department</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><Sparkles size={15} /></span>
                  <select value={extraData.department} onChange={e => setExtraData({ ...extraData, department: e.target.value })}>
                    {departmentsList.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" className="auth-submit-btn" disabled={loading} style={{ background: '#4285F4' }}>
                {loading ? <><i className="fas fa-spinner fa-spin"></i> Creating account...</> : <><span>Complete registration</span><ArrowRight size={15} /></>}
              </button>
            </form>

            <div className="auth-form-footer">
              <button onClick={() => setStep('form')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#000066', fontWeight: 600, fontSize: '0.82rem', fontFamily: 'var(--font-primary)' }}>
                &#8592; Use email instead
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Sign-Up Form ──
  return (
    <div className="auth-page-wrapper">
      <div className="auth-form-container" style={{ maxWidth: '460px' }}>
        <BrandHeader />
        <div className="auth-form-card">
          <h2 className="auth-form-title">Create account</h2>
          <p className="auth-form-sub">Join the PAG Ngungo Assembly membership portal</p>

          {error && <div className="auth-error-box"><AlertCircle size={16} style={{ flexShrink: 0 }} /><span>{error}</span></div>}
          {successMsg && <div className="auth-success-box"><CheckCircle2 size={16} style={{ flexShrink: 0 }} /><span>{successMsg}</span></div>}

          <button type="button" className="auth-google-btn" onClick={handleGoogleSignIn} disabled={googleLoading}>
            {googleLoading ? <i className="fas fa-spinner fa-spin" style={{ color: '#4285F4', fontSize: '0.9rem' }}></i> : <GoogleIcon />}
            <span>{googleLoading ? 'Connecting...' : 'Continue with Google'}</span>
          </button>

          <div className="auth-divider"><span>or sign up with email</span></div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="auth-input-group">
              <label>Full Name *</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><User size={15} /></span>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. John Kamau" />
              </div>
            </div>
            <div className="auth-input-group">
              <label>Email Address *</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><Mail size={15} /></span>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" />
              </div>
            </div>
            <div className="auth-row-2">
              <div className="auth-input-group">
                <label>Phone *</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><Phone size={15} /></span>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+254 712 345 678" />
                </div>
              </div>
              <div className="auth-input-group">
                <label>Residence *</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><MapPin size={15} /></span>
                  <input type="text" name="residence" required value={formData.residence} onChange={handleChange} placeholder="e.g. Nairobi, Meru" />
                </div>
              </div>
            </div>
            <div className="auth-input-group">
              <label>Ministry Department</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"><Sparkles size={15} /></span>
                <select name="department" value={formData.department} onChange={handleChange}>
                  {departmentsList.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div className="auth-row-2">
              <div className="auth-input-group">
                <label>Password *</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><Lock size={15} /></span>
                  <input type={showPassword ? 'text' : 'password'} name="password" required value={formData.password} onChange={handleChange} placeholder="Min 6 chars" autoComplete="new-password" style={{ paddingRight: '36px' }} />
                  <button type="button" className="auth-eye-btn" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                </div>
              </div>
              <div className="auth-input-group">
                <label>Confirm *</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><Lock size={15} /></span>
                  <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter" autoComplete="new-password" style={{ paddingRight: '36px' }} />
                  <button type="button" className="auth-eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                </div>
              </div>
            </div>
            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? <><i className="fas fa-spinner fa-spin"></i> Creating account...</> : <><span>Create account</span><ArrowRight size={15} /></>}
            </button>
          </form>

          <div className="auth-form-footer">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
            <Link to="/" className="auth-back-link">&#8592; Back to website</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
