import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  Users,
  Compass
} from 'lucide-react';

const scrollToHash = (hash) => {
  if (!hash) return;
  const el = document.querySelector(hash);
  if (!el) return;
  const headerHeight = document.querySelector('.site-header-wrapper')?.offsetHeight || 80;
  const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
  window.scrollTo({ top, behavior: 'smooth' });
};

const DEPARTMENTS = [
  {
    id: 'women',
    num: '01',
    name: 'Women Department',
    tagline: "Mother's Fellowship, Prayer Intercession & Compassion",
    schedule: 'Weekly Prayer, Fasting & Home Fellowship',
    verse: '"Charm is deceptive, and beauty is fleeting; but a woman who fears the Lord is to be praised." — Proverbs 31:30 (NIV)',
    icon: Heart,
    themeColor: '#000066',
    accentColor: '#fbbf24',
    bgGradient: 'linear-gradient(145deg, #000045 0%, #000066 60%, #001f7a 100%)',
    lead: "The Women's Department unites mothers, sisters, and young women across Ngungo Assembly in fervent intercession, family stability, and compassionate community outreach.",
    mission: 'To build godly women who nurture spiritual homes, mentor younger daughters, care for the vulnerable, and support church development.',
    activities: [
      'Weekly intercessory prayer chains and fasting fellowship',
      'Marriage, family stability and godly parenting seminars',
      'Home, maternity and hospital visitations for the sick and elderly',
      'Annual Mbeere District Women Convocations and rallies',
      'Sanctuary hospitality and community compassion programs'
    ],
    contactParam: 'women',
    btnText: 'Connect With Women Dept'
  },
  {
    id: 'men',
    num: '02',
    name: 'Men Department',
    tagline: "Men's Brotherhood, Spiritual Leadership & Stewardship",
    schedule: 'Monthly Brotherhood Breakfast & Service Projects',
    verse: '"Be on your guard; stand firm in the faith; be courageous; be strong. Do everything in love." — 1 Corinthians 16:13-14 (NIV)',
    icon: ShieldCheck,
    themeColor: '#000066',
    accentColor: '#38bdf8',
    bgGradient: 'linear-gradient(145deg, #000033 0%, #000066 50%, #0b1f66 100%)',
    lead: "The Men's Fellowship is dedicated to building men of spiritual integrity who take responsibility in leading their households, supporting the church, and impacting society.",
    mission: 'To mobilize Christian men into spiritual maturity, accountability, sanctuary physical infrastructure development, and mentoring youth.',
    activities: [
      'Monthly brotherhood prayer breakfast and biblical mentorship',
      'Sanctuary structural maintenance and church building development projects',
      'Fathers-and-sons spiritual mentorship and youth career counseling',
      'Community stewardship, financial literacy and entrepreneurship workshops',
      'Evangelistic outreach and men-to-men gospel encounters'
    ],
    contactParam: 'men',
    btnText: 'Join Men Brotherhood'
  },
  {
    id: 'youth',
    num: '03',
    name: 'Youth Department',
    tagline: 'Saturday Youth Fellowship (4:00 PM – 6:00 PM)',
    schedule: 'Every Saturday from 4:00 PM to 6:00 PM',
    verse: '"Don\'t let anyone look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity." — 1 Timothy 4:12 (NIV)',
    icon: Sparkles,
    themeColor: '#000066',
    accentColor: '#f59e0b',
    bgGradient: 'linear-gradient(145deg, #000045 0%, #001254 50%, #000066 100%)',
    lead: "An energetic, Spirit-empowered movement of young people gathering every Saturday from 4:00 PM to 6:00 PM for passionate praise, talent discovery, and life coaching.",
    mission: 'To empower the next generation with Christ-centered identity, excellence in academic and vocational life, and holy boldness for the Gospel.',
    activities: [
      'Saturday weekly fellowship: praise, worship, word explosion and open discussions',
      'Music, singing and instrumental talent development clinics',
      'Career mentorship, university/college guidance and entrepreneurship skills',
      'District youth sports tournaments, evangelism walks and rallies',
      'Youth drama, poetry, digital media and community clean-up missions'
    ],
    contactParam: 'youth',
    btnText: 'Connect With Youth Dept'
  },
  {
    id: 'sundayschool',
    num: '04',
    name: 'Sunday School Department',
    tagline: 'Sundays 8:00 AM – 10:00 AM • Child Discipleship',
    schedule: 'Every Sunday Morning: 8:00 AM to 10:00 AM',
    verse: '"Start children off on the way they should go, and even when they are old they will not turn from it." — Proverbs 22:6 (NIV)',
    icon: BookOpen,
    themeColor: '#000066',
    accentColor: '#10b981',
    bgGradient: 'linear-gradient(145deg, #00003b 0%, #000066 50%, #064e3b 100%)',
    lead: "Our Sunday School ministers to children from toddlers to pre-teens every Sunday from 8:00 AM to 10:00 AM, grounding young hearts in the living Word of God.",
    mission: 'To introduce children to Jesus as Savior, teach foundational scripture doctrines, and cultivate joyful praise and prayer habits early in life.',
    activities: [
      'Age-appropriate graded Sunday School classes with dedicated teachers',
      'Scripture memorization challenges and Bible quiz competitions',
      'Children\'s worship songs, Bible storytelling and illustrative crafts',
      'Annual Vacation Bible School (VBS) and children\'s festive presentations',
      'Dedicated teacher prayer meetings and child ministry training'
    ],
    contactParam: 'sundayschool',
    btnText: 'Enroll Child / Volunteer'
  }
];

const Departments = () => {
  const { hash } = useLocation();
  const [activeTab, setActiveTab] = useState('women');

  useEffect(() => {
    if (!hash) return;
    const timer = setTimeout(() => {
      scrollToHash(hash);
      setActiveTab(hash.replace('#', ''));
    }, 120);
    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <main className="departments-page" style={{ backgroundColor: '#f4f6fb', minHeight: '100vh', paddingBottom: '70px' }}>
      
      {/* Page Banner with Deep Navy Identity */}
      <section className="page-banner" style={{ background: 'linear-gradient(135deg, #000033 0%, #000066 60%, #001f7a 100%)', padding: '60px 0 50px' }}>
        <div className="banner-overlay" style={{ opacity: 0.15 }}></div>
        <div className="container">
          <div className="banner-content" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(251, 191, 36, 0.18)',
              color: '#fbbf24',
              padding: '6px 18px',
              borderRadius: '30px',
              fontSize: '0.82rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '16px',
              border: '1px solid rgba(251, 191, 36, 0.35)'
            }}>
              <Users size={16} /> Four Pillars of the Church
            </span>
            <h1 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>
              Church Departments
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '1.08rem', lineHeight: 1.7, margin: '0 auto 24px' }}>
              At <strong>Pentecostal Assemblies of God - Ngungo Assembly</strong> (Headquarters for Mbeere District), 
              every generation and calling is nurtured into Christian maturity through four dedicated foundational departments.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Jump Bar */}
      <div style={{
        background: '#ffffff',
        borderBottom: '2px solid #e2e8f0',
        boxShadow: '0 4px 12px rgba(0, 0, 102, 0.05)',
        position: 'sticky',
        top: '116px',
        zIndex: 90
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '10px',
            padding: '12px 0',
            scrollbarWidth: 'none'
          }}>
            {DEPARTMENTS.map(dept => {
              const IconComponent = dept.icon;
              const isActive = activeTab === dept.id;
              return (
                <a
                  key={dept.id}
                  href={`#${dept.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(dept.id);
                    scrollToHash(`#${dept.id}`);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 18px',
                    borderRadius: '25px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.25s ease',
                    background: isActive ? '#000066' : 'rgba(0, 0, 102, 0.05)',
                    color: isActive ? '#ffffff' : '#000066',
                    border: isActive ? '1.5px solid #000066' : '1.5px solid transparent',
                    boxShadow: isActive ? '0 4px 14px rgba(0, 0, 102, 0.25)' : 'none'
                  }}
                >
                  <IconComponent size={16} color={isActive ? '#fbbf24' : '#000066'} />
                  {dept.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Departments Grid — Distinct, Luxurious Cards */}
      <div className="container" style={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {DEPARTMENTS.map((dept) => {
            const IconComponent = dept.icon;
            return (
              <section
                id={dept.id}
                key={dept.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  boxShadow: '0 12px 35px rgba(0, 0, 102, 0.08)',
                  border: '1.5px solid rgba(0, 0, 102, 0.12)',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                {/* Header Strip with Deep Royal Navy */}
                <div style={{
                  background: dept.bgGradient,
                  padding: '28px 32px',
                  color: '#ffffff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                  borderBottom: '3px solid #fbbf24'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid rgba(251, 191, 36, 0.5)',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                      flexShrink: 0
                    }}>
                      <IconComponent size={32} color="#fbbf24" />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          background: 'rgba(251, 191, 36, 0.25)',
                          color: '#fbbf24',
                          fontWeight: 800,
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          padding: '3px 10px',
                          borderRadius: '12px',
                          letterSpacing: '1px'
                        }}>
                          Department {dept.num}
                        </span>
                        <span style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>PAG Ngungo Assembly</span>
                      </div>
                      <h2 style={{ margin: '4px 0 2px', fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>
                        {dept.name}
                      </h2>
                      <p style={{ margin: 0, fontSize: '0.92rem', color: '#e2e8f0', fontWeight: 500 }}>
                        {dept.tagline}
                      </p>
                    </div>
                  </div>

                  <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    color: '#ffffff'
                  }}>
                    <Clock size={16} color="#fbbf24" />
                    {dept.schedule}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '32px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', alignItems: 'start' }}>
                    
                    {/* Left Column: Description & Scripture */}
                    <div>
                      <h3 style={{ fontSize: '1.15rem', color: '#000066', fontWeight: 800, marginBottom: '10px' }}>
                        About the Department
                      </h3>
                      <p style={{ color: '#334155', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '16px' }}>
                        {dept.lead}
                      </p>
                      
                      <div style={{
                        background: '#f8fafc',
                        borderLeft: '4px solid #000066',
                        padding: '16px 20px',
                        borderRadius: '0 12px 12px 0',
                        marginBottom: '20px'
                      }}>
                        <p style={{ fontStyle: 'italic', color: '#1e293b', fontSize: '0.92rem', margin: 0, lineHeight: 1.6 }}>
                          {dept.verse}
                        </p>
                      </div>

                      <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                        <strong>Mission Focus:</strong> {dept.mission}
                      </p>
                    </div>

                    {/* Right Column: Key Activities & Action Button */}
                    <div style={{
                      background: 'rgba(0, 0, 102, 0.03)',
                      borderRadius: '16px',
                      padding: '24px 26px',
                      border: '1.5px solid rgba(0, 0, 102, 0.08)'
                    }}>
                      <h4 style={{
                        fontSize: '0.92rem',
                        fontWeight: 800,
                        color: '#000066',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        margin: '0 0 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <Calendar size={18} color="#000066" /> Core Ministry Programs
                      </h4>

                      <ul style={{ padding: 0, margin: '0 0 24px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {dept.activities.map((act, idx) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#334155' }}>
                            <CheckCircle2 size={16} color="#000066" style={{ flexShrink: 0, marginTop: '3px' }} />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>

                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <Link
                          to={`/contact?dept=${dept.contactParam}`}
                          className="btn btn-primary"
                          style={{
                            background: 'linear-gradient(135deg, #000066 0%, #001f7a 100%)',
                            border: 'none',
                            color: '#ffffff',
                            fontWeight: 700,
                            padding: '12px 24px',
                            borderRadius: '8px',
                            fontSize: '0.92rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 14px rgba(0, 0, 102, 0.25)'
                          }}
                        >
                          {dept.btnText} <ArrowRight size={16} />
                        </Link>
                        <Link
                          to="/contact?dept=prayer"
                          className="btn btn-secondary"
                          style={{
                            borderColor: '#000066',
                            color: '#000066',
                            fontWeight: 700,
                            padding: '12px 20px',
                            borderRadius: '8px',
                            fontSize: '0.92rem'
                          }}
                        >
                          Submit Prayer Point
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Card */}
      <section className="container" style={{ marginTop: '50px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #000033 0%, #000066 50%, #001f7a 100%)',
          borderRadius: '20px',
          padding: '40px 36px',
          color: '#ffffff',
          textAlign: 'center',
          boxShadow: '0 12px 36px rgba(0, 0, 102, 0.25)',
          border: '2px solid rgba(251, 191, 36, 0.35)'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 12px', color: '#ffffff' }}>
            Looking for Sanctuary Ministries?
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            Explore our specialized worship arms including <strong>Praise &amp; Worship</strong>, <strong>Instrumentalists Band</strong>, 
            <strong>Sanctuary Choir</strong>, and <strong>Ushering &amp; Protocol</strong>.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/ministries"
              className="btn btn-primary"
              style={{
                background: '#fbbf24',
                color: '#000045',
                border: 'none',
                fontWeight: 800,
                padding: '12px 28px',
                fontSize: '0.96rem'
              }}
            >
              Explore Sanctuary Ministries &rarr;
            </Link>
            <Link
              to="/assemblies"
              className="btn btn-secondary"
              style={{
                borderColor: '#ffffff',
                color: '#ffffff',
                fontWeight: 700,
                padding: '12px 24px',
                fontSize: '0.96rem'
              }}
            >
              District Assemblies
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Departments;
