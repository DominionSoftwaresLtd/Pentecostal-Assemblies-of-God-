import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Save, X, Upload, Shield, User, ChevronUp, ChevronDown } from 'lucide-react';

const API_BASE = '/api/leadership';

const DEPARTMENTS = [
  'Executive Directorate', 'Executive Board', 'Outreach & Missions', 'Digital Infrastructure',
  'Secretariat', 'Finance & Treasury', 'Welfare & Compassion', 'Prayer Department',
  'Praise and Worship', 'Bible Study', 'High School Ministry', 'General Ministry'
];
const ROLES = [
  'Director', 'Chairperson', 'Secretary', 'Treasurer', 'Outreach Incharge',
  'Digital Infrastructure Director', 'Prayer Coordinator', 'Worship Coordinator',
  'Welfare Incharge', 'Media Director', 'Ministry Leader'
];

const BLANK_FORM = { name: '', role: '', department: '', email: '', phone: '', bio: '', status: 'Active Leadership', order: '' };

const AdminLeadership = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // null = new, id string = edit
  const [form, setForm] = useState(BLANK_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [toast, setToast] = useState(null);
  const [members, setMembers] = useState([]);
  const fileInputRef = useRef(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchLeaders = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      if (data.success) setLeaders(data.leaders || []);
    } catch {
      showToast('Failed to load leadership team.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/members');
      const data = await res.json();
      if (data.members) setMembers(data.members);
    } catch {}
  };

  useEffect(() => { fetchLeaders(); fetchMembers(); }, []);

  const openNew = () => {
    setEditTarget(null);
    setForm({ ...BLANK_FORM, order: String(leaders.length + 1) });
    setImageFile(null);
    setImagePreview('');
    setShowForm(true);
  };

  const openEdit = (leader) => {
    setEditTarget(leader._id);
    setForm({
      name: leader.name || '',
      role: leader.role || '',
      department: leader.department || '',
      email: leader.email || '',
      phone: leader.phone || '',
      bio: leader.bio || '',
      status: leader.status || 'Active Leadership',
      order: String(leader.order || ''),
    });
    setImageFile(null);
    setImagePreview(leader.image ? (leader.image.startsWith('/') || leader.image.startsWith('http') ? leader.image : `/${leader.image}`) : '');
    setShowForm(true);
  };

  const closeForm = () => { setShowForm(false); setEditTarget(null); setImageFile(null); setImagePreview(''); };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return showToast('Name is required.', 'error');
    setSaving(true);

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (imageFile) fd.append('image', imageFile);

    try {
      const url = editTarget ? `${API_BASE}/${editTarget}` : API_BASE;
      const method = editTarget ? 'PUT' : 'POST';
      const res = await fetch(url, { method, body: fd });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || (editTarget ? 'Updated successfully!' : 'Added successfully!'));
        closeForm();
        await fetchLeaders();
      } else {
        showToast(data.message || 'Save failed.', 'error');
      }
    } catch {
      showToast('Network error. Check the backend is running.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove ${name} from the leadership team? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast(`${name} removed from leadership.`);
        await fetchLeaders();
      } else {
        showToast(data.message || 'Delete failed.', 'error');
      }
    } catch {
      showToast('Network error.', 'error');
    } finally {
      setDeleting(null);
    }
  };

  const getImgSrc = (leader) => {
    if (!leader.image) return null;
    if (leader.image.startsWith('http') || leader.image.startsWith('/assets') || leader.image.startsWith('data:')) return leader.image;
    return `/${leader.image}`;
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 0 60px' }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: '80px', right: '24px', zIndex: 9999,
          background: toast.type === 'error' ? '#dc2626' : '#10B981',
          color: '#fff', padding: '12px 22px', borderRadius: '10px',
          boxShadow: '0 6px 24px rgba(0,0,0,0.18)', fontSize: '0.9rem', fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: '10px', animation: 'fadeIn 0.2s ease'
        }}>
          {toast.type === 'error' ? <X size={16} /> : <Save size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 className="admin-page-title" style={{ margin: 0 }}>Leadership Council</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '0.9rem' }}>
            Manage the KEMT leadership team. Changes reflect immediately on the public Leadership page.
          </p>
        </div>
        <button
          onClick={openNew}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#E87D1E', color: '#fff', border: 'none',
            padding: '10px 20px', borderRadius: '8px', fontWeight: 700,
            fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 2px 10px rgba(232,125,30,0.3)'
          }}
        >
          <Plus size={18} /> Add Member
        </button>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px'
        }}>
          <div style={{
            background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '600px',
            maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.25)'
          }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#1e293b' }}>
                {editTarget ? 'Edit Leadership Member' : 'Add New Leadership Member'}
              </h2>
              <button onClick={closeForm} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '24px 28px' }}>
              {/* Image Upload */}
              <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <div style={{
                    width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden',
                    border: '3px solid #E87D1E', background: '#f8fafc',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 10px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(232,125,30,0.2)'
                  }} onClick={() => fileInputRef.current.click()}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <User size={40} color="#cbd5e1" />
                    )}
                  </div>
                  <div
                    onClick={() => fileInputRef.current.click()}
                    style={{
                      position: 'absolute', bottom: 12, right: -4,
                      background: '#E87D1E', borderRadius: '50%', width: '30px', height: '30px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}>
                    <Upload size={14} color="#fff" />
                  </div>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '4px' }}>
                  Click to upload a photo (JPG, PNG, up to 10 MB)
                </div>
              </div>

              {/* Name & Role */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>
                    Full Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Vincent Mwendwa" required
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>Role / Title</label>
                  <select
                    value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', background: '#fff' }}
                  >
                    <option value="">Select role...</option>
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              {/* Department & Status */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>Department</label>
                  <select
                    value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', background: '#fff' }}
                  >
                    <option value="">Select department...</option>
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>Display Order</label>
                  <input
                    type="number" min="1" value={form.order} onChange={e => setForm({ ...form, order: e.target.value })}
                    placeholder="1, 2, 3..."
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>Email</label>
                  <input
                    type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="email@example.com"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>Phone</label>
                  <input
                    type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+254 7XX XXX XXX"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Bio */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>Short Bio (optional)</label>
                <textarea
                  value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })}
                  rows={3} placeholder="A brief description of this leader's ministry and calling..."
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
              </div>

              {/* Link to Member (optional) */}
              {members.length > 0 && (
                <div style={{ marginBottom: '20px', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>
                    Link to Member Account (optional)
                  </label>
                  <select
                    value={form.member_id || ''} onChange={e => setForm({ ...form, member_id: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', background: '#fff' }}
                  >
                    <option value="">— Not linked —</option>
                    {members.map(m => <option key={m._id || m.id} value={m._id || m.id}>{m.name} ({m.email})</option>)}
                  </select>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={closeForm} style={{ padding: '10px 20px', borderRadius: '8px', border: '1.5px solid #e2e8f0', background: '#fff', color: '#64748b', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>
                  Cancel
                </button>
                <button
                  type="submit" disabled={saving}
                  style={{ padding: '10px 24px', borderRadius: '8px', background: saving ? '#94a3b8' : '#E87D1E', color: '#fff', border: 'none', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  {saving ? <><i className="fas fa-spinner fa-spin" /> Saving...</> : <><Save size={16} /> {editTarget ? 'Save Changes' : 'Add to Leadership'}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Leadership Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', display: 'block', marginBottom: '12px' }} />
          Loading leadership team...
        </div>
      ) : leaders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', color: '#94a3b8' }}>
          <Shield size={48} style={{ display: 'block', margin: '0 auto 16px' }} />
          <p style={{ fontWeight: 600, margin: '0 0 12px', color: '#1e293b' }}>No leadership members yet</p>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>Click "Add Member" above to get started.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {leaders.map((leader, idx) => {
            const imgSrc = getImgSrc(leader);
            return (
              <div key={leader._id || idx} style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.2s' }}>
                {/* Top section with photo */}
                <div style={{ padding: '22px 22px 16px', display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', background: leader.color ? `linear-gradient(145deg, ${leader.color}dd, ${leader.color}66)` : '#E87D1E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '1.1rem', flexShrink: 0, boxShadow: '0 3px 10px rgba(0,0,0,0.1)' }}>
                    {imgSrc ? (
                      <img src={imgSrc} alt={leader.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.currentTarget.style.display = 'none'; }} />
                    ) : (
                      leader.initials || leader.name?.slice(0, 2).toUpperCase()
                    )}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '1rem', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{leader.name}</div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '2px 10px', borderRadius: '20px', background: 'rgba(232,125,30,0.1)', color: '#E87D1E', fontSize: '0.76rem', fontWeight: 700 }}>
                      <Shield size={11} /> {leader.role || 'Leader'}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '14px 22px', flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600 }}>Dept: </span>{leader.department || '—'}
                  </div>
                  {leader.email && (
                    <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <span style={{ fontWeight: 600 }}>Email: </span>{leader.email}
                    </div>
                  )}
                  {leader.bio && (
                    <p style={{ fontSize: '0.82rem', color: '#475569', marginTop: '8px', marginBottom: 0, lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{leader.bio}</p>
                  )}
                </div>

                {/* Actions */}
                <div style={{ padding: '12px 22px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.74rem', color: '#94a3b8', marginRight: 'auto' }}>#{leader.order || idx + 1}</span>
                  <button
                    onClick={() => openEdit(leader)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 14px', borderRadius: '6px', border: '1.5px solid #e2e8f0', background: '#f8fafc', color: '#475569', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(leader._id, leader.name)}
                    disabled={deleting === leader._id}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 14px', borderRadius: '6px', border: '1.5px solid #fecaca', background: '#fef2f2', color: '#dc2626', fontSize: '0.82rem', fontWeight: 600, cursor: deleting === leader._id ? 'not-allowed' : 'pointer' }}
                  >
                    {deleting === leader._id ? <i className="fas fa-spinner fa-spin" /> : <Trash2 size={14} />}
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminLeadership;
