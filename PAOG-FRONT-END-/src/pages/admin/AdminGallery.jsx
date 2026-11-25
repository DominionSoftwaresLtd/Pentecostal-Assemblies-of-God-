import React, { useState, useEffect, useRef } from 'react';
import { 
  Images, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Calendar, 
  Tag, 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Upload, 
  Eye, 
  Globe, 
  Sparkles,
  Layers,
  FolderOpen
} from 'lucide-react';

const CATEGORIES = [
  'Community Outreach',
  'Youth & Schools',
  'Service & Action',
  'Leadership & Team'
];

const resolveImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:') || url.startsWith('data:')) {
    return url;
  }
  const apiUrl = import.meta.env.VITE_API_URL || '';
  return apiUrl ? `${apiUrl.replace(/\/$/, '')}${url.startsWith('/') ? '' : '/'}${url}` : url;
};

const AdminGallery = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    category: 'Community Outreach',
    branch: 'KEMT',
    photosLink: '',
    shortCaption: '',
    coverImageUrl: '',
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const fileInputRef = useRef(null);

  // Fetch albums
  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/gallery?_t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setAlbums(data);
        localStorage.setItem('kemt_gallery_cache', JSON.stringify(data));
      } else {
        throw new Error('Failed to fetch');
      }
    } catch {
      const cached = localStorage.getItem('kemt_gallery_cache');
      if (cached) {
        try { setAlbums(JSON.parse(cached)); } catch {}
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  // Handle Form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // Auto-toggle branch if category is Youth & Schools
      if (name === 'category') {
        updated.branch = value === 'Youth & Schools' ? 'KESIP' : 'KEMT';
      }
      return updated;
    });
  };

  // Handle File selection & preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
    }
  };

  // Open Modal for Add
  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      category: 'Community Outreach',
      branch: 'KEMT',
      photosLink: '',
      shortCaption: '',
      coverImageUrl: '',
    });
    setThumbnailFile(null);
    setThumbnailPreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setShowModal(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (album) => {
    setEditingId(album._id);
    setFormData({
      title: album.title || '',
      date: album.date || '',
      category: album.category || 'Community Outreach',
      branch: album.branch || (album.category === 'Youth & Schools' ? 'KESIP' : 'KEMT'),
      photosLink: album.photosLink || '',
      shortCaption: album.shortCaption || '',
      coverImageUrl: album.coverImage && !album.coverImage.startsWith('/uploads/') ? album.coverImage : '',
    });
    setThumbnailFile(null);
    setThumbnailPreview(resolveImageUrl(album.coverImage) || '');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setShowModal(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setThumbnailFile(null);
    setThumbnailPreview('');
  };

  // Save / Update Album
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setStatus({ type: 'error', message: 'Album name is required.' });
      return;
    }
    if (!thumbnailFile && !formData.coverImageUrl.trim() && !thumbnailPreview) {
      setStatus({ type: 'error', message: 'Please provide a thumbnail image (upload or image URL).' });
      return;
    }

    setSaving(true);
    setStatus({ type: '', message: '' });

    const data = new FormData();
    data.append('title', formData.title.trim());
    data.append('date', formData.date.trim());
    data.append('category', formData.category);
    data.append('branch', formData.branch);
    data.append('photosLink', formData.photosLink.trim());
    data.append('shortCaption', formData.shortCaption.trim());
    if (formData.coverImageUrl.trim()) {
      data.append('coverImageUrl', formData.coverImageUrl.trim());
    }
    if (thumbnailFile) {
      data.append('thumbnail', thumbnailFile);
    }

    try {
      const url = editingId ? `/api/gallery/${editingId}` : '/api/gallery';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: data,
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setStatus({ 
          type: 'success', 
          message: editingId ? 'Album updated successfully!' : 'New album published to Gallery!' 
        });
        handleCloseModal();
        fetchAlbums();
      } else {
        setStatus({ type: 'error', message: result.message || 'Failed to save album.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Connection error while saving album.' });
    } finally {
      setSaving(false);
      setTimeout(() => setStatus({ type: '', message: '' }), 4000);
    }
  };

  // Delete Album
  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}" permanently?`)) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) {
        const updated = albums.filter(a => a._id !== id);
        setAlbums(updated);
        localStorage.setItem('kemt_gallery_cache', JSON.stringify(updated));
        setStatus({ type: 'success', message: 'Album deleted from gallery.' });
      } else {
        throw new Error();
      }
    } catch {
      setStatus({ type: 'error', message: 'Failed to delete album.' });
    } finally {
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    }
  };

  // Filtered albums
  const filteredAlbums = albums.filter(album => {
    const matchesCat = selectedCategory === 'All' || album.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      (album.title || '').toLowerCase().includes(q) ||
      (album.date || '').toLowerCase().includes(q) ||
      (album.shortCaption || '').toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const totalGooglePhotos = albums.filter(a => a.photosLink && (a.photosLink.includes('photos') || a.photosLink.includes('drive'))).length;
  const kemtCount = albums.filter(a => a.branch !== 'KESIP' && a.category !== 'Youth & Schools').length;
  const kesipCount = albums.filter(a => a.branch === 'KESIP' || a.category === 'Youth & Schools').length;

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* ── Top Header ─────────────────────────────────────────────────────────── */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        marginBottom: '24px', 
        flexWrap: 'wrap', 
        gap: '16px' 
      }}>
        <div>
          <h1 className="admin-page-title" style={{ margin: 0, fontSize: '1.65rem' }}>
            Gallery &amp; Albums Administration
          </h1>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.88rem' }}>
            Upload event albums, connect Google Photos links, and manage photo galleries across Ngungo Assembly and District Circuits.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={fetchAlbums}
            title="Refresh Albums"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              background: '#ffffff',
              border: '1.5px solid #e2e8f0',
              padding: '9px 14px',
              borderRadius: '8px',
              color: '#475569',
              fontWeight: 600,
              fontSize: '0.86rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <RefreshCw size={15} className={loading ? 'fa-spin' : ''} />
            Refresh
          </button>

          <button
            onClick={handleOpenAdd}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#E87D1E',
              color: '#ffffff',
              border: 'none',
              padding: '9px 18px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              boxShadow: '0 3px 10px rgba(232, 125, 30, 0.3)',
              transition: 'all 0.2s',
            }}
          >
            <Plus size={18} />
            <span>Add New Album</span>
          </button>
        </div>
      </div>

      {/* ── Alert Toast ───────────────────────────────────────────────────────── */}
      {status.message && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '9px 18px',
          marginBottom: '20px',
          borderRadius: '50px',
          backgroundColor: status.type === 'error' ? '#fff1f2' : '#f0fdf4',
          color: status.type === 'error' ? '#be123c' : '#166534',
          border: `1px solid ${status.type === 'error' ? '#fecdd3' : '#bbf7d0'}`,
          fontSize: '0.88rem',
          fontWeight: 600
        }}>
          {status.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
          {status.message}
        </div>
      )}

      {/* ── Stats Bar ─────────────────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div className="admin-stat-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Total Albums</p>
              <h3 style={{ margin: '4px 0 0', fontSize: '1.6rem', fontWeight: 800, color: '#1e293b' }}>
                {albums.length}
              </h3>
            </div>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E87D1E' }}>
              <Images size={20} />
            </div>
          </div>
        </div>

        <div className="admin-stat-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Google Photos Linked</p>
              <h3 style={{ margin: '4px 0 0', fontSize: '1.6rem', fontWeight: 800, color: '#1d4ed8' }}>
                {totalGooglePhotos}
              </h3>
            </div>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8' }}>
              <ExternalLink size={20} />
            </div>
          </div>
        </div>

        <div className="admin-stat-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>KEMT Missions</p>
              <h3 style={{ margin: '4px 0 0', fontSize: '1.6rem', fontWeight: 800, color: '#166534' }}>
                {kemtCount}
              </h3>
            </div>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#166534' }}>
              <Globe size={20} />
            </div>
          </div>
        </div>

        <div className="admin-stat-card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Students (KESIP)</p>
              <h3 style={{ margin: '4px 0 0', fontSize: '1.6rem', fontWeight: 800, color: '#7e22ce' }}>
                {kesipCount}
              </h3>
            </div>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#fdf4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7e22ce' }}>
              <Layers size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Search & Filter Controls ────────────────────────────────────────── */}
      <div style={{
        background: '#ffffff',
        padding: '14px 18px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        marginBottom: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedCategory('All')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: selectedCategory === 'All' ? '#E87D1E' : '#f1f5f9',
              color: selectedCategory === 'All' ? '#ffffff' : '#475569',
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.18s'
            }}
          >
            All Categories ({albums.length})
          </button>
          {CATEGORIES.map(cat => {
            const count = albums.filter(a => a.category === cat).length;
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: active ? '#E87D1E' : '#f1f5f9',
                  color: active ? '#ffffff' : '#475569',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.18s'
                }}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', minWidth: '240px', flex: '1 1 240px', maxWidth: '380px' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search albums by name, date..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '8px',
              border: '1.5px solid #e2e8f0',
              fontSize: '0.86rem',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* ── Albums Grid ─────────────────────────────────────────────────────── */}
      {loading ? (
        <div style={{ background: '#fff', borderRadius: '12px', padding: '60px', textAlign: 'center', color: '#94a3b8', border: '1px solid #e2e8f0' }}>
          <RefreshCw size={26} className="fa-spin" style={{ display: 'block', margin: '0 auto 12px' }} />
          <p style={{ margin: 0, fontWeight: 600 }}>Loading gallery albums...</p>
        </div>
      ) : filteredAlbums.length === 0 ? (
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1.5px dashed #cbd5e1',
          padding: '60px 24px',
          textAlign: 'center'
        }}>
          <FolderOpen size={48} color="#94a3b8" style={{ display: 'block', margin: '0 auto 14px' }} />
          <h3 style={{ margin: '0 0 6px', fontSize: '1.15rem', color: '#1e293b' }}>
            {searchQuery || selectedCategory !== 'All' ? 'No albums match your search' : 'No albums published yet'}
          </h3>
          <p style={{ margin: '0 0 20px', color: '#64748b', fontSize: '0.88rem' }}>
            {searchQuery || selectedCategory !== 'All' 
              ? 'Try adjusting your search query or category filter.'
              : 'Add your first mission album with a Google Photos link and cover thumbnail.'}
          </p>
          <button
            onClick={handleOpenAdd}
            style={{
              backgroundColor: '#E87D1E',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Plus size={16} />
            Publish First Album
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '22px'
        }}>
          {filteredAlbums.map(album => {
            const isGooglePhotos = album.photosLink && (album.photosLink.includes('photos.app.goo.gl') || album.photosLink.includes('photos.google.com') || album.photosLink.includes('drive.google.com'));

            return (
              <div
                key={album._id}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
              >
                {/* Thumbnail Header */}
                <div style={{ position: 'relative', height: '200px', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
                  <img
                    src={resolveImageUrl(album.coverImage)}
                    alt={album.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80';
                    }}
                  />

                  {/* Branch / Category Badges */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{
                      backgroundColor: album.branch === 'KESIP' ? '#7e22ce' : '#E87D1E',
                      color: 'white',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {album.branch || (album.category === 'Youth & Schools' ? 'KESIP' : 'KEMT')}
                    </span>

                    <span style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.75)',
                      color: 'white',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      backdropFilter: 'blur(4px)'
                    }}>
                      {album.category}
                    </span>
                  </div>

                  {/* Google Photos indicator */}
                  {isGooglePhotos && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      color: '#1d4ed8',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                    }}>
                      <Sparkles size={12} color="#E87D1E" />
                      Google Photos
                    </div>
                  )}
                </div>

                {/* Content Body */}
                <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{
                    margin: '0 0 6px',
                    fontSize: '1.08rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.4px',
                    lineHeight: 1.3
                  }}>
                    {album.title}
                  </h3>

                  <p style={{
                    margin: '0 0 10px',
                    fontSize: '0.8rem',
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <Calendar size={13} color="#94a3b8" />
                    {album.date || 'Active Mission'}
                  </p>

                  {album.shortCaption && (
                    <p style={{
                      margin: '0 0 14px',
                      fontSize: '0.84rem',
                      color: '#475569',
                      lineHeight: 1.5,
                      flex: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {album.shortCaption}
                    </p>
                  )}

                  {/* Google Photos Link Preview */}
                  {album.photosLink && (
                    <div style={{
                      margin: '0 0 14px',
                      background: '#f8fafc',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0',
                      fontSize: '0.78rem',
                      color: '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0, overflow: 'hidden' }}>
                        <LinkIcon size={12} color="#3b82f6" />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {album.photosLink}
                        </span>
                      </div>
                      <a
                        href={album.photosLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#E87D1E',
                          textDecoration: 'none',
                          fontWeight: 700,
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        Visit <ExternalLink size={12} />
                      </a>
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '12px',
                    borderTop: '1px solid #f1f5f9',
                    marginTop: 'auto'
                  }}>
                    <button
                      onClick={() => handleOpenEdit(album)}
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        color: '#334155',
                        padding: '7px 12px',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <Edit3 size={14} />
                      Edit
                    </button>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      {album.photosLink && (
                        <a
                          href={album.photosLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open photo album in new tab"
                          style={{
                            background: '#eff6ff',
                            border: '1px solid #bfdbfe',
                            color: '#1d4ed8',
                            padding: '7px 11px',
                            borderRadius: '6px',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Eye size={14} />
                          Preview
                        </a>
                      )}

                      <button
                        onClick={() => handleDelete(album._id, album.title)}
                        title="Delete this album"
                        style={{
                          background: '#fff1f2',
                          border: '1px solid #fecdd3',
                          color: '#e11d48',
                          padding: '7px 10px',
                          borderRadius: '6px',
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
            );
          })}
        </div>
      )}

      {/* ── Modal for Add / Edit Album ───────────────────────────────────────── */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          overflowY: 'auto'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '680px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            border: '1px solid #e2e8f0',
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #f1f5f9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E87D1E' }}>
                  <Images size={20} />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>
                    {editingId ? 'Edit Gallery Album' : 'Publish New Gallery Album'}
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                    Add thumbnail, album title, and Google Photos link for live gallery display.
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '50%',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                {/* Album Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Album Title / Mission Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="e.g. GIKUMENE MISSION or EMALI CRUSADE"
                    value={formData.title}
                    onChange={handleInputChange}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                </div>

                {/* Category & Branch Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      style={{ width: '100%', boxSizing: 'border-box' }}
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      Ministry Section / Branch
                    </label>
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      style={{ width: '100%', boxSizing: 'border-box' }}
                    >
                      <option value="KEMT">Ngungo Assembly (HQ)</option>
                      <option value="KESIP">Mbeere District / Kyuso Circuit</option>
                    </select>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Date or Date Range
                  </label>
                  <input
                    type="text"
                    name="date"
                    placeholder="e.g. 28th Dec 2025 - 5th Jan 2026 or August 2026"
                    value={formData.date}
                    onChange={handleInputChange}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                </div>

                {/* Google Photos / Photos Link */}
                <div style={{
                  background: '#f8fafc',
                  padding: '14px',
                  borderRadius: '10px',
                  border: '1.5px solid #bfdbfe'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <ExternalLink size={16} color="#1d4ed8" />
                    <label style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1e3a8a' }}>
                      Google Photos Album Link (or External Photos Link)
                    </label>
                  </div>
                  <input
                    type="url"
                    name="photosLink"
                    placeholder="https://photos.app.goo.gl/... or Google Drive / web album link"
                    value={formData.photosLink}
                    onChange={handleInputChange}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                  <p style={{ margin: '6px 0 0', fontSize: '0.76rem', color: '#64748b' }}>
                    When visitors click "View Photos" on this card in the gallery, it opens your Google Photos album directly in a new tab.
                  </p>
                </div>

                {/* Cover Thumbnail Image Selection */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Cover Thumbnail Image <span style={{ color: '#ef4444' }}>*</span>
                  </label>

                  {/* Thumbnail Preview if exists */}
                  {thumbnailPreview && (
                    <div style={{ marginBottom: '10px', position: 'relative', width: '160px', height: '110px', borderRadius: '8px', overflow: 'hidden', border: '2px solid #E87D1E' }}>
                      <img src={thumbnailPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button
                        type="button"
                        onClick={() => { setThumbnailFile(null); setThumbnailPreview(''); setFormData(prev => ({ ...prev, coverImageUrl: '' })); }}
                        style={{
                          position: 'absolute', top: '4px', right: '4px',
                          background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none',
                          borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      style={{
                        background: '#ffffff',
                        border: '1.5px solid #cbd5e1',
                        padding: '9px 16px',
                        borderRadius: '8px',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        color: '#334155',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Upload size={15} color="#E87D1E" />
                      {thumbnailFile ? 'Change Uploaded File' : 'Upload Image from Computer'}
                    </button>

                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>— OR —</span>

                    <input
                      type="url"
                      name="coverImageUrl"
                      placeholder="Paste image web link (https://...)"
                      value={formData.coverImageUrl}
                      onChange={(e) => {
                        handleInputChange(e);
                        if (e.target.value.trim()) setThumbnailPreview(e.target.value.trim());
                      }}
                      style={{ flex: 1, minWidth: '180px', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                {/* Short Caption */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                    Short Description / Caption
                  </label>
                  <textarea
                    name="shortCaption"
                    rows={2}
                    placeholder="e.g. Highlights of high school mentorship and Gospel crusade in Meru..."
                    value={formData.shortCaption}
                    onChange={handleInputChange}
                    style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                </div>

                {/* Live Card Preview Box */}
                <div style={{
                  background: '#fafafa',
                  borderRadius: '10px',
                  padding: '14px',
                  border: '1px solid #e2e8f0'
                }}>
                  <p style={{ margin: '0 0 10px', fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                    Card Appearance on Main Gallery Page
                  </p>

                  <div style={{
                    maxWidth: '280px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}>
                    <div style={{ height: '140px', background: '#e2e8f0', overflow: 'hidden' }}>
                      {thumbnailPreview ? (
                        <img src={thumbnailPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                          <ImageIcon size={32} opacity={0.4} />
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '12px' }}>
                      <h4 style={{ margin: '0 0 4px', fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>
                        {formData.title ? formData.title.toUpperCase() : 'ALBUM TITLE'}
                      </h4>
                      <p style={{ margin: '0 0 10px', fontSize: '0.74rem', color: '#64748b' }}>
                        {formData.date || 'Event Date'}
                      </p>
                      <span style={{
                        display: 'inline-block',
                        background: '#ffffff',
                        border: '1px solid #800000',
                        color: '#800000',
                        padding: '4px 12px',
                        borderRadius: '4px',
                        fontSize: '0.74rem',
                        fontWeight: 600
                      }}>
                        View Photos
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Submit Buttons */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px',
                marginTop: '24px',
                paddingTop: '16px',
                borderTop: '1px solid #f1f5f9'
              }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    color: '#475569',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    backgroundColor: '#E87D1E',
                    color: 'white',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: saving ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 3px 10px rgba(232, 125, 30, 0.3)'
                  }}
                >
                  {saving ? (
                    <>
                      <RefreshCw size={15} className="fa-spin" />
                      Saving Album...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={16} />
                      {editingId ? 'Update Album' : 'Publish Album'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminGallery;
