import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Ministry photos
import ev1 from '../assets/Ruanyage3.jpg';
import ev2 from '../assets/Ruanyage6.jpg';
import ev3 from '../assets/Ruanyage9.jpg';
import pr1 from '../assets/Emali mission5.jpg';
import pr2 from '../assets/Emali mission8.jpg';
import co1 from '../assets/Tala mission5.jpg';
import co2 from '../assets/Tala mission8.jpg';
import ks1 from '../assets/KitheoSiniourSchool1.jpg';
import ks2 from '../assets/KitheoSiniourSchool3.jpg';
import gb1 from '../assets/Rwanyange secondary2.jpg';
import gb2 from '../assets/Rwanyange secondary7.jpg';

const scrollToHash = (hash) => {
  if (!hash) return;
  const el = document.querySelector(hash);
  if (!el) return;
  const headerHeight = document.querySelector('.site-header-wrapper')?.offsetHeight || 80;
  const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
  window.scrollTo({ top, behavior: 'smooth' });
};

const Ministries = () => {
  const { hash } = useLocation();
  const [activeSection, setActiveSection] = useState('women');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (!hash) return;
    const timer = setTimeout(() => {
      scrollToHash(hash);
      setActiveSection(hash.replace('#', ''));
    }, 120);
    return () => clearTimeout(timer);
  }, [hash]);

  // ScrollSpy listener to highlight active navigation pill
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['women', 'men', 'youth', 'sundayschool', 'worship', 'instrumentalists', 'choir', 'ushering'];
      const scrollPosition = window.scrollY + 220;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openLightbox = (photos, index = 0, title = '') => {
    setLightbox({ photos, index, title });
  };

  const closeLightbox = () => setLightbox(null);

  const prevPhoto = () => {
    if (!lightbox) return;
    const prev = (lightbox.index - 1 + lightbox.photos.length) % lightbox.photos.length;
    setLightbox({ ...lightbox, index: prev });
  };

  const nextPhoto = () => {
    if (!lightbox) return;
    const next = (lightbox.index + 1) % lightbox.photos.length;
    setLightbox({ ...lightbox, index: next });
  };

  return (
    <main className="ministries-page">

      {/* Page Banner */}
      <section className="page-banner" style={{ backgroundImage: `url(${ev1})` }}>
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">Serving Christ Together</span>
            <h1>Departments &amp; Ministries</h1>
            <p>Pentecostal Assemblies of God - Ngungo Assembly &bull; Headquarter Church for Mbeere District</p>
          </div>
        </div>
      </section>

      {/* Sticky Dept Nav */}
      <div className="dept-nav">
        <div className="container">
          <div className="dept-nav__inner">
            {[
              { id: 'women',           hash: '#women',           label: 'Women Dept' },
              { id: 'men',             hash: '#men',             label: 'Men Department' },
              { id: 'youth',           hash: '#youth',           label: 'Youth Department' },
              { id: 'sundayschool',    hash: '#sundayschool',    label: 'Sunday School' },
              { id: 'worship',         hash: '#worship',         label: 'Praise & Worship' },
              { id: 'instrumentalists',hash: '#instrumentalists',label: 'Instrumentalists' },
              { id: 'choir',           hash: '#choir',           label: 'Choir' },
              { id: 'ushering',        hash: '#ushering',        label: 'Ushering' },
            ].map(({ id, hash: h, label }) => (
              <button
                key={h}
                className={`dept-nav__pill ${activeSection === id ? 'dept-nav__pill--active' : ''}`}
                onClick={() => {
                  setActiveSection(id);
                  scrollToHash(h);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Order of Services Quick Glance */}
      <section style={{ background: '#fdf2e9', borderBottom: '1px solid #fed7aa', padding: '24px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ color: '#E87D1E', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <i className="fas fa-calendar-check"></i> Order of Services at Ngungo Sanctuary
              </span>
              <div style={{ color: '#1e293b', fontWeight: 700, fontSize: '1rem', marginTop: '2px' }}>
                Sunday: English (8:00 AM – 10:00 AM) &bull; Main Service (10:30 AM – 1:30 PM) &bull; Sunday School (8:00 AM – 10:00 AM)
              </div>
              <div style={{ color: '#64748b', fontSize: '0.88rem' }}>
                Friday Fellowship (7:00 PM – 9:00 PM) &bull; Youth Fellowship (Saturday 4:00 PM – 6:00 PM)
              </div>
            </div>
            <Link to="/about#order-of-services" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.88rem' }}>
              Full Timetable &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 01 — Women Department */}
      <section id="women" className="dept-section section">
        <div className="container">
          <div className="dept-unified-grid">
            <div className="dept-media-sleek" onClick={() => openLightbox([co1, co2], 0, 'Women Department')} title="Click to view gallery">
              <img src={co1} alt="Women Department" />
              <div className="dept-media-badge"><i className="fas fa-expand"></i> View Gallery</div>
            </div>
            
            <div className="dept-content-sleek">
              <span style={{ color: '#E87D1E', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>Department #1</span>
              <h2 className="section-title">Women Department</h2>
              <p className="lead">
                The Women Department unites mothers, sisters, and young women in faith, fervent intercessory prayer, and compassionate support. We foster godly homes and mentor women to thrive spiritually, socially, and economically.
              </p>
              
              <blockquote className="sleek-quote">
                "Charm is deceptive, and beauty is fleeting; but a woman who fears the LORD is to be praised."
                <div style={{ fontSize: '0.85rem', color: '#E87D1E', fontWeight: 700, marginTop: '6px' }}>— Proverbs 31:30 (NIV)</div>
              </blockquote>

              <div className="sleek-prayer-box">
                <h5><i className="fas fa-heart"></i> Key Pillars &amp; Fellowships</h5>
                <p>Monthly fellowship meetings, home visitation, hospital and welfare ministry, prayer intercession, and mentorship for young wives and daughters.</p>
              </div>
              
              <div className="dept-actions">
                <Link to="/contact?dept=women" className="btn btn-primary">Join Women Department</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Men Department */}
      <section id="men" className="dept-section dept-section--alt section">
        <div className="container">
          <div className="dept-unified-grid dept-unified-grid--reverse">
            <div className="dept-content-sleek">
              <span style={{ color: '#2563eb', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>Department #2</span>
              <h2 className="section-title">Men Department</h2>
              <p className="lead">
                The Men Department equips men to be priestly leaders in their families, faithful stewards in the church, and upright role models in society. Grounded in the Word of God, our men build one another up in accountability and prayer.
              </p>
              
              <blockquote className="sleek-quote">
                "Be on your guard; stand firm in the faith; be courageous; be strong. Do everything in love."
                <div style={{ fontSize: '0.85rem', color: '#E87D1E', fontWeight: 700, marginTop: '6px' }}>— 1 Corinthians 16:13-14 (NIV)</div>
              </blockquote>

              <div className="sleek-prayer-box">
                <h5><i className="fas fa-shield-alt"></i> Men's Fellowship &amp; Projects</h5>
                <p>Regular men breakfasts, discipleship circles, church development stewardship, and fatherhood mentorship.</p>
              </div>
              
              <div className="dept-actions">
                <Link to="/contact?dept=men" className="btn btn-primary">Join Men Fellowship</Link>
              </div>
            </div>

            <div className="dept-media-sleek" onClick={() => openLightbox([pr1, pr2], 0, 'Men Department')} title="Click to view gallery">
              <img src={pr1} alt="Men Department" />
              <div className="dept-media-badge"><i className="fas fa-expand"></i> View Gallery</div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Youth Department */}
      <section id="youth" className="dept-section section">
        <div className="container">
          <div className="dept-unified-grid">
            <div className="dept-media-sleek" onClick={() => openLightbox([ks1, ks2], 0, 'Youth Department')} title="Click to view gallery">
              <img src={ks1} alt="Youth Department" />
              <div className="dept-media-badge"><i className="fas fa-expand"></i> View Gallery</div>
            </div>
            
            <div className="dept-content-sleek">
              <span style={{ color: '#ec4899', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>Department #3</span>
              <h2 className="section-title">Youth Department</h2>
              <p className="lead">
                A vibrant, Spirit-filled generation burning for Christ! Our Youth Department empowers teens and young adults to discover their God-given gifts, navigate modern life with biblical convictions, and excel in academics and career.
              </p>
              
              <blockquote className="sleek-quote">
                "Don't let anyone look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity."
                <div style={{ fontSize: '0.85rem', color: '#E87D1E', fontWeight: 700, marginTop: '6px' }}>— 1 Timothy 4:12 (NIV)</div>
              </blockquote>

              <div className="sleek-prayer-box">
                <h5><i className="fas fa-clock"></i> Weekly Youth Fellowship</h5>
                <p><strong>Every Saturday from 4:00 PM to 6:00 PM</strong> at Ngungo Sanctuary. Contemporary worship, discussions on topical life issues, prayer, and sports.</p>
              </div>
              
              <div className="dept-actions">
                <Link to="/contact?dept=youth" className="btn btn-primary">Join Youth Fellowship</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Sunday School Department */}
      <section id="sundayschool" className="dept-section dept-section--alt section">
        <div className="container">
          <div className="dept-unified-grid dept-unified-grid--reverse">
            <div className="dept-content-sleek">
              <span style={{ color: '#10B981', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>Department #4</span>
              <h2 className="section-title">Sunday School Department</h2>
              <p className="lead">
                Laying strong spiritual foundations for our children! With loving teachers, age-appropriate bible lessons, action songs, and scripture memorization, we nurture the young into lifelong disciples of Jesus Christ.
              </p>
              
              <blockquote className="sleek-quote">
                "Start children off on the way they should go, and even when they are old they will not turn from it."
                <div style={{ fontSize: '0.85rem', color: '#E87D1E', fontWeight: 700, marginTop: '6px' }}>— Proverbs 22:6 (NIV)</div>
              </blockquote>

              <div className="sleek-prayer-box">
                <h5><i className="fas fa-sun"></i> Service Times</h5>
                <p><strong>Every Sunday from 8:00 AM to 10:00 AM</strong> concurrently with the English service. Safe, nurturing, and spiritually engaging classrooms.</p>
              </div>
              
              <div className="dept-actions">
                <Link to="/contact?dept=sundayschool" className="btn btn-primary">Volunteer in Sunday School</Link>
              </div>
            </div>

            <div className="dept-media-sleek" onClick={() => openLightbox([gb1, gb2], 0, 'Sunday School Department')} title="Click to view gallery">
              <img src={gb1} alt="Sunday School" />
              <div className="dept-media-badge"><i className="fas fa-expand"></i> View Gallery</div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Praise and Worship */}
      <section id="worship" className="dept-section section">
        <div className="container">
          <div className="dept-unified-grid">
            <div className="dept-media-sleek" onClick={() => openLightbox([ev2], 0, 'Praise and Worship')} title="Click to view gallery">
              <img src={ev2} alt="Praise and Worship" />
              <div className="dept-media-badge"><i className="fas fa-expand"></i> View Image</div>
            </div>
            
            <div className="dept-content-sleek">
              <span style={{ color: '#d97706', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>Ministry #1</span>
              <h2 className="section-title">Praise and Worship</h2>
              <p className="lead">
                Uplifting hearts into the holy presence of God! Our Praise and Worship team ministers in both English and Main Sunday services, leading the congregation in deep adoration, thanksgiving, and prophetic song.
              </p>
              
              <blockquote className="sleek-quote">
                "God is spirit, and his worshipers must worship in the Spirit and in truth."
                <div style={{ fontSize: '0.85rem', color: '#E87D1E', fontWeight: 700, marginTop: '6px' }}>— John 4:24 (NIV)</div>
              </blockquote>

              <div className="sleek-prayer-box">
                <h5><i className="fas fa-music"></i> Worship Practices &amp; Rehearsals</h5>
                <p>Weekly rehearsals, vocal training, spiritual fasting, and team prayer to prepare vessels of honor for Sunday and district gatherings.</p>
              </div>
              
              <div className="dept-actions">
                <Link to="/contact?dept=worship" className="btn btn-primary">Join Worship Team</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — Instrumentalist Ministry */}
      <section id="instrumentalists" className="dept-section dept-section--alt section">
        <div className="container">
          <div className="dept-unified-grid dept-unified-grid--reverse">
            <div className="dept-content-sleek">
              <span style={{ color: '#0284c7', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>Ministry #2</span>
              <h2 className="section-title">Instrumentalist Ministry</h2>
              <p className="lead">
                Praising God with skilled hands and anointed sounds! Our dedicated instrumentalists operate keyboards, bass guitars, acoustic guitars, and drums to provide a powerful musical foundation for congregational worship.
              </p>
              
              <blockquote className="sleek-quote">
                "Praise him with the sounding of the trumpet, praise him with the harp and lyre, praise him with timbrel and dancing, praise him with the strings and pipe."
                <div style={{ fontSize: '0.85rem', color: '#E87D1E', fontWeight: 700, marginTop: '6px' }}>— Psalm 150:3-4 (NIV)</div>
              </blockquote>

              <div className="sleek-prayer-box">
                <h5><i className="fas fa-guitar"></i> Sound &amp; Instrument Mastery</h5>
                <p>Training upcoming musicians, sound engineering, instrument care, and accompanying church services and district revivals.</p>
              </div>
              
              <div className="dept-actions">
                <Link to="/contact?dept=instrumentalists" className="btn btn-primary">Join Instrumentalists</Link>
              </div>
            </div>

            <div className="dept-media-sleek" onClick={() => openLightbox([ev3], 0, 'Instrumentalists')} title="Click to view gallery">
              <img src={ev3} alt="Instrumentalists" />
              <div className="dept-media-badge"><i className="fas fa-expand"></i> View Image</div>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — Church Choir */}
      <section id="choir" className="dept-section section">
        <div className="container">
          <div className="dept-unified-grid">
            <div className="dept-media-sleek" onClick={() => openLightbox([co2], 0, 'Church Choir')} title="Click to view gallery">
              <img src={co2} alt="Church Choir" />
              <div className="dept-media-badge"><i className="fas fa-expand"></i> View Image</div>
            </div>
            
            <div className="dept-content-sleek">
              <span style={{ color: '#7c3aed', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>Ministry #3</span>
              <h2 className="section-title">Church Choir</h2>
              <p className="lead">
                Anointed choral harmonies conveying the message of salvation, hope, and victory! The choir prepares four-part anthems, traditional hymns, and contemporary choral arrangements for Sunday services and special events.
              </p>
              
              <blockquote className="sleek-quote">
                "Let the message of Christ dwell among you richly as you teach and admonish one another with all wisdom through psalms, hymns, and songs from the Spirit, singing to God with gratitude in your hearts."
                <div style={{ fontSize: '0.85rem', color: '#E87D1E', fontWeight: 700, marginTop: '6px' }}>— Colossians 3:16 (NIV)</div>
              </blockquote>

              <div className="sleek-prayer-box">
                <h5><i className="fas fa-microphone-alt"></i> Choral Ministry</h5>
                <p>Open to singers passionate about choral harmony, vocal discipline, and ministering through inspiring musical presentations.</p>
              </div>
              
              <div className="dept-actions">
                <Link to="/contact?dept=choir" className="btn btn-primary">Join the Choir</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 08 — Ushering Ministry */}
      <section id="ushering" className="dept-section dept-section--alt section">
        <div className="container">
          <div className="dept-unified-grid dept-unified-grid--reverse">
            <div className="dept-content-sleek">
              <span style={{ color: '#059669', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>Ministry #4</span>
              <h2 className="section-title">Ushering Ministry</h2>
              <p className="lead">
                The frontline of warmth, hospitality, and order in God's sanctuary! The Ushering Ministry welcomes worshippers with Christian love, coordinates seating, assists during tithe and offering collections, and ensures smooth services.
              </p>
              
              <blockquote className="sleek-quote">
                "Better is one day in your courts than a thousand elsewhere; I would rather be a doorkeeper in the house of my God than dwell in the tents of the wicked."
                <div style={{ fontSize: '0.85rem', color: '#E87D1E', fontWeight: 700, marginTop: '6px' }}>— Psalm 84:10 (NIV)</div>
              </blockquote>

              <div className="sleek-prayer-box">
                <h5><i className="fas fa-hand-holding-heart"></i> Service with Excellence</h5>
                <p>Ensuring visitors feel right at home, maintaining sanctuary reverence, assisting the pastoral council, and tending to congregational comfort.</p>
              </div>
              
              <div className="dept-actions">
                <Link to="/contact?dept=ushering" className="btn btn-primary">Serve as an Usher</Link>
              </div>
            </div>

            <div className="dept-media-sleek" onClick={() => openLightbox([pr2], 0, 'Ushering Ministry')} title="Click to view gallery">
              <img src={pr2} alt="Ushering Ministry" />
              <div className="dept-media-badge"><i className="fas fa-expand"></i> View Image</div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Lightbox Modal */}
      {lightbox && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox__close" onClick={closeLightbox} aria-label="Close photo preview">
            <i className="fas fa-times"></i>
          </button>
          <button
            className="lightbox__prev"
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            aria-label="Previous photo"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="lightbox__img-wrap" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.photos[lightbox.index]} alt={lightbox.title} />
            {lightbox.title && (
              <div className="lightbox__title">{lightbox.title}</div>
            )}
          </div>
          <button
            className="lightbox__next"
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            aria-label="Next photo"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          <div className="lightbox__counter">
            {lightbox.index + 1} / {lightbox.photos.length}
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Find Your Place to Serve</h2>
            <p>Every member has a gift from the Holy Spirit. Join a department or ministry at Ngungo Assembly and bless the body of Christ.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">Volunteer Today</Link>
              <Link to="/donate" className="btn btn-secondary"><i className="fas fa-hand-holding-dollar"></i> Support Church (Paybill: 4136387)</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Ministries;