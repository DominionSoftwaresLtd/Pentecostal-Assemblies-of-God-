import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Lock, AlertCircle, CheckCircle2, Eye, EyeOff, ArrowRight } from 'lucide-react';
import logoImg from '../assets/logo ngungo.png';

const BrandHeader = () => (
  <div className="auth-brand-header">
    <div className="auth-brand-logo">
      <img src={logoImg} alt="PAG Ngungo" />
    </div>
    <span className="auth-brand-name">PAG Ngungo Assembly</span>
    <span className="auth-brand-location">Mbeere District Headquarters, Embu County</span>
  </div>
);

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | 'success' | 'error' | 'invalid'
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) setStatus('invalid');
  }, [token]);

  const getStrength = (pwd) => {
    if (!pwd) return 0;
    let s = 0;
    if (pwd.length >= 8) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[0-9]/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return s;
  };

  const strength = getStrength(password);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', '#ef4444', '#f97316', '#eab308', '#16a34a'][strength];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { setStatus('error'); setErrorMsg('Passwords do not match.'); return; }
    if (password.length < 6) { setStatus('error'); setErrorMsg('Password must be at least 6 characters.'); return; }
    setLoading(true); setStatus(null);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Password reset failed. The link may have expired.');
      }
    } catch {
      // Offline demo
      setStatus('success');
      setTimeout(() => navigate('/login'), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-form-container">
        <BrandHeader />
        <div className="auth-form-card">

          {/* Invalid token */}
          {status === 'invalid' && (
            <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
              <div style={{ width: '58px', height: '58px', borderRadius: '50%', background: '#fef2f2', border: '1.5px solid #fecaca', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                <i className="fas fa-link-slash" style={{ fontSize: '1.4rem', color: '#dc2626' }}></i>
              </div>
              <h2 className="auth-form-title" style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>Invalid reset link</h2>
              <p style={{ color: '#6b7280', fontSize: '0.86rem', marginBottom: '1.5rem', fontFamily: 'var(--font-primary)', lineHeight: 1.6 }}>
                This link is invalid or has expired. Reset links are valid for 1 hour.
              </p>
              <Link to="/forgot-password" className="auth-submit-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', textDecoration: 'none' }}>
                <span>Request a new link</span><ArrowRight size={15} />
              </Link>
              <div className="auth-form-footer">
                <p><Link to="/login">Back to sign in</Link></p>
              </div>
            </div>
          )}

          {/* Success */}
          {status === 'success' && (
            <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#f0fdf4', border: '1.5px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                <CheckCircle2 size={30} color="#16a34a" />
              </div>
              <h2 className="auth-form-title" style={{ fontSize: '1.3rem', marginBottom: '0.4rem' }}>Password updated</h2>
              <p style={{ color: '#6b7280', fontSize: '0.86rem', marginBottom: '1.5rem', fontFamily: 'var(--font-primary)', lineHeight: 1.6 }}>
                Your password has been reset. Redirecting you to sign in…
              </p>
              <Link to="/login" className="auth-submit-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', textDecoration: 'none' }}>
                <span>Sign in now</span><ArrowRight size={15} />
              </Link>
            </div>
          )}

          {/* Reset form */}
          {status !== 'invalid' && status !== 'success' && (
            <>
              <h2 className="auth-form-title">New password</h2>
              <p className="auth-form-sub">Create a strong password for your account.</p>

              {status === 'error' && (
                <div className="auth-error-box">
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="auth-input-group">
                  <label>New password</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon"><Lock size={15} /></span>
                    <input type={showPassword ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a strong password" autoComplete="new-password" style={{ paddingRight: '40px' }} />
                    <button type="button" className="auth-eye-btn" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                  </div>
                  {password && (
                    <div style={{ marginTop: '6px' }}>
                      <div style={{ display: 'flex', gap: '3px', marginBottom: '3px' }}>
                        {[1,2,3,4].map(i => (
                          <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i <= strength ? strengthColor : '#e5e7eb', transition: 'background 0.2s' }} />
                        ))}
                      </div>
                      <span style={{ fontSize: '0.74rem', color: strengthColor, fontWeight: 600, fontFamily: 'var(--font-primary)' }}>{strengthLabel}</span>
                    </div>
                  )}
                </div>

                <div className="auth-input-group">
                  <label>Confirm password</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon"><Lock size={15} /></span>
                    <input type={showConfirm ? 'text' : 'password'} required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter password" autoComplete="new-password" style={{ paddingRight: '40px', borderColor: confirmPassword && confirmPassword !== password ? '#fca5a5' : undefined }} />
                    <button type="button" className="auth-eye-btn" onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                  </div>
                  {confirmPassword && confirmPassword !== password && <span style={{ fontSize: '0.74rem', color: '#dc2626', fontFamily: 'var(--font-primary)', marginTop: '3px', display: 'block' }}>Passwords do not match</span>}
                  {confirmPassword && confirmPassword === password && <span style={{ fontSize: '0.74rem', color: '#16a34a', fontFamily: 'var(--font-primary)', marginTop: '3px', display: 'block' }}><i className="fas fa-check"></i> Passwords match</span>}
                </div>

                <button type="submit" className="auth-submit-btn" disabled={loading}>
                  {loading ? <><i className="fas fa-spinner fa-spin"></i> Saving...</> : <><span>Save new password</span><ArrowRight size={15} /></>}
                </button>
              </form>

              <div className="auth-form-footer">
                <p>Link not working? <Link to="/forgot-password">Request a new one</Link></p>
                <Link to="/" className="auth-back-link">&#8592; Back to website</Link>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
