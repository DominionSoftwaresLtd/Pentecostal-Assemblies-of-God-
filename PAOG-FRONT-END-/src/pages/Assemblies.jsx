import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo ngungo.png';
import bishopPhoto from '../assets/Bishop Clement Simba Overseer.jpg';
import {
  Church,
  MapPin,
  User,
  Clock,
  Phone,
  Calendar,
  Shield,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Award
} from 'lucide-react';

const STATIC_ASSEMBLIES = [
  // Mbeere District Assemblies
  {
    _id: 'asm-ngungo',
    name: 'Pentecostal Assemblies of God - Ngungo Assembly',
    shortName: 'Ngungo Assembly',
    district: 'Mbeere District',
    county: 'Embu County',
    isHeadquarter: true,
    status: 'District Headquarters Assembly',
    leader: 'Bishop Rev. Clement Simba & Ngungo Ministerial Council',
    services: [
      { name: 'Sunday School', time: '8:00 AM - 10:00 AM' },
      { name: 'English Service', time: '8:00 AM - 10:00 AM' },
      { name: 'Main Service', time: '10:30 AM - 1:30 PM' },
      { name: 'Friday Fellowship', time: '7:00 PM - 9:00 PM' },
      { name: 'Youth Fellowship', time: 'Saturday 4:00 PM - 6:00 PM' }
    ],
    contactPhone: '+254 700 000 000',
    description: 'The Headquarter Church for Mbeere District, serving as the central seat of district administration, pastoral fellowship, and spiritual revivals.',
    order: 1
  },
  {
    _id: 'asm-kiamachanga',
    name: "Kiamachang'a Assembly",
    shortName: "Kiamachang'a Assembly",
    district: 'Mbeere District',
    county: 'Embu County',
    isHeadquarter: false,
    status: 'Active Assembly',
    leader: 'Rev. Rose Nyamwaro',
    services: [
      { name: 'Sunday Main Service', time: '10:00 AM - 1:00 PM' },
      { name: 'Midweek Fellowship', time: 'Wednesday 5:00 PM - 7:00 PM' }
    ],
    contactPhone: '+254 700 000 000',
    description: 'Vibrant local assembly in Mbeere District actively transforming lives through fervent prayer, discipleship, and evangelism.',
    order: 2
  },
  {
    _id: 'asm-rwika',
    name: 'Rwika Assembly',
    shortName: 'Rwika Assembly',
    district: 'Mbeere District',
    county: 'Embu County',
    isHeadquarter: false,
    status: 'Active Assembly',
    leader: 'Rev. Samuel Nderitu',
    services: [
      { name: 'Sunday Main Service', time: '10:00 AM - 1:00 PM' },
      { name: 'Weekly Fellowship', time: 'Thursday 5:30 PM - 7:00 PM' }
    ],
    contactPhone: '+254 700 000 000',
    description: 'A growing Christian family committed to sound biblical doctrine and community fellowship in the Rwika area.',
    order: 3
  },
  {
    _id: 'asm-kathera',
    name: 'Kathera Assembly',
    shortName: 'Kathera Assembly',
    district: 'Mbeere District',
    county: 'Embu County',
    isHeadquarter: false,
    status: 'Active Assembly',
    leader: 'Rev. John Ngochi (District Secretary)',
    services: [
      { name: 'Sunday Main Service', time: '10:00 AM - 1:00 PM' },
      { name: 'Prayer & Intercession', time: 'Friday 6:00 PM - 8:00 PM' }
    ],
    contactPhone: '+254 700 000 000',
    description: 'Pastored by District Secretary Rev. John Ngochi, Kathera Assembly is dedicated to nurturing disciples and evangelistic outreach.',
    order: 4
  },
  {
    _id: 'asm-ngangari',
    name: 'Ngangari Assembly',
    shortName: 'Ngangari Assembly',
    district: 'Mbeere District',
    county: 'Embu County',
    isHeadquarter: false,
    status: 'Active Assembly',
    leader: 'Rev. Clement Simba (Bishop & District Overseer)',
    services: [
      { name: 'Sunday Main Service', time: '10:00 AM - 1:00 PM' },
      { name: 'Midweek Revival', time: 'Wednesday 6:00 PM - 8:00 PM' }
    ],
    contactPhone: '+254 700 000 000',
    description: 'Shepherded by Bishop Rev. Clement Simba, this assembly stands as a beacon of holiness, Holy Spirit power, and church growth.',
    order: 5
  },
  {
    _id: 'asm-mugaari',
    name: 'Mugaari Assembly',
    shortName: 'Mugaari Assembly',
    district: 'Mbeere District',
    county: 'Embu County',
    isHeadquarter: false,
    status: 'Active Assembly',
    leader: 'Rev. Paul Nyaga',
    services: [
      { name: 'Sunday Main Service', time: '10:00 AM - 1:00 PM' },
      { name: 'Home Fellowships', time: 'Tuesday 5:00 PM - 6:30 PM' }
    ],
    contactPhone: '+254 700 000 000',
    description: 'Proclaiming the Gospel with power and compassionate care under Rev. Paul Nyaga in the Mugaari locality.',
    order: 6
  },
  {
    _id: 'asm-muumoni',
    name: 'Muumoni Assembly',
    shortName: 'Muumoni Assembly',
    district: 'Mbeere District',
    county: 'Embu County',
    isHeadquarter: false,
    status: 'Active Assembly',
    leader: 'Rev. Clement Simba (Bishop & District Overseer)',
    services: [
      { name: 'Sunday Main Service', time: '10:00 AM - 1:00 PM' },
      { name: 'Youth & Bible Study', time: 'Saturday 4:00 PM - 6:00 PM' }
    ],
    contactPhone: '+254 700 000 000',
    description: 'Faithfully overseen by Bishop Clement Simba, nurturing strong Christian families and passionate youth in Muumoni.',
    order: 7
  },
  {
    _id: 'asm-gikuru',
    name: 'Gikuru Assembly',
    shortName: 'Gikuru Assembly',
    district: 'Mbeere District',
    county: 'Embu County',
    isHeadquarter: false,
    status: 'Active Assembly',
    leader: 'Rev. David Kimanthi',
    services: [
      { name: 'Sunday Main Service', time: '10:00 AM - 1:00 PM' },
      { name: 'Prayer Service', time: 'Friday 5:30 PM - 7:30 PM' }
    ],
    contactPhone: '+254 700 000 000',
    description: 'Pastored by Rev. David Kimanthi, carrying the fire of evangelism and joyful praise in the Gikuru community.',
    order: 8
  },
  // Kyuso Kitui County Assemblies
  {
    _id: 'asm-marisi',
    name: 'Marisi Assembly',
    shortName: 'Marisi Assembly',
    district: 'Kyuso Circuit',
    county: 'Kitui County',
    isHeadquarter: false,
    status: 'Circuit Assembly',
    leader: 'Circuit Pastoral Team',
    services: [
      { name: 'Sunday Worship Service', time: '10:00 AM - 1:00 PM' }
    ],
    contactPhone: '+254 700 000 000',
    description: 'Serving believers in Marisi, Kyuso, Kitui County through passionate gospel outreach and community fellowship.',
    order: 9
  },
  {
    _id: 'asm-matooni',
    name: 'Matooni Assembly',
    shortName: 'Matooni Assembly',
    district: 'Kyuso Circuit',
    county: 'Kitui County',
    isHeadquarter: false,
    status: 'Circuit Assembly',
    leader: 'Circuit Pastoral Team',
    services: [
      { name: 'Sunday Worship Service', time: '10:00 AM - 1:00 PM' }
    ],
    contactPhone: '+254 700 000 000',
    description: 'Active assembly in Matooni, Kyuso, Kitui County, ministering hope, healing, and salvation to the surrounding region.',
    order: 10
  },
  {
    _id: 'asm-kyuso-placeholder',
    name: 'Kyuso Assembly (Assembly Placeholder)',
    shortName: 'Kyuso Assembly (Placeholder)',
    district: 'Kyuso Circuit',
    county: 'Kitui County',
    isHeadquarter: false,
    status: 'Upcoming / Circuit Assembly (To Be Updated)',
    leader: 'Circuit Pastoral Team (To Be Updated)',
    services: [
      { name: 'Sunday Worship Service', time: '10:00 AM - 1:00 PM' }
    ],
    contactPhone: '+254 700 000 000',
    description: 'Assembly location in Kyuso, Kitui County. Dedicated placeholder pending official assembly name confirmation.',
    order: 11
  }
];

const Assemblies = () => {
  const [assemblies, setAssemblies] = useState(STATIC_ASSEMBLIES);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'mbeere' | 'kyuso'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssemblies = async () => {
      try {
        const res = await fetch('/api/assemblies');
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.assemblies) && data.assemblies.length > 0) {
            setAssemblies(data.assemblies);
          }
        }
      } catch (err) {
        console.warn('Assemblies API unavailable, using bundled static dataset.', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssemblies();
  }, []);

  const filteredAssemblies = assemblies.filter(item => {
    if (activeTab === 'mbeere') return (item.district || '').toLowerCase().includes('mbeere');
    if (activeTab === 'kyuso') return (item.district || '').toLowerCase().includes('kyuso') || (item.county || '').toLowerCase().includes('kitui');
    return true;
  });

  const hqAssembly = assemblies.find(a => a.isHeadquarter) || assemblies[0];

  return (
    <main className="assemblies-page">
      {/* Banner */}
      <section className="page-banner" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%)' }}>
        <div className="banner-overlay" style={{ opacity: 0.6 }}></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">Network of Faith</span>
            <h1>District Assemblies &amp; Circuits</h1>
            <p>
              Pentecostal Assemblies of God — Ngungo Assembly serves as the Headquarter Church
              for Mbeere District, uniting vibrant assemblies across Mbeere and Kyuso, Kitui County.
            </p>
          </div>
        </div>
      </section>

      {/* Headquarter Spotlight Section */}
      <section className="section" style={{ background: '#f8fafc', padding: '50px 0 40px' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #fef3c7 100%)',
            border: '2px solid #f59e0b',
            borderRadius: '16px',
            padding: '36px 32px',
            boxShadow: '0 10px 30px rgba(245, 158, 11, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <img
                  src={logoImg}
                  alt="PAG Ngungo Assembly"
                  style={{
                    width: '84px',
                    height: '84px',
                    objectFit: 'contain',
                    borderRadius: '50%',
                    background: '#ffffff',
                    padding: '6px',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                    border: '2.5px solid #f59e0b',
                    flexShrink: 0
                  }}
                />
                <div>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#f59e0b',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    textTransform: 'uppercase',
                    padding: '5px 14px',
                    borderRadius: '50px',
                    letterSpacing: '0.05em'
                  }}>
                    <Award size={16} /> District Headquarter Church
                  </span>
                  <h2 style={{ fontSize: '1.9rem', color: '#1e293b', margin: '14px 0 6px', fontWeight: 800 }}>
                    Pentecostal Assemblies of God — Ngungo Assembly
                  </h2>
                  <p style={{ color: '#475569', fontSize: '1.02rem', margin: '0 0 16px', maxWidth: '800px', lineHeight: 1.6 }}>
                    As the headquarter church for Mbeere District, Ngungo Assembly serves as the mother church, administrative seat,
                    and spiritual hub. Under the leadership of <strong>Bishop Rev. Clement Simba</strong> and the Ministerial Council,
                    we nurture leaders, host district convocations, and advance the Gospel across all regional assemblies.
                  </p>
                  
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: '#ffffff',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    border: '1.5px solid #fed7aa',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    marginBottom: '8px'
                  }}>
                    <img
                      src={bishopPhoto}
                      alt="Bishop Rev. Clement Simba"
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        objectPosition: 'top',
                        border: '2px solid #f59e0b',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#b45309', fontWeight: 800 }}>Presiding Bishop &amp; District Overseer</div>
                      <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#1e293b' }}>Rev. Clement Simba</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-primary" style={{ padding: '10px 22px' }}>
                  Visit HQ Sanctuary
                </Link>
                <Link to="/leadership" className="btn btn-secondary" style={{ padding: '10px 22px' }}>
                  District Leadership
                </Link>
              </div>
            </div>

            {/* Service Times Grid for HQ */}
            <div style={{
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              padding: '20px 24px'
            }}>
              <div style={{ fontWeight: 800, color: '#1e293b', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} style={{ color: '#e67e22' }} />
                <span>Ngungo Assembly — Official Order of Services:</span>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '14px'
              }}>
                <div style={{ background: '#fffbeb', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                  <div style={{ fontSize: '0.85rem', color: '#b45309', fontWeight: 700 }}>Sunday Morning</div>
                  <div style={{ fontWeight: 800, color: '#1e293b' }}>Sunday School</div>
                  <div style={{ fontSize: '0.9rem', color: '#475569' }}>8:00 AM – 10:00 AM</div>
                </div>

                <div style={{ background: '#eff6ff', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                  <div style={{ fontSize: '0.85rem', color: '#1d4ed8', fontWeight: 700 }}>Sunday Morning</div>
                  <div style={{ fontWeight: 800, color: '#1e293b' }}>English Service</div>
                  <div style={{ fontSize: '0.9rem', color: '#475569' }}>8:00 AM – 10:00 AM</div>
                </div>

                <div style={{ background: '#f0fdf4', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                  <div style={{ fontSize: '0.85rem', color: '#15803d', fontWeight: 700 }}>Sunday Celebration</div>
                  <div style={{ fontWeight: 800, color: '#1e293b' }}>Main Service</div>
                  <div style={{ fontSize: '0.9rem', color: '#475569' }}>10:30 AM – 1:30 PM</div>
                </div>

                <div style={{ background: '#faf5ff', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #a855f7' }}>
                  <div style={{ fontSize: '0.85rem', color: '#7e22ce', fontWeight: 700 }}>Midweek Encounter</div>
                  <div style={{ fontWeight: 800, color: '#1e293b' }}>Friday Fellowship</div>
                  <div style={{ fontSize: '0.9rem', color: '#475569' }}>7:00 PM – 9:00 PM</div>
                </div>

                <div style={{ background: '#fff1f2', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #f43f5e' }}>
                  <div style={{ fontSize: '0.85rem', color: '#be123c', fontWeight: 700 }}>Youth Explosion</div>
                  <div style={{ fontWeight: 800, color: '#1e293b' }}>Youth Fellowship</div>
                  <div style={{ fontSize: '0.9rem', color: '#475569' }}>Saturday 4:00 PM – 6:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assemblies Filter & Directory */}
      <section className="section" style={{ padding: '40px 0 80px' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '36px', textAlign: 'center' }}>
            <span className="section-subtitle">Assemblies Directory</span>
            <h2 className="section-title">Our Assemblies &amp; Circuits</h2>
            <p className="section-description" style={{ maxWidth: '720px', margin: '0 auto' }}>
              Explore the assemblies comprising Mbeere District along with our extension circuit assemblies in Kyuso, Kitui County.
            </p>

            {/* Filter Tabs */}
            <div style={{
              display: 'inline-flex',
              background: '#f1f5f9',
              padding: '6px',
              borderRadius: '50px',
              marginTop: '24px',
              gap: '6px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => setActiveTab('all')}
                style={{
                  border: 'none',
                  padding: '9px 22px',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  background: activeTab === 'all' ? '#e67e22' : 'transparent',
                  color: activeTab === 'all' ? '#ffffff' : '#475569'
                }}
              >
                All Assemblies ({assemblies.length})
              </button>

              <button
                onClick={() => setActiveTab('mbeere')}
                style={{
                  border: 'none',
                  padding: '9px 22px',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  background: activeTab === 'mbeere' ? '#e67e22' : 'transparent',
                  color: activeTab === 'mbeere' ? '#ffffff' : '#475569'
                }}
              >
                Mbeere District (8)
              </button>

              <button
                onClick={() => setActiveTab('kyuso')}
                style={{
                  border: 'none',
                  padding: '9px 22px',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  background: activeTab === 'kyuso' ? '#e67e22' : 'transparent',
                  color: activeTab === 'kyuso' ? '#ffffff' : '#475569'
                }}
              >
                Kyuso Circuit — Kitui County (3)
              </button>
            </div>
          </div>

          {/* Assemblies Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {filteredAssemblies.map((asm, idx) => {
              const isHq = asm.isHeadquarter;
              return (
                <div
                  key={asm._id || idx}
                  style={{
                    background: '#ffffff',
                    borderRadius: '14px',
                    border: isHq ? '2px solid #f59e0b' : '1px solid #e2e8f0',
                    boxShadow: isHq ? '0 12px 28px rgba(245, 158, 11, 0.14)' : '0 4px 16px rgba(0,0,0,0.04)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = isHq ? '0 12px 28px rgba(245, 158, 11, 0.14)' : '0 4px 16px rgba(0,0,0,0.04)';
                  }}
                >
                  {isHq && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: '#fef3c7',
                      color: '#b45309',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '3px 10px',
                      borderRadius: '50px',
                      border: '1px solid #fde68a'
                    }}>
                      HQ CHURCH
                    </div>
                  )}

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e67e22', marginBottom: '8px' }}>
                      <Church size={20} />
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {asm.district} • {asm.county}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', marginBottom: '10px', lineHeight: 1.35 }}>
                      {asm.name}
                    </h3>

                    {/* Minister in charge */}
                    <div style={{
                      background: '#f8fafc',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      marginBottom: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#e0e7ff',
                        color: '#4338ca',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        flexShrink: 0
                      }}>
                        <User size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Minister In-Charge</div>
                        <div style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: 700 }}>{asm.leader}</div>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.55, marginBottom: '16px' }}>
                      {asm.description}
                    </p>

                    {/* Services list */}
                    {asm.services && asm.services.length > 0 && (
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontSize: '0.76rem', color: '#475569', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                          Service Gatherings:
                        </div>
                        <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                          {asm.services.map((srv, si) => (
                            <li key={si} style={{ fontSize: '0.84rem', color: '#334155', display: 'flex', justifyContent: 'space-between', padding: '3px 0', borderBottom: '1px dashed #f1f5f9' }}>
                              <span style={{ fontWeight: 600 }}>{srv.name}:</span>
                              <span style={{ color: '#e67e22', fontWeight: 700 }}>{srv.time}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div style={{ paddingTop: '14px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      color: isHq ? '#b45309' : '#059669',
                      background: isHq ? '#fef3c7' : '#ecfdf5',
                      padding: '4px 10px',
                      borderRadius: '4px'
                    }}>
                      {asm.status}
                    </span>

                    <Link
                      to="/contact"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: '#e67e22',
                        fontWeight: 700,
                        fontSize: '0.86rem'
                      }}
                    >
                      Connect <ChevronRight size={15} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* District Leadership Summary Banner */}
      <section style={{ background: '#1e293b', color: '#ffffff', padding: '50px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 36px' }}>
            <span style={{ color: '#f59e0b', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.06em' }}>
              Mbeere District Governance
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '8px 0 12px', color: '#ffffff' }}>
              District Leadership Executive
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.98rem', lineHeight: 1.6 }}>
              Under the ecclesiastical oversight of Bishop Rev. Clement Simba, the Mbeere District Executive oversees,
              supports, and stewards the spiritual and administrative health of all constituent assemblies.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px'
          }}>
            {[
              { role: 'Bishop & Overseer', name: 'Rev. Clement Simba', desc: 'Presiding Bishop, Mbeere District' },
              { role: 'Deacon', name: 'David Robert', desc: 'Ngungo Assembly Diaconate' },
              { role: 'Treasurer', name: 'Michael Robert', desc: 'Ngungo Assembly Treasury' },
              { role: 'District Layman', name: 'John Matu', desc: 'Mbeere District Lay Ministries' },
              { role: 'District Clerk', name: 'Charles Njagi', desc: 'District Records & Administration' },
              { role: 'District Secretary', name: 'Rev. John Ngochi', desc: 'Pastor, Kathera Assembly' },
              { role: 'District Treasurer', name: 'Rev. Shem Mugo', desc: 'District Financial Management' },
            ].map((leader, li) => (
              <div key={li} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '18px',
                textAlign: 'center'
              }}>
                <div style={{ color: '#f59e0b', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                  {leader.role}
                </div>
                <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.05rem', marginBottom: '4px' }}>
                  {leader.name}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                  {leader.desc}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link to="/leadership" className="btn btn-primary" style={{ padding: '12px 28px' }}>
              View Complete Leadership Profiles &amp; Ministers
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Assemblies;
