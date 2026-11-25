import React, { useState, useEffect } from 'react';
import { 
  Newspaper, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Calendar, 
  MapPin, 
  Image as ImageIcon, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  RefreshCw,
  Tag,
  User,
  ArrowRight
} from 'lucide-react';

const CATEGORIES = [
  'District Announcements',
  'District Convocations',
  'Praise and Worship',
  'Instrumentalist',
  'Choir',
  'Ushering',
  'Youth Department',
  'Women Department',
  'Men Department',
  'Sunday School Department',
  'Testimonies'
];

const AdminNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'Missions',
    date: '',
    location: '',
    summary: '',
    content: '',
    author: 'PAG Ngungo Media Team',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  const [notification, setNotification] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/news');
      if (res.ok) {
        const data = await res.json();
        setNewsList(data);
      }
    } catch {
      showNotification('error', 'Could not load news articles from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Missions',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      location: 'Kenya',
      summary: '',
      content: '',
      author: 'PAG Ngungo Media Team',
    });
    setImageFile(null);
    setImagePreview('');
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      category: item.category || 'Missions',
      date: item.date || '',
      location: item.location || '',
      summary: item.summary || '',
      content: item.content || '',
      author: item.author || 'KEMT Missions Team',
    });
    setImageFile(null);
    setImagePreview(item.imageUrl ? (item.imageUrl.startsWith('http') ? item.imageUrl : `/${item.imageUrl}`) : '');
    setModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('date', formData.date);
    data.append('location', formData.location);
    data.append('summary', formData.summary);
    data.append('content', formData.content);
    data.append('author', formData.author);
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      const url = editingItem ? `/api/news/${editingItem._id}` : '/api/news';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: data
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        showNotification('success', editingItem ? 'News article updated!' : 'News article published!');
        setModalOpen(false);
        fetchNews();
      } else {
        showNotification('error', resData.message || 'Operation failed.');
      }
    } catch {
      showNotification('error', 'Network error while saving news article.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Are you sure you want to delete "${item.title}"?`)) return;

    try {
      const res = await fetch(`/api/news/${item._id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        showNotification('success', 'Article deleted successfully.');
        fetchNews();
      }
    } catch {
      showNotification('error', 'Could not delete news article.');
    }
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* Header */}
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
            News &amp; Mission Announcements
          </h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '0.88rem' }}>
            Upload and manage mission updates, revivals, outreach reports, and official notices for the main site.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={fetchNews}
            title="Refresh News"
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

          <button
            onClick={handleOpenCreate}
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
              boxShadow: '0 4px 12px rgba(232, 125, 30, 0.25)'
            }}
          >
            <PlusCircle size={18} />
            <span>Upload News Article</span>
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

      {/* News Grid */}
      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>
          <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> Loading articles...
        </div>
      ) : newsList.length === 0 ? (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          color: '#64748b'
        }}>
          No news articles yet. Click "Upload News Article" above to publish your first announcement.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px'
        }}>
          {newsList.map((item) => (
            <div
              key={item._id}
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              {/* Image banner */}
              <div style={{
                height: '180px',
                backgroundColor: '#fff7ed',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl.startsWith('http') ? item.imageUrl : `/${item.imageUrl}`}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ textAlign: 'center', color: '#E87D1E', padding: '16px' }}>
                    <Newspaper size={36} style={{ margin: '0 auto 8px', display: 'block', opacity: 0.7 }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>PAG Ngungo News</span>
                  </div>
                )}
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: '#E87D1E',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '20px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {item.category || 'Missions'}
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '0.78rem', marginBottom: '8px' }}>
                  <Calendar size={13} />
                  <span>{item.date || 'Recent'}</span>
                  {item.location && (
                    <>
                      <span>·</span>
                      <MapPin size={13} />
                      <span>{item.location}</span>
                    </>
                  )}
                </div>

                <h3 style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: '#1e293b',
                  margin: '0 0 8px',
                  lineHeight: 1.4
                }}>
                  {item.title}
                </h3>

                <p style={{
                  fontSize: '0.84rem',
                  color: '#64748b',
                  lineHeight: 1.6,
                  margin: '0 0 16px',
                  flex: 1
                }}>
                  {item.summary}
                </p>

                {/* Footer Controls */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '12px',
                  marginTop: 'auto'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: '#94a3b8' }}>
                    <User size={13} />
                    <span>{item.author || 'PAG Admin'}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => handleOpenEdit(item)}
                      title="Edit Article"
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
                      onClick={() => handleDelete(item)}
                      title="Delete Article"
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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── UPLOAD / EDIT NEWS MODAL ── */}
      {modalOpen && (
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
          padding: '1rem',
          overflowY: 'auto'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '560px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
            border: '1.5px solid #fed7aa',
            overflow: 'hidden',
            margin: 'auto'
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
                  {editingItem ? 'Edit News Article' : 'Upload News Article'}
                </h3>
                <p style={{ margin: '2px 0 0', color: '#64748b', fontSize: '0.82rem' }}>
                  This will be displayed in the "Latest From The Field" section on the home page.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                  Article Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Machakos Mega Mission: Over 200 Souls Saved"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', backgroundColor: '#fff', boxSizing: 'border-box' }}
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                    Date / Season
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. August 2026 — Meru"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Machakos Town"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                    Author / Department
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="PAG Ngungo Media Team"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                  Summary Snippet (1-2 sentences) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Brief summary for display on homepage news cards..."
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                  Full Story &amp; Details
                </label>
                <textarea
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Full report, missionary testimonies, prayer highlights..."
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                />
              </div>

              {/* Image Upload */}
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                  Cover Image / Banner
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ fontSize: '0.85rem' }}
                />
                {imagePreview && (
                  <div style={{ marginTop: '10px', height: '110px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                    <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: '9px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#E87D1E',
                    color: '#fff',
                    fontWeight: 700,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 12px rgba(232, 125, 30, 0.25)'
                  }}
                >
                  {submitting ? 'Publishing...' : editingItem ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNews;
