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

            {/* About Section — Dignified Pastoral Redesign */}
            <section className="about-section-v2">
                <div className="container">
                    <div className="about-v2-grid">
                        <div className="about-v2-text-side">
                            <span className="about-v2-eyebrow-text">Pentecostal Assemblies of God</span>
                            <h2 className="about-v2-heading-modern">
                                Welcome to <em>Ngungo Assembly</em>
                            </h2>
                            <p className="about-v2-desc-modern">
                                Rooted in the Holy Spirit and sound biblical doctrine, PAG Ngungo Assembly serves as the district headquarters and spiritual covering for Pentecostal Assemblies of God across Mbeere District and Kyuso Circuit.
                            </p>
                            <p className="about-v2-desc-modern">
                                Under the apostolic leadership of Bishop Rev. Clement Simba, our fellowship is dedicated to transformative worship, fervent prayer, compassionate outreach, and raising mature disciples of Jesus Christ.
                            </p>

                            <div className="about-v2-pillars-grid">
                                <div className="about-v2-pillar-item">
                                    <div className="about-v2-pillar-title">
                                        <i className="fas fa-bible"></i> Biblical Truth
                                    </div>
                                    <p className="about-v2-pillar-sub">Sound biblical exposition and grounded doctrine for all ages.</p>
                                </div>
                                <div className="about-v2-pillar-item">
                                    <div className="about-v2-pillar-title">
                                        <i className="fas fa-fire"></i> Spirit-Filled
                                    </div>
                                    <p className="about-v2-pillar-sub">Passionate praise, fervent prayer, and Holy Spirit revival.</p>
                                </div>
                                <div className="about-v2-pillar-item">
                                    <div className="about-v2-pillar-title">
                                        <i className="fas fa-users"></i> United Family
                                    </div>
                                    <p className="about-v2-pillar-sub">Nurturing families, youth, and vibrant district fellowship.</p>
                                </div>
                            </div>

                            <div className="about-v2-actions">
                                <Link to="/about" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '10px', fontWeight: 700 }}>
                                    Learn More About Us <i className="fas fa-arrow-right"></i>
                                </Link>
                                <Link to="/assemblies" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 22px', borderRadius: '10px', fontWeight: 700 }}>
                                    District Assemblies
                                </Link>
                            </div>
                        </div>

                        <div className="about-v2-photo-side">
                            <div className="about-pastoral-card">
                                <div className="about-pastoral-top">
                                    <img
                                        src={bishopPhoto}
                                        alt="Bishop Rev. Clement Simba"
                                        className="about-pastoral-avatar"
                                    />
                                    <div>
                                        <span className="about-pastoral-badge">Pastoral Leadership</span>
                                        <h3 className="about-pastoral-name">Bishop Rev. Clement Simba</h3>
                                        <p className="about-pastoral-title">District Overseer • Mbeere District</p>
                                    </div>
                                </div>

                                <div className="about-pastoral-quote">
                                    <p>
                                        "We welcome you to fellowship with us in Spirit and Truth. Here, lives are transformed by the Gospel, families are anchored in faith, and the name of the Lord is exalted."
                                    </p>
                                </div>

                                <div className="about-pastoral-footer">
                                    <div className="about-pastoral-role">
                                        <i className="fas fa-church"></i>
                                        <span>Seat of District Administration</span>
                                    </div>
                                    <Link to="/leadership" className="about-pastoral-link">
                                        Meet Leadership <i className="fas fa-chevron-right" style={{ fontSize: '0.75rem' }}></i>
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

            {/* Impact / Kingdom Fruit Section — Dignified & Natural Church Presentation */}
            <section className="stats-section" ref={statsRef}>
                <div className="stats-glow-backdrop"></div>
                <div className="container">
                    <div className="stats-header-dignified">
                        <span className="stats-eyebrow">God's Faithfulness &amp; Fruit</span>
                        <h2 className="stats-heading">Lives Transformed &amp; Kingdom Harvest</h2>
                        <p className="stats-scripture">
                            "Neither he who plants nor he who waters is anything, but only God, who makes things grow." 
                            <span> — 1 Corinthians 3:7</span>
                        </p>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-icon">
                                <i className="fas fa-heart"></i>
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">
                                    {statsVisible ? stats.souls : 0}
                                    <span className="stat-plus">{statsVisible && stats.souls >= 445 ? '+' : ''}</span>
                                </div>
                                <div className="stat-label">Souls Won to Christ</div>
                                <div className="stat-hint">Gospel decisions &amp; additions to God's Kingdom</div>
                            </div>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon">
                                <i className="fas fa-globe-africa"></i>
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{statsVisible ? stats.missions : 0}</div>
                                <div className="stat-label">Missions &amp; Outreaches</div>
                                <div className="stat-hint">Frontline rural and regional evangelism crusades</div>
                            </div>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon">
                                <i className="fas fa-map-marked-alt"></i>
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{statsVisible ? stats.counties : 0}</div>
                                <div className="stat-label">Counties Reached</div>
                                <div className="stat-hint">Growing ministry footprint across Kenya</div>
                            </div>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon">
                                <i className="fas fa-graduation-cap"></i>
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{statsVisible ? stats.schools : 0}</div>
                                <div className="stat-label">Schools Ministered</div>
                                <div className="stat-hint">Youth, high school, and student discipleship</div>
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
