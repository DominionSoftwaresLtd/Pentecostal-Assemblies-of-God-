import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import bannerPhoto from '../assets/gikumene meru14.JPG';
import storyPhoto1 from '../assets/Tala mission6.jpg';
import storyPhoto2 from '../assets/Emali mission6.jpg';
import storyPhoto3 from '../assets/gikumene meru1.JPG';

const values = [
  { icon: 'fas fa-bible',          label: 'Biblical Authority',  desc: 'Everything we do is rooted in and guided by the Word of God.' },
  { icon: 'fas fa-hands-praying',  label: 'Prayer',              desc: 'We seek God in prayer before and throughout every mission.' },
  { icon: 'fas fa-heart',          label: 'Compassion',          desc: 'We meet people at their point of need with the love of Christ.' },
  { icon: 'fas fa-star',           label: 'Excellence',          desc: 'We give our best to God in everything we do.' },
  { icon: 'fas fa-handshake',      label: 'Integrity',           desc: 'We uphold honesty and transparency in all our dealings.' },
  { icon: 'fas fa-users',          label: 'Unity',               desc: 'We work together as one body, honouring and serving one another.' },
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
    date: 'Late 2024',
    icon: 'fas fa-users',
    title: 'Commission 2024 Conference',
    text: 'At the Commission 2024 Conference hosted by Focus Kenya at Kabarak University, the burden to reach the unreached and disciple nations was powerfully ignited in our hearts.',
  },
  {
    date: 'Early 2025',
    icon: 'fas fa-video',
    title: 'Humble Beginnings at Kisii University',
    text: 'The foundational steps began while Vincent Mwenda (Founder and Director) and Kennedy Mutuku (Digital Infrastructure Director) were students at Kisii University. They started by shooting evangelism clips in Kennedy\'s house, inviting fellow students to discuss different biblical topics, and uploading them to Kingdom Enlightenment platforms.',
  },
  {
    date: '15th March 2025',
    icon: 'fas fa-mountain',
    title: 'Vision Confirmed at Karlo Prayer Mountain',
    text: 'Seeking clearer direction, Vincent and Kennedy dedicated time for prayer and fasting at Karlo Prayer Mountain. Following this profound spiritual encounter, the vision was fully confirmed and Kingdom Enlightenment Ministries was officially started to fulfill the Great Commission.',
  },
  {
    date: 'Ongoing from 2025',
    icon: 'fas fa-book-open',
    title: 'Monday Online Bible Study Fellowships',
    text: 'Regular Monday online Bible study fellowships nurtured spiritual growth, unity, prayer and a passion for evangelism — becoming a training ground that prepared the team for active mission work.',
  },
  {
    date: '18–24 August 2025',
    icon: 'fas fa-globe-africa',
    title: 'First Mission — Rwanyange, Meru County',
    text: 'The team held its very first field mission outreach at East Africa Pentecostal Church in Rwanyange, the home church of our founder, Vincent Mwenda. This milestone confirmed God\'s call upon the team and marked a powerful beginning to our field ministry.',
    souls: '145 Souls Won',
  },
  {
    date: '29 Dec 2025 – 4 Jan 2026',
    icon: 'fas fa-globe-africa',
    title: 'Second Mission — Gikumene, Meru County',
    text: 'At Deliverance Church International, Gikumene, we witnessed God\'s faithfulness through transformed lives, renewed faith and the continued advancement of the Gospel.',
    souls: '130 Souls Won',
  },
  {
    date: '20–26 April 2026',
    icon: 'fas fa-globe-africa',
    title: 'Tala Mission — Machakos County',
    text: 'The team ministered at Liberty Center, Tala, carrying the Gospel through evangelism, outreach, prayer and community engagement.',
    souls: '170 Souls Won',
  },
  {
    date: '10–16 August 2026',
    icon: 'fas fa-globe-africa',
    title: 'Emali Mission — Makueni & Kajiado',
    text: 'The team held a mission at Methodist Church of Kenya, Emali Town, reaching the community with the Gospel of Christ and demonstrating God\'s love through ministry and compassion.',
    souls: '76 Souls Won',
  },
  {
    date: '20–23 August 2026',
    icon: 'fas fa-globe-africa',
    title: 'Gaukene Mission — MCK Ntakira Circuit',
    text: 'The team continued its mission journey in Gaukene under the Methodist Church of Kenya Ntakira Circuit, proclaiming Christ, reaching communities and calling people to faith and transformation.',
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
      <section className="page-banner" style={{ backgroundImage: `url(${bannerPhoto})` }}>
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">Mbeere District Headquarters</span>
            <h1>About Our Church</h1>
            <p>Pentecostal Assemblies of God - Ngungo Assembly &bull; Bishop Rev Clement Simba, Overseer</p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section id="who-we-are" className="section about-intro-section">
        <div className="container">
          <div className="dept-grid">
            <div className="dept-content">
              <span className="section-subtitle">Who We Are</span>
              <h2 className="section-title">Pentecostal Assemblies of God - Ngungo Assembly</h2>
              <p className="lead">
                Pentecostal Assemblies of God (P.A.O.G) Ngungo Assembly proudly serves as the Headquarter Church for Mbeere District under the anointed leadership of <strong>Overseer Bishop Rev Clement Simba</strong>.
              </p>
              <p>
                As the district center, Ngungo Assembly is a spiritual beacon dedicated to passionate worship, biblical discipleship, fervent prayer, and community transformation. We provide oversight, fellowship, and pastoral direction to assemblies spread throughout Mbeere District and missionary extensions into Kyuso, Kitui County.
              </p>
              <p>
                Our mission is rooted in the Great Commission — calling men, women, youths, and children into personal salvation through our Lord Jesus Christ, baptizing them in the Holy Spirit, and nurturing them through active church departments and ministries.
              </p>
              <div className="about-quick-stats">
                <div className="aq-stat"><strong>HQ</strong><span>District Center</span></div>
                <div className="aq-stat"><strong>7+</strong><span>Mbeere Assemblies</span></div>
                <div className="aq-stat"><strong>3</strong><span>Kyuso Kitui Branches</span></div>
                <div className="aq-stat"><strong>8</strong><span>Depts &amp; Ministries</span></div>
              </div>
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
            <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px' }}>
              Connect &bull; Worship &bull; Partner
            </span>
            <h2>Worship With Us at Ngungo Assembly</h2>
            <p>
              Whether joining us for Sunday services, weekly fellowships, or partnering through our M-Pesa Paybill <strong>4136387</strong> (Account: <strong>YOUR NAME</strong>), we invite you to experience God's transformative love.
            </p>
            <p style={{ fontSize: '0.9rem', opacity: 0.85, margin: '6px 0 20px' }}>
              Bishop Rev Clement Simba (Overseer) &bull; P.O. Box 213-60113 Kiritiri Mbeere &bull; Tel: 0720140213
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">Contact Church</Link>
              <Link to="/donate" className="btn btn-secondary"><i className="fas fa-hand-holding-heart"></i> Give via M-Pesa</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default About;
