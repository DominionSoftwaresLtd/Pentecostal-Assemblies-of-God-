import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo ngungo.png';
import bishopPhoto from '../assets/Bishop Clement Simba Overseer.jpg';

const values = [
  { icon: 'fas fa-bible', label: 'Biblical Authority', desc: 'Everything we do is rooted in and guided by the Word of God.' },
  { icon: 'fas fa-hands-praying', label: 'Prayer', desc: 'We seek God in prayer before and throughout every mission.' },
  { icon: 'fas fa-heart', label: 'Compassion', desc: 'We meet people at their point of need with the love of Christ.' },
  { icon: 'fas fa-star', label: 'Excellence', desc: 'We give our best to God in everything we do.' },
  { icon: 'fas fa-handshake', label: 'Integrity', desc: 'We uphold honesty and transparency in all our dealings.' },
  { icon: 'fas fa-users', label: 'Unity', desc: 'We work together as one body, honouring and serving one another.' },
];

const faith = [
  'We believe in one God, eternally existing in three Persons: Father, Son and Holy Spirit.',
  'We believe in the full inspiration and authority of the Holy Scriptures as the Word of God.',
  'We believe in the deity and humanity of Jesus Christ, His virgin birth, sinless life, atoning death, bodily resurrection and imminent return.',
  'We believe in salvation by grace through faith in Jesus Christ alone.',
  'We believe in the present ministry of the Holy Spirit, by whose indwelling the Christian is enabled to live a godly life.',
  'We believe in the resurrection of the dead and the eternal life of believers with God.',
  'We believe in the Great Commission — the call to make disciples of all nations.',
];

const timeline = [
  {
    date: 'Foundational Years',
    icon: 'fas fa-landmark',
    title: 'Establishment of Pentecostal Assemblies of God in Mbeere',
    text: 'Evangelistic pioneers and missionary pastors planted the Pentecostal faith across Mbeere, establishing local assemblies rooted in prayer, Holy Spirit empowerment, and biblical sound doctrine.',
  },
  {
    date: 'Designation of District HQ',
    icon: 'fas fa-church',
    title: 'Ngungo Assembly Appointed District Headquarters',
    text: 'Due to its central position, fervent spiritual life, and mature congregation, Pentecostal Assemblies of God - Ngungo Assembly was ordained as the official Headquarter Church for Mbeere District.',
  },
  {
    date: 'District Expansion',
    icon: 'fas fa-map-marked-alt',
    title: 'Growth of the 8 Mbeere Assemblies',
    text: 'Under the oversight of the District Leadership Council and Bishop Rev. Clement Simba, assemblies flourished in Kiamachang\'a, Rwika, Kathera, Ngangari, Mugaari, Muumoni, and Gikuru, each guided by resident reverends.',
  },
  {
    date: 'Missionary Extension',
    icon: 'fas fa-globe-africa',
    title: 'Outreach to Kyuso Circuit, Kitui County',
    text: 'Extending beyond Mbeere district borders, missionary teams launched circuit assemblies in Kyuso, Kitui County, establishing Marisi Assembly, Matooni Assembly, and ongoing church plants.',
  },
  {
    date: 'Present & Future',
    icon: 'fas fa-fire',
    title: 'Vibrant Worship & Generation Next',
    text: 'Today, Ngungo Assembly hosts thriving Sunday English & Main services, Friday night revivals, Saturday Youth fellowships, and four active church departments (Women, Men, Youth, and Sunday School).',
  },
];

const About = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const timer = setTimeout(() => {
      const el = document.querySelector(hash);
      if (!el) return;
      const headerHeight = document.querySelector('.site-header-wrapper')?.offsetHeight || 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 120);
    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <main className="about-page">

      {/* Banner */}
      <section className="page-banner" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #292524 100%)' }}>
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">Who We Are</span>
            <h1>Pentecostal Assemblies of God</h1>
            <p>Ngungo Assembly — Proudly serving as the Headquarter Church for Mbeere District.</p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section id="who-we-are" className="section about-intro-section">
        <div className="container">
          <div className="dept-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
              <div className="dept-content">
                <span className="section-subtitle">Mother Church</span>
                <h2 className="section-title">Pentecostal Assemblies of God - Ngungo Assembly</h2>
                <p className="lead">
                  Pentecostal Assemblies of God - Ngungo Assembly is a thriving, Spirit-filled church family
                  and the designated <strong>Headquarter Church for Mbeere District</strong>.
                </p>
                <p>
                  As the district headquarters, Ngungo Assembly serves as the central pillar of administrative governance,
                  pastoral fellowship, spiritual mentorship, and united missionary revivals across Mbeere District and
                  our expanding circuit in Kyuso, Kitui County.
                </p>
                <p>
                  Led by <strong>Bishop Rev. Clement Simba</strong> and the Ministerial Council, our mission is to glorify God
                  by preaching the uncompromised Word, nurturing believers through dedicated departments, and winning souls
                  into God's eternal Kingdom.
                </p>
                <div className="about-quick-stats">
                  <div className="aq-stat"><strong>8</strong><span>Mbeere Assemblies</span></div>
                  <div className="aq-stat"><strong>3</strong><span>Kyuso Assemblies</span></div>
                  <div className="aq-stat"><strong>4</strong><span>Church Depts</span></div>
                  <div className="aq-stat"><strong>4</strong><span>Sanctuary Ministries</span></div>
                </div>
              </div>

              <div style={{ textAlign: 'center', padding: '16px' }}>
                <div style={{
                  display: 'inline-block',
                  background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)',
                  padding: '28px 24px',
                  borderRadius: '24px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.14)',
                  border: '2px solid rgba(232,125,30,0.35)'
                }}>
                  <img
                    src={logoImg}
                    alt="Pentecostal Assemblies of God - Ngungo Assembly Official Seal"
                    style={{
                      width: 'min(65vw, 200px)',
                      height: 'min(65vw, 200px)',
                      objectFit: 'contain',
                      borderRadius: '50%',
                      background: '#ffffff',
                      padding: '8px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                    }}
                  />
                  <div style={{ marginTop: '16px', color: '#f8fafc', fontWeight: 800, fontSize: '0.98rem', letterSpacing: '0.05em' }}>
                    OFFICIAL DISTRICT SEAL
                  </div>
                  <div style={{ color: '#E87D1E', fontSize: '0.82rem', fontWeight: 700, marginTop: '2px' }}>
                    Mbeere District Headquarters
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* District Headquarters & Assemblies Circuit */}
      <section id="district-hq" className="section" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="section-subtitle">District Jurisdiction</span>
            <h2 className="section-title">Mbeere District &amp; Kyuso Circuit Assemblies</h2>
            <p className="section-description" style={{ maxWidth: '720px', margin: '0 auto' }}>
              Ngungo Assembly provides episcopal oversight, spiritual fellowship, and administrative coordination to all constituent assemblies.
            </p>
          </div>

          {/* District Overseer Spotlight */}
          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            borderRadius: '14px',
            padding: '20px 26px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img
                src={bishopPhoto}
                alt="Bishop Rev. Clement Simba"
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  border: '3px solid #e67e22',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                  flexShrink: 0
                }}
              />
              <div>
                <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#e67e22', fontWeight: 800 }}>Episcopal Leadership</span>
                <h3 style={{ margin: '2px 0', fontSize: '1.2rem', color: '#ffffff', fontWeight: 800 }}>Bishop Rev. Clement Simba</h3>
                <p style={{ margin: 0, fontSize: '0.86rem', color: '#cbd5e1' }}>Presiding Bishop &amp; District Overseer | Mbeere District &amp; Kyuso Circuit</p>
              </div>
            </div>
            <Link to="/leadership" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.86rem' }}>
              Leadership Directory &rarr;
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {/* Mbeere District Card */}
            <div style={{ background: '#ffffff', borderRadius: '14px', border: '2px solid #e67e22', padding: '28px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e67e22', marginBottom: '12px' }}>
                <i className="fas fa-church" style={{ fontSize: '1.3rem' }}></i>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#1e293b' }}>Mbeere District Assemblies</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '16px' }}>
                Headquartered at <strong>Ngungo Assembly</strong> under Bishop Rev. Clement Simba:
              </p>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                {[
                  { name: "Kiamachang'a Assembly", pastor: 'Rev. Rose Nyamwaro' },
                  { name: 'Rwika Assembly', pastor: 'Rev. Samuel Nderitu' },
                  { name: 'Kathera Assembly', pastor: 'Rev. John Ngochi' },
                  { name: 'Ngangari Assembly', pastor: 'Rev. Clement Simba' },
                  { name: 'Mugaari Assembly', pastor: 'Rev. Paul Nyaga' },
                  { name: 'Muumoni Assembly', pastor: 'Rev. Clement Simba' },
                  { name: 'Gikuru Assembly', pastor: 'Rev. David Kimanthi' },
                  { name: 'Ngungo Assembly', pastor: 'Bishop Rev. Clement Simba & Ministerial Council (District HQ)' },
                ].map((item, idx) => (
                  <li key={idx} style={{ padding: '8px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                    <span style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.92rem' }}>
                      {idx + 1}. {item.name}
                    </span>
                    <span style={{ color: '#e67e22', fontSize: '0.84rem', fontWeight: 600, background: '#fff7ed', padding: '2px 8px', borderRadius: '4px' }}>
                      {item.pastor}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kyuso Kitui County Card */}
            <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #cbd5e1', padding: '28px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#2563eb', marginBottom: '12px' }}>
                <i className="fas fa-map-marker-alt" style={{ fontSize: '1.3rem' }}></i>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#1e293b' }}>Kyuso Circuit Assemblies (Kitui County)</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '16px' }}>
                Missionary and church plants extending to Kyuso in Kitui County:
              </p>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                {[
                  { name: 'Marisi Assembly', status: 'Active Assembly' },
                  { name: 'Matooni Assembly', status: 'Active Assembly' },
                  { name: 'Kyuso Assembly (Placeholder)', status: 'Circuit Plant (Name To Be Updated)' },
                ].map((item, idx) => (
                  <li key={idx} style={{ padding: '12px 0', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.95rem' }}>
                      {idx + 1}. {item.name}
                    </span>
                    <span style={{ color: '#2563eb', fontSize: '0.82rem', fontWeight: 600, background: '#eff6ff', padding: '3px 8px', borderRadius: '4px' }}>
                      {item.status}
                    </span>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: '24px', background: '#f8fafc', padding: '14px', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                  <i className="fas fa-info-circle" style={{ color: '#2563eb', marginRight: '6px' }}></i>
                  All assemblies participate in combined district general conferences, annual youth rallies, and departmental leadership training hosted at Ngungo HQ.
                </p>
              </div>

              <div style={{ marginTop: '20px' }}>
                <Link to="/assemblies" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                  Explore Full Assemblies Directory &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order of Services */}
      <section id="order-of-services" className="section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="section-subtitle">Sanctuary Timetable</span>
            <h2 className="section-title">Official Order of Services</h2>
            <p className="section-description" style={{ maxWidth: '680px', margin: '0 auto' }}>
              We welcome all believers and visitors to our regular weekly fellowships at Pentecostal Assemblies of God - Ngungo Assembly Sanctuary.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '22px 18px', textAlign: 'center' }}>
              <div style={{ color: '#b45309', fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase' }}>Sunday 8:00 AM – 10:00 AM</div>
              <h3 style={{ fontSize: '1.2rem', color: '#1e293b', margin: '8px 0 4px', fontWeight: 800 }}>Sunday School</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Dedicated children &amp; youth Bible classes taught by trained teachers.</p>
            </div>

            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '22px 18px', textAlign: 'center' }}>
              <div style={{ color: '#1d4ed8', fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase' }}>Sunday 8:00 AM – 10:00 AM</div>
              <h3 style={{ fontSize: '1.2rem', color: '#1e293b', margin: '8px 0 4px', fontWeight: 800 }}>English Service</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Early morning worship, scripture reading, and practical life application.</p>
            </div>

            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '22px 18px', textAlign: 'center' }}>
              <div style={{ color: '#15803d', fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase' }}>Sunday 10:30 AM – 1:30 PM</div>
              <h3 style={{ fontSize: '1.2rem', color: '#1e293b', margin: '8px 0 4px', fontWeight: 800 }}>Main Service</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Flagship worship celebration with Praise &amp; Worship, Choir, and the Word of God.</p>
            </div>

            <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '12px', padding: '22px 18px', textAlign: 'center' }}>
              <div style={{ color: '#7e22ce', fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase' }}>Friday 7:00 PM – 9:00 PM</div>
              <h3 style={{ fontSize: '1.2rem', color: '#1e293b', margin: '8px 0 4px', fontWeight: 800 }}>Friday Fellowship</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Midweek prayer, intercession, deliverance, and divine breakthroughs.</p>
            </div>

            <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '12px', padding: '22px 18px', textAlign: 'center' }}>
              <div style={{ color: '#be123c', fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase' }}>Saturday 4:00 PM – 6:00 PM</div>
              <h3 style={{ fontSize: '1.2rem', color: '#1e293b', margin: '8px 0 4px', fontWeight: 800 }}>Youth Fellowship</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Empowering youth through worship, musical instruments, seminars &amp; fellowship.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Order of Services */}
      <section id="order-of-services" className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Weekly Schedule</span>
            <h2 className="section-title">Order of Services</h2>
          </div>
          <p style={{ maxWidth: '700px', color: '#64748b', fontSize: '1rem', lineHeight: '1.7', marginBottom: '30px' }}>
            We welcome everyone to worship with us at Ngungo Assembly Sanctuary. Here is our regular weekly schedule:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '24px 20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#E87D1E', letterSpacing: '0.5px' }}>Sunday Service</span>
              <h3 style={{ fontSize: '1.2rem', margin: '8px 0 6px', color: '#1e293b' }}>English Service</h3>
              <div style={{ color: '#E87D1E', fontWeight: 700, fontSize: '0.95rem' }}><i className="fas fa-clock"></i> 8:00 AM – 10:00 AM</div>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '8px' }}>Praise, worship, and biblical teaching in English.</p>
            </div>

            <div style={{ background: '#fff', borderRadius: '12px', padding: '24px 20px', border: '2px solid #E87D1E', boxShadow: '0 8px 16px rgba(232,125,30,0.1)' }}>
              <span style={{ background: '#E87D1E', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>Main Service</span>
              <h3 style={{ fontSize: '1.25rem', margin: '8px 0 6px', color: '#1e293b' }}>Main Worship Service</h3>
              <div style={{ color: '#1e293b', fontWeight: 700, fontSize: '0.95rem' }}><i className="fas fa-clock" style={{ color: '#E87D1E' }}></i> 10:30 AM – 1:30 PM</div>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '8px' }}>Celebration, choir, and powerful word by Bishop Clement Simba.</p>
            </div>

            <div style={{ background: '#fff', borderRadius: '12px', padding: '24px 20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#10B981', letterSpacing: '0.5px' }}>Children Ministry</span>
              <h3 style={{ fontSize: '1.2rem', margin: '8px 0 6px', color: '#1e293b' }}>Sunday School</h3>
              <div style={{ color: '#10B981', fontWeight: 700, fontSize: '0.95rem' }}><i className="fas fa-clock"></i> 8:00 AM – 10:00 AM</div>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '8px' }}>Dedicated teachers nurturing children in scripture.</p>
            </div>

            <div style={{ background: '#fff', borderRadius: '12px', padding: '24px 20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#6366f1', letterSpacing: '0.5px' }}>Weekly Fellowship</span>
              <h3 style={{ fontSize: '1.2rem', margin: '8px 0 6px', color: '#1e293b' }}>Friday Fellowship</h3>
              <div style={{ color: '#6366f1', fontWeight: 700, fontSize: '0.95rem' }}><i className="fas fa-clock"></i> 7:00 PM – 9:00 PM</div>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '8px' }}>Evening intercessory prayers and fellowship.</p>
            </div>

            <div style={{ background: '#fff', borderRadius: '12px', padding: '24px 20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#ec4899', letterSpacing: '0.5px' }}>Youth Ministry</span>
              <h3 style={{ fontSize: '1.2rem', margin: '8px 0 6px', color: '#1e293b' }}>Youth Fellowship</h3>
              <div style={{ color: '#ec4899', fontWeight: 700, fontSize: '0.95rem' }}><i className="fas fa-clock"></i> Saturday 4:00 PM – 6:00 PM</div>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '8px' }}>Empowering youth through discussions, praise, and prayer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* District Assemblies Network */}
      <section id="assemblies" className="section" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Fellowship Network</span>
            <h2 className="section-title">Mbeere District Assemblies</h2>
          </div>
          <p style={{ maxWidth: '750px', color: '#64748b', fontSize: '1rem', lineHeight: '1.7', marginBottom: '30px' }}>
            Mbeere District is comprised of eight active assemblies united under District Overseer Bishop Clement Simba, working in harmony to proclaim the gospel of Jesus Christ:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '35px' }}>
            <div style={{ background: '#fff9f0', border: '2px solid #E87D1E', borderRadius: '12px', padding: '20px' }}>
              <span style={{ background: '#E87D1E', color: '#fff', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>District Headquarters</span>
              <h4 style={{ margin: '8px 0 4px', fontSize: '1.2rem', color: '#1e293b' }}>Ngungo Assembly</h4>
              <p style={{ color: '#E87D1E', fontWeight: 700, margin: '0 0 6px', fontSize: '0.95rem' }}>Bishop Rev Clement Simba (Overseer)</p>
              <p style={{ margin: 0, fontSize: '0.83rem', color: '#64748b' }}>P.O. Box 213-60113 Kiritiri Mbeere &bull; Tel: 0720140213 &bull; Paybill 4136387</p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
              <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Assembly #1</span>
              <h4 style={{ margin: '8px 0 4px', fontSize: '1.15rem', color: '#1e293b' }}>Kiamachang'a Assembly</h4>
              <p style={{ color: '#10B981', fontWeight: 700, margin: '0 0 6px', fontSize: '0.95rem' }}>Rev Rose Nyamwaro</p>
              <p style={{ margin: 0, fontSize: '0.83rem', color: '#64748b' }}>Active Sunday worship, women, men and youth fellowships.</p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
              <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Assembly #2</span>
              <h4 style={{ margin: '8px 0 4px', fontSize: '1.15rem', color: '#1e293b' }}>Rwika Assembly</h4>
              <p style={{ color: '#2563eb', fontWeight: 700, margin: '0 0 6px', fontSize: '0.95rem' }}>Rev Samuel Nderitu</p>
              <p style={{ margin: 0, fontSize: '0.83rem', color: '#64748b' }}>Shepherding the Rwika congregation with sound biblical preaching.</p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
              <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Assembly #3</span>
              <h4 style={{ margin: '8px 0 4px', fontSize: '1.15rem', color: '#1e293b' }}>Kathera Assembly</h4>
              <p style={{ color: '#7c3aed', fontWeight: 700, margin: '0 0 6px', fontSize: '0.95rem' }}>Rev John Ngochi (District Secretary)</p>
              <p style={{ margin: 0, fontSize: '0.83rem', color: '#64748b' }}>Vibrant praise and discipleship center.</p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
              <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Assembly #4</span>
              <h4 style={{ margin: '8px 0 4px', fontSize: '1.15rem', color: '#1e293b' }}>Ngangari Assembly</h4>
              <p style={{ color: '#E87D1E', fontWeight: 700, margin: '0 0 6px', fontSize: '0.95rem' }}>Rev Clement Simba</p>
              <p style={{ margin: 0, fontSize: '0.83rem', color: '#64748b' }}>Serving the Ngangari congregation with fervent prayer and word.</p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
              <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Assembly #5</span>
              <h4 style={{ margin: '8px 0 4px', fontSize: '1.15rem', color: '#1e293b' }}>Mugaari Assembly</h4>
              <p style={{ color: '#059669', fontWeight: 700, margin: '0 0 6px', fontSize: '0.95rem' }}>Rev Paul Nyaga</p>
              <p style={{ margin: 0, fontSize: '0.83rem', color: '#64748b' }}>Active community outreach and Christian education.</p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
              <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Assembly #6</span>
              <h4 style={{ margin: '8px 0 4px', fontSize: '1.15rem', color: '#1e293b' }}>Muumoni Assembly</h4>
              <p style={{ color: '#E87D1E', fontWeight: 700, margin: '0 0 6px', fontSize: '0.95rem' }}>Rev Clement Simba</p>
              <p style={{ margin: 0, fontSize: '0.83rem', color: '#64748b' }}>Nurturing believers and youth discipleship.</p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
              <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Assembly #7</span>
              <h4 style={{ margin: '8px 0 4px', fontSize: '1.15rem', color: '#1e293b' }}>Gikuru Assembly</h4>
              <p style={{ color: '#9333ea', fontWeight: 700, margin: '0 0 6px', fontSize: '0.95rem' }}>Rev David Kimanthi</p>
              <p style={{ margin: 0, fontSize: '0.83rem', color: '#64748b' }}>Worshiping God in spirit and truth in Gikuru.</p>
            </div>
            <p>
              From the early pioneering of Pentecostal Assemblies of God across Mbeere to the vibrant ministry
              of Ngungo Assembly as the District Headquarters, this is the story of God's faithfulness across generations.
            </p>
          </div>

          {/* Kyuso Kitui County Section */}
          <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '14px', padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <i className="fas fa-map-location-dot" style={{ color: '#16a34a', fontSize: '1.4rem' }}></i>
              <div>
                <h3 style={{ margin: 0, color: '#166534', fontSize: '1.25rem' }}>Assemblies in Kyuso, Kitui County</h3>
                <p style={{ margin: 0, color: '#15803d', fontSize: '0.88rem' }}>Fellowship branches and missionary assemblies extending the kingdom</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div style={{ background: '#fff', borderRadius: '10px', padding: '18px', border: '1px solid #bbf7d0' }}>
                <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Kitui County Branch #1</span>
                <h4 style={{ margin: '6px 0 4px', fontSize: '1.1rem', color: '#166534' }}>Marisi Assembly</h4>
                <p style={{ margin: 0, fontSize: '0.83rem', color: '#4b5563' }}>Kyuso, Kitui County</p>
              </div>
              <div style={{ background: '#fff', borderRadius: '10px', padding: '18px', border: '1px solid #bbf7d0' }}>
                <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Kitui County Branch #2</span>
                <h4 style={{ margin: '6px 0 4px', fontSize: '1.1rem', color: '#166534' }}>Matooni Assembly</h4>
                <p style={{ margin: 0, fontSize: '0.83rem', color: '#4b5563' }}>Kyuso, Kitui County</p>
              </div>
              <div style={{ background: '#fff', borderRadius: '10px', padding: '18px', border: '1px dashed #86efac' }}>
                <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Kitui County Branch #3</span>
                <h4 style={{ margin: '6px 0 4px', fontSize: '1.1rem', color: '#166534' }}>Kyuso Assembly</h4>
                <p style={{ margin: 0, fontSize: '0.83rem', color: '#6b7280' }}>Kyuso, Kitui County [Assembly Details to be confirmed]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Mission Values */}
      <section id="vision-mission" className="vision-mission-section">
        <div className="container">
          <div className="vm-compact-list">
            <div className="vm-compact-item">
              <h3>Our Vision</h3>
              <p>To see every person in Kenya and beyond encounter the transforming love of Jesus Christ and become a committed disciple who impacts their world for God's Kingdom.</p>
            </div>
            <div className="vm-compact-item">
              <h3>Our Mission</h3>
              <p>To glorify God by evangelizing the lost, discipling believers, equipping leaders and establishing communities of faith that reproduce and multiply across nations.</p>
            </div>
            <div className="vm-compact-item">
              <h3>Our Mandate</h3>
              <p>The Great Commission — "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you." — Matthew 28:19-20 (NIV)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section values-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">What Drives Us</span>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="values-compact-list">
            {values.map((v, i) => (
              <div className="value-compact-item" key={i}>
                <h4><i className={v.icon}></i> {v.label}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statement of Faith */}
      <section id="statement-of-faith" className="section faith-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">What We Believe</span>
            <h2 className="section-title">Statement of Faith</h2>
          </div>
          <div className="faith-list">
            {faith.map((point, i) => (
              <div className="faith-item" key={i}>
                <div className="faith-num">{String(i + 1).padStart(2, '0')}</div>
                <p>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Join Our Church Family</h2>
            <p>Whether through Sunday worship, prayer fellowship, or serving in our departments — there is a blessed place for you at Pentecostal Assemblies of God - Ngungo Assembly.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">Connect With Pastors</Link>
              <Link to="/assemblies" className="btn btn-secondary">Find An Assembly</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default About;
