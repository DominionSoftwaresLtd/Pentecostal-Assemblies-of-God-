import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, MapPin, Sparkles, AlertCircle, CheckCircle2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import logoImg from '../assets/logo ngungo.png';

const departmentsList = [
  'Women Department',
  'Men Department',
  'Youth Department',
  'Sunday School Department',
  'Praise and Worship',
  'Instrumentalist',
  'Choir',
  'Ushering',
  'General Congregation'
];

// Google icon SVG
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

const Signup = () => {
  const [step, setStep] = useState('form'); // 'form' | 'google-extra'
  const [googleUser, setGoogleUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Praise and Worship',
    residence: '',
    password: '',
    confirmPassword: ''
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ——— GOOGLE SIGN-IN ———
  const handleGoogleSignIn = () => {
    if (!GOOGLE_CLIENT_ID) {
      // Demo mode: simulate a Google sign-in with a fake profile
      setGoogleLoading(true);
      setTimeout(() => {
        setGoogleUser({
          name: '',  // Will be filled from Google in real mode
          email: '',
          googleId: 'google-demo-' + Date.now(),
          picture: null
        });
        setStep('google-extra');
        setGoogleLoading(false);
      }, 800);
      return;
    }

    // Real Google OAuth popup
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: window.location.origin + '/auth/google/callback',
      response_type: 'token',
      scope: 'openid email profile',
      prompt: 'select_account'
    });
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  };

  // Complete Google sign-up with extra details
  const handleGoogleExtraSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!extraData.phone || !extraData.residence || !googleUser?.name || !googleUser?.email) {
      setError('Please fill in all required fields including your name and email.');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name: googleUser.name,
        email: googleUser.email,
        phone: extraData.phone,
        department: extraData.department,
        residence: extraData.residence,
        password: 'GoogleOAuth_' + Date.now(), // placeholder — user logs in via Google
        googleId: googleUser.googleId
      };

      let registered = false;
      let userData = null;

      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (res.ok && data.success) {
          registered = true;
          userData = data.user;
          localStorage.setItem('kemt_member_token', data.token);
        } else {
          setError(data.message || 'Registration failed.');
        }
      } catch {
        // Offline fallback
        userData = { _id: 'mem-g-' + Date.now(), name: googleUser.name, email: googleUser.email, phone: extraData.phone, department: extraData.department, residence: extraData.residence, role: 'Member', status: 'Active', joinedAt: new Date().toISOString() };
        localStorage.setItem('kemt_member_token', 'kemt_offline_google_' + Date.now());
        registered = true;
      }

      if (registered && userData) {
        localStorage.setItem('kemt_current_user', JSON.stringify(userData));
        localStorage.setItem('kemt_admin_user', JSON.stringify(userData));
        fireAuthChange();
        setSuccessMsg('Welcome to KEMT! Account created successfully.');
        setTimeout(() => navigate('/'), 1500);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ——— NORMAL SIGN-UP ———
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify your password confirmation.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters in length.');
      return;
    }

    setLoading(true);

    try {
      let isRegistered = false;
      let userData = null;

      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            department: formData.department,
            residence: formData.residence,
            password: formData.password
          })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          isRegistered = true;
          userData = data.user;
          localStorage.setItem('kemt_member_token', data.token);
        } else {
          setError(data.message || 'Registration failed. Please check your details.');
        }
      } catch {
        // Offline fallback
        userData = {
          _id: 'mem-' + Date.now(),
          name: formData.name,
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone,
          department: formData.department,
          residence: formData.residence,
          role: 'Member',
          status: 'Active',
          joinedAt: new Date().toISOString()
        };
        localStorage.setItem('kemt_member_token', 'kemt_offline_mem_' + Date.now());
        isRegistered = true;
      }

      if (isRegistered && userData) {
        // Auto-login: store user and fire change event
        localStorage.setItem('kemt_current_user', JSON.stringify(userData));
        localStorage.setItem('kemt_admin_user', JSON.stringify(userData));
        fireAuthChange();
        setSuccessMsg('Account created! Welcome to the KEMT family. Redirecting…');
        setTimeout(() => navigate('/'), 1600);
      }
    } catch {
      setError('A connection issue occurred. Please try again in a few moments.');
    } finally {
      setLoading(false);
    }
  };

  // ——— GOOGLE EXTRA DETAILS STEP ———
  if (step === 'google-extra') {
    return (
      <div className="container section" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
        <div style={{ background: '#fff', padding: '36px 32px', borderRadius: '16px', boxShadow: '0 12px 36px rgba(232,125,30,0.08), 0 2px 8px rgba(0,0,0,0.04)', width: '100%', maxWidth: '480px', border: '1.5px solid #fed7aa' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ffffff', border: '2px solid #fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', overflow: 'hidden', padding: '5px', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}>
              <img src={logoImg} alt="KEMT" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: '20px', backgroundColor: 'rgba(66,133,244,0.1)', color: '#4285F4', fontSize: '0.75rem', fontWeight: 700, marginBottom: '8px' }}>
              Almost There!
            </span>
            <h2 style={{ color: '#1e293b', margin: '0 0 6px', fontSize: '1.5rem', fontWeight: 800 }}>Complete Your Profile</h2>
            <p style={{ color: '#64748b', margin: 0, fontSize: '0.86rem' }}>We need a few more details to set up your KEMT membership.</p>
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', marginBottom: '18px', borderRadius: '8px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '0.86rem', fontWeight: 500 }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleGoogleExtraSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* Name & Email (from Google - editable) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#334155', fontWeight: 600, fontSize: '0.85rem' }}>Full Name *</label>
                <div style={{ position: 'relative' }}>
                  <input type="text" required value={googleUser?.name || ''} onChange={e => setGoogleUser({ ...googleUser, name: e.target.value })} placeholder="Your full name"
                    style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '0.88rem', color: '#1e293b', boxSizing: 'border-box' }} />
                  <User size={15} color="#94a3b8" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#334155', fontWeight: 600, fontSize: '0.85rem' }}>Email *</label>
                <div style={{ position: 'relative' }}>
                  <input type="email" required value={googleUser?.email || ''} onChange={e => setGoogleUser({ ...googleUser, email: e.target.value })} placeholder="your@email.com"
                    style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '0.88rem', color: '#1e293b', boxSizing: 'border-box' }} />
                  <Mail size={15} color="#94a3b8" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#334155', fontWeight: 600, fontSize: '0.85rem' }}>Phone Number *</label>
                <div style={{ position: 'relative' }}>
                  <input type="tel" required value={extraData.phone} onChange={e => setExtraData({ ...extraData, phone: e.target.value })} placeholder="+254 7XX XXX XXX"
                    style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '0.88rem', color: '#1e293b', boxSizing: 'border-box' }} />
                  <Phone size={15} color="#94a3b8" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#334155', fontWeight: 600, fontSize: '0.85rem' }}>Residence / Area *</label>
                <div style={{ position: 'relative' }}>
                  <input type="text" required value={extraData.residence} onChange={e => setExtraData({ ...extraData, residence: e.target.value })} placeholder="e.g. Nairobi, Meru"
                    style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '0.88rem', color: '#1e293b', boxSizing: 'border-box' }} />
                  <MapPin size={15} color="#94a3b8" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#334155', fontWeight: 600, fontSize: '0.85rem' }}>Ministry Department / Interest</label>
              <div style={{ position: 'relative' }}>
                <select value={extraData.department} onChange={e => setExtraData({ ...extraData, department: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '0.88rem', color: '#1e293b', backgroundColor: '#fff', boxSizing: 'border-box' }}>
                  {departmentsList.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <Sparkles size={15} color="#94a3b8" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>
            <button type="submit" disabled={loading}
              style={{ backgroundColor: '#4285F4', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(66,133,244,0.3)', opacity: loading ? 0.8 : 1 }}>
              {loading ? <><i className="fas fa-spinner fa-spin"></i> Creating Account...</> : <><span>Complete Registration</span><ArrowRight size={17} /></>}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '14px', fontSize: '0.82rem', color: '#94a3b8' }}>
            <button onClick={() => setStep('form')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E87D1E', fontWeight: 700, fontSize: '0.82rem' }}>
              ← Use email/password instead
            </button>
          </p>
        </div>
      </div>
    );
  }

  // ——— MAIN SIGN-UP FORM ———
  return (
    <div className="container section" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
      <div style={{ background: '#ffffff', padding: '40px 36px', borderRadius: '16px', boxShadow: '0 12px 36px rgba(232, 125, 30, 0.08), 0 2px 8px rgba(0,0,0,0.04)', width: '100%', maxWidth: '520px', border: '1.5px solid #fed7aa' }}>
        <div style={{ textAlign: 'center', marginBottom: '26px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#ffffff', border: '2px solid #fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', overflow: 'hidden', padding: '5px', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}>
            <img src={logoImg} alt="PAG Ngungo Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: '20px', backgroundColor: 'rgba(232, 125, 30, 0.12)', color: '#E87D1E', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
            Pentecostal Assemblies of God
          </span>
          <h2 style={{ color: '#1e293b', margin: '0 0 6px', fontSize: '1.65rem', fontWeight: 800 }}>Ngungo Assembly Registration</h2>
          <p style={{ color: '#64748b', margin: 0, fontSize: '0.88rem' }}>
            Create your account to join church departments, fellowships, and stay connected.
          </p>
        </div>

        {/* Error / Success */}
        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', marginBottom: '20px', borderRadius: '8px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '0.86rem', fontWeight: 500 }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span style={{ flex: 1 }}>{error}</span>
          </div>
        )}
        {successMsg && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', marginBottom: '20px', borderRadius: '8px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', fontSize: '0.86rem', fontWeight: 600 }}>
            <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
            <span style={{ flex: 1 }}>{successMsg}</span>
          </div>
        )}

        {/* ——— Continue with Google ——— */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
            padding: '12px 16px', borderRadius: '8px', border: '1.5px solid #e2e8f0',
            background: '#fff', cursor: googleLoading ? 'not-allowed' : 'pointer',
            fontSize: '0.94rem', fontWeight: 600, color: '#1e293b',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)', transition: 'all 0.2s', marginBottom: '8px',
            fontFamily: 'inherit', opacity: googleLoading ? 0.75 : 1
          }}
          onMouseEnter={e => { if (!googleLoading) e.currentTarget.style.borderColor = '#4285F4'; if (!googleLoading) e.currentTarget.style.boxShadow = '0 4px 12px rgba(66,133,244,0.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.06)'; }}
        >
          {googleLoading ? <i className="fas fa-spinner fa-spin" style={{ color: '#4285F4' }}></i> : <GoogleIcon />}
          <span>{googleLoading ? 'Connecting to Google...' : 'Continue with Google'}</span>
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0' }}>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
          <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}>or sign up with email</span>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Full Name */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600, fontSize: '0.88rem' }}>Full Name *</label>
            <div style={{ position: 'relative' }}>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. John Kamau"
                style={{ width: '100%', padding: '11px 14px 11px 40px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '0.92rem', color: '#1e293b', boxSizing: 'border-box' }} />
              <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600, fontSize: '0.88rem' }}>Email Address *</label>
            <div style={{ position: 'relative' }}>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="e.g. johnkamau@gmail.com"
                style={{ width: '100%', padding: '11px 14px 11px 40px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '0.92rem', color: '#1e293b', boxSizing: 'border-box' }} />
              <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Phone & Residence */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600, fontSize: '0.88rem' }}>Phone Number *</label>
              <div style={{ position: 'relative' }}>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+254 712 345 678"
                  style={{ width: '100%', padding: '11px 14px 11px 36px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '0.88rem', color: '#1e293b', boxSizing: 'border-box' }} />
                <Phone size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600, fontSize: '0.88rem' }}>Residence / Area *</label>
              <div style={{ position: 'relative' }}>
                <input type="text" name="residence" required value={formData.residence} onChange={handleChange} placeholder="e.g. Nairobi, Meru"
                  style={{ width: '100%', padding: '11px 14px 11px 36px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '0.88rem', color: '#1e293b', boxSizing: 'border-box' }} />
                <MapPin size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>
          </div>

          {/* Department */}
          <div>
            <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600, fontSize: '0.88rem' }}>Ministry Department / Interest</label>
            <div style={{ position: 'relative' }}>
              <select name="department" value={formData.department} onChange={handleChange}
                style={{ width: '100%', padding: '11px 14px 11px 40px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '0.92rem', color: '#1e293b', backgroundColor: '#ffffff', boxSizing: 'border-box' }}>
                {departmentsList.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
              </select>
              <Sparkles size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Password & Confirm */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600, fontSize: '0.88rem' }}>Password *</label>
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} name="password" required value={formData.password} onChange={handleChange} placeholder="Min 6 chars" autoComplete="new-password"
                  style={{ width: '100%', padding: '11px 36px 11px 36px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '0.88rem', color: '#1e293b', boxSizing: 'border-box' }} />
                <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: showPassword ? '#E87D1E' : '#94a3b8' }}
                  title={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600, fontSize: '0.88rem' }}>Confirm *</label>
              <div style={{ position: 'relative' }}>
                <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} placeholder="Re-type" autoComplete="new-password"
                  style={{ width: '100%', padding: '11px 36px 11px 36px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '0.88rem', color: '#1e293b', boxSizing: 'border-box' }} />
                <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: showConfirmPassword ? '#E87D1E' : '#94a3b8' }}
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}>
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading}
            style={{ backgroundColor: '#E87D1E', color: 'white', padding: '13px', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.96rem', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(232, 125, 30, 0.35)', transition: 'all 0.2s ease', opacity: loading ? 0.8 : 1 }}>
            {loading ? (<><i className="fas fa-spinner fa-spin"></i> Registering Member...</>) : (<><span>Create Member Account</span><ArrowRight size={18} /></>)}
          </button>
        </form>

        <div style={{ marginTop: '22px', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
          <p style={{ margin: '0 0 10px', fontSize: '0.88rem', color: '#64748b' }}>
            Already have an active account?{' '}
            <Link to="/login" style={{ color: '#E87D1E', fontWeight: 700, textDecoration: 'none' }}>Sign In Here</Link>
          </p>
          <Link to="/" style={{ color: '#94a3b8', fontSize: '0.82rem', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            &larr; Return to Main Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
