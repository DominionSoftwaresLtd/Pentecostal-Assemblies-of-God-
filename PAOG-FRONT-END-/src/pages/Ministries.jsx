import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Music, 
  Award, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Clock, 
  Sparkles,
  Calendar,
  Volume2
} from 'lucide-react';

const scrollToHash = (hash) => {
  if (!hash) return;
  const el = document.querySelector(hash);
  if (!el) return;
  const headerHeight = document.querySelector('.site-header-wrapper')?.offsetHeight || 80;
  const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
  window.scrollTo({ top, behavior: 'smooth' });
};

const MINISTRIES = [
  {
    id: 'worship',
    num: '01',
    name: 'Praise and Worship',
    tagline: 'Leading the Congregation in Spirit and in Truth',
    schedule: 'Weekly Vocal Rehearsals & Sunday Services',
    verse: '"Yet a time is coming and has now come when the true worshipers will worship the Father in the Spirit and in truth, for they are the kind of worshipers the Father seeks." — John 4:23 (NIV)',
    icon: Music,
    bgGradient: 'linear-gradient(145deg, #000033 0%, #000066 50%, #1e1b4b 100%)',
    accentColor: '#fbbf24',
    lead: "The Praise and Worship team ushers the sanctuary congregation into the manifest, transformative presence of the Holy Spirit through anointed song leading, scriptural praise, and deep worship.",
    mission: 'To cultivate a sacred atmosphere where miracles happen, heavy hearts are liberated, and Jesus Christ is exalted with holy reverence.',
    activities: [
      'Leading worship during English Service (8:00 AM - 10:00 AM) and Main Service (10:30 AM - 1:30 PM)',
      'Midweek spiritual preparation, vocal harmony training, and prayer intercession',
      'Special praise explosion nights, Friday revival vigils, and district convocations',
      'Vocal coaching for young talent and aspiring song leaders',
      'Ministering during district conferences, evangelistic crusades, and joint rallies'
    ],
    contactParam: 'worship',
    btnText: 'Audition / Join Worship Team'
  },
  {
    id: 'instrumentalists',
    num: '02',
    name: 'Instrumentalist Ministry',
    tagline: 'Band, Acoustics & Audio Engineering Excellence',
    schedule: 'Weekly Band Practice & Technical Sound Checks',
    verse: '"Praise him with the sounding of the trumpet, praise him with the harp and lyre, praise him with timbrel and dancing, praise him with the strings and pipe..." — Psalm 150:3-4 (NIV)',
    icon: Award,
    bgGradient: 'linear-gradient(145deg, #000045 0%, #000066 50%, #075985 100%)',
    accentColor: '#38bdf8',
    lead: "A disciplined collective of skilled Christian musicians serving on keyboards, drums, acoustic guitars, bass, lead guitars, and state-of-the-art sanctuary audio systems with musical mastery.",
    mission: 'To support the worship experience with high musical craftsmanship, spiritual sensitivity, and crisp sanctuary audio amplification.',
    activities: [
      'Keyboard, synthesizer, and piano accompaniment for all services',
      'Dynamic acoustic, electric, and bass guitar grooves',
      'Drumming and percussion sets providing steady, vibrant rhythm',
      'Sound engineering, live mixing, microphone equalization, and stage management',
      'Training and hands-on workshops for youth and beginner instrumentalists'
    ],
    contactParam: 'instrumentalists',
    btnText: 'Join Instrumentalist Band'
  },
  {
    id: 'choir',
    num: '03',
    name: 'Choir Ministry',
    tagline: 'Choral Anthems, Classic Hymns & Revival Melodies',
    schedule: 'Weekly Choir Rehearsals & Festive Presentations',
    verse: '"Let the message of Christ dwell among you richly as you teach and admonish one another with all wisdom through psalms, hymns, and songs from the Spirit, singing to God with gratitude in your hearts." — Colossians 3:16 (NIV)',
    icon: Users,
    bgGradient: 'linear-gradient(145deg, #00003b 0%, #000066 50%, #701a75 100%)',
    accentColor: '#f472b6',
    lead: "The Sanctuary Choir glorifies God through rich multi-part choral anthems, time-honored Christian hymns, festive Easter and Christmas cantatas, and vibrant revival melodies.",
    mission: 'To preserve sacred choral excellence, stir spiritual joy across all generations, and minister salvation through gospel music.',
    activities: [
      'Four-part harmony presentation songs (Soprano, Alto, Tenor, Bass) during Sunday services',
      'Special festive musical cantatas for Easter, Christmas, and Thanksgiving',
      'Participation in Mbeere District and national PAG music festivals',
      'Recording, song composition, and preserving indigenous gospel melodies',
      'Weekly fellowship, mutual prayer support, and vocal development'
    ],
    contactParam: 'choir',
    btnText: 'Join Sanctuary Choir'
  },
  {
    id: 'ushering',
    num: '04',
    name: 'Ushering Ministry',
    tagline: 'Sanctuary Hospitality, Protocol & Reverence',
    schedule: 'Every Sunday Service & Special District Convocations',
    verse: '"Better is one day in your courts than a thousand elsewhere; I would rather be a doorkeeper in the house of my God than dwell in the tents of the wicked." — Psalm 84:10 (NIV)',
    icon: CheckCircle2,
    bgGradient: 'linear-gradient(145deg, #000033 0%, #000066 50%, #064e3b 100%)',
    accentColor: '#34d399',
    lead: "The warm, welcoming face of PAG Ngungo Assembly. Our Ushering & Protocol ministry ensures every worshipper and visiting guest experiences Christian warmth, order, and reverence in the sanctuary.",
    mission: 'To maintain sacred sanctuary dignity, facilitate smooth congregation seating, receive guests, and coordinate offertory with utmost integrity.',
    activities: [
      'Warmly receiving, welcoming, and registering first-time visitors and guests',
      'Orderly sanctuary seating management and crowd navigation',
      'Reverent collection and safe handling of tithes and offerings',
      'Sanctuary preparation, bulletin distribution, and ventilation monitoring',
      'Protocol coordination during episcopal district meetings and ministerial convocations'
    ],
    contactParam: 'ushering',
    btnText: 'Volunteer as an Usher'
  }
];

const Ministries = () => {
  const { hash } = useLocation();
  const [activeTab, setActiveTab] = useState('worship');

  useEffect(() => {
    if (!hash) return;
    const timer = setTimeout(() => {
      scrollToHash(hash);
      setActiveTab(hash.replace('#', ''));
    }, 120);
    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <main className="ministries-page" style={{ backgroundColor: '#f4f6fb', minHeight: '100vh', paddingBottom: '70px' }}>
      
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
              <Sparkles size={16} /> Sanctuary Service Arms
            </span>
            <h1 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>
              Sanctuary Ministries
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '1.08rem', lineHeight: 1.7, margin: '0 auto 24px' }}>
              At <strong>Pentecostal Assemblies of God - Ngungo Assembly</strong>, our sanctuary ministries 
              elevate the corporate worship experience through musical excellence, choral harmony, and hospitable protocol.
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
            {MINISTRIES.map(min => {
              const IconComponent = min.icon;
              const isActive = activeTab === min.id;
              return (
                <a
                  key={min.id}
                  href={`#${min.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(min.id);
                    scrollToHash(`#${min.id}`);
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
                  {min.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ministries Grid — Distinct, Professional Cards */}
      <div className="container" style={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {MINISTRIES.map((min) => {
            const IconComponent = min.icon;
            return (
              <section
                id={min.id}
                key={min.id}
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
                  background: min.bgGradient,
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
                          Ministry {min.num}
                        </span>
                        <span style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>PAG Ngungo Sanctuary</span>
                      </div>
                      <h2 style={{ margin: '4px 0 2px', fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>
                        {min.name}
                      </h2>
                      <p style={{ margin: 0, fontSize: '0.92rem', color: '#e2e8f0', fontWeight: 500 }}>
                        {min.tagline}
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
                    {min.schedule}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '32px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', alignItems: 'start' }}>
                    
                    {/* Left Column: Description & Scripture */}
                    <div>
                      <h3 style={{ fontSize: '1.15rem', color: '#000066', fontWeight: 800, marginBottom: '10px' }}>
                        Ministry Calling &amp; Vision
                      </h3>
                      <p style={{ color: '#334155', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '16px' }}>
                        {min.lead}
                      </p>
                      
                      <div style={{
                        background: '#f8fafc',
                        borderLeft: '4px solid #000066',
                        padding: '16px 20px',
                        borderRadius: '0 12px 12px 0',
                        marginBottom: '20px'
                      }}>
                        <p style={{ fontStyle: 'italic', color: '#1e293b', fontSize: '0.92rem', margin: 0, lineHeight: 1.6 }}>
                          {min.verse}
                        </p>
                      </div>

                      <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6 }}>
                        <strong>Apostolic Purpose:</strong> {min.mission}
                      </p>
                    </div>

                    {/* Right Column: Roles & Action Button */}
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
                        <Calendar size={18} color="#000066" /> Core Responsibilities
                      </h4>

                      <ul style={{ padding: 0, margin: '0 0 24px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {min.activities.map((act, idx) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#334155' }}>
                            <CheckCircle2 size={16} color="#000066" style={{ flexShrink: 0, marginTop: '3px' }} />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>

                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <Link
                          to={`/contact?dept=${min.contactParam}`}
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
                          {min.btnText} <ArrowRight size={16} />
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
                          Contact Church
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
            Looking for Church Departments?
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            Explore our foundational fellowship departments: <strong>Women Department</strong>, <strong>Men Department</strong>, 
            <strong>Youth Department</strong>, and <strong>Sunday School Department</strong>.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/departments"
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
              Explore Church Departments &rarr;
            </Link>
            <Link
              to="/programs"
              className="btn btn-secondary"
              style={{
                borderColor: '#ffffff',
                color: '#ffffff',
                fontWeight: 700,
                padding: '12px 24px',
                fontSize: '0.96rem'
              }}
            >
              Order of Services
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Ministries;