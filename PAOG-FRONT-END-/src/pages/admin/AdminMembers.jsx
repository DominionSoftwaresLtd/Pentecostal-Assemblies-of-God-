import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Lock, 
  EyeOff, 
  AlertCircle, 
  X, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

const DEPARTMENTS = [
  'All Departments',
  'Praise and Worship',
  'Prayer Department',
  'Welfare/Compassion',
  'Outreach & Missions',
  'Discipleship & Bible Study',
  'High School Ministry',
  'Digital Infrastructure',
  'General Ministry Supporter'
];

const AdminMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  
  // Modals state
  const [onboardModalOpen, setOnboardModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  
  // Form states
  const [onboardForm, setOnboardForm] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Praise and Worship',
    residence: '',
    role: 'Member',
    status: 'Active',
    password: ''
  });

  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    residence: '',
    role: 'Member',
    status: 'Active',
    newPassword: ''
  });

  const [notification, setNotification] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/members');
      if (res.ok) {
        const data = await res.json();
        setMembers(data);
      }
    } catch {
      showNotification('error', 'Could not load members from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Filtered members list
  const filteredMembers = members.filter(m => {
    const matchesSearch = 
      (m.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (m.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (m.phone || '').toLowerCase().includes(search.toLowerCase()) ||
      (m.residence || '').toLowerCase().includes(search.toLowerCase()) ||
      (m.department || '').toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || (m.status || '').toLowerCase() === statusFilter.toLowerCase();
    const matchesDept = deptFilter === 'All Departments' || m.department === deptFilter;

    return matchesSearch && matchesStatus && matchesDept;
  });

  // Handle Onboard New Member
  const handleOnboardSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(onboardForm)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        showNotification('success', `Member "${data.member.name}" successfully onboarded!`);
        setOnboardModalOpen(false);
        setOnboardForm({
          name: '',
          email: '',
          phone: '',
          department: 'Praise and Worship',
          residence: '',
          role: 'Member',
          status: 'Active',
          password: ''
        });
        fetchMembers();
      } else {
        showNotification('error', data.message || 'Failed to onboard member.');
      }
    } catch {
      showNotification('error', 'Network error while onboarding member.');
    } finally {
      setSubmitting(false);
    }
  };

  // Open Edit Modal
  const openEditModal = (member) => {
    setSelectedMember(member);
    setEditForm({
      name: member.name || '',
      email: member.email || '',
      phone: member.phone || '',
      department: member.department || 'Praise and Worship',
      residence: member.residence || '',
      role: member.role || 'Member',
      status: member.status || 'Active',
      newPassword: ''
    });
    setEditModalOpen(true);
  };

  // Handle Edit Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMember) return;
    setSubmitting(true);

    try {
      const res = await fetch(`/api/members/${selectedMember._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editForm, notifyMember: true })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        showNotification('success', `Details for "${data.member.name}" updated successfully. A notification email has been sent.`);
        setEditModalOpen(false);
        fetchMembers();
      } else {
        showNotification('error', data.message || 'Failed to update member.');
      }
    } catch {
      showNotification('error', 'Error updating member details.');
    } finally {
      setSubmitting(false);
    }
  };

  // Quick Status Toggle
  const handleToggleStatus = async (member) => {
    const nextStatus = member.status === 'Active' ? 'Inactive' : 'Active';
    try {
      const res = await fetch(`/api/members/${member._id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        showNotification('success', `${member.name} status changed to ${nextStatus}.`);
        fetchMembers();
      }
    } catch {
      showNotification('error', 'Could not update status.');
    }
  };

  // Handle Delete
  const handleDeleteMember = async (member) => {
    if (!window.confirm(`Are you sure you want to remove ${member.name} from the system?`)) return;

    try {
      const res = await fetch(`/api/members/${member._id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        showNotification('success', `Member ${member.name} has been removed.`);
        fetchMembers();
      }
    } catch {
      showNotification('error', 'Could not remove member.');
    }
  };

  const activeCount = members.filter(m => m.status === 'Active').length;
  const inactiveCount = members.filter(m => m.status === 'Inactive').length;

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px', 
        flexWrap: 'wrap', 
        gap: '16px' 
      }}>
        <div>
          <h1 className="admin-page-title" style={{ margin: 0, fontSize: '1.6rem' }}>
            Member Management & Directory
          </h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '0.88rem' }}>
            Onboard new ministry members, monitor active accounts, and manage member profiles.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={fetchMembers}
            title="Refresh Member List"
            style={{
              padding: '9px 12px',
              backgroundColor: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
          >
            <RefreshCw size={16} />
          </button>

          <button
            onClick={() => setOnboardModalOpen(true)}
            style={{
              backgroundColor: '#E87D1E',
              color: 'white',
              border: 'none',
              padding: '9px 18px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(232, 125, 30, 0.25)',
              transition: 'all 0.2s'
            }}
          >
            <UserPlus size={18} />
            <span>Onboard New Member</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div style={{
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
        }}>
          {notification.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Summary KPI Cards — clickable to filter */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {/* All Members */}
        <button onClick={() => { setStatusFilter('all'); setDeptFilter('All Departments'); setSearch(''); }}
          style={{ background: statusFilter === 'all' && search === '' ? 'rgba(232,125,30,0.07)' : '#ffffff', padding: '18px 20px', borderRadius: '12px', border: statusFilter === 'all' && search === '' ? '2px solid #E87D1E' : '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', fontFamily: 'inherit' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#E87D1E'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(232,125,30,0.12)'; }}
          onMouseLeave={e => { if (!(statusFilter === 'all' && search === '')) e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <div style={{ width: '46px', height: '46px', borderRadius: '10px', backgroundColor: 'rgba(232, 125, 30, 0.12)', color: '#E87D1E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Users size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#1e293b' }}>{members.length}</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Total Registered Members</div>
            <div style={{ fontSize: '0.72rem', color: '#E87D1E', fontWeight: 600, marginTop: '2px' }}>Click to view all</div>
          </div>
        </button>

        {/* Active Accounts */}
        <button onClick={() => { setStatusFilter('active'); setDeptFilter('All Departments'); setSearch(''); }}
          style={{ background: statusFilter === 'active' ? 'rgba(16,185,129,0.06)' : '#ffffff', padding: '18px 20px', borderRadius: '12px', border: statusFilter === 'active' ? '2px solid #10B981' : '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', fontFamily: 'inherit' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#10B981'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(16,185,129,0.12)'; }}
          onMouseLeave={e => { if (statusFilter !== 'active') e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <div style={{ width: '46px', height: '46px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#1e293b' }}>{activeCount}</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Active Accounts</div>
            <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 600, marginTop: '2px' }}>Click to view active</div>
          </div>
        </button>

        {/* Inactive Accounts */}
        <button onClick={() => { setStatusFilter('inactive'); setDeptFilter('All Departments'); setSearch(''); }}
          style={{ background: statusFilter === 'inactive' ? 'rgba(239,68,68,0.05)' : '#ffffff', padding: '18px 20px', borderRadius: '12px', border: statusFilter === 'inactive' ? '2px solid #EF4444' : '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', fontFamily: 'inherit' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#EF4444'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(239,68,68,0.1)'; }}
          onMouseLeave={e => { if (statusFilter !== 'inactive') e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <div style={{ width: '46px', height: '46px', borderRadius: '10px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <XCircle size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#1e293b' }}>{inactiveCount}</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Inactive Accounts</div>
            <div style={{ fontSize: '0.72rem', color: '#EF4444', fontWeight: 600, marginTop: '2px' }}>Click to view inactive</div>
          </div>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div style={{
        background: '#ffffff',
        padding: '16px 20px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        marginBottom: '20px',
        display: 'flex',
        gap: '14px',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ position: 'relative', flex: '1 1 280px', minWidth: '240px' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone, location..."
            style={{
              width: '100%',
              padding: '10px 36px 10px 42px',
              borderRadius: '8px',
              border: '1.5px solid #e2e8f0',
              outline: 'none',
              fontSize: '0.88rem',
              color: '#1e293b',
              boxSizing: 'border-box',
              background: '#fafafa',
              lineHeight: '1.4',
            }}
            onFocus={e => { e.target.style.borderColor = '#E87D1E'; e.target.style.background = '#fff'; }}
            onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#fafafa'; }}
          />
          {search && (
            <button onClick={() => setSearch('')}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '2px', display: 'flex', alignItems: 'center' }}
              title="Clear search">
              <X size={15} />
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '9px 14px',
              borderRadius: '8px',
              border: '1.5px solid #e2e8f0',
              outline: 'none',
              fontSize: '0.86rem',
              color: '#334155',
              backgroundColor: '#ffffff',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>

          {/* Department Filter */}
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            style={{
              padding: '9px 14px',
              borderRadius: '8px',
              border: '1.5px solid #e2e8f0',
              outline: 'none',
              fontSize: '0.86rem',
              color: '#334155',
              backgroundColor: '#ffffff',
              cursor: 'pointer'
            }}
          >
            {DEPARTMENTS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Members Directory Table */}
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0' }}>
                <th style={{ padding: '14px 20px', color: '#64748b', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Member</th>
                <th style={{ padding: '14px 20px', color: '#64748b', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Contact Info</th>
                <th style={{ padding: '14px 20px', color: '#64748b', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Department</th>
                <th style={{ padding: '14px 20px', color: '#64748b', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Residence</th>
                <th style={{ padding: '14px 20px', color: '#64748b', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Account Status</th>
                <th style={{ padding: '14px 20px', color: '#64748b', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Joined</th>
                <th style={{ padding: '14px 20px', color: '#64748b', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                    <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> Loading member directory...
                  </td>
                </tr>
              ) : filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                    No members found matching your search or filters.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member._id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                    {/* Member Name */}
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: '#fff7ed',
                          border: '1.5px solid #fed7aa',
                          color: '#E87D1E',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {member.name ? member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'M'}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.92rem' }}>
                            {member.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                            Role: {member.role || 'Member'}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ fontSize: '0.85rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <a href={`mailto:${member.email}`} style={{ color: '#E87D1E', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                          <Mail size={13} color="#94a3b8" /> {member.email}
                        </a>
                        {member.phone && (
                          <span style={{ color: '#64748b', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <Phone size={12} color="#94a3b8" /> {member.phone}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Department */}
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '3px 10px',
                        borderRadius: '20px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        color: '#475569',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                        {member.department || 'General'}
                      </span>
                    </td>

                    {/* Residence */}
                    <td style={{ padding: '14px 20px', color: '#64748b', fontSize: '0.85rem' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <MapPin size={13} color="#94a3b8" />
                        <span>{member.residence || 'Kenya'}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td style={{ padding: '14px 20px' }}>
                      <button
                        onClick={() => handleToggleStatus(member)}
                        title="Click to toggle status"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '3px 10px',
                          borderRadius: '20px',
                          border: member.status === 'Active' ? '1px solid #bbf7d0' : '1px solid #fecaca',
                          backgroundColor: member.status === 'Active' ? '#f0fdf4' : '#fef2f2',
                          color: member.status === 'Active' ? '#166534' : '#dc2626',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {member.status === 'Active' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                        {member.status || 'Active'}
                      </button>
                    </td>

                    {/* Joined Date */}
                    <td style={{ padding: '14px 20px', color: '#94a3b8', fontSize: '0.8rem' }}>
                      {member.joinedAt ? new Date(member.joinedAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          onClick={() => openEditModal(member)}
                          title="Edit Member Details"
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            background: '#ffffff',
                            color: '#475569',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.8rem',
                            fontWeight: 600
                          }}
                        >
                          <Edit3 size={14} color="#E87D1E" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => handleDeleteMember(member)}
                          title="Delete Member"
                          style={{
                            padding: '6px 8px',
                            borderRadius: '6px',
                            border: '1px solid #fee2e2',
                            background: '#fef2f2',
                            color: '#ef4444',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Trash2 size={14} />
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

      {/* ── ONBOARD NEW MEMBER MODAL ── */}
      {onboardModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '520px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
            border: '1.5px solid #fed7aa',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '18px 24px',
              borderBottom: '1px solid #f1f5f9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#fff7ed'
            }}>
              <div>
                <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.2rem', fontWeight: 800 }}>
                  Onboard New Member
                </h3>
                <p style={{ margin: '2px 0 0', color: '#64748b', fontSize: '0.82rem' }}>
                  Register a new active member into the KEMT database.
                </p>
              </div>
              <button
                onClick={() => setOnboardModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleOnboardSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Full Name *</label>
                <input
                  type="text"
                  required
                  value={onboardForm.name}
                  onChange={(e) => setOnboardForm({ ...onboardForm, name: e.target.value })}
                  placeholder="e.g. Grace Wanjiku"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Email Address *</label>
                <input
                  type="email"
                  required
                  value={onboardForm.email}
                  onChange={(e) => setOnboardForm({ ...onboardForm, email: e.target.value })}
                  placeholder="grace.wanjiku@gmail.com"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Phone Number</label>
                  <input
                    type="tel"
                    value={onboardForm.phone}
                    onChange={(e) => setOnboardForm({ ...onboardForm, phone: e.target.value })}
                    placeholder="+254 712..."
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Residence / Area</label>
                  <input
                    type="text"
                    value={onboardForm.residence}
                    onChange={(e) => setOnboardForm({ ...onboardForm, residence: e.target.value })}
                    placeholder="e.g. Nairobi, Meru"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Department</label>
                  <select
                    value={onboardForm.department}
                    onChange={(e) => setOnboardForm({ ...onboardForm, department: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', backgroundColor: '#fff', boxSizing: 'border-box' }}
                  >
                    {DEPARTMENTS.filter(d => d !== 'All Departments').map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Status</label>
                  <select
                    value={onboardForm.status}
                    onChange={(e) => setOnboardForm({ ...onboardForm, status: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', backgroundColor: '#fff', boxSizing: 'border-box' }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                  Initial Password (Optional)
                </label>
                <input
                  type="password"
                  value={onboardForm.password}
                  onChange={(e) => setOnboardForm({ ...onboardForm, password: e.target.value })}
                  placeholder="Defaults to: KEMTmember2026"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setOnboardModalOpen(false)}
                  style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#E87D1E',
                    color: '#fff',
                    fontWeight: 700,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 12px rgba(232, 125, 30, 0.25)'
                  }}
                >
                  {submitting ? 'Onboarding...' : 'Onboard Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── EDIT MEMBER DETAILS MODAL ── */}
      {editModalOpen && selectedMember && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '520px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
            border: '1.5px solid #fed7aa',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '18px 24px',
              borderBottom: '1px solid #f1f5f9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#fff7ed'
            }}>
              <div>
                <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.2rem', fontWeight: 800 }}>
                  Edit Member Details
                </h3>
                <p style={{ margin: '2px 0 0', color: '#64748b', fontSize: '0.82rem' }}>
                  Update contact information, ministry department, or account status.
                </p>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Full Name *</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Email Address *</label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Phone Number</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Residence / Area</label>
                  <input
                    type="text"
                    value={editForm.residence}
                    onChange={(e) => setEditForm({ ...editForm, residence: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Department</label>
                  <select
                    value={editForm.department}
                    onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', backgroundColor: '#fff', boxSizing: 'border-box' }}
                  >
                    {DEPARTMENTS.filter(d => d !== 'All Departments').map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', backgroundColor: '#fff', boxSizing: 'border-box' }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Password Privacy Notice & Optional Reset */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px 14px',
                marginTop: '4px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                  <EyeOff size={15} color="#E87D1E" />
                  <span>Password Security &amp; Privacy</span>
                </div>
                <p style={{ margin: '0 0 8px', fontSize: '0.78rem', color: '#64748b', lineHeight: 1.5 }}>
                  Member passwords are cryptographically hashed with bcrypt and cannot be viewed by administrators. To reset their password, enter a new one below (leave blank to keep current):
                </p>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    value={editForm.newPassword}
                    onChange={(e) => setEditForm({ ...editForm, newPassword: e.target.value })}
                    placeholder="New password (leave blank to keep current)"
                    autoComplete="new-password"
                    style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: '6px', border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '0.84rem', boxSizing: 'border-box' }}
                  />
                  <Lock size={15} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#E87D1E',
                    color: '#fff',
                    fontWeight: 700,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 12px rgba(232, 125, 30, 0.25)'
                  }}
                >
                  {submitting ? 'Saving...' : 'Save Member Details'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMembers;
