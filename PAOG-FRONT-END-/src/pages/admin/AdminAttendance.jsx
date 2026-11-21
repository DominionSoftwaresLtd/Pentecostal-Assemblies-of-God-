import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Radio, 
  KeyRound, 
  Search, 
  Plus, 
  Download, 
  RefreshCw, 
  AlertCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles,
  Clock,
  ShieldAlert,
  ChevronDown
} from 'lucide-react';

const SERVICE_PRESETS = [
  'Sunday Main Revival Service',
  'Sunday 2nd Celebration Service',
  'Midweek Prayer & Deliverance Fellowship',
  'Friday Miracle Night & Youth Kesha',
  'Leadership Council & Ministerial Briefing',
  'Sunday School & Teens Fellowship'
];

const AdminAttendance = () => {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Live Feed & Records
  const [liveRecords, setLiveRecords] = useState([]);
  const [loadingFeed, setLoadingFeed] = useState(false);
  
  // New Session Form State
  const [newTitle, setNewTitle] = useState('Sunday Main Revival Service');
  const [customTitle, setCustomTitle] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [accessCode, setAccessCode] = useState('');
  const [openImmediately, setOpenImmediately] = useState(true);
  const [creatingSession, setCreatingSession] = useState(false);
  
  // Member Search & Manual Override State
  const [members, setMembers] = useState([]);
  const [memberSearch, setMemberSearch] = useState('');
  const [checkingInMemberId, setCheckingInMemberId] = useState(null);
  
  // Notification Toast
  const [notification, setNotification] = useState(null);

  const showToast = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Fetch all sessions & active session
  const fetchSessions = async () => {
    try {
      const res = await fetch('/api/attendance/sessions');
      if (res.ok) {
        const data = await res.json();
        const allSessions = data.sessions || [];
        setSessions(allSessions);
        const active = allSessions.find(s => s.is_open === true);
        setActiveSession(active || null);
        if (active) {
          fetchLiveFeed(active._id);
        } else {
          setLiveRecords([]);
        }
      }
    } catch {
      showToast('error', 'Could not load attendance sessions.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Live Checked-in Members Feed for given session
  const fetchLiveFeed = async (sessionId) => {
    if (!sessionId) return;
    setLoadingFeed(true);
    try {
      const res = await fetch(`/api/attendance/reports?sessionId=${sessionId}`);
      if (res.ok) {
        const data = await res.json();
        setLiveRecords(data.records || []);
      }
    } catch {}
    finally {
      setLoadingFeed(false);
    }
  };

  // Fetch registered members list for usher manual override
  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/members');
      if (res.ok) {
        const data = await res.json();
        setMembers(data || []);
      }
    } catch {}
  };

  useEffect(() => {
    fetchSessions();
    fetchMembers();
    // Auto-refresh live feed every 15 seconds
    const interval = setInterval(() => {
      fetchSessions();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Handle Create Session
  const handleCreateSession = async (e) => {
    e.preventDefault();
    const finalTitle = (newTitle === 'Custom' ? customTitle : newTitle).trim();
    if (!finalTitle) {
      showToast('error', 'Please enter or select a service title.');
      return;
    }

    setCreatingSession(true);
    try {
      const res = await fetch('/api/attendance/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: finalTitle,
          session_date: newDate,
          access_code: accessCode.trim(),
          is_open: openImmediately,
          created_by: 'Super Admin'
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast('success', `Session "${finalTitle}" started successfully.`);
        setAccessCode('');
        if (newTitle === 'Custom') setCustomTitle('');
        fetchSessions();
      } else {
        showToast('error', data.message || 'Failed to create session.');
      }
    } catch {
      showToast('error', 'Network error creating session.');
    } finally {
      setCreatingSession(false);
    }
  };

  // Handle Toggle Session Open/Closed
  const handleToggleSessionStatus = async (session) => {
    const nextStatus = !session.is_open;
    try {
      const res = await fetch(`/api/attendance/sessions/${session._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_open: nextStatus })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('success', `Service is now ${nextStatus ? 'OPEN' : 'CLOSED'} for attendance.`);
        fetchSessions();
      } else {
        showToast('error', data.message || 'Could not update session status.');
      }
    } catch {
      showToast('error', 'Error toggling session.');
    }
  };

  // Handle Manual Usher Check-In
  const handleManualCheckIn = async (member) => {
    if (!activeSession) {
      showToast('error', 'Please open an attendance session first.');
      return;
    }

    setCheckingInMemberId(member._id);
    try {
      const res = await fetch('/api/attendance/check-in/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: activeSession._id,
          member_id: member._id
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast('success', `✓ ${member.name} has been manually checked in!`);
        fetchLiveFeed(activeSession._id);
        fetchSessions();
      } else {
        showToast('error', data.message || 'Could not check in member.');
      }
    } catch {
      showToast('error', 'Network error during manual check-in.');
    } finally {
      setCheckingInMemberId(null);
    }
  };

  // Handle Export CSV
  const handleExportCSV = (sessionId = '') => {
    const url = sessionId 
      ? `/api/attendance/reports?sessionId=${sessionId}&format=csv` 
      : `/api/attendance/reports?format=csv`;
    window.open(url, '_blank');
  };

  // Filter members for usher manual check-in search
  const filteredSearchMembers = members.filter(m => {
    if (!memberSearch.trim()) return false;
    const q = memberSearch.toLowerCase();
    return (
      (m.name || '').toLowerCase().includes(q) ||
      (m.phone || '').toLowerCase().includes(q) ||
      (m.email || '').toLowerCase().includes(q)
    );
  }).slice(0, 6);

  // Check if member already checked into active session
  const isMemberCheckedIn = (memberId) => {
    return liveRecords.some(r => r.memberId === memberId);
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', paddingBottom: '40px' }}>
      
      {/* Page Header */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '24px', 
          flexWrap: 'wrap', 
          gap: '16px' 
        }}
      >
        <div>
          <h1 className="admin-page-title" style={{ margin: 0, fontSize: '1.6rem' }}>
            Church Attendance Management
          </h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '0.88rem' }}>
            Open live check-in sessions, monitor real-time headcounts, and export attendance records.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => handleExportCSV()}
            style={{
              padding: '9px 16px',
              backgroundColor: '#10B981',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)'
            }}
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>

          <button
            onClick={fetchSessions}
            title="Refresh All"
            style={{
              padding: '9px 12px',
              backgroundColor: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 18px',
            marginBottom: '20px',
            borderRadius: '8px',
            backgroundColor: notification.type === 'success' ? '#f0fdf4' : '#fef2f2',
            border: `1px solid ${notification.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
            color: notification.type === 'success' ? '#166534' : '#dc2626',
            fontSize: '0.9rem',
            fontWeight: 600
          }}
        >
          {notification.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* TOP SECTION: ACTIVE CONTROLLER & START NEW SESSION (Grid 2 cols on Desktop) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px', marginBottom: '26px' }}>
        
        {/* Active Session Live Controller Card */}
        <div 
          style={{ 
            background: activeSession ? 'linear-gradient(135deg, #1e3a5f 0%, #152843 100%)' : '#ffffff', 
            color: activeSession ? '#ffffff' : '#1e293b', 
            borderRadius: '16px', 
            padding: '24px', 
            border: activeSession ? '2px solid rgba(232, 125, 30, 0.5)' : '1px solid #e2e8f0',
            boxShadow: activeSession ? '0 10px 24px rgba(30, 58, 95, 0.2)' : '0 2px 8px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  padding: '4px 12px', 
                  borderRadius: '20px', 
                  background: activeSession ? 'rgba(16, 185, 129, 0.2)' : '#f1f5f9', 
                  border: `1px solid ${activeSession ? '#10B981' : '#cbd5e1'}`, 
                  color: activeSession ? '#6ee7b7' : '#64748b', 
                  fontSize: '0.74rem', 
                  fontWeight: 800, 
                  letterSpacing: '0.5px' 
                }}
              >
                <span style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  background: activeSession ? '#10B981' : '#94a3b8', 
                  animation: activeSession ? 'pulse 1.8s infinite' : 'none' 
                }}></span>
                {activeSession ? 'LIVE SESSION ACTIVE' : 'NO LIVE SESSION'}
              </span>

              {activeSession && (
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>
                  ID: {activeSession._id}
                </span>
              )}
            </div>

            {activeSession ? (
              <>
                <h2 style={{ margin: '0 0 6px', fontSize: '1.45rem', fontWeight: 800, color: '#ffffff' }}>
                  {activeSession.title}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', marginBottom: '18px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <Calendar size={14} color="#E87D1E" /> {new Date(activeSession.session_date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  {activeSession.access_code ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(232,125,30,0.2)', padding: '2px 8px', borderRadius: '4px', border: '1px solid #E87D1E' }}>
                      <KeyRound size={13} color="#E87D1E" /> PIN: <strong>{activeSession.access_code}</strong>
                    </span>
                  ) : (
                    <span style={{ opacity: 0.7 }}>No PIN (Open Access)</span>
                  )}
                </div>

                {/* Headcount Stat */}
                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div>
                    <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
                      {liveRecords.length}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>
                      Members Checked In Live
                    </div>
                  </div>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E87D1E', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Radio size={24} />
                  </div>
                </div>
              </>
            ) : (
              <div style={{ padding: '20px 0', textAlign: 'center' }}>
                <Clock size={40} color="#94a3b8" style={{ margin: '0 auto 10px', display: 'block' }} />
                <h3 style={{ margin: '0 0 6px', fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>
                  Attendance Is Currently Closed
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>
                  Start a new service session using the controller form on the right, or re-open a previous session from the history table below.
                </p>
              </div>
            )}
          </div>

          {/* Toggle Switch */}
          {activeSession && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)' }}>
                Session Check-In Portal:
              </span>
              <button
                onClick={() => handleToggleSessionStatus(activeSession)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '24px',
                  border: 'none',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)'
                }}
              >
                <XCircle size={15} /> Close Session Now
              </button>
            </div>
          )}
        </div>

        {/* Start New Attendance Session Form */}
        <div 
          style={{ 
            background: '#ffffff', 
            borderRadius: '16px', 
            padding: '24px', 
            border: '1.5px solid #fed7aa',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)' 
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Plus size={20} color="#E87D1E" />
            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#1e293b' }}>
              Start New Attendance Session
            </h2>
          </div>

          <form onSubmit={handleCreateSession} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.84rem', fontWeight: 600, color: '#334155' }}>
                Service / Gathering Title *
              </label>
              <select
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.88rem',
                  color: '#1e293b',
                  backgroundColor: '#fff',
                  boxSizing: 'border-box'
                }}
              >
                {SERVICE_PRESETS.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
                <option value="Custom">-- Custom Service Name --</option>
              </select>
            </div>

            {newTitle === 'Custom' && (
              <div>
                <input
                  type="text"
                  required
                  value={customTitle}
                  onChange={e => setCustomTitle(e.target.value)}
                  placeholder="Enter custom service title..."
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #E87D1E',
                    fontSize: '0.88rem',
                    color: '#1e293b',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.84rem', fontWeight: 600, color: '#334155' }}>
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={newDate}
                  onChange={e => setNewDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 10px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.85rem',
                    color: '#1e293b',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.84rem', fontWeight: 600, color: '#334155' }}>
                  Venue PIN (Optional)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={accessCode}
                  onChange={e => setAccessCode(e.target.value)}
                  placeholder="e.g. 7721"
                  style={{
                    width: '100%',
                    padding: '9px 10px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.85rem',
                    letterSpacing: '1px',
                    fontWeight: 700,
                    color: '#1e293b',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
              <input
                type="checkbox"
                id="openImmediately"
                checked={openImmediately}
                onChange={e => setOpenImmediately(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#E87D1E', cursor: 'pointer' }}
              />
              <label htmlFor="openImmediately" style={{ fontSize: '0.85rem', color: '#334155', cursor: 'pointer', fontWeight: 500 }}>
                Open live for check-ins immediately upon creation
              </label>
            </div>

            <button
              type="submit"
              disabled={creatingSession}
              style={{
                backgroundColor: '#E87D1E',
                color: '#ffffff',
                padding: '11px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: creatingSession ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(232, 125, 30, 0.3)',
                marginTop: '4px'
              }}
            >
              {creatingSession ? <><i className="fas fa-spinner fa-spin"></i> Initializing...</> : <><Plus size={18} /> Start Attendance Session</>}
            </button>
          </form>
        </div>

      </div>

      {/* MIDDLE SECTION: USHER MANUAL CHECK-IN & LIVE FEED */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginBottom: '26px' }}>

        {/* Live Check-In Feed */}
        <div 
          style={{ 
            background: '#ffffff', 
            borderRadius: '16px', 
            border: '1px solid #e2e8f0', 
            padding: '22px 24px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)' 
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio size={18} color="#10B981" />
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#1e293b' }}>
                Live Attendance Feed
              </h3>
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10B981', background: '#f0fdf4', padding: '3px 10px', borderRadius: '12px' }}>
              {liveRecords.length} Present
            </span>
          </div>

          <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
            {loadingFeed ? (
              <div style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                <i className="fas fa-spinner fa-spin" style={{ marginRight: '6px' }}></i> Updating feed...
              </div>
            ) : liveRecords.length === 0 ? (
              <div style={{ padding: '36px 20px', textAlign: 'center', color: '#94a3b8' }}>
                No check-ins yet for this session. Members can check in from their dashboard or the quick check-in page.
              </div>
            ) : (
              liveRecords.map((r, idx) => (
                <div 
                  key={r.recordId || idx}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '10px 12px', 
                    borderBottom: '1px solid #f1f5f9',
                    fontSize: '0.86rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fff7ed', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 700, fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {r.memberName ? r.memberName[0] : 'M'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#1e293b' }}>{r.memberName}</div>
                      <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                        {r.department} • {r.check_in_method?.replace(/_/g, ' ')}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} color="#10B981" />
                      {new Date(r.checked_in_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Usher Manual Check-In Search Bar */}
        <div 
          style={{ 
            background: '#ffffff', 
            borderRadius: '16px', 
            border: '1px solid #e2e8f0', 
            padding: '22px 24px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)' 
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <UserCheck size={18} color="#E87D1E" />
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#1e293b' }}>
              Usher Manual Override
            </h3>
          </div>
          <p style={{ margin: '0 0 16px', fontSize: '0.82rem', color: '#64748b' }}>
            Check in believers who left their phones or require assistance.
          </p>

          <div style={{ position: 'relative', marginBottom: '14px' }}>
            <input
              type="text"
              value={memberSearch}
              onChange={e => setMemberSearch(e.target.value)}
              placeholder="Search member by name, phone, or email..."
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                outline: 'none',
                fontSize: '0.88rem',
                color: '#1e293b',
                boxSizing: 'border-box'
              }}
            />
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          <div>
            {!memberSearch.trim() ? (
              <div style={{ padding: '28px', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
                Type in the search box to find registered church members.
              </div>
            ) : filteredSearchMembers.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
                No members found matching "{memberSearch}".
              </div>
            ) : (
              filteredSearchMembers.map(m => {
                const checked = isMemberCheckedIn(m._id);
                const isCheckingIn = checkingInMemberId === m._id;

                return (
                  <div 
                    key={m._id}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      padding: '10px 12px', 
                      borderRadius: '8px', 
                      border: '1px solid #f1f5f9', 
                      marginBottom: '8px',
                      background: checked ? '#f0fdf4' : '#fafafa'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.88rem' }}>{m.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{m.phone || m.email} • {m.department}</div>
                    </div>

                    <div>
                      {checked ? (
                        <span style={{ fontSize: '0.78rem', color: '#166534', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={14} /> Present
                        </span>
                      ) : (
                        <button
                          onClick={() => handleManualCheckIn(m)}
                          disabled={isCheckingIn || !activeSession}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: 'none',
                            background: activeSession ? '#E87D1E' : '#cbd5e1',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            cursor: activeSession ? 'pointer' : 'not-allowed'
                          }}
                        >
                          {isCheckingIn ? 'Checking...' : '+ Check In'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION: SESSIONS HISTORY & ARCHIVE */}
      <div 
        style={{ 
          background: '#ffffff', 
          borderRadius: '16px', 
          border: '1px solid #e2e8f0', 
          padding: '24px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)' 
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#1e293b' }}>
              Historical Sessions &amp; Headcount Logs
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#64748b' }}>
              Review past church services, headcount records, and re-open sessions if needed.
            </p>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0' }}>
                <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase' }}>Service Name</th>
                <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase' }}>Date</th>
                <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase' }}>Venue PIN</th>
                <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase' }}>Headcount</th>
                <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '12px 16px', color: '#64748b', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                    Loading sessions...
                  </td>
                </tr>
              ) : sessions.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                    No attendance sessions recorded yet.
                  </td>
                </tr>
              ) : (
                sessions.map(s => (
                  <tr key={s._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#1e293b', fontSize: '0.9rem' }}>
                      {s.title}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#64748b', fontSize: '0.85rem' }}>
                      {new Date(s.session_date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#64748b', fontSize: '0.85rem' }}>
                      {s.access_code ? (
                        <span style={{ fontFamily: 'monospace', fontWeight: 700, background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                          {s.access_code}
                        </span>
                      ) : (
                        <span style={{ color: '#cbd5e1' }}>—</span>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.95rem' }}>
                        {s.headcount || 0}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span 
                        style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '5px', 
                          padding: '3px 10px', 
                          borderRadius: '20px', 
                          background: s.is_open ? '#f0fdf4' : '#f8fafc', 
                          border: `1px solid ${s.is_open ? '#bbf7d0' : '#e2e8f0'}`, 
                          color: s.is_open ? '#166534' : '#64748b', 
                          fontSize: '0.75rem', 
                          fontWeight: 700 
                        }}
                      >
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.is_open ? '#10B981' : '#94a3b8' }}></span>
                        {s.is_open ? 'Open Live' : 'Closed'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          onClick={() => handleToggleSessionStatus(s)}
                          style={{
                            padding: '5px 10px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            background: '#ffffff',
                            color: s.is_open ? '#dc2626' : '#166534',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          {s.is_open ? 'Close' : 'Re-Open'}
                        </button>
                        <button
                          onClick={() => handleExportCSV(s._id)}
                          title="Export CSV for this service"
                          style={{
                            padding: '5px 8px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            background: '#ffffff',
                            color: '#475569',
                            fontSize: '0.78rem',
                            cursor: 'pointer'
                          }}
                        >
                          <Download size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminAttendance;
