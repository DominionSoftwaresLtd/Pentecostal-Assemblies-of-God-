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

      {/* LEFT: Bishop Clement Simba (Full, Clear, No Side Fade) */}
      <div className="hero-bishop-full-presence">
        <img 
          src={bishopPhoto} 
          alt="Bishop Rev. Clement Simba - Presiding Bishop & District Overseer"
          className="hero-bishop-full-img"
        />
      </div>

      {/* FAR RIGHT: Permanent Flagship Headquarters Identity */}
      <div className="hero-wording-showcase">
        <div className="hero-text-card active">
          <h1 className="hero-title">
            <span className="hero-title-main">PENTECOSTAL ASSEMBLIES OF GOD</span>
            <span className="hero-title-sub">Ngungo Assembly — Mbeere Headquarters</span>
          </h1>
          
          <p className="hero-desc">
            The apostolic headquarters church presiding over 8 Mbeere District assemblies and Kyuso Circuit, Kitui County. Anchored in the Holy Spirit, sound biblical doctrine, transformative worship, and community discipleship under the leadership of Bishop Rev. Clement Simba.
          </p>

          <div className="hero-cta-wrapper">
            <div className="hero-cta-track">
              {[
                { id: 'about-1', label: 'About Our Church', link: '/about' },
                { id: 'assemblies-1', label: 'District Assemblies', link: '/assemblies' },
                { id: 'departments-1', label: 'Church Departments', link: '/departments' },
                { id: 'about-2', label: 'About Our Church', link: '/about' },
                { id: 'assemblies-2', label: 'District Assemblies', link: '/assemblies' },
                { id: 'departments-2', label: 'Church Departments', link: '/departments' },
              ].map(btn => (
                <div key={btn.id} className="hero-cta-item">
                  <Link to={btn.link} className="hero-carousel-btn">
                    {btn.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeSlider;
