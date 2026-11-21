import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CreativeSlider from '../components/CreativeSlider';

// Hero photos
import hero1 from '../assets/Ruanyage1.jpg';
import hero2 from '../assets/Tala mission1.jpg';

// About section photos
import aboutMain from '../assets/Tala mission7.jpg';
import aboutThumb1 from '../assets/Tala mission3.jpg';
import aboutThumb2 from '../assets/Ruanyage5.jpg';

// News card photos
import newsNtakira from '../assets/Gaukene ntakira circuit mission1.jpg';
import newsEmali from '../assets/Emali mission2.jpg';
import newsTala from '../assets/Tala mission2.jpg';
import newsGikumene from '../assets/gikumene meru6.JPG';

const Home = () => {
    // Testimonials Slider State
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [newsItems, setNewsItems] = useState([]);

    const testimonials = [
        { quote: "Through Pentecostal Assemblies of God - Ngungo Assembly, I came to know Jesus Christ as my Lord and Savior. My life has never been the same. The biblical teachings and Spirit-filled services have built a strong spiritual foundation in my life.", author: "Brother Peter Mwangi", location: "Mbeere District", initials: "PM", color: "#2563eb" },
        { quote: "The youth ministry transformed my life completely. I was on the wrong path, but through the mentorship and discipleship programs, I found purpose and direction. Glory to God!", author: "Mary Wanjiku", location: "Nairobi County", initials: "MW", color: "#2980b9" },
        { quote: "The community outreach program brought medical services and the Gospel to our village. Many were healed physically and spiritually. We thank God for this ministry.", author: "Chief Joseph Mutua", location: "Machakos County", initials: "JM", color: "#27ae60" }
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
            } catch {}
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
                    <div className="ticker-label">WEEKLY SCHEDULE</div>
                    <div className="ticker-track">
                        {[0, 1, 2].map(i => (
                            <React.Fragment key={i}>
                                <div className="ticker-item">SUNDAY ENGLISH SERVICE: 8:00 AM – 10:00 AM</div>
                                <div className="ticker-item">SUNDAY MAIN SERVICE: 10:30 AM – 1:30 PM</div>
                                <div className="ticker-item">SUNDAY SCHOOL: 8:00 AM – 10:00 AM</div>
                                <div className="ticker-item">FRIDAY FELLOWSHIP: 7:00 PM – 9:00 PM</div>
                                <div className="ticker-item">YOUTH FELLOWSHIP: SATURDAY 4:00 PM – 6:00 PM</div>
                                <div className="ticker-item">M-PESA PAYBILL: 4136387 | ACC: YOUR NAME</div>
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
                                <div className="org-node org-node-root">Pentecostal Assemblies of God</div>
                                <ul>
                                    <li><div className="org-node org-node-highlight">Ngungo HQ (Bishop Clement Simba)</div></li>
                                    <li><div className="org-node">Mbeere District (7 Assemblies)</div></li>
                                    <li><div className="org-node">Kyuso Kitui Assemblies</div></li>
                                    <li><div className="org-node">Departments</div></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Order of Services Featured Grid */}
            <section className="section" style={{ background: '#f8fafc', padding: '50px 0' }} id="order-of-services">
                <div className="container">
                    <div className="section-header" style={{ textAlign: 'center', marginBottom: '35px' }}>
                        <span className="section-subtitle" style={{ color: '#2563EB', fontWeight: 700 }}>Worship With Us</span>
                        <h2 className="section-title">Order of Services</h2>
                        <p className="section-description" style={{ maxWidth: '650px', margin: '0 auto' }}>
                            Join us at Pentecostal Assemblies of God - Ngungo Assembly for life-transforming worship encounters and fellowships.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '18px' }}>
                        <div style={{ background: '#fff', borderRadius: '12px', padding: '22px 18px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ width: '4px', height: '100%', background: '#2563EB', position: 'absolute', left: 0, top: 0 }}></div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#2563EB', letterSpacing: '0.5px' }}>Sunday Morning</span>
                            <h3 style={{ fontSize: '1.15rem', margin: '8px 0 6px', color: '#1e293b' }}>English Service</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '0.92rem', fontWeight: 600 }}>
                                <i className="fas fa-clock" style={{ color: '#2563EB' }}></i> 8:00 AM – 10:00 AM
                            </div>
                            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '8px', marginBottom: 0 }}>Spirit-filled exposition, hymns and contemporary worship in English.</p>
                        </div>

                        <div style={{ background: '#fff', borderRadius: '12px', padding: '22px 18px', border: '2px solid #2563EB', boxShadow: '0 10px 15px -3px rgba(37,99,235,0.1)', position: 'relative', overflow: 'hidden' }}>
                            <span style={{ background: '#2563EB', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Main Service</span>
                            <h3 style={{ fontSize: '1.2rem', margin: '8px 0 6px', color: '#1e293b' }}>Main Worship Service</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b', fontSize: '0.95rem', fontWeight: 700 }}>
                                <i className="fas fa-clock" style={{ color: '#2563EB' }}></i> 10:30 AM – 1:30 PM
                            </div>
                            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '8px', marginBottom: 0 }}>High praise, anointed preaching by Bishop Clement Simba, choir, and intercessory prayer.</p>
                        </div>

                        <div style={{ background: '#fff', borderRadius: '12px', padding: '22px 18px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ width: '4px', height: '100%', background: '#10B981', position: 'absolute', left: 0, top: 0 }}></div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#10B981', letterSpacing: '0.5px' }}>Every Sunday</span>
                            <h3 style={{ fontSize: '1.15rem', margin: '8px 0 6px', color: '#1e293b' }}>Sunday School</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '0.92rem', fontWeight: 600 }}>
                                <i className="fas fa-clock" style={{ color: '#10B981' }}></i> 8:00 AM – 10:00 AM
                            </div>
                            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '8px', marginBottom: 0 }}>Biblical foundations, interactive storytelling, and memory verses for all children.</p>
                        </div>

                        <div style={{ background: '#fff', borderRadius: '12px', padding: '22px 18px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ width: '4px', height: '100%', background: '#6366f1', position: 'absolute', left: 0, top: 0 }}></div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#6366f1', letterSpacing: '0.5px' }}>Every Friday</span>
                            <h3 style={{ fontSize: '1.15rem', margin: '8px 0 6px', color: '#1e293b' }}>Friday Fellowship</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '0.92rem', fontWeight: 600 }}>
                                <i className="fas fa-clock" style={{ color: '#6366f1' }}></i> 7:00 PM – 9:00 PM
                            </div>
                            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '8px', marginBottom: 0 }}>Fervent evening prayers, interceding for families, our community, and the nation.</p>
                        </div>

                        <div style={{ background: '#fff', borderRadius: '12px', padding: '22px 18px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ width: '4px', height: '100%', background: '#ec4899', position: 'absolute', left: 0, top: 0 }}></div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#ec4899', letterSpacing: '0.5px' }}>Every Saturday</span>
                            <h3 style={{ fontSize: '1.15rem', margin: '8px 0 6px', color: '#1e293b' }}>Youth Fellowship</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '0.92rem', fontWeight: 600 }}>
                                <i className="fas fa-clock" style={{ color: '#ec4899' }}></i> 4:00 PM – 6:00 PM
                            </div>
                            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '8px', marginBottom: 0 }}>Dynamic youth ministry, mentorship, discussions, and spiritual empowerment.</p>
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
                                Pentecostal Assemblies of God<br /><em>Ngungo Assembly</em> (District HQ)
                            </h2>
                            <p className="about-v2-desc">
                                Pentecostal Assemblies of God - Ngungo Assembly is the Headquarter Church for Mbeere District under the spiritual leadership of <strong>Bishop Rev Clement Simba (Overseer)</strong>. We are a Bible-believing, Spirit-filled congregation passionate about the presence of God, prayer, and discipleship.
                            </p>
                            <p className="about-v2-desc">
                                As the district center, Ngungo Assembly nurtures and coordinates 7 sister assemblies across Mbeere District as well as missionary branch assemblies in Kyuso, Kitui County. Whether you are seeking a home church, fellowship, or spiritual guidance, you are warmly welcomed into the family of God.
                            </p>
                            <div className="about-v2-pills">
                                <div className="about-v2-pill"><i className="fas fa-bible"></i> Bible-Based Preaching</div>
                                <div className="about-v2-pill"><i className="fas fa-hands-praying"></i> Fervent Prayer</div>
                                <div className="about-v2-pill"><i className="fas fa-users"></i> United District Fellowship</div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
                                <Link to="/about" className="btn btn-primary">Read More About Us</Link>
                                <Link to="/about#assemblies" className="btn btn-secondary">District Assemblies</Link>
                            </div>
                        </div>
                        <div className="about-v2-photo-side">
                            <div className="about-v2-photo-wrap">
                                <div className="about-v2-badge"><strong>HQ</strong>Mbeere<br />District</div>
                                <img src={aboutMain} alt="PAOG Ngungo Assembly" className="about-v2-photo-main" loading="lazy" />
                                <img src={aboutThumb1} alt="Church fellowship" className="about-v2-photo-accent" loading="lazy" />
                                <div className="about-v2-deco-ring"></div>
                                <div className="about-v2-deco-dot"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision / Mission — Redesigned */}
            <section className="vision-mission-v2">
                <div className="container">
                    <div className="vm-v2-header">
                        <p className="vm-v2-verse">"Upon this rock I will build my church, and the gates of hell shall not prevail against it." — Matthew 16:18</p>
                        <h2 className="vm-v2-title">Our <span>Vision</span> &amp; Calling</h2>
                    </div>
                    <div className="vm-v2-list">
                        <div className="vm-v2-list-item">
                            <div className="vm-v2-list-icon"><i className="fas fa-eye"></i></div>
                            <div className="vm-v2-list-content">
                                <h3>Our Vision</h3>
                                <p>To be a vibrant, Christ-centered, Spirit-filled church multiplying disciples and transforming communities across Mbeere District, Kyuso Kitui County, and the nations.</p>
                            </div>
                        </div>
                        <div className="vm-v2-list-item">
                            <div className="vm-v2-list-icon"><i className="fas fa-bullseye"></i></div>
                            <div className="vm-v2-list-content">
                                <h3>Our Mission</h3>
                                <p>To proclaim the Gospel of Jesus Christ in the power of the Holy Spirit, equip believers for ministry, build godly families, and coordinate district assemblies in love and unity.</p>
                            </div>
                        </div>
                        <div className="vm-v2-list-item">
                            <div className="vm-v2-list-icon"><i className="fas fa-heart"></i></div>
                            <div className="vm-v2-list-content">
                                <h3>Our Core Values</h3>
                                <p>Biblical Infallibility, Holy Spirit Empowerment, Fervent Prayer, Integrity, Loving Fellowship, Servant Leadership, and Kingdom Generosity.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* District Assemblies Section */}
            <section className="section" style={{ background: '#ffffff', padding: '60px 0' }} id="assemblies">
                <div className="container">
                    <div className="section-header" style={{ textAlign: 'center', marginBottom: '36px' }}>
                        <span className="section-subtitle" style={{ color: '#2563EB', fontWeight: 700 }}>Our Fellowship Network</span>
                        <h2 className="section-title">Mbeere District Assemblies</h2>
                        <p className="section-description" style={{ maxWidth: '700px', margin: '0 auto' }}>
                            Pentecostal Assemblies of God - Ngungo Assembly serves as the Headquarter Church for Mbeere District, coordinating and shepherding assemblies across the region under Bishop Clement Simba.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                        {/* Ngungo HQ */}
                        <div style={{ background: '#eff6ff', border: '2px solid #2563EB', borderRadius: '12px', padding: '22px', position: 'relative' }}>
                            <span style={{ background: '#2563EB', color: '#fff', fontSize: '0.7rem', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>District Headquarters</span>
                            <h3 style={{ margin: '10px 0 6px', fontSize: '1.25rem', color: '#1e293b' }}>Ngungo Assembly</h3>
                            <div style={{ color: '#2563EB', fontWeight: 700, fontSize: '0.95rem', marginBottom: '8px' }}>
                                <i className="fas fa-user-tie"></i> Bishop Rev Clement Simba (District Overseer)
                            </div>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>P.O. Box 213-60113 Kiritiri Mbeere &bull; Tel: 0720140213 &bull; Paybill 4136387</p>
                        </div>

                        {/* 1. Kiamachang'a */}
                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
                            <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Mbeere District Assembly #1</span>
                            <h3 style={{ margin: '8px 0 6px', fontSize: '1.15rem', color: '#1e293b' }}>Kiamachang'a Assembly</h3>
                            <div style={{ color: '#10B981', fontWeight: 700, fontSize: '0.92rem' }}>
                                <i className="fas fa-church"></i> Rev Rose Nyamwaro
                            </div>
                            <p style={{ margin: '6px 0 0', fontSize: '0.82rem', color: '#64748b' }}>Weekly Sunday &amp; mid-week fellowships.</p>
                        </div>

                        {/* 2. Rwika */}
                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
                            <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Mbeere District Assembly #2</span>
                            <h3 style={{ margin: '8px 0 6px', fontSize: '1.15rem', color: '#1e293b' }}>Rwika Assembly</h3>
                            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.92rem' }}>
                                <i className="fas fa-church"></i> Rev Samuel Nderitu
                            </div>
                            <p style={{ margin: '6px 0 0', fontSize: '0.82rem', color: '#64748b' }}>Serving the Rwika community and environs.</p>
                        </div>

                        {/* 3. Kathera */}
                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
                            <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Mbeere District Assembly #3</span>
                            <h3 style={{ margin: '8px 0 6px', fontSize: '1.15rem', color: '#1e293b' }}>Kathera Assembly</h3>
                            <div style={{ color: '#7c3aed', fontWeight: 700, fontSize: '0.92rem' }}>
                                <i className="fas fa-church"></i> Rev John Ngochi (District Secretary)
                            </div>
                            <p style={{ margin: '6px 0 0', fontSize: '0.82rem', color: '#64748b' }}>Vibrant worship and teaching ministry.</p>
                        </div>

                        {/* 4. Ngangari */}
                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
                            <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Mbeere District Assembly #4</span>
                            <h3 style={{ margin: '8px 0 6px', fontSize: '1.15rem', color: '#1e293b' }}>Ngangari Assembly</h3>
                            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.92rem' }}>
                                <i className="fas fa-church"></i> Rev Clement Simba
                            </div>
                            <p style={{ margin: '6px 0 0', fontSize: '0.82rem', color: '#64748b' }}>Preaching Christ and strengthening families.</p>
                        </div>

                        {/* 5. Mugaari */}
                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
                            <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Mbeere District Assembly #5</span>
                            <h3 style={{ margin: '8px 0 6px', fontSize: '1.15rem', color: '#1e293b' }}>Mugaari Assembly</h3>
                            <div style={{ color: '#059669', fontWeight: 700, fontSize: '0.92rem' }}>
                                <i className="fas fa-church"></i> Rev Paul Nyaga
                            </div>
                            <p style={{ margin: '6px 0 0', fontSize: '0.82rem', color: '#64748b' }}>Active youth, men, and women departments.</p>
                        </div>

                        {/* 6. Muumoni */}
                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
                            <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Mbeere District Assembly #6</span>
                            <h3 style={{ margin: '8px 0 6px', fontSize: '1.15rem', color: '#1e293b' }}>Muumoni Assembly</h3>
                            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: '0.92rem' }}>
                                <i className="fas fa-church"></i> Rev Clement Simba
                            </div>
                            <p style={{ margin: '6px 0 0', fontSize: '0.82rem', color: '#64748b' }}>Reaching souls and nurturing believers in Christ.</p>
                        </div>

                        {/* 7. Gikuru */}
                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
                            <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Mbeere District Assembly #7</span>
                            <h3 style={{ margin: '8px 0 6px', fontSize: '1.15rem', color: '#1e293b' }}>Gikuru Assembly</h3>
                            <div style={{ color: '#9333ea', fontWeight: 700, fontSize: '0.92rem' }}>
                                <i className="fas fa-church"></i> Rev David Kimanthi
                            </div>
                            <p style={{ margin: '6px 0 0', fontSize: '0.82rem', color: '#64748b' }}>Discipleship, prayer, and evangelism fellowship.</p>
                        </div>
                    </div>

                    {/* Kyuso Kitui County Section */}
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '14px', padding: '28px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <i className="fas fa-map-location-dot" style={{ color: '#16a34a', fontSize: '1.4rem' }}></i>
                            <div>
                                <h3 style={{ margin: 0, color: '#166534', fontSize: '1.25rem' }}>Assemblies in Kyuso, Kitui County</h3>
                                <p style={{ margin: 0, color: '#15803d', fontSize: '0.88rem' }}>Fellowship arms and missionary outreach stations connected to the district</p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                            <div style={{ background: '#fff', borderRadius: '10px', padding: '16px', border: '1px solid #dcfce7' }}>
                                <div style={{ fontWeight: 800, color: '#166534' }}>1. Marisi Assembly</div>
                                <div style={{ fontSize: '0.82rem', color: '#4b5563', marginTop: '4px' }}>Kyuso, Kitui County</div>
                            </div>
                            <div style={{ background: '#fff', borderRadius: '10px', padding: '16px', border: '1px solid #dcfce7' }}>
                                <div style={{ fontWeight: 800, color: '#166534' }}>2. Matooni Assembly</div>
                                <div style={{ fontSize: '0.82rem', color: '#4b5563', marginTop: '4px' }}>Kyuso, Kitui County</div>
                            </div>
                            <div style={{ background: '#fff', borderRadius: '10px', padding: '16px', border: '1px dashed #86efac' }}>
                                <div style={{ fontWeight: 800, color: '#166534' }}>3. Kyuso Assembly</div>
                                <div style={{ fontSize: '0.82rem', color: '#6b7280', marginTop: '4px' }}>Kyuso, Kitui County [Assembly Details Updating]</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Departments */}
            <section className="ministries-v2">
                <div className="container ministries-split">
                    <div className="ministries-left">
                        <span className="section-subtitle">Get Involved</span>
                        <h2 className="section-title">Our Departments</h2>
                        <p className="section-description">
                            At Pentecostal Assemblies of God - Ngungo Assembly, every believer is equipped with gifts to serve God and edify the body of Christ. Discover our active church departments and service ministries.
                        </p>
                        <div style={{ marginTop: '24px' }}>
                            <Link to="/ministries" className="btn btn-primary">Explore All Departments</Link>
                        </div>
                    </div>
                    <div className="ministries-right">
                        {[
                            { icon: 'female',             title: 'Women Department',          desc: 'Empowering women of faith through prayer, family nurture, mutual fellowship, and charitable ministry.',      link: '/ministries#women' },
                            { icon: 'male',               title: 'Men Department',            desc: 'Building godly men who lead their homes, assemblies, and communities with spiritual conviction and integrity.', link: '/ministries#men' },
                            { icon: 'child',              title: 'Youth Department',          desc: 'Dynamic Saturday youth fellowship (4:00 PM – 6:00 PM), mentoring the next generation in worship and zeal.',   link: '/ministries#youth' },
                            { icon: 'shapes',             title: 'Sunday School Department',  desc: 'Nurturing our children in biblical truth, memory verses, and praise every Sunday (8:00 AM – 10:00 AM).',    link: '/ministries#sundayschool' },
                            { icon: 'music',              title: 'Praise and Worship',        desc: 'Anointed vocalists and worship leaders guiding the congregation into profound encounters with God.',       link: '/ministries#worship' },
                            { icon: 'guitar',             title: 'Instrumentalists',          desc: 'Talented keyboardists, drummers, and musicians ministering skillfully to glorify God in each service.',     link: '/ministries#instrumentalists' },
                            { icon: 'microphone-alt',     title: 'Church Choir',              desc: 'Harmonious choral ministry ministering inspired anthems of revival, encouragement, and praise.',             link: '/ministries#choir' },
                            { icon: 'hand-sparkles',      title: 'Ushering Ministry',         desc: 'Dedicated ushers welcoming worshippers warmly and maintaining order and hospitality in the house of God.',  link: '/ministries#ushering' },
                        ].map((m, i) => (
                            <div className="ministry-list-item" key={i}>
                                <div className="ministry-list-icon">
                                    <i className={`fas fa-${m.icon}`}></i>
                                </div>
                                <div className="ministry-list-content">
                                    <h3>{m.title}</h3>
                                    <p>{m.desc}</p>
                                    <Link to={m.link} className="ministry-link-inline">Learn More <i className="fas fa-arrow-right"></i></Link>
                                </div>
                            </div>
                        ))}
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
                                const fallbackImgs = [newsNtakira, newsEmali, newsTala, newsGikumene];
                                const imageSrc = item.imageUrl 
                                    ? (item.imageUrl.startsWith('http') ? item.imageUrl : `/${item.imageUrl}`) 
                                    : fallbackImgs[idx % fallbackImgs.length];

                                return (
                                    <div className="news-card" key={item._id || idx}>
                                        <div className="news-image">
                                            <img src={imageSrc} alt={item.title} loading="lazy" />
                                            <div className="news-category">{item.category || 'Missions'}</div>
                                        </div>
                                        <div className="news-content">
                                            <div className="news-date">{item.date || 'Recent Mission'}</div>
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
                                    <div className="news-image">
                                        <img src={newsNtakira} alt="Ntakira Mission" loading="lazy" />
                                        <div className="news-category">Missions</div>
                                    </div>
                                    <div className="news-content">
                                        <div className="news-date">August 2026 — Meru</div>
                                        <h3>Ntakira Mission: Carrying the Gospel to Meru</h3>
                                        <p>The Ntakira mission brought the Gospel through crusades, revivals, street evangelism and youth mentorship at Methodist Church of Kenya, Ntakira Parish.</p>
                                        <Link to="/programs" className="news-link">Read More <i className="fas fa-arrow-right"></i></Link>
                                    </div>
                                </div>
                                <div className="news-card">
                                    <div className="news-image">
                                        <img src={newsEmali} alt="Emali Mission" loading="lazy" />
                                        <div className="news-category">Outreach</div>
                                    </div>
                                    <div className="news-content">
                                        <div className="news-date">August 2026 — Makueni &amp; Kajiado</div>
                                        <h3>Emali Mission: 76 Souls Give Their Lives to Christ</h3>
                                        <p>The Emali mission at Methodist Church of Kenya saw 76 people surrender their lives to Christ through evangelism, prayer walks, crusades and compassion outreach.</p>
                                        <Link to="/programs" className="news-link">Read More <i className="fas fa-arrow-right"></i></Link>
                                    </div>
                                </div>
                                <div className="news-card">
                                    <div className="news-image">
                                        <img src={newsTala} alt="Tala Mission" loading="lazy" />
                                        <div className="news-category">Missions</div>
                                    </div>
                                    <div className="news-content">
                                        <div className="news-date">April 2026 — Machakos</div>
                                        <h3>Tala Mission: 170 Souls Saved in Machakos</h3>
                                        <p>Liberty Church, Tala hosted a powerful week-long outreach that saw 170 people come to Christ through street evangelism, prayer walks, crusades and youth workshops.</p>
                                        <Link to="/programs" className="news-link">Read More <i className="fas fa-arrow-right"></i></Link>
                                    </div>
                                </div>
                                <div className="news-card">
                                    <div className="news-image">
                                        <img src={newsGikumene} alt="Gikumene Mission" loading="lazy" />
                                        <div className="news-category">Missions</div>
                                    </div>
                                    <div className="news-content">
                                        <div className="news-date">Dec 2025 - Jan 2026 — Meru</div>
                                        <h3>Gikumene Mission: Reaching Meru for Christ</h3>
                                        <p>Impactful moments from the Gikumene mission, featuring community outreach, dynamic youth engagements, and open-air crusades.</p>
                                        <Link to="/programs" className="news-link">Read More <i className="fas fa-arrow-right"></i></Link>
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
