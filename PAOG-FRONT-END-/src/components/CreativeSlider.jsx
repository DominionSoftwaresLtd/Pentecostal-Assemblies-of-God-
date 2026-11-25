import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './CreativeSlider.css';
import logoImg from '../assets/logo ngungo.png';
import bishopPhoto from '../assets/Bishop Clement Simba Overseer.jpg';

const slides = [
  {
    bgGradient: "linear-gradient(to right, #000045 0%, #000066 32%, #f8fafc 58%, #ffffff 75%, #ffffff 100%)",
    accentColor: "#b45309",
    icon: "fas fa-church",
    eyebrow: "Welcome to PAG Ngungo Assembly",
    title: "Mbeere District\nHeadquarters Church",
    text: "Advancing God's Kingdom through the full gospel of Jesus Christ — Spirit-filled, Bible-based, community-rooted under apostolic episcopal oversight.",
    btn1: { text: "About Our Church", link: "/about" },
    btn2: { text: "District Assemblies", link: "/assemblies" },
  },
  {
    bgGradient: "linear-gradient(to right, #000045 0%, #000066 32%, #f0f9ff 58%, #ffffff 75%, #ffffff 100%)",
    accentColor: "#0284c7",
    icon: "fas fa-bible",
    eyebrow: "Order of Services",
    title: "Sunday Worship\nCelebration",
    text: "Sunday School & English Service: 8:00 AM – 10:00 AM  |  Main Service: 10:30 AM – 1:30 PM",
    btn1: { text: "Our Departments", link: "/departments" },
    btn2: { text: "Order of Services", link: "/programs" },
  },
  {
    bgGradient: "linear-gradient(to right, #000045 0%, #000066 32%, #fefce8 58%, #ffffff 75%, #ffffff 100%)",
    accentColor: "#b45309",
    icon: "fas fa-sitemap",
    eyebrow: "Regional Fellowship",
    title: "Mbeere District\nCircuit",
    text: "Serving as Headquarter for 8 Mbeere Assemblies and Kyuso Circuit, Kitui County, under Bishop Rev. Clement Simba.",
    btn1: { text: "View Assemblies", link: "/assemblies" },
    btn2: { text: "Leadership Team", link: "/leadership" },
  },
  {
    bgGradient: "linear-gradient(to right, #000045 0%, #000066 32%, #fdf2f8 58%, #ffffff 75%, #ffffff 100%)",
    accentColor: "#db2777",
    icon: "fas fa-music",
    eyebrow: "Sanctuary Ministries",
    title: "Praise, Choir &\nInstrumentals",
    text: "Experiencing the Holy Spirit through vibrant worship, choir anthems, and skilled instrumentalist band ministry.",
    btn1: { text: "Our Ministries", link: "/ministries" },
    btn2: { text: "Weekly Timetable", link: "/programs" },
  },
  {
    bgGradient: "linear-gradient(to right, #000045 0%, #000066 32%, #ecfdf5 58%, #ffffff 75%, #ffffff 100%)",
    accentColor: "#059669",
    icon: "fas fa-hands-holding-child",
    eyebrow: "Spiritual Family",
    title: "Four Pillar\nDepartments",
    text: "Women, Men, Youth, and Sunday School — nurturing every believer from childhood to maturity in Christ.",
    btn1: { text: "Explore Departments", link: "/departments" },
    btn2: { text: "Join A Department", link: "/contact" },
  },
  {
    bgGradient: "linear-gradient(to right, #000045 0%, #000066 32%, #fffbeb 58%, #ffffff 75%, #ffffff 100%)",
    accentColor: "#d97706",
    icon: "fas fa-fire",
    eyebrow: "Every Saturday 4:00 PM – 6:00 PM",
    title: "Youth Fellowship\nExplosion",
    text: "Dynamic youth gathering featuring worship, talent development, biblical mentorship, and life skills.",
    btn1: { text: "Youth Department", link: "/departments#youth" },
    btn2: { text: "Connect With Us", link: "/contact" },
  },
  {
    bgGradient: "linear-gradient(to right, #000045 0%, #000066 32%, #f0fdf4 58%, #ffffff 75%, #ffffff 100%)",
    accentColor: "#0284c7",
    icon: "fas fa-cross",
    eyebrow: "Every Friday 7:00 PM – 9:00 PM",
    title: "Friday Revival\nFellowship",
    text: "Fervent prayer, intercession, deliverance, and divine breakthroughs in the manifest presence of God.",
    btn1: { text: "Weekly Timetable", link: "/programs" },
    btn2: { text: "Get in Touch", link: "/contact" },
  },
];

const AUTO_INTERVAL = 8000;

const CreativeSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoRef = useRef(null);

  const startAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, AUTO_INTERVAL);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(autoRef.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1400);
    startAuto();
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1400);
    startAuto();
  };

  const goToSlide = (i) => {
    if (isTransitioning || i === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(i);
    setTimeout(() => setIsTransitioning(false), 1400);
    startAuto();
  };

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove  = (e) => { touchEndX.current  = e.touches[0].clientX; };
  const handleTouchEnd   = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 60) nextSlide();
    if (diff < -60) prevSlide();
  };

  return (
    <section
      className="creative-hero"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="PAG Ngungo Assembly Hero Slideshow"
    >
      {/* Background gradients with Ken Burns and watermark motifs */}
      {slides.map((slide, i) => (
        <div key={i} className={`hero-bg-slide ${i === currentSlide ? 'active' : ''}`}>
          <div 
            className="hero-bg-img" 
            style={{ 
              background: slide.bgGradient,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div className="hero-watermark-icon" style={{ color: slide.accentColor }}>
              <i className={slide.icon}></i>
            </div>
          </div>
          <div className="hero-overlay" />
        </div>
      ))}

      {/* LEFT: Bishop Clement Simba (Full-Bleed Space Filling, Untouched by Fade) */}
      <div className="hero-bishop-full-presence">
        <img 
          src={bishopPhoto} 
          alt="Bishop Rev. Clement Simba - Presiding Bishop & District Overseer"
          className="hero-bishop-full-img"
        />
        <div className="hero-bishop-edge-fade"></div>

        {/* Floating Episcopal Badge Pill on Left */}
        <div className="hero-bishop-badge-pill">
          <div className="hero-bishop-badge-icon">
            <i className="fas fa-crown"></i>
          </div>
          <div className="hero-bishop-badge-text">
            <strong>Bishop Rev. Clement Simba</strong>
            <span>Presiding Bishop &amp; District Overseer</span>
          </div>
        </div>
      </div>

      {/* Seamless Transition to White on Right (Doesn't touch Bishop on Left) */}
      <div className="hero-white-fade-overlay" />

      {/* FAR RIGHT: Dynamic Wording on Crisp White Background */}
      <div className="hero-wording-showcase">
        {slides.map((slide, i) => {
          const isActive = i === currentSlide;
          return (
            <div key={i} className={`hero-text-card ${isActive ? 'active' : ''}`}>
              {i === 0 && (
                <div className="hero-logo-badge">
                  <img 
                    src={logoImg} 
                    alt="PAG Ngungo Assembly" 
                    className="hero-logo-badge-img"
                  />
                  <span className="hero-logo-badge-label">Mbeere District Headquarters</span>
                </div>
              )}

              <div className="hero-eyebrow">
                <span className="hero-eyebrow-line" style={{ background: slide.accentColor }}></span>
                <span className="hero-eyebrow-text" style={{ color: slide.accentColor }}>{slide.eyebrow}</span>
              </div>

              <h1 className="hero-title">{slide.title}</h1>
              
              <p className="hero-desc">{slide.text}</p>
              
              <div className="hero-cta-group">
                <Link to={slide.btn1.link} className="hero-btn-primary">
                  {slide.btn1.text} <i className="fas fa-arrow-right" style={{ fontSize: '0.72rem', marginLeft: '6px' }}></i>
                </Link>
                <Link to={slide.btn2.link} className="hero-btn-outline">
                  {slide.btn2.text}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom navigation bar */}
      <div className="hero-nav-bar">
        <div className="hero-dots">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`hero-dot ${i === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            >
              <div className="hero-dot-fill" />
            </div>
          ))}
        </div>

        <div className="hero-slide-counter">
          <strong>{String(currentSlide + 1).padStart(2, '0')}</strong>
          {' / '}
          {String(slides.length).padStart(2, '0')}
        </div>

        <div className="hero-arrows">
          <button className="hero-arrow-btn" onClick={prevSlide} aria-label="Previous slide">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="hero-arrow-btn" onClick={nextSlide} aria-label="Next slide">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreativeSlider;
