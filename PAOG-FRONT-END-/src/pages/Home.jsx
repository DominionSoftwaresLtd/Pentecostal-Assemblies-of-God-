import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CreativeSlider from '../components/CreativeSlider';
import logoImg from '../assets/logo ngungo.png';
import bishopPhoto from '../assets/Bishop Clement Simba Overseer.jpg';

const Home = () => {
    // Testimonials Slider State
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [newsItems, setNewsItems] = useState([]);

    const testimonials = [
        { quote: "Worshipping at Pentecostal Assemblies of God - Ngungo Assembly has brought tremendous spiritual growth and unity to our family. The preaching is biblical, anointed, and life-changing.", author: "Elder Patrick Kinyua", location: "Ngungo Assembly", initials: "PK", color: "#e67e22" },
        { quote: "The Youth Department every Saturday from 4:00 PM to 6:00 PM has provided a space where we discover our God-given musical talents, study Scripture, and fellowship in Christ.", author: "Mary Mwende", location: "Mbeere District", initials: "MM", color: "#2980b9" },
        { quote: "As the headquarter church for Mbeere District, Ngungo Assembly brings all regional assemblies together in unity, revival, and spiritual leadership under Bishop Clement Simba.", author: "Deacon Samuel Mutisya", location: "Kyuso Circuit", initials: "SM", color: "#27ae60" }
    ];

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch('/api/news');
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        setNewsItems(data);
                    }
                }
            } catch { }
        };
        fetchNews();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    // Stats Counter logic (simplified for React)
    const [stats, setStats] = useState({ souls: 0, missions: 0, counties: 0, schools: 0 });
    const statsRef = useRef(null);
    const [statsVisible, setStatsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setStatsVisible(true);
                observer.disconnect();
            }
        });
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (statsVisible) {
            // Animate stats
            const duration = 2000;
            const steps = 50;
            const stepTime = duration / steps;

            const targets = { souls: 445, missions: 5, counties: 7, schools: 8 };
            let currentStep = 0;

            const timer = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;

                setStats({
                    souls: Math.floor(targets.souls * progress),
                    missions: Math.floor(targets.missions * progress),
                    counties: Math.floor(targets.counties * progress),
                    schools: Math.floor(targets.schools * progress)
                });

                if (currentStep >= steps) clearInterval(timer);
            }, stepTime);
        }
    }, [statsVisible]);


    return (
        <main>
            <CreativeSlider />

            {/* Impact Ticker */}
            <div className="impact-ticker">
                <div className="ticker-wrap">
                    <div className="ticker-label">PAG NGUNGO</div>
                    <div className="ticker-track">
                        {[0, 1, 2].map(i => (
                            <React.Fragment key={i}>
                                <div className="ticker-item">MBEERE DISTRICT HEADQUARTERS</div>
                                <div className="ticker-item">SUNDAY SCHOOL &amp; ENGLISH: 8:00 AM – 10:00 AM</div>
                                <div className="ticker-item">MAIN SERVICE: 10:30 AM – 1:30 PM</div>
                                <div className="ticker-item">FRIDAY FELLOWSHIP: 7:00 PM – 9:00 PM</div>
                                <div className="ticker-item">YOUTH FELLOWSHIP: SATURDAY 4:00 PM – 6:00 PM</div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* Ministry Structure - Tree Diagram */}
            <section className="ministry-structure-tree">
                <div className="container org-tree-container">
                    <div className="org-tree">
                        <ul>
                            <li>
                                <Link to="/assemblies" className="org-node org-node-root">
                                    PAG Ngungo Assembly — Mbeere District HQ
                                </Link>
                                <ul>
                                    <li><Link to="/assemblies" className="org-node">Kiamachang'a</Link></li>
                                    <li><Link to="/assemblies" className="org-node">Rwika</Link></li>
                                    <li><Link to="/assemblies" className="org-node">Kathera</Link></li>
                                    <li><Link to="/assemblies" className="org-node">Ngangari</Link></li>
                                    <li><Link to="/assemblies" className="org-node">Mugaari</Link></li>
                                    <li><Link to="/assemblies" className="org-node">Muumoni</Link></li>
                                    <li><Link to="/assemblies" className="org-node">Gikuru</Link></li>
                                    <li><Link to="/assemblies" className="org-node">Marisi</Link></li>
                                    <li><Link to="/assemblies" className="org-node">Matooni</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            
            {/* Natural, Elegant Worship Schedule */}
            <section className="worship-schedule-section">
                <div className="container">
                    <div className="worship-schedule-header">
                        <span className="worship-schedule-eyebrow">Service Times</span>
                        <h2 className="worship-schedule-title">Weekly Worship Schedule</h2>
                    </div>

                    <div className="worship-schedule-grid">
                        <div className="worship-card">
                            <span className="worship-card-day">Sunday</span>
                            <h3 className="worship-card-name">Sunday School</h3>
                            <div className="worship-card-time">
                                <i className="far fa-clock"></i> 8:00 AM – 10:00 AM
                            </div>
                            <span className="worship-card-pill">All Ages</span>
                        </div>

                        <div className="worship-card">
                            <span className="worship-card-day">Sunday</span>
                            <h3 className="worship-card-name">English Service</h3>
                            <div className="worship-card-time">
                                <i className="far fa-clock"></i> 8:00 AM – 10:00 AM
                            </div>
                            <span className="worship-card-pill">Morning Worship</span>
                        </div>

                        <div className="worship-card worship-card-featured">
                            <span className="worship-card-day">Sunday • Main</span>
                            <h3 className="worship-card-name">Main Service</h3>
                            <div className="worship-card-time">
                                <i className="far fa-clock"></i> 10:30 AM – 1:30 PM
                            </div>
                            <span className="worship-card-pill">Bishop Clement Simba</span>
                        </div>

                        <div className="worship-card">
                            <span className="worship-card-day">Friday</span>
                            <h3 className="worship-card-name">Friday Fellowship</h3>
                            <div className="worship-card-time">
                                <i className="far fa-clock"></i> 7:00 PM – 9:00 PM
                            </div>
                            <span className="worship-card-pill">Prayer &amp; Revival</span>
                        </div>

                        <div className="worship-card">
                            <span className="worship-card-day">Saturday</span>
                            <h3 className="worship-card-name">Youth Fellowship</h3>
                            <div className="worship-card-time">
                                <i className="far fa-clock"></i> 4:00 PM – 6:00 PM
                            </div>
                            <span className="worship-card-pill">Teens &amp; Young Adults</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section — Redesigned */}
            <section className="about-section-v2">
                <div className="container">
                    <div className="about-v2-grid">
                        <div className="about-v2-text-side">
                            <div className="about-v2-eyebrow"><span>Who We Are</span></div>
                            <h2 className="about-v2-heading">
                                Pentecostal Assemblies of God —<br />
                                <em>Ngungo Assembly</em>
                            </h2>
                            <p className="about-v2-desc">
                                Pentecostal Assemblies of God - Ngungo Assembly proudly serves as the Headquarter Church for Mbeere District.
                                We are a Christ-centered community grounded in sound biblical doctrine, Holy Spirit empowerment, and passionate evangelism.
                            </p>
                            <p className="about-v2-desc">
                                As the district headquarter church, Ngungo coordinates, nurtures, and provides episcopal guidance to assemblies across
                                Mbeere District (including Kiamachang'a, Rwika, Kathera, Ngangari, Mugaari, Muumoni, and Gikuru) as well as our circuit assemblies
                                in Kyuso, Kitui County (Marisi, Matooni, and Kyuso Assembly).
                            </p>
                            <div className="about-v2-pills">
                                <div className="about-v2-pill"><i className="fas fa-bible"></i> Bible-Based Preaching</div>
                                <div className="about-v2-pill"><i className="fas fa-fire"></i> Spirit-Filled Worship</div>
                                <div className="about-v2-pill"><i className="fas fa-users"></i> District Fellowship</div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
                                <Link to="/about" className="btn btn-primary">Read More About Us</Link>
                                <Link to="/assemblies" className="btn btn-secondary">Explore District Assemblies</Link>
                            </div>
                        </div>
                        <div className="about-v2-photo-side">
                            <div style={{
                                background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 60%, #090d16 100%)',
                                borderRadius: '18px',
                                padding: '24px 22px',
                                color: '#ffffff',
                                border: '2px solid rgba(232, 125, 30, 0.4)',
                                boxShadow: '0 16px 36px rgba(0,0,0,0.18)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    right: '-20px',
                                    width: '120px',
                                    height: '120px',
                                    background: 'radial-gradient(circle, rgba(232,125,30,0.25) 0%, transparent 70%)',
                                    borderRadius: '50%'
                                }}></div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                                    <div style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '14px',
                                        background: 'rgba(232,125,30,0.15)',
                                        border: '1.5px solid #E87D1E',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#E87D1E',
                                        fontSize: '1.6rem'
                                    }}>
                                        <i className="fas fa-church"></i>
                                    </div>
                                    <img
                                        src={logoImg}
                                        alt="PAG Ngungo Assembly Logo"
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            objectFit: 'contain',
                                            borderRadius: '50%',
                                            background: '#ffffff',
                                            padding: '4px',
                                            boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                                            border: '2px solid #E87D1E',
                                            flexShrink: 0
                                        }}
                                    />
                                    <div>
                                        <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#E87D1E', fontWeight: 800 }}>Headquarter Church</span>
                                        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>Mbeere District HQ</h3>
                                    </div>
                                </div>

                                <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: '1.65', marginBottom: '16px' }}>
                                    Pentecostal Assemblies of God - Ngungo Assembly serves as the episcopal and administrative center for 8 Mbeere assemblies and the Kyuso circuit in Kitui County.
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#E87D1E' }}>8</div>
                                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Mbeere Assemblies</div>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3b82f6' }}>3</div>
                                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Kyuso Circuit Arms</div>
                                    </div>
                                </div>

                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.86rem', color: '#f1f5f9' }}>
                                    <span><i className="fas fa-crown" style={{ color: '#E87D1E', marginRight: '6px' }}></i> Presiding Bishop</span>
                                    <strong style={{ color: '#ffffff' }}>Rev. Clement Simba</strong>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <img
                                            src={bishopPhoto}
                                            alt="Bishop Rev. Clement Simba"
                                            style={{
                                                width: '46px',
                                                height: '46px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                objectPosition: 'top',
                                                border: '2px solid #E87D1E',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                                flexShrink: 0
                                            }}
                                        />
                                        <div>
                                            <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#E87D1E', fontWeight: 800 }}>Presiding Bishop &amp; Overseer</div>
                                            <strong style={{ color: '#ffffff', fontSize: '0.94rem' }}>Rev. Clement Simba</strong>
                                        </div>
                                    </div>
                                    <Link to="/leadership" style={{ color: '#E87D1E', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                        Profile &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision / Mission — Redesigned */}
            <section className="vision-mission-v2">
                <div className="container">
                    <div className="vm-v2-header">
                        <p className="vm-v2-verse">"Go into all the world and preach the gospel to all creation." — Mark 16:15 (NIV)</p>
                        <h2 className="vm-v2-title">Our <span>Calling</span> &amp; Governance</h2>
                    </div>
                    <div className="vm-v2-list">
                        <div className="vm-v2-list-item">
                            <div className="vm-v2-list-icon"><i className="fas fa-eye"></i></div>
                            <div className="vm-v2-list-content">
                                <h3>Our Vision</h3>
                                <p>To be a vibrant, Spirit-filled church glorifying God, building mature disciples, and establishing thriving assemblies that impact communities throughout Mbeere District and beyond.</p>
                            </div>
                        </div>
                        <div className="vm-v2-list-item">
                            <div className="vm-v2-list-icon"><i className="fas fa-bullseye"></i></div>
                            <div className="vm-v2-list-content">
                                <h3>Our Mission</h3>
                                <p>To advance the Kingdom of God through passionate evangelism, holistic discipleship, church planting, compassionate service, and exemplary pastoral leadership.</p>
                            </div>
                        </div>
                        <div className="vm-v2-list-item">
                            <div className="vm-v2-list-icon"><i className="fas fa-heart"></i></div>
                            <div className="vm-v2-list-content">
                                <h3>District Headquarter Role</h3>
                                <p>Providing administrative leadership, spiritual covering, and mutual fellowship under Bishop Rev. Clement Simba and the District Executive for all 8 Mbeere assemblies and Kyuso circuit.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Departments & Ministries Showcase — Separated & Distinguished */}
            <section className="section" style={{ backgroundColor: '#f4f6fb', padding: '70px 0' }}>
                <div className="container">
                    <div className="section-header" style={{ textAlign: 'center', marginBottom: '46px' }}>
                        <span style={{
                            display: 'inline-block',
                            fontSize: '0.82rem',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                            color: '#000066',
                            background: 'rgba(0, 0, 102, 0.08)',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            marginBottom: '10px'
                        }}>
                            Pillars of the Church
                        </span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#000066', margin: '0 0 12px' }}>
                            Church Departments &amp; Sanctuary Ministries
                        </h2>
                        <p style={{ maxWidth: '720px', margin: '0 auto', color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>
                            Nurturing every believer from childhood to mature leadership through our four foundational departments, 
                            and exalting God through four dedicated sanctuary worship ministries.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
                        
                        {/* ── CARD 1: FOUR CHURCH DEPARTMENTS ── */}
                        <div style={{
                            background: '#ffffff',
                            borderRadius: '20px',
                            border: '2px solid rgba(0, 0, 102, 0.14)',
                            boxShadow: '0 12px 36px rgba(0, 0, 102, 0.08)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #000045 0%, #000066 100%)',
                                padding: '24px 28px',
                                color: '#ffffff',
                                borderBottom: '3px solid #fbbf24'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ background: 'rgba(251, 191, 36, 0.25)', color: '#fbbf24', fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', padding: '3px 10px', borderRadius: '12px' }}>
                                        Four Pillars
                                    </span>
                                    <span style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>Fellowship &amp; Nurture</span>
                                </div>
                                <h3 style={{ margin: '8px 0 4px', fontSize: '1.45rem', fontWeight: 800, color: '#ffffff' }}>
                                    Church Departments
                                </h3>
                                <p style={{ margin: 0, fontSize: '0.88rem', color: '#e2e8f0' }}>
                                    Equipping women, men, youth, and children for spiritual growth.
                                </p>
                            </div>

                            <div style={{ padding: '24px 28px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {[
                                    { icon: 'female', title: 'Women Department', time: 'Weekly Prayer & Intercession', desc: 'Mothers fellowship, prayer chains, and community compassion.', link: '/departments#women' },
                                    { icon: 'male', title: 'Men Department', time: 'Monthly Brotherhood Breakfast', desc: 'Godly fatherhood, leadership integrity, and church projects.', link: '/departments#men' },
                                    { icon: 'bolt', title: 'Youth Department', time: 'Saturdays 4:00 PM – 6:00 PM', desc: 'Worship, talent discovery, life skills, and mentorship.', link: '/departments#youth' },
                                    { icon: 'child', title: 'Sunday School', time: 'Sundays 8:00 AM – 10:00 AM', desc: 'Biblical foundation, memory verses, and child discipleship.', link: '/departments#sundayschool' },
                                ].map((d, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', paddingBottom: '14px', borderBottom: idx < 3 ? '1px solid #f1f5f9' : 'none' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0, 0, 102, 0.06)', color: '#000066', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>
                                            <i className={`fas fa-${d.icon}`}></i>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                                <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: '#000066' }}>{d.title}</h4>
                                                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>{d.time}</span>
                                            </div>
                                            <p style={{ margin: '3px 0 0', fontSize: '0.84rem', color: '#475569', lineHeight: 1.5 }}>{d.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ padding: '16px 28px 24px', borderTop: '1px solid #f1f5f9' }}>
                                <Link to="/departments" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block', padding: '12px', fontSize: '0.92rem', borderRadius: '10px' }}>
                                    Explore All 4 Departments &rarr;
                                </Link>
                            </div>
                        </div>

                        {/* ── CARD 2: FOUR SANCTUARY MINISTRIES ── */}
                        <div style={{
                            background: '#ffffff',
                            borderRadius: '20px',
                            border: '2px solid rgba(0, 0, 102, 0.14)',
                            boxShadow: '0 12px 36px rgba(0, 0, 102, 0.08)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #000033 0%, #000066 100%)',
                                padding: '24px 28px',
                                color: '#ffffff',
                                borderBottom: '3px solid #38bdf8'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ background: 'rgba(56, 189, 248, 0.25)', color: '#38bdf8', fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', padding: '3px 10px', borderRadius: '12px' }}>
                                        Sanctuary Arms
                                    </span>
                                    <span style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>Worship &amp; Service</span>
                                </div>
                                <h3 style={{ margin: '8px 0 4px', fontSize: '1.45rem', fontWeight: 800, color: '#ffffff' }}>
                                    Sanctuary Ministries
                                </h3>
                                <p style={{ margin: 0, fontSize: '0.88rem', color: '#e2e8f0' }}>
                                    Corporate worship, instrumental band, choir, and protocol.
                                </p>
                            </div>

                            <div style={{ padding: '24px 28px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {[
                                    { icon: 'microphone', title: 'Praise and Worship', time: 'Sunday Services & Vigils', desc: 'Anointed song ministers creating an atmosphere of Holy Spirit revival.', link: '/ministries#worship' },
                                    { icon: 'guitar', title: 'Instrumentalist Ministry', time: 'Keyboards, Drums & Guitars', desc: 'Skilled musicians serving with technical acoustics and excellence.', link: '/ministries#instrumentalists' },
                                    { icon: 'users', title: 'Sanctuary Choir', time: 'Choral Anthems & Hymns', desc: 'Multi-part harmonies, cantatas, and festive praise presentations.', link: '/ministries#choir' },
                                    { icon: 'door-open', title: 'Ushering & Protocol', time: 'Every Service & Convocations', desc: 'Warm hospitable reception, sanctuary reverence, and seating order.', link: '/ministries#ushering' },
                                ].map((m, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', paddingBottom: '14px', borderBottom: idx < 3 ? '1px solid #f1f5f9' : 'none' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0, 0, 102, 0.06)', color: '#000066', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1rem' }}>
                                            <i className={`fas fa-${m.icon}`}></i>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                                <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: '#000066' }}>{m.title}</h4>
                                                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>{m.time}</span>
                                            </div>
                                            <p style={{ margin: '3px 0 0', fontSize: '0.84rem', color: '#475569', lineHeight: 1.5 }}>{m.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ padding: '16px 28px 24px', borderTop: '1px solid #f1f5f9' }}>
                                <Link to="/ministries" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block', padding: '12px', fontSize: '0.92rem', borderRadius: '10px' }}>
                                    Explore All 4 Ministries &rarr;
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="stats-section" ref={statsRef}>
                <div className="stats-overlay"></div>
                <div className="container">
                    <div className="section-header light">
                        <span className="section-subtitle">Our Impact</span>
                        <h2 className="section-title">The Numbers Speak</h2>
                    </div>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-icon">
                                <i className="fas fa-heart"></i>
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">
                                    {statsVisible ? stats.souls : 0}
                                    {statsVisible && stats.souls >= 445 ? '+' : ''}
                                </div>
                                <div className="stat-label">Souls Won to Christ</div>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <i className="fas fa-globe-africa"></i>
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{statsVisible ? stats.missions : 0}</div>
                                <div className="stat-label">Mission Trips</div>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <i className="fas fa-map-marked-alt"></i>
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{statsVisible ? stats.counties : 0}</div>
                                <div className="stat-label">Counties in Kenya</div>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <i className="fas fa-graduation-cap"></i>
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{statsVisible ? stats.schools : 0}</div>
                                <div className="stat-label">Schools Ministered</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Testimonials Section */}
            <section className="testimonials-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">Testimonies</span>
                        <h2 className="section-title">Lives Transformed</h2>
                    </div>
                    <div className="testimonials-slider">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className={`testimonial-card ${index === currentTestimonial ? 'active' : ''}`}>
                                <div className="testimonial-content">
                                    <div className="quote-icon"><i className="fas fa-quote-left"></i></div>
                                    <p>"{testimonial.quote}"</p>
                                </div>
                                <div className="testimonial-author">
                                    <div className="author-image" style={{ background: `linear-gradient(135deg, ${testimonial.color}dd, ${testimonial.color}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1.1rem', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.5px' }}>
                                        {testimonial.initials}
                                    </div>
                                    <div className="author-info">
                                        <h4>{testimonial.author}</h4>
                                        <span>{testimonial.location}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="testimonial-dots">
                        {testimonials.map((_, index) => (
                            <div key={index} className={`dot ${index === currentTestimonial ? 'active' : ''}`} onClick={() => setCurrentTestimonial(index)}></div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Giving & Stewardship */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.18)', padding: '5px 14px', borderRadius: '30px', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '12px' }}>
                            <i className="fas fa-hand-holding-dollar"></i> Giving &amp; Stewardship
                        </span>
                        <h2>Support God's Work &amp; District Growth</h2>
                        <p style={{ fontSize: '1.2rem', margin: '10px 0 6px', fontWeight: 600 }}>
                            M-Pesa Paybill: <strong style={{ color: '#fff', textDecoration: 'underline' }}>4136387</strong> &bull; Account: <strong style={{ color: '#fff' }}>YOUR NAME</strong>
                        </p>
                        <p style={{ fontSize: '0.95rem', opacity: 0.9, maxWidth: '680px', margin: '0 auto 20px' }}>
                            Your faithful tithes, offerings, and building gifts empower the work of God at Ngungo Assembly and across all Mbeere District sister assemblies. Overseer: Bishop Rev Clement Simba &bull; P.O. Box 213-60113 Kiritiri, Mbeere &bull; Tel: 0720140213
                        </p>
                        <div className="cta-buttons">
                            <Link to="/donate" className="btn btn-primary"><i className="fas fa-mobile-screen-button"></i> Give via M-Pesa</Link>
                            <Link to="/contact" className="btn btn-secondary">Contact Church Office</Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* Latest News Section */}
            <section className="news-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">News &amp; Updates</span>
                        <h2 className="section-title">Latest From The Field</h2>
                    </div>
                    <div className="news-grid">
                        {newsItems.length > 0 ? (
                            newsItems.slice(0, 4).map((item, idx) => {
                                const cardColors = [
                                    { grad: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', accent: '#E87D1E', icon: 'fas fa-church' },
                                    { grad: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', accent: '#6366f1', icon: 'fas fa-sitemap' },
                                    { grad: 'linear-gradient(135deg, #042f2e 0%, #115e59 100%)', accent: '#14b8a6', icon: 'fas fa-fire' },
                                    { grad: 'linear-gradient(135deg, #451a03 0%, #78350f 100%)', accent: '#f59e0b', icon: 'fas fa-heart' }
                                ];
                                const style = cardColors[idx % cardColors.length];

                                return (
                                    <div className="news-card" key={item._id || idx}>
                                        <div className="news-image" style={{ background: style.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '170px', position: 'relative' }}>
                                            <i className={style.icon} style={{ fontSize: '2.8rem', color: style.accent, opacity: 0.9 }}></i>
                                            <div className="news-category" style={{ position: 'absolute', top: '12px', left: '12px' }}>{item.category || 'Mbeere District'}</div>
                                        </div>
                                        <div className="news-content">
                                            <div className="news-date">{item.date || 'Recent Announcement'}</div>
                                            <h3>{item.title}</h3>
                                            <p>{item.summary}</p>
                                            <Link to="/programs" className="news-link">Read More <i className="fas fa-arrow-right"></i></Link>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <>
                                <div className="news-card">
                                    <div className="news-image" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '170px', position: 'relative' }}>
                                        <i className="fas fa-church" style={{ fontSize: '2.8rem', color: '#E87D1E' }}></i>
                                        <div className="news-category" style={{ position: 'absolute', top: '12px', left: '12px' }}>District HQ</div>
                                    </div>
                                    <div className="news-content">
                                        <div className="news-date">November 2026 — Ngungo</div>
                                        <h3>Ngungo Assembly: Serving as Mbeere District Headquarters</h3>
                                        <p>Pentecostal Assemblies of God - Ngungo Assembly continues to spearhead spiritual revival, pastoral training, and church coordination across Mbeere District.</p>
                                        <Link to="/about" className="news-link">Read More <i className="fas fa-arrow-right"></i></Link>
                                    </div>
                                </div>
                                <div className="news-card">
                                    <div className="news-image" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '170px', position: 'relative' }}>
                                        <i className="fas fa-sitemap" style={{ fontSize: '2.8rem', color: '#6366f1' }}></i>
                                        <div className="news-category" style={{ position: 'absolute', top: '12px', left: '12px' }}>Assemblies</div>
                                    </div>
                                    <div className="news-content">
                                        <div className="news-date">October 2026 — Mbeere</div>
                                        <h3>Mbeere District Assemblies Leadership Convocation</h3>
                                        <p>Pastors and leaders from all 8 Mbeere assemblies and Kyuso circuit gathered at Ngungo HQ for prayer, strategic visioning, and district development.</p>
                                        <Link to="/assemblies" className="news-link">Read More <i className="fas fa-arrow-right"></i></Link>
                                    </div>
                                </div>
                                <div className="news-card">
                                    <div className="news-image" style={{ background: 'linear-gradient(135deg, #042f2e 0%, #115e59 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '170px', position: 'relative' }}>
                                        <i className="fas fa-fire" style={{ fontSize: '2.8rem', color: '#14b8a6' }}></i>
                                        <div className="news-category" style={{ position: 'absolute', top: '12px', left: '12px' }}>Youth Ministry</div>
                                    </div>
                                    <div className="news-content">
                                        <div className="news-date">Weekly — Saturday 4:00 PM</div>
                                        <h3>Youth Fellowship &amp; Talent Ministry</h3>
                                        <p>The Youth Department invites all young people every Saturday from 4:00 PM to 6:00 PM for explosive praise, worship, instrumental training, and biblical life skills.</p>
                                        <Link to="/ministries#youth" className="news-link">Read More <i className="fas fa-arrow-right"></i></Link>
                                    </div>
                                </div>
                                <div className="news-card">
                                    <div className="news-image" style={{ background: 'linear-gradient(135deg, #451a03 0%, #78350f 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '170px', position: 'relative' }}>
                                        <i className="fas fa-heart" style={{ fontSize: '2.8rem', color: '#f59e0b' }}></i>
                                        <div className="news-category" style={{ position: 'absolute', top: '12px', left: '12px' }}>Departments</div>
                                    </div>
                                    <div className="news-content">
                                        <div className="news-date">Weekly Fellowships — Ngungo</div>
                                        <h3>Women Department Prayer &amp; Empowerment</h3>
                                        <p>PAG Women Department continues to unite mothers and sisters in fervent prayer intercession, family welfare, and community compassionate care.</p>
                                        <Link to="/ministries#women" className="news-link">Read More <i className="fas fa-arrow-right"></i></Link>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
