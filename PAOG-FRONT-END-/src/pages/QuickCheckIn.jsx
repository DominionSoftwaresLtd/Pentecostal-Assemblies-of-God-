import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Clock, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  KeyRound, 
  UserPlus, 
  LogIn, 
  Radio, 
  User, 
  Phone, 
  Mail, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import logoImg from '../assets/logo Kingdom enightement.jpg';

const QuickCheckIn = () => {
  const [activeSession, setActiveSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [identifier, setIdentifier] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { success, memberName, message, notFound, alreadyCheckedIn, checked_in_at }
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Load live active session
  const fetchActiveSession = async () => {
    setLoadingSession(true);
    try {
      const res = await fetch('/api/attendance/active');
      if (res.ok) {
        const data = await res.json();
        if (data.hasActiveSession && data.session) {
          setActiveSession(data.session);
        } else {
          setActiveSession(null);
        }
      }
    } catch {
      // Fallback demo active session if offline
      setActiveSession({
        _id: 'session-live',
        title: 'Sunday Main Revival Service',
        session_date: new Date().toISOString().split('T')[0],
        is_open: true,
        hasPin: false,
        headcount: 4
      });
    } finally {
      setLoadingSession(false);
    }
  };

  useEffect(() => {
    fetchActiveSession();
    const interval = setInterval(fetchActiveSession, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const cleanId = identifier.trim();
    if (!cleanId) {
      setError('Please enter your phone number, email, or member ID.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/attendance/check-in/guest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: cleanId,
          session_id: activeSession ? activeSession._id : undefined,
          access_code: accessCode.trim()
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setResult({
          success: true,
          memberName: data.memberName,
          message: data.message,
          checked_in_at: data.checked_in_at,
          sessionTitle: data.sessionTitle || activeSession?.title
        });
        fetchActiveSession();
      } else {
        if (data.notFound) {
          setResult({
            notFound: true,
            message: data.message || 'No member account found with those details.'
          });
        } else if (data.alreadyCheckedIn) {
          setResult({
            alreadyCheckedIn: true,
            memberName: data.memberName,
            message: data.message || 'You have already checked in to this service.'
          });
        } else {
          setError(data.message || 'Check-in failed. Please verify your details.');
        }
      }
    } catch {
      setError('Unable to reach server. Please check network connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div 
      className="container section" 
      style={{ 
        minHeight: '85vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '2.5rem 1rem' 
      }}
    >
      <div 
        style={{ 
          background: '#ffffff', 
          padding: '36px 32px', 
          borderRadius: '16px', 
          boxShadow: '0 16px 40px rgba(232, 125, 30, 0.09), 0 2px 10px rgba(0,0,0,0.04)', 
          width: '100%', 
          maxWidth: '500px', 
          border: '1.5px solid #fed7aa',
          position: 'relative'
        }}
      >
        {/* Top Church Branding Header */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <div 
            style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              background: '#fff7ed', 
              border: '2px solid #fed7aa', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 12px', 
              overflow: 'hidden', 
              padding: '6px' 
            }}
          >
            <img 
              src={logoImg} 
              alt="KEMT Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '20px', background: activeSession ? '#f0fdf4' : '#f8fafc', border: `1px solid ${activeSession ? '#bbf7d0' : '#e2e8f0'}`, marginBottom: '10px' }}>
            <span style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              backgroundColor: activeSession ? '#10B981' : '#94a3b8',
              boxShadow: activeSession ? '0 0 0 3px rgba(16, 185, 129, 0.25)' : 'none',
              animation: activeSession ? 'pulse 2s infinite' : 'none'
            }}></span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: activeSession ? '#166534' : '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {activeSession ? 'LIVE SERVICE CHECK-IN' : 'CHECK-IN SYSTEM'}
            </span>
          </div>

          <h1 style={{ color: '#1e293b', margin: '0 0 6px', fontSize: '1.65rem', fontWeight: 800 }}>
            Church Attendance
          </h1>
          <p style={{ color: '#64748b', margin: 0, fontSize: '0.88rem' }}>
            Kingdom Enlightenment Ministries Member Check-In
          </p>
        </div>

        {/* Active Session Card */}
        {loadingSession ? (
          <div style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '22px' }}>
            <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px', color: '#E87D1E' }}></i>
            Detecting live service session...
          </div>
        ) : activeSession ? (
          <div 
            style={{ 
              background: 'linear-gradient(135deg, rgba(30, 58, 95, 0.05) 0%, rgba(232, 125, 30, 0.08) 100%)',
              border: '1.5px solid rgba(232, 125, 30, 0.3)',
              borderRadius: '12px',
              padding: '16px 18px',
              marginBottom: '22px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#E87D1E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Current Active Service
                </span>
                <h3 style={{ margin: '2px 0 6px', color: '#1e293b', fontSize: '1.15rem', fontWeight: 700 }}>
                  {activeSession.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', color: '#64748b', fontSize: '0.8rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} color="#E87D1E" />
                    {activeSession.session_date ? new Date(activeSession.session_date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) : 'Today'}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Radio size={13} color="#10B981" />
                    {activeSession.headcount || 0} Members Checked In
                  </span>
                </div>
              </div>

              <button 
                onClick={fetchActiveSession}
                title="Refresh Status"
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  color: '#94a3b8', 
                  padding: '4px' 
                }}
              >
                <RefreshCw size={15} />
              </button>
            </div>
          </div>
        ) : (
          <div 
            style={{ 
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '24px 20px',
              marginBottom: '22px',
              textAlign: 'center'
            }}
          >
            <Clock size={32} color="#94a3b8" style={{ margin: '0 auto 10px', display: 'block' }} />
            <h3 style={{ margin: '0 0 6px', color: '#1e293b', fontSize: '1.05rem', fontWeight: 700 }}>
              No Service Check-In Open Right Now
            </h3>
            <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '0.85rem', lineHeight: '1.5' }}>
              Service check-in opens automatically during Sunday Main Services, Midweek Fellowships, and Youth Outreaches.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <Link 
                to="/events" 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  padding: '8px 16px', 
                  borderRadius: '6px', 
                  background: '#E87D1E', 
                  color: '#fff', 
                  textDecoration: 'none', 
                  fontWeight: 600, 
                  fontSize: '0.85rem' 
                }}
              >
                View Service Times
              </Link>
              <button 
                onClick={fetchActiveSession}
                style={{ 
                  padding: '8px 14px', 
                  borderRadius: '6px', 
                  background: '#ffffff', 
                  border: '1px solid #cbd5e1', 
                  color: '#475569', 
                  fontWeight: 600, 
                  fontSize: '0.85rem', 
                  cursor: 'pointer' 
                }}
              >
                Check Again
              </button>
            </div>
          </div>
        )}

        {/* Success Confirmation Card */}
        {result?.success && (
          <div 
            style={{ 
              background: '#f0fdf4', 
              border: '1.5px solid #bbf7d0', 
              borderRadius: '12px', 
              padding: '24px 20px', 
              textAlign: 'center',
              marginBottom: '22px'
            }}
          >
            <div 
              style={{ 
                width: '52px', 
                height: '52px', 
                borderRadius: '50%', 
                background: '#dcfce7', 
                color: '#16a34a', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 12px' 
              }}
            >
              <CheckCircle2 size={28} />
            </div>
            <h3 style={{ margin: '0 0 4px', color: '#166534', fontSize: '1.2rem', fontWeight: 800 }}>
              Attendance Confirmed!
            </h3>
            <p style={{ margin: '0 0 12px', color: '#15803d', fontSize: '0.92rem', fontWeight: 600 }}>
              Welcome, {result.memberName}!
            </p>
            <p style={{ margin: '0 0 18px', color: '#475569', fontSize: '0.85rem' }}>
              Your attendance for <strong>{result.sessionTitle}</strong> has been successfully recorded on {new Date(result.checked_in_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link 
                to="/login" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px', 
                  padding: '11px', 
                  borderRadius: '8px', 
                  background: '#16a34a', 
                  color: '#fff', 
                  textDecoration: 'none', 
                  fontWeight: 700, 
                  fontSize: '0.9rem' 
                }}
              >
                <LogIn size={16} /> Log In to View Full Dashboard &amp; Streak
              </Link>
              <button 
                onClick={() => { setResult(null); setIdentifier(''); setAccessCode(''); }}
                style={{ 
                  background: 'none', 
                  border: '1px solid #cbd5e1', 
                  padding: '9px', 
                  borderRadius: '8px', 
                  color: '#64748b', 
                  fontSize: '0.85rem', 
                  fontWeight: 600, 
                  cursor: 'pointer' 
                }}
              >
                Sign In Another Member
              </button>
            </div>
          </div>
        )}

        {/* Already Checked In Card */}
        {result?.alreadyCheckedIn && (
          <div 
            style={{ 
              background: '#eff6ff', 
              border: '1.5px solid #bfdbfe', 
              borderRadius: '12px', 
              padding: '20px', 
              textAlign: 'center',
              marginBottom: '22px'
            }}
          >
            <ShieldCheck size={32} color="#3b82f6" style={{ margin: '0 auto 8px', display: 'block' }} />
            <h4 style={{ margin: '0 0 6px', color: '#1e40af', fontSize: '1.05rem', fontWeight: 700 }}>
              Already Marked Present!
            </h4>
            <p style={{ margin: '0 0 14px', color: '#1e3a8a', fontSize: '0.88rem' }}>
              {result.message}
            </p>
            <Link 
              to="/login" 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '6px', 
                padding: '9px 18px', 
                borderRadius: '8px', 
                background: '#3b82f6', 
                color: '#fff', 
                textDecoration: 'none', 
                fontWeight: 600, 
                fontSize: '0.86rem' 
              }}
            >
              Sign In to Your Dashboard <ArrowRight size={15} />
            </Link>
          </div>
        )}

        {/* Not Found Alert (Unregistered User) */}
        {result?.notFound && (
          <div 
            style={{ 
              background: '#fffbeb', 
              border: '1.5px solid #fde68a', 
              borderRadius: '12px', 
              padding: '20px', 
              marginBottom: '22px' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <AlertCircle size={22} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ margin: '0 0 4px', color: '#92400e', fontSize: '0.98rem', fontWeight: 700 }}>
                  No Member Account Found
                </h4>
                <p style={{ margin: '0 0 14px', color: '#78350f', fontSize: '0.85rem', lineHeight: '1.5' }}>
                  No registered church account was found matching <strong>"{identifier}"</strong>. Please create an account to record your attendance and join ministry groups.
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <Link 
                    to={`/signup?prefill=${encodeURIComponent(identifier)}`}
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '6px', 
                      padding: '9px 16px', 
                      borderRadius: '8px', 
                      background: '#E87D1E', 
                      color: '#fff', 
                      textDecoration: 'none', 
                      fontWeight: 700, 
                      fontSize: '0.88rem',
                      boxShadow: '0 2px 8px rgba(232, 125, 30, 0.3)'
                    }}
                  >
                    <UserPlus size={16} /> Create Free Account Now
                  </Link>
                  <button 
                    onClick={() => { setResult(null); }}
                    style={{ 
                      background: '#fff', 
                      border: '1px solid #d1d5db', 
                      padding: '9px 14px', 
                      borderRadius: '8px', 
                      color: '#475569', 
                      fontSize: '0.85rem', 
                      fontWeight: 600, 
                      cursor: 'pointer' 
                    }}
                  >
                    Try Different Phone/Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* General Error Notice */}
        {error && (
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              padding: '12px 14px', 
              marginBottom: '20px', 
              borderRadius: '8px', 
              backgroundColor: '#fef2f2', 
              border: '1px solid #fecaca', 
              color: '#dc2626', 
              fontSize: '0.86rem', 
              fontWeight: 500 
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Main Quick Check-In Form */}
        {(!result?.success && activeSession) && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label 
                style={{ 
                  display: 'block', 
                  marginBottom: '6px', 
                  color: '#334155', 
                  fontWeight: 600, 
                  fontSize: '0.88rem' 
                }}
              >
                Phone Number, Email, or Member ID *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. 0712345678 or john@gmail.com"
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    outline: 'none',
                    fontSize: '0.92rem',
                    color: '#1e293b',
                    backgroundColor: '#ffffff',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={e => e.target.style.borderColor = '#E87D1E'}
                  onBlur={e => e.target.style.borderColor = '#cbd5e1'}
                />
                <User 
                  size={18} 
                  color="#94a3b8" 
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} 
                />
              </div>
              <span style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>
                Enter the phone number or email you registered with at KEMT.
              </span>
            </div>

            {/* Optional Venue PIN */}
            {activeSession?.hasPin && (
              <div>
                <label 
                  style={{ 
                    display: 'block', 
                    marginBottom: '6px', 
                    color: '#334155', 
                    fontWeight: 600, 
                    fontSize: '0.88rem' 
                  }}
                >
                  4-Digit Venue Code *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Enter service PIN"
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 42px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      outline: 'none',
                      fontSize: '0.95rem',
                      letterSpacing: '2px',
                      fontWeight: 700,
                      color: '#1e293b',
                      backgroundColor: '#ffffff',
                      boxSizing: 'border-box'
                    }}
                  />
                  <KeyRound 
                    size={18} 
                    color="#94a3b8" 
                    style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} 
                  />
                </div>
                <span style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>
                  Announced at church during service.
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{
                backgroundColor: '#E87D1E',
                color: 'white',
                padding: '13px',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.96rem',
                cursor: submitting ? 'not-allowed' : 'pointer',
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(232, 125, 30, 0.35)',
                transition: 'all 0.2s ease',
                opacity: submitting ? 0.8 : 1,
              }}
            >
              {submitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Verifying &amp; Recording...
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  <span>Mark My Attendance</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Footer links */}
        <div style={{ marginTop: '24px', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', flexWrap: 'wrap', fontSize: '0.85rem' }}>
            <Link to="/login" style={{ color: '#E87D1E', fontWeight: 700, textDecoration: 'none' }}>
              Log In to Full Dashboard
            </Link>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <Link to="/signup" style={{ color: '#475569', fontWeight: 600, textDecoration: 'none' }}>
              Create Member Account
            </Link>
          </div>
          <div style={{ marginTop: '12px' }}>
            <Link to="/" style={{ color: '#94a3b8', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              &larr; Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickCheckIn;
