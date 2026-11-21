import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, galleryAlbums as initialStaticAlbums } from '../data/galleryData';

// Helper to resolve image paths across all devices & hosts
const resolveImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:') || url.startsWith('data:')) {
    return url;
  }
  const apiUrl = import.meta.env.VITE_API_URL || '';
  return apiUrl ? `${apiUrl.replace(/\/$/, '')}${url.startsWith('/') ? '' : '/'}${url}` : url;
};

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeShortcut, setActiveShortcut] = useState('');
  
  // Initialize with cached database albums for instant display
  const [dbAlbums, setDbAlbums] = useState(() => {
    try {
      const cached = localStorage.getItem('kemt_gallery_cache');
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  // Fetch albums uploaded via admin
  const fetchDbAlbums = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL 
        ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api/gallery?_t=${Date.now()}`
        : `/api/gallery?_t=${Date.now()}`;

      const res = await fetch(apiUrl, { 
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
      });
      if (res.ok) {
        const data = await res.json();
        const formatted = data.map(item => {
          const resolvedCover = resolveImageUrl(item.coverImage);
          return {
            id: item._id,
            title: item.title,
            date: item.date,
            category: item.category,
            branch: item.branch || (item.category === 'Youth & Schools' ? 'KESIP' : 'KEMT'),
            coverImage: resolvedCover,
            photosLink: item.photosLink,
            shortCaption: item.shortCaption,
            objectPosition: item.objectPosition || 'center',
            photos: item.photos && item.photos.length > 0 ? item.photos.map(resolveImageUrl) : [resolvedCover],
          };
        });
        setDbAlbums(formatted);
        localStorage.setItem('kemt_gallery_cache', JSON.stringify(formatted));
      }
    } catch (err) {
      console.error('Gallery albums fetch error:', err);
    }
  };

  useEffect(() => {
    fetchDbAlbums();
    // Auto-refresh gallery every 15 seconds to sync live across devices
    const interval = setInterval(fetchDbAlbums, 15000);
    return () => clearInterval(interval);
  }, []);

  // Merge database albums (newest first) with default albums
  const galleryAlbums = useMemo(() => {
    return [...dbAlbums, ...initialStaticAlbums];
  }, [dbAlbums]);

  const albumIdFromUrl = searchParams.get('album');
  const photoIndexFromUrl = searchParams.get('photo');

  // Selected Album derived from URL
  const selectedAlbum = useMemo(() => {
    if (!albumIdFromUrl) return null;
    return galleryAlbums.find(album => album.id === albumIdFromUrl) || null;
  }, [albumIdFromUrl, galleryAlbums]);

  // Lightbox Item derived from active album & URL photo index
  const lightboxItem = useMemo(() => {
    if (!selectedAlbum || photoIndexFromUrl === null) return null;
    const photoIdx = parseInt(photoIndexFromUrl, 10);
    if (isNaN(photoIdx) || photoIdx < 0 || photoIdx >= selectedAlbum.photos.length) {
      return null;
    }
    const photosSet = selectedAlbum.photos.map(photoSrc => ({
      src: photoSrc,
      title: selectedAlbum.title,
      fullDescription: selectedAlbum.shortCaption,
      category: selectedAlbum.category,
      objectPosition: selectedAlbum.objectPosition || 'center'
    }));
    return {
      item: photosSet[photoIdx],
      index: photoIdx,
      set: photosSet
    };
  }, [selectedAlbum, photoIndexFromUrl]);

  // Filter items based on search query and ALL albums
  const filteredAlbums = useMemo(() => {
    let result = galleryAlbums;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(album => 
        album.title.toLowerCase().includes(q) || 
        album.date.toLowerCase().includes(q)
      );
    }
    return result;
  }, [searchQuery, galleryAlbums]);

  // Select Album (Pushes state to URL history)
  const selectAlbum = (album) => {
    setSearchParams({ album: album.id });
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  // Close Album (Steps back in browser history to All Albums view)
  const closeAlbum = () => {
    if (searchParams.has('album')) {
      window.history.back();
    } else {
      setSearchParams({});
    }
  };

  // Open Lightbox for a photo (Pushes state to URL history)
  const openLightbox = (album, startIndex = 0) => {
    setSearchParams({ album: album.id, photo: startIndex });
  };

  // Close Lightbox (Steps back in browser history to Album Detail view)
  const closeLightbox = () => {
    if (searchParams.has('photo')) {
      window.history.back();
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('photo');
      setSearchParams(newParams);
    }
  };

  // Next Lightbox Item
  const nextPhoto = useCallback(() => {
    if (!lightboxItem || !selectedAlbum) return;
    const nextIdx = (lightboxItem.index + 1) % lightboxItem.set.length;
    setSearchParams({ album: selectedAlbum.id, photo: nextIdx }, { replace: true });
  }, [lightboxItem, selectedAlbum, setSearchParams]);

  // Previous Lightbox Item
  const prevPhoto = useCallback(() => {
    if (!lightboxItem || !selectedAlbum) return;
    const prevIdx = (lightboxItem.index - 1 + lightboxItem.set.length) % lightboxItem.set.length;
    setSearchParams({ album: selectedAlbum.id, photo: prevIdx }, { replace: true });
  }, [lightboxItem, selectedAlbum, setSearchParams]);

  // Keyboard navigation & body scroll lock support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxItem) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    if (lightboxItem) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxItem, nextPhoto, prevPhoto]);

  const scrollToSection = (id) => {
    setActiveShortcut(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Account for fixed navbar if any
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleAlbumClick = (album) => {
    if (album.photosLink) {
      window.open(album.photosLink, '_blank', 'noopener,noreferrer');
    } else {
      selectAlbum(album);
    }
  };

  const renderAlbumCard = (album) => {
    const isGooglePhotos = album.photosLink && (
      album.photosLink.includes('photos.app.goo.gl') || 
      album.photosLink.includes('photos.google.com') || 
      album.photosLink.includes('drive.google.com')
    );

    return (
      <article
        key={album.id}
        className="gallery-card-v2"
        onClick={() => handleAlbumClick(album)}
        tabIndex={0}
        style={{ cursor: 'pointer' }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleAlbumClick(album);
          }
        }}
      >
        <div className="gallery-card-v2__media" style={{ position: 'relative' }}>
          <img
            src={album.coverImage}
            alt={album.title}
            loading="lazy"
            className="gallery-card-v2__img"
            style={{ objectPosition: album.objectPosition || 'center' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80';
            }}
          />
          {isGooglePhotos && (
            <span style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.94)',
              color: '#1d4ed8',
              fontSize: '0.68rem',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '12px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              zIndex: 2
            }}>
              <i className="fab fa-google" style={{ color: '#E87D1E', fontSize: '0.68rem' }}></i> Photos
            </span>
          )}
        </div>
        <div className="gallery-card-v2__content">
          <h3 className="gallery-card-v2__title">{album.title.toUpperCase()}</h3>
          <p className="gallery-card-v2__date">{album.date}</p>
          <button 
            className="gallery-card-v2__btn"
            onClick={(e) => {
              e.stopPropagation();
              handleAlbumClick(album);
            }}
          >
            {album.photosLink ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                View Photos <i className="fas fa-external-link-alt" style={{ fontSize: '0.7rem' }}></i>
              </span>
            ) : 'View Photos'}
          </button>
        </div>
      </article>
    );
  };

  return (
    <main className="gallery-page">
      {/* Page Banner */}
      <section className="page-banner gallery-page-banner">
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <h1>Photo Gallery</h1>
            <p>
              Explore moments of grace, community transformation, school mentorships, and servant leadership across our mission fields.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-grid-section">
        <div className="container">
          {!selectedAlbum ? (
            <>
              {/* Compact Header: Search & Branch Shortcuts */}
              <div className="gallery-results-header-compact">
                <div className="gallery-header-controls">
                  <div className="gallery-search-bar">
                    <i className="fas fa-search gallery-search-icon"></i>
                    <input 
                      type="text" 
                      placeholder="Search by name or date..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="gallery-search-input"
                    />
                    {searchQuery && (
                      <button className="gallery-search-clear" onClick={() => setSearchQuery('')}>
                        <i className="fas fa-times"></i>
                      </button>
                    )}
                  </div>

                  {!searchQuery && (
                    <div className="gallery-branch-shortcuts-compact">
                      <button 
                        onClick={() => scrollToSection('kemt-section')} 
                        className={`branch-shortcut-btn-compact ${activeShortcut === 'kemt-section' ? 'active-shortcut' : ''}`}
                      >
                        <i className="fas fa-globe-africa"></i> KEMT
                      </button>
                      <button 
                        onClick={() => scrollToSection('kesip-section')} 
                        className={`branch-shortcut-btn-compact ${activeShortcut === 'kesip-section' ? 'active-shortcut' : ''}`}
                      >
                        <i className="fas fa-user-graduate"></i> Students (KESIP)
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Responsive Uniform Image Grid with KEMT vs KESIP Branching */}
              {!searchQuery ? (
                <div className="gallery-branches-container">
                  <div className="gallery-branch-section" id="kemt-section">
                    <h3 className="gallery-branch-title">Kingdom Enlightenment Missions Team (KEMT)</h3>
                    <div className="gallery-grid-uniform">
                      {filteredAlbums.filter(a => a.branch ? a.branch !== 'KESIP' : a.category !== 'Youth & Schools').map(renderAlbumCard)}
                    </div>
                  </div>

                  <div className="gallery-branch-section" id="kesip-section">
                    <h3 className="gallery-branch-title">Kingdom Enlightenment Student Impact Program (KESIP)</h3>
                    <div className="gallery-grid-uniform">
                      {filteredAlbums.filter(a => a.branch ? a.branch === 'KESIP' : a.category === 'Youth & Schools').map(renderAlbumCard)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="gallery-grid-uniform">
                  {filteredAlbums.map(renderAlbumCard)}
                </div>
              )}

              {filteredAlbums.length === 0 && (
                <div className="gallery-empty-state">
                  <i className="fas fa-images gallery-empty-icon" aria-hidden="true"></i>
                  <p>No event albums found in this category.</p>
                </div>
              )}
            </>
          ) : (
            <div className="album-detail-view">
              <button 
                className="album-back-btn" 
                onClick={closeAlbum}
                aria-label="Back to Albums"
              >
                <i className="fas fa-arrow-left"></i> Back to Albums
              </button>
              
              <div className="album-detail-header">
                <h2>{selectedAlbum.title}</h2>
                <div className="album-meta">
                  <span className="album-date"><i className="far fa-calendar-alt"></i> {selectedAlbum.date}</span>
                  <span className="album-count"><i className="fas fa-camera"></i> {selectedAlbum.photos.length} Photos</span>
                </div>
                <p>{selectedAlbum.shortCaption}</p>
              </div>

              <div className="album-photos-grid">
                {selectedAlbum.photos.map((photo, index) => (
                  <div 
                    key={index} 
                    className="album-photo-item"
                    onClick={() => openLightbox(selectedAlbum, index)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox(selectedAlbum, index);
                      }
                    }}
                  >
                    <img 
                      src={photo} 
                      alt={`${selectedAlbum.title} - photo ${index + 1}`} 
                      loading="lazy"
                    />
                    <div className="photo-item-overlay">
                      <i className="fas fa-expand-alt"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Lightbox Modal */}
      {lightboxItem && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.item.title}
          onClick={closeLightbox}
        >
          <div className="gallery-lightbox__backdrop"></div>

          {/* Close Button */}
          <button
            className="gallery-lightbox__close"
            onClick={closeLightbox}
            aria-label="Close modal"
          >
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>

          {/* Navigation - Prev */}
          <button
            className="gallery-lightbox__nav gallery-lightbox__nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            aria-label="Previous photo"
          >
            <i className="fas fa-chevron-left" aria-hidden="true"></i>
          </button>

          {/* Modal Container */}
          <div
            className="gallery-lightbox__container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gallery-lightbox__image-wrapper">
              <img
                src={lightboxItem.item.src}
                alt={lightboxItem.item.title}
                className="gallery-lightbox__img"
              />
            </div>

            {/* Lightbox Information Details Pane */}
            <div className="gallery-lightbox__details">
              <div className="gallery-lightbox__header">
                <span className="gallery-lightbox__badge">
                  {lightboxItem.item.category}
                </span>
                <span className="gallery-lightbox__counter">
                  {lightboxItem.index + 1} of {lightboxItem.set.length}
                </span>
                <a 
                  href={lightboxItem.item.src} 
                  download={`kemt-photo-${lightboxItem.index + 1}.jpg`}
                  className="gallery-lightbox__download"
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className="fas fa-download"></i> Download
                </a>
              </div>
              <h3 className="gallery-lightbox__title">{lightboxItem.item.title}</h3>
              <p className="gallery-lightbox__description">
                {lightboxItem.item.fullDescription}
              </p>
            </div>
          </div>

          {/* Navigation - Next */}
          <button
            className="gallery-lightbox__nav gallery-lightbox__nav--next"
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            aria-label="Next photo"
          >
            <i className="fas fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
      )}
    </main>
  );
};

export default Gallery;
