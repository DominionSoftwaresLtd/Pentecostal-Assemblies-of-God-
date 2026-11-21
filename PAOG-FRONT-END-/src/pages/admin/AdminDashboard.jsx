import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserPlus,
  UserCheck,
  Calendar, 
  DollarSign, 
  Mail, 
  ArrowUp, 
  ArrowDown, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  PlusCircle,
  Newspaper,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const attendanceData = [
  { name: 'Week 1', inPerson: 350, online: 200 },
  { name: 'Week 2', inPerson: 320, online: 190 },
  { name: 'Week 3', inPerson: 380, online: 220 },
  { name: 'Week 4', inPerson: 410, online: 250 },
  { name: 'Week 5', inPerson: 450, online: 210 },
  { name: 'Week 6', inPerson: 390, online: 230 },
  { name: 'Week 7', inPerson: 430, online: 280 },
];

const donationData = [
  { name: 'Mon', tithe: 500, offering: 200 },
  { name: 'Tue', tithe: 300, offering: 150 },
  { name: 'Wed', tithe: 1200, offering: 400 },
  { name: 'Thu', tithe: 800, offering: 250 },
  { name: 'Fri', tithe: 400, offering: 200 },
  { name: 'Sat', tithe: 200, offering: 100 },
  { name: 'Sun', tithe: 8500, offering: 3200 },
];

const StatCard = ({ icon: Icon, value, title, percentage, isPositive, linkTo }) => {
  const content = (
    <div className="admin-stat-card" style={{ cursor: linkTo ? 'pointer' : 'default' }}>
      <div className="admin-stat-icon-wrapper">
        <Icon size={22} strokeWidth={2.2} />
      </div>
      <div className="admin-stat-content">
        <div>
          <h3 className="admin-stat-value">{value}</h3>
          <p className="admin-stat-title">{title}</p>
        </div>
        {percentage !== undefined && (
          <div className={`admin-stat-percentage ${isPositive ? 'positive' : 'negative'}`}>
            {percentage}% {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
          </div>
        )}
      </div>
    </div>
  );

  return linkTo ? <Link to={linkTo} style={{ textDecoration: 'none', color: 'inherit' }}>{content}</Link> : content;
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalEvents: 1, totalMessages: 1, unreadMessages: 1, totalMembers: 4, activeMembers: 4, totalNews: 4 });
  const [recentMessages, setRecentMessages] = useState([]);
  const [recentMembers, setRecentMembers] = useState([]);
  const [recentNews, setRecentNews] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const statsRes = await fetch('/api/admin/stats');
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        const msgRes = await fetch('/api/messages');
        if (msgRes.ok) {
          const msgData = await msgRes.json();
          setRecentMessages(msgData.slice(0, 4));
        }

        const memRes = await fetch('/api/members');
        if (memRes.ok) {
          const memData = await memRes.json();
          setRecentMembers(memData.slice(0, 5));
        }

        const newsRes = await fetch('/api/news');
        if (newsRes.ok) {
          const newsData = await newsRes.json();
          setRecentNews(newsData.slice(0, 3));
        }
      } catch {
        const cachedMsg = localStorage.getItem('kemt_messages_cache');
        if (cachedMsg) {
          try {
            const parsed = JSON.parse(cachedMsg);
            setRecentMessages(parsed.slice(0, 4));
          } catch {}
        }
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Welcome Banner */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div>
          <h1 className="admin-page-title" style={{ margin: 0, fontSize: '1.6rem' }}>
            Kingdom Enlightenment Admin Overview
          </h1>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.88rem' }}>
            Welcome back to the KEMT Ministry Command Center
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link
            to="/admin/members"
            style={{
              backgroundColor: '#ffffff',
              color: '#E87D1E',
              border: '1.5px solid #E87D1E',
              textDecoration: 'none',
              padding: '9px 15px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
              transition: 'all 0.2s'
            }}
          >
            <UserPlus size={16} />
            <span>Onboard Member</span>
          </Link>

          <Link
            to="/admin/news"
            style={{
              backgroundColor: '#ffffff',
              color: '#334155',
              border: '1.5px solid #cbd5e1',
              textDecoration: 'none',
              padding: '9px 15px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
              transition: 'all 0.2s'
            }}
          >
            <Newspaper size={16} color="#E87D1E" />
            <span>Upload News</span>
          </Link>

          <Link
            to="/admin/events"
            style={{
              backgroundColor: '#E87D1E',
              color: 'white',
              textDecoration: 'none',
              padding: '9px 16px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(232, 125, 30, 0.25)'
            }}
          >
            <PlusCircle size={16} />
            <span>Post New Event</span>
          </Link>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="admin-stats-grid">
        <StatCard 
          icon={UserCheck} 
          value={`${stats.activeMembers || 4} Active`} 
          title="Member Directory & Accounts" 
          linkTo="/admin/members"
        />
        <StatCard 
          icon={Newspaper} 
          value={`${stats.totalNews || 4} Articles`} 
          title="Published News & Updates" 
          linkTo="/admin/news"
        />
        <StatCard 
          icon={Calendar} 
          value={stats.totalEvents || "1"} 
          title="Scheduled Missions & Events" 
          linkTo="/admin/events"
        />
        <StatCard 
          icon={Mail} 
          value={stats.unreadMessages > 0 ? `${stats.unreadMessages} New` : `${stats.totalMessages || 1} Total`} 
          title="Contact Inquiries" 
          linkTo="/admin/messages"
        />
        <StatCard 
          icon={Users} 
          value="9 Leaders" 
          title="Executive Council" 
          linkTo="/admin/users"
        />
        <StatCard 
          icon={DollarSign} 
          value="Ksh 145,000" 
          title="Mission Outreach Fund" 
          percentage="8.5" 
          isPositive={true} 
        />
      </div>

      {/* Charts with KEMT Brand Colors (Warm Orange & Amber) */}
      <div className="admin-charts-grid">
        <div className="admin-chart-card">
          <div className="admin-chart-header">
            <div>
              <h3 className="admin-chart-title" style={{ color: '#1e293b', marginBottom: '8px' }}>
                Crusade & Outreach Attendance
              </h3>
              <div style={{ display: 'flex', gap: '18px' }}>
                <div className="chart-legend-item">
                  <span className="chart-legend-dot" style={{ backgroundColor: '#E87D1E' }}></span>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>In-Person Outreach</span>
                </div>
                <div className="chart-legend-item">
                  <span className="chart-legend-dot" style={{ backgroundColor: '#F59E0B' }}></span>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Online Stream</span>
                </div>
              </div>
            </div>
            <div className="admin-chart-controls">
              <button className="active">Recent Missions</button>
            </div>
          </div>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <LineChart data={attendanceData} margin={{ top: 10, right: 15, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #fed7aa', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Line type="monotone" dataKey="inPerson" stroke="#E87D1E" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: 'white', stroke: '#E87D1E' }} activeDot={{ r: 6 }} name="In-Person" />
                <Line type="monotone" dataKey="online" stroke="#F59E0B" strokeWidth={2.5} strokeDasharray="4 4" dot={{ r: 3, fill: 'white', stroke: '#F59E0B' }} name="Online" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="admin-chart-card">
          <div className="admin-chart-header">
            <div>
              <h3 className="admin-chart-title" style={{ color: '#1e293b', marginBottom: '8px' }}>
                Weekly Mission Support
              </h3>
              <div style={{ display: 'flex', gap: '14px' }}>
                <div className="chart-legend-item">
                  <span className="chart-legend-dot" style={{ backgroundColor: '#E87D1E' }}></span>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Tithes</span>
                </div>
                <div className="chart-legend-item">
                  <span className="chart-legend-dot" style={{ backgroundColor: '#FED7AA' }}></span>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Outreach</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={donationData} margin={{ top: 10, right: 0, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} dy={8} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <Tooltip cursor={{ fill: 'rgba(232, 125, 30, 0.05)' }} contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #fed7aa' }} />
                <Bar dataKey="tithe" stackId="a" fill="#E87D1E" barSize={12} radius={[0, 0, 0, 0]} name="Tithes" />
                <Bar dataKey="offering" stackId="a" fill="#FED7AA" radius={[4, 4, 0, 0]} name="Outreach" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid of Dashboard Modules: Member Management & News Updates */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px', marginTop: '24px' }}>
        {/* Module: Member Management */}
        <div className="admin-card" style={{ background: '#ffffff', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserCheck size={18} color="#E87D1E" />
                <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.1rem', fontWeight: 700 }}>
                  Member Management
                </h3>
              </div>
              <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.82rem' }}>
                Active member accounts &amp; onboarding registry
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Link
                to="/admin/members"
                style={{
                  color: '#E87D1E',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>Directory</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
            {recentMembers.length === 0 ? (
              <p style={{ color: '#94a3b8', fontSize: '0.86rem', textAlign: 'center', padding: '20px 0' }}>No members registered yet.</p>
            ) : (
              recentMembers.map((m) => (
                <div
                  key={m._id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: '#fff7ed',
                      border: '1.5px solid #fed7aa',
                      color: '#E87D1E',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {m.name ? m.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'M'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1e293b' }}>{m.name}</div>
                      <div style={{ fontSize: '0.76rem', color: '#64748b' }}>{m.department} · {m.residence || 'Kenya'}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      backgroundColor: m.status === 'Active' ? '#f0fdf4' : '#fef2f2',
                      color: m.status === 'Active' ? '#166534' : '#dc2626',
                      border: m.status === 'Active' ? '1px solid #bbf7d0' : '1px solid #fecaca'
                    }}>
                      {m.status || 'Active'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
              <strong>{stats.activeMembers || recentMembers.length}</strong> active members in system
            </span>
            <Link
              to="/admin/members"
              style={{
                backgroundColor: '#fff7ed',
                border: '1px solid #fed7aa',
                color: '#E87D1E',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              + Onboard New Member
            </Link>
          </div>
        </div>

        {/* Module: News & Updates */}
        <div className="admin-card" style={{ background: '#ffffff', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Newspaper size={18} color="#E87D1E" />
                <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.1rem', fontWeight: 700 }}>
                  News &amp; Field Updates
                </h3>
              </div>
              <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.82rem' }}>
                Mission reports and news published to main website
              </p>
            </div>

            <Link
              to="/admin/news"
              style={{
                color: '#E87D1E',
                fontSize: '0.84rem',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>Manage News</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
            {recentNews.length === 0 ? (
              <p style={{ color: '#94a3b8', fontSize: '0.86rem', textAlign: 'center', padding: '20px 0' }}>No news published yet.</p>
            ) : (
              recentNews.map((news) => (
                <div
                  key={news._id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(232, 125, 30, 0.12)',
                      color: '#E87D1E',
                      textTransform: 'uppercase'
                    }}>
                      {news.category || 'Missions'}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      {news.date || 'Recent'}
                    </span>
                  </div>

                  <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.88rem' }}>
                    {news.title}
                  </div>

                  <div style={{ fontSize: '0.78rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {news.summary}
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
              <strong>{stats.totalNews || recentNews.length}</strong> stories published online
            </span>
            <Link
              to="/admin/news"
              style={{
                backgroundColor: '#fff7ed',
                border: '1px solid #fed7aa',
                color: '#E87D1E',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              + Upload News Article
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Contact Inquiries Panel */}
      <div className="admin-card" style={{ background: '#ffffff', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', marginTop: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.15rem', fontWeight: 700 }}>
              Recent Contact Form Inquiries
            </h3>
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.85rem' }}>
              Messages forwarded to <strong>info@kingdomenlightenment.org</strong> and recorded here
            </p>
          </div>

          <Link
            to="/admin/messages"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#E87D1E',
              fontSize: '0.88rem',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            <span>View All Messages</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
            No contact inquiries yet. When visitors fill out the Contact Us form, they will appear here.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {recentMessages.map((msg) => (
              <Link
                key={msg._id}
                to="/admin/messages"
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '16px',
                  borderRadius: '10px',
                  border: !msg.isRead ? '1.5px solid #fed7aa' : '1px solid #e2e8f0',
                  backgroundColor: !msg.isRead ? '#fffdfa' : '#f8fafc',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    backgroundColor: !msg.isRead ? '#fff7ed' : '#e2e8f0',
                    color: !msg.isRead ? '#c2410c' : '#64748b',
                    textTransform: 'uppercase'
                  }}>
                    {!msg.isRead ? 'New' : 'Read'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {new Date(msg.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <div style={{ color: '#1e293b', fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>
                  {msg.name}
                </div>

                <div style={{ color: '#475569', fontWeight: 600, fontSize: '0.84rem', marginBottom: '6px' }}>
                  {msg.subject || 'General Inquiry'}
                </div>

                <div style={{ color: '#64748b', fontSize: '0.82rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {msg.message}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
